import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

interface AccessibilityPreferences {
  fontSize: 'normal' | 'large' | 'extra-large'
  highContrast: boolean
  highlightLinks: boolean
  reduceMotion: boolean
  textToSpeech: boolean
}

const AccessibilityButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [preferences, setPreferences] = useState<AccessibilityPreferences>({
    fontSize: 'normal',
    highContrast: false,
    highlightLinks: false,
    reduceMotion: false,
    textToSpeech: false,
  })
  
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)
  const isSpeakingRef = useRef(false)

  // Load preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('accessibility-preferences')
    if (saved) {
      setPreferences(JSON.parse(saved))
    }
  }, [])

  // Add click listeners for text-to-speech
  useEffect(() => {
    if (!preferences.textToSpeech) return

    const addSpeakListeners = () => {
      // Add to headings
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      headings.forEach(heading => {
        const htmlHeading = heading as HTMLElement
        htmlHeading.addEventListener('click', () => speakElement(htmlHeading))
        htmlHeading.style.cursor = 'pointer'
        htmlHeading.title = 'לחץ לקריאה בקול'
      })

      // Add to paragraphs
      const paragraphs = document.querySelectorAll('p')
      paragraphs.forEach(p => {
        const htmlParagraph = p as HTMLElement
        htmlParagraph.addEventListener('click', () => speakElement(htmlParagraph))
        htmlParagraph.style.cursor = 'pointer'
        htmlParagraph.title = 'לחץ לקריאה בקול'
      })

      // Add to buttons
      const buttons = document.querySelectorAll('button:not([data-accessibility])')
      buttons.forEach(button => {
        button.addEventListener('click', () => speakElement(button as HTMLElement))
      })
    }

    // Add listeners after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(addSpeakListeners, 100)

    return () => {
      clearTimeout(timeoutId)
      // Remove listeners when component unmounts or textToSpeech is disabled
      const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p')
      elements.forEach(element => {
        const htmlElement = element as HTMLElement
        htmlElement.removeEventListener('click', () => speakElement(htmlElement))
        htmlElement.style.cursor = ''
        htmlElement.title = ''
      })
    }
  }, [preferences.textToSpeech])

  // Apply preferences to document
  useEffect(() => {
    const root = document.documentElement
    
    // Font size
    root.style.setProperty('--accessibility-font-size', 
      preferences.fontSize === 'normal' ? '1rem' :
      preferences.fontSize === 'large' ? '1.2rem' : '1.4rem'
    )
    
    // High contrast
    if (preferences.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    
    // Highlight links
    if (preferences.highlightLinks) {
      root.classList.add('highlight-links')
    } else {
      root.classList.remove('highlight-links')
    }
    
    // Reduce motion
    if (preferences.reduceMotion) {
      root.classList.add('reduce-motion')
    } else {
      root.classList.remove('reduce-motion')
    }
    
    // Save preferences
    localStorage.setItem('accessibility-preferences', JSON.stringify(preferences))
  }, [preferences])

  const togglePreference = (key: keyof AccessibilityPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const setFontSize = (size: 'normal' | 'large' | 'extra-large') => {
    setPreferences(prev => ({
      ...prev,
      fontSize: size
    }))
  }

  const resetPreferences = () => {
    const defaultPrefs: AccessibilityPreferences = {
      fontSize: 'normal',
      highContrast: false,
      highlightLinks: false,
      reduceMotion: false,
      textToSpeech: false,
    }
    setPreferences(defaultPrefs)
  }

  // Professional Text-to-Speech with AI-like features
  const speakText = (text: string, options: { lang?: string; rate?: number; pitch?: number } = {}) => {
    if (!preferences.textToSpeech) {
      showNotification('קריאה בקול לא מופעלת. אנא הפעל את האפשרות בפאנל הנגישות.', 'warning')
      return
    }

    if (!('speechSynthesis' in window)) {
      showNotification('הדפדפן שלך לא תומך בקריאה בקול. אנא השתמש בדפדפן מודרני יותר.', 'error')
      return
    }

    // Stop current speech
    stopSpeaking()

    try {
      const utterance = new SpeechSynthesisUtterance(text)
      speechRef.current = utterance

      // Advanced voice selection
      const voices = speechSynthesis.getVoices()
      const hebrewVoice = voices.find(voice => 
        voice.lang.startsWith('he') || 
        voice.name.includes('Hebrew') || 
        voice.name.includes('עברית')
      )
      
      const englishVoice = voices.find(voice => 
        voice.lang.startsWith('en-US') && 
        voice.name.includes('Google') || 
        voice.name.includes('Microsoft')
      )

      // Set voice and language
      if (hebrewVoice && options.lang !== 'en') {
        utterance.voice = hebrewVoice
        utterance.lang = 'he-IL'
      } else if (englishVoice) {
        utterance.voice = englishVoice
        utterance.lang = 'en-US'
      } else {
        utterance.lang = options.lang || 'he-IL'
      }

      // Advanced settings
      utterance.rate = options.rate || 0.8
      utterance.pitch = options.pitch || 1
      utterance.volume = 1

      // Event handlers
      utterance.onstart = () => {
        isSpeakingRef.current = true
        console.log('🎤 קריאה בקול התחילה:', text.substring(0, 50) + '...')
        updateSpeakingIndicator(true)
      }

      utterance.onend = () => {
        isSpeakingRef.current = false
        speechRef.current = null
        console.log('✅ קריאה בקול הסתיימה')
        updateSpeakingIndicator(false)
      }

      utterance.onerror = (event) => {
        isSpeakingRef.current = false
        speechRef.current = null
        console.error('❌ שגיאה בקריאה בקול:', event.error)
        
        // Smart fallback
        if (event.error === 'not-allowed' || event.error === 'canceled') {
          if (utterance.lang === 'he-IL') {
            console.log('🔄 מנסה עם אנגלית...')
            speakText(text, { lang: 'en', rate: 0.8 })
          } else {
            showNotification('לא ניתן להקריא טקסט כרגע. נסה שוב מאוחר יותר.', 'error')
          }
        } else {
          showNotification(`שגיאה בקריאה בקול: ${event.error}`, 'error')
        }
      }

      // Start speaking
      speechSynthesis.speak(utterance)
      
    } catch (error) {
      console.error('❌ שגיאה כללית בקריאה בקול:', error)
      showNotification('שגיאה בקריאה בקול. נסה שוב.', 'error')
    }
  }

  // Professional notification system
  const showNotification = (message: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') => {
    // Create notification element
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
      type === 'success' ? 'bg-green-500 text-white' :
      type === 'warning' ? 'bg-yellow-500 text-black' :
      type === 'error' ? 'bg-red-500 text-white' :
      'bg-blue-500 text-white'
    }`
    notification.textContent = message
    
    document.body.appendChild(notification)
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 3000)
  }

  // Update speaking indicator
  const updateSpeakingIndicator = (isSpeaking: boolean) => {
    const button = document.querySelector('[data-accessibility-button]') as HTMLElement
    if (button) {
      if (isSpeaking) {
        button.style.animation = 'pulse 1s infinite'
        button.title = 'קורא כרגע - לחץ לעצירה'
      } else {
        button.style.animation = ''
        button.title = 'פתח אפשרויות נגישות'
      }
    }
  }

  const speakPageContent = () => {
    if (!preferences.textToSpeech) return
    
    // Get main content
    const mainContent = document.querySelector('#main-content')
    if (!mainContent) return
    
    // Get all text content
    const textContent = (mainContent as HTMLElement).innerText || mainContent.textContent || ''
    
    // Clean up text (remove extra spaces, newlines)
    const cleanText = textContent
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .trim()
    
    if (cleanText) {
      speakText(cleanText)
    }
  }

  const speakElement = (element: HTMLElement) => {
    if (!preferences.textToSpeech) return
    
    const text = element.innerText || element.textContent || ''
    if (text.trim()) {
      speakText(text.trim())
    }
  }

  const stopSpeaking = () => {
    if (speechRef.current) {
      speechSynthesis.cancel()
      speechRef.current = null
      isSpeakingRef.current = false
      updateSpeakingIndicator(false)
      showNotification('קריאה בקול הופסקה', 'info')
    }
  }

  return (
    <>
      {/* Professional Accessibility Button */}
      <button
        data-accessibility-button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
        aria-label="פתח אפשרויות נגישות מקצועיות"
        title="פתח אפשרויות נגישות מקצועיות"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V7.5C15 8.3 14.3 9 13.5 9S12 8.3 12 7.5V6.5L6 7V9L12 8.5V9.5C12 10.3 12.7 11 13.5 11S15 10.3 15 9.5V8.5L21 9ZM12 8C10.9 8 10 8.9 10 10V20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20V10C14 8.9 13.1 8 12 8Z"/>
        </svg>
      </button>

      {/* Professional Accessibility Panel */}
      {isOpen && (
        <div className="fixed bottom-24 left-4 z-50 bg-white border-2 border-blue-200 rounded-2xl shadow-2xl p-6 w-96 max-h-[80vh] overflow-y-auto backdrop-blur-sm">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V7.5C15 8.3 14.3 9 13.5 9S12 8.3 12 7.5V6.5L6 7V9L12 8.5V9.5C12 10.3 12.7 11 13.5 11S15 10.3 15 9.5V8.5L21 9ZM12 8C10.9 8 10 8.9 10 10V20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20V10C14 8.9 13.1 8 12 8Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800">נגישות מקצועית</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 transition-colors"
              aria-label="סגור פאנל נגישות"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                גודל טקסט
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-3 py-1 rounded text-sm ${
                    preferences.fontSize === 'normal'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  רגיל
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-3 py-1 rounded text-sm ${
                    preferences.fontSize === 'large'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  גדול
                </button>
                <button
                  onClick={() => setFontSize('extra-large')}
                  className={`px-3 py-1 rounded text-sm ${
                    preferences.fontSize === 'extra-large'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  גדול מאוד
                </button>
              </div>
            </div>

            {/* High Contrast */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                ניגודיות גבוהה
              </label>
              <button
                onClick={() => togglePreference('highContrast')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.highContrast ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={preferences.highContrast}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.highContrast ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Highlight Links */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                הדגשת קישורים
              </label>
              <button
                onClick={() => togglePreference('highlightLinks')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.highlightLinks ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={preferences.highlightLinks}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.highlightLinks ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Reduce Motion */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                הפחתת אנימציות
              </label>
              <button
                onClick={() => togglePreference('reduceMotion')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.reduceMotion ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={preferences.reduceMotion}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.reduceMotion ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Text to Speech */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                קריאה בקול
              </label>
              <button
                onClick={() => togglePreference('textToSpeech')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  preferences.textToSpeech ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={preferences.textToSpeech}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    preferences.textToSpeech ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Professional Speech Controls */}
            {preferences.textToSpeech && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V7.5C15 8.3 14.3 9 13.5 9S12 8.3 12 7.5V6.5L6 7V9L12 8.5V9.5C12 10.3 12.7 11 13.5 11S15 10.3 15 9.5V8.5L21 9ZM12 8C10.9 8 10 8.9 10 10V20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20V10C14 8.9 13.1 8 12 8Z"/>
                    </svg>
                    <strong className="text-blue-800">קריאה בקול מתקדמת</strong>
                  </div>
                  <p className="text-sm text-blue-700">
                    לחץ על כותרות ופסקאות לקריאה אוטומטית, או השתמש בכפתורים למטה
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => speakText('שלום, זהו בדיקת קריאה בקול מקצועית', { rate: 0.8 })}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V7.5C15 8.3 14.3 9 13.5 9S12 8.3 12 7.5V6.5L6 7V9L12 8.5V9.5C12 10.3 12.7 11 13.5 11S15 10.3 15 9.5V8.5L21 9ZM12 8C10.9 8 10 8.9 10 10V20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20V10C14 8.9 13.1 8 12 8Z"/>
                      </svg>
                      <span className="text-sm font-medium">בדיקה</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={speakPageContent}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V7.5C15 8.3 14.3 9 13.5 9S12 8.3 12 7.5V6.5L6 7V9L12 8.5V9.5C12 10.3 12.7 11 13.5 11S15 10.3 15 9.5V8.5L21 9ZM12 8C10.9 8 10 8.9 10 10V20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20V10C14 8.9 13.1 8 12 8Z"/>
                      </svg>
                      <span className="text-sm font-medium">קרא הכל</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={stopSpeaking}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-4 rounded-xl hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 6h12v12H6z"/>
                      </svg>
                      <span className="text-sm font-medium">עצור</span>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => speakText('Hello, this is a professional accessibility test', { lang: 'en', rate: 0.8 })}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 6.5V7.5C15 8.3 14.3 9 13.5 9S12 8.3 12 7.5V6.5L6 7V9L12 8.5V9.5C12 10.3 12.7 11 13.5 11S15 10.3 15 9.5V8.5L21 9ZM12 8C10.9 8 10 8.9 10 10V20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20V10C14 8.9 13.1 8 12 8Z"/>
                      </svg>
                      <span className="text-sm font-medium">Test EN</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Accessibility Statement Link */}
            <div className="pt-4 border-t border-gray-200">
              <Link
                to="/accessibility-statement"
                className="text-blue-600 hover:text-blue-800 text-sm underline"
                onClick={() => setIsOpen(false)}
              >
                הצהרת נגישות
              </Link>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetPreferences}
              className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              איפוס הגדרות
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AccessibilityButton
