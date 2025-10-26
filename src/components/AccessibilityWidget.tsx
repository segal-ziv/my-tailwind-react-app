import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'

interface AccessibilitySettings {
  fontSize: number // 75-200 (percentage)
  darkMode: boolean
  textToSpeech: boolean
  highlightLinks: boolean
  readingFocus: boolean
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 100,
  darkMode: false,
  textToSpeech: false,
  highlightLinks: false,
  readingFocus: false,
}

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Load settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('accessibility-settings-v3')
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load settings:', e)
      }
    }
  }, [])

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement

    // Font size (75% - 200%)
    root.style.fontSize = `${settings.fontSize}%`

    // Dark mode
    if (settings.darkMode) {
      root.classList.add('a11y-dark-mode')
    } else {
      root.classList.remove('a11y-dark-mode')
    }

    // Highlight links
    if (settings.highlightLinks) {
      root.classList.add('a11y-highlight-links')
    } else {
      root.classList.remove('a11y-highlight-links')
    }

    // Reading focus
    if (settings.readingFocus) {
      root.classList.add('a11y-reading-focus')
    } else {
      root.classList.remove('a11y-reading-focus')
    }

    // Save to localStorage
    localStorage.setItem('accessibility-settings-v3', JSON.stringify(settings))
  }, [settings])

  // Text-to-Speech functionality
  useEffect(() => {
    if (!settings.textToSpeech) {
      // Remove click listeners when disabled
      const elements = document.querySelectorAll('[data-tts-enabled]')
      elements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.cursor = ''
          el.removeAttribute('title')
          el.removeAttribute('data-tts-enabled')
        }
      })
      return
    }

    // Add click-to-read functionality
    const handleClick = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      const text = target.textContent?.trim()
      if (text) {
        speakText(text)
      }
    }

    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, button, a')
    elements.forEach(el => {
      if (el instanceof HTMLElement && !el.closest('[role="dialog"]')) {
        el.style.cursor = 'pointer'
        el.setAttribute('title', 'לחץ לקריאה בקול')
        el.setAttribute('data-tts-enabled', 'true')
        el.addEventListener('click', handleClick)
      }
    })

    // Cleanup
    return () => {
      elements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.cursor = ''
          el.removeAttribute('title')
          el.removeAttribute('data-tts-enabled')
          el.removeEventListener('click', handleClick)
        }
      })
    }
  }, [settings.textToSpeech])

  const speakText = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('הדפדפן שלך לא תומך בקריאה בקול')
      return
    }

    speechSynthesis.cancel()
    setIsSpeaking(true)

    const utterance = new SpeechSynthesisUtterance(text)
    const voices = speechSynthesis.getVoices()
    const hebrewVoice = voices.find(voice => voice.lang.startsWith('he'))

    if (hebrewVoice) {
      utterance.voice = hebrewVoice
      utterance.lang = 'he-IL'
    }

    utterance.rate = 0.8
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    speechSynthesis.speak(utterance)
  }, [])

  const stopSpeaking = () => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const increaseFontSize = () => {
    setSettings(prev => ({
      ...prev,
      fontSize: Math.min(200, prev.fontSize + 10)
    }))
  }

  const decreaseFontSize = () => {
    setSettings(prev => ({
      ...prev,
      fontSize: Math.max(75, prev.fontSize - 10)
    }))
  }

  const resetAll = () => {
    if (window.confirm('האם אתה בטוח שברצונך לאפס את כל הגדרות הנגישות?')) {
      setSettings(defaultSettings)
      document.documentElement.className = ''
      document.documentElement.style.fontSize = ''
      localStorage.removeItem('accessibility-settings-v3')
      speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const activeCount = [
    settings.fontSize !== 100,
    settings.darkMode,
    settings.textToSpeech,
    settings.highlightLinks,
    settings.readingFocus,
  ].filter(Boolean).length

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[100] bg-blue-600 hover:bg-blue-700 text-white p-3 md:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="פתח תפריט נגישות"
        title="נגישות"
      >
        {activeCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center">
            {activeCount}
          </span>
        )}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="md:w-7 md:h-7">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9H15V22H13V16H11V22H9V9H3V7H21V9Z"/>
        </svg>
      </button>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-[99] md:bg-transparent"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Accessibility Panel */}
      {isOpen && (
        <div
          className="fixed bottom-0 left-0 right-0 md:bottom-24 md:left-6 md:right-auto z-[100] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl w-full sm:w-[420px] md:w-[480px] max-h-[85vh] md:max-h-[600px] overflow-hidden flex flex-col"
          dir="rtl"
          role="dialog"
          aria-label="כלים לנגישות"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Mobile drag handle */}
          <div className="md:hidden pt-3 pb-2 flex justify-center">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 md:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔧</span>
              <h2 className="text-white font-bold text-lg md:text-xl">כלים לנגישות</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="סגור"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 md:px-6 py-5 space-y-6">

            {/* 1. Font Size */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📏</span>
                <h3 className="font-bold text-gray-900 text-base">גודל גופן</h3>
              </div>
              <div className="flex items-center justify-center gap-4 bg-gray-50 p-4 rounded-xl">
                <button
                  onClick={decreaseFontSize}
                  disabled={settings.fontSize <= 75}
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center font-bold text-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="הקטן גופן"
                >
                  −
                </button>
                <div className="text-center min-w-[80px]">
                  <div className="text-2xl font-bold text-gray-900">{settings.fontSize}%</div>
                  <div className="text-xs text-gray-600">רמה נוכחית</div>
                </div>
                <button
                  onClick={increaseFontSize}
                  disabled={settings.fontSize >= 200}
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg flex items-center justify-center font-bold text-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="הגדל גופן"
                >
                  +
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* 2. Dark Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">🌙</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">ניגודיות כהה</h3>
                  <p className="text-sm text-gray-600">רקע שחור וטקסט לבן</p>
                </div>
              </div>
              <button
                onClick={() => updateSetting('darkMode', !settings.darkMode)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.darkMode ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={settings.darkMode}
                aria-label="ניגודיות כהה"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.darkMode ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* 3. Text-to-Speech */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-2xl">🔊</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">הקראת טקסט</h3>
                    <p className="text-sm text-gray-600">לחץ על טקסט בעמוד לשמיעה</p>
                  </div>
                </div>
                <button
                  onClick={() => updateSetting('textToSpeech', !settings.textToSpeech)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    settings.textToSpeech ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={settings.textToSpeech}
                  aria-label="הקראת טקסט"
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      settings.textToSpeech ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {settings.textToSpeech && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-900 mb-2">
                    💡 <strong>איך להשתמש:</strong> לחץ על כל טקסט בעמוד כדי לשמוע אותו בקול רם
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => speakText('שלום, זהו בדיקת קריאה בקול. המערכת פועלת כראוי.')}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      ▶ בדיקה
                    </button>
                    {isSpeaking && (
                      <button
                        onClick={stopSpeaking}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        ⏹ עצור
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200"></div>

            {/* 4. Highlight Links */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">🔗</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">הדגשת קישורים</h3>
                  <p className="text-sm text-gray-600">קישורים בצהוב בולט עם מסגרת</p>
                </div>
              </div>
              <button
                onClick={() => updateSetting('highlightLinks', !settings.highlightLinks)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.highlightLinks ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={settings.highlightLinks}
                aria-label="הדגשת קישורים"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.highlightLinks ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="border-t border-gray-200"></div>

            {/* 5. Reading Focus */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <span className="text-2xl">🎯</span>
                <div>
                  <h3 className="font-bold text-gray-900 text-base">מיקוד קריאה</h3>
                  <p className="text-sm text-gray-600">העמעם את שאר הדף, הבהר בפוקוס</p>
                </div>
              </div>
              <button
                onClick={() => updateSetting('readingFocus', !settings.readingFocus)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.readingFocus ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={settings.readingFocus}
                aria-label="מיקוד קריאה"
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.readingFocus ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 px-5 md:px-6 py-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={resetAll}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                <span>🔄</span>
                <span>איפוס</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <span>✓</span>
                <span>סגור</span>
              </button>
            </div>
            <Link
              to="/accessibility-statement"
              onClick={() => setIsOpen(false)}
              className="block text-center text-sm text-blue-600 hover:text-blue-800 mt-3 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              הצהרת נגישות
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default AccessibilityWidget
