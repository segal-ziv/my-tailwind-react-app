import { useState, useEffect, useRef, useCallback } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface AccessibilityPreferences {
  // Intelligence Assistance
  gridNavigation: boolean
  keyboardNavigation: boolean
  screenReaderMode: boolean
  voiceCommands: boolean
  textToSpeech: boolean
  specialKeyNavigation: boolean

  // Font size (main control)
  fontSize: number // 0-5

  // Visibility Adjustments
  brightContrast: boolean
  darkContrast: boolean
  monochrome: boolean
  invertedColors: boolean
  highSaturation: boolean
  lowSaturation: boolean

  // Color customization
  colorTarget: 'backgrounds' | 'headings' | 'contents'
  customColorHue: number // 0-360
  colorCustomizationActive: boolean

  // Font Adjustments
  fontAdjustmentType: 'size' | 'wordSpacing' | 'letterSpacing'
  fontSizeLevel: number // 0-5
  wordSpacingLevel: number // 0-5
  letterSpacingLevel: number // 0-5

  // Cursor
  cursorColor: 'white' | 'black'
  cursorSize: 'normal' | 'large'

  // Content Features
  enlargeDisplay: boolean
  subtitles: boolean
  blockFlashing: boolean
  highlightLinks: boolean
  imageDescriptions: boolean
  readableFont: boolean
  enlargeContent: boolean
  readingView: boolean
  highlightHeadings: boolean
  focusReading: boolean
  muteMedia: boolean
  pageStructure: boolean
  virtualKeyboard: boolean
  dictionary: boolean
  readingGuide: boolean

  // UI State
  language: 'he' | 'en'
  audioEnabled: boolean
}

const defaultPreferences: AccessibilityPreferences = {
  gridNavigation: false,
  keyboardNavigation: true,
  screenReaderMode: false,
  voiceCommands: false,
  textToSpeech: false,
  specialKeyNavigation: false,
  fontSize: 0,
  brightContrast: false,
  darkContrast: false,
  monochrome: false,
  invertedColors: false,
  highSaturation: false,
  lowSaturation: false,
  colorTarget: 'backgrounds',
  customColorHue: 200,
  colorCustomizationActive: false,
  fontAdjustmentType: 'size',
  fontSizeLevel: 0,
  wordSpacingLevel: 0,
  letterSpacingLevel: 0,
  cursorColor: 'white',
  cursorSize: 'normal',
  enlargeDisplay: false,
  subtitles: false,
  blockFlashing: false,
  highlightLinks: false,
  imageDescriptions: false,
  readableFont: false,
  enlargeContent: false,
  readingView: false,
  highlightHeadings: false,
  focusReading: false,
  muteMedia: false,
  pageStructure: false,
  virtualKeyboard: false,
  dictionary: false,
  readingGuide: false,
  language: 'he',
  audioEnabled: true,
}

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('intelligence')
  const [preferences, setPreferences] = useState<AccessibilityPreferences>(defaultPreferences)
  const [showInfo, setShowInfo] = useState(false)

  const readingGuideRef = useRef<HTMLDivElement | null>(null)
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Text-to-Speech function
  const speakText = useCallback((text: string) => {
    if (!preferences.textToSpeech || !preferences.audioEnabled) return

    if (!('speechSynthesis' in window)) {
      alert('הדפדפן שלך לא תומך בקריאה בקול')
      return
    }

    speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    speechRef.current = utterance

    const voices = speechSynthesis.getVoices()
    const hebrewVoice = voices.find(voice => voice.lang.startsWith('he'))
    if (hebrewVoice) {
      utterance.voice = hebrewVoice
      utterance.lang = 'he-IL'
    }

    utterance.rate = 0.8
    utterance.pitch = 1
    utterance.volume = 1

    speechSynthesis.speak(utterance)
  }, [preferences.textToSpeech, preferences.audioEnabled])

  // Load preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('accessibility-preferences-v2')
    if (saved) {
      try {
        setPreferences(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load preferences:', e)
      }
    }
  }, [])

  // Apply preferences to document
  useEffect(() => {
    const root = document.documentElement

    // Remove all accessibility classes first
    root.className = root.className
      .split(' ')
      .filter(c => !c.startsWith('a11y-'))
      .join(' ')

    // Font size
    const fontSizeValue = 100 + (preferences.fontSize * 10)
    root.style.fontSize = `${fontSizeValue}%`

    // Intelligence Assistance
    if (preferences.gridNavigation) root.classList.add('a11y-grid-navigation')
    if (preferences.keyboardNavigation) root.classList.add('a11y-keyboard-navigation')
    if (preferences.screenReaderMode) root.classList.add('a11y-screen-reader-mode')
    if (preferences.textToSpeech) root.classList.add('a11y-text-to-speech')

    // Visibility - Contrast modes (only one at a time)
    if (preferences.brightContrast) root.classList.add('a11y-bright-contrast')
    else if (preferences.darkContrast) root.classList.add('a11y-dark-contrast')
    else if (preferences.invertedColors) root.classList.add('a11y-inverted-colors')

    // Monochrome and saturation can combine with contrast
    if (preferences.monochrome) root.classList.add('a11y-monochrome')
    if (preferences.highSaturation) root.classList.add('a11y-high-saturation')
    if (preferences.lowSaturation) root.classList.add('a11y-low-saturation')

    // Color customization
    if (preferences.colorCustomizationActive) {
      const hslColor = `hsl(${preferences.customColorHue}, 70%, 50%)`
      root.style.setProperty('--a11y-custom-color', hslColor)
      root.classList.add(`a11y-custom-color-${preferences.colorTarget}`)
    }

    // Font adjustments
    const fontSizeLevel = 100 + (preferences.fontSizeLevel * 10)
    root.style.setProperty('--a11y-font-size', `${fontSizeLevel}%`)
    root.style.setProperty('--a11y-word-spacing', `${preferences.wordSpacingLevel * 0.1}em`)
    root.style.setProperty('--a11y-letter-spacing', `${preferences.letterSpacingLevel * 0.05}em`)

    // Cursor
    if (preferences.cursorColor === 'black') root.classList.add('a11y-cursor-black')
    else if (preferences.cursorColor === 'white') root.classList.add('a11y-cursor-white')
    if (preferences.cursorSize === 'large') root.classList.add('a11y-cursor-large')

    // Content features
    if (preferences.enlargeDisplay) root.classList.add('a11y-enlarge-display')
    if (preferences.blockFlashing) root.classList.add('a11y-block-flashing')
    if (preferences.highlightLinks) root.classList.add('a11y-highlight-links')
    if (preferences.imageDescriptions) root.classList.add('a11y-image-descriptions')
    if (preferences.readableFont) root.classList.add('a11y-readable-font')
    if (preferences.enlargeContent) root.classList.add('a11y-enlarge-content')
    if (preferences.readingView) root.classList.add('a11y-reading-view')
    if (preferences.highlightHeadings) root.classList.add('a11y-highlight-headings')
    if (preferences.focusReading) root.classList.add('a11y-focus-reading')
    if (preferences.pageStructure) root.classList.add('a11y-page-structure')

    // Mute media
    if (preferences.muteMedia) {
      document.querySelectorAll<HTMLMediaElement>('video, audio').forEach(media => {
        media.muted = true
      })
    }

    // Save preferences
    localStorage.setItem('accessibility-preferences-v2', JSON.stringify(preferences))
  }, [preferences])

  // Reading guide effect
  useEffect(() => {
    if (!preferences.readingGuide) {
      if (readingGuideRef.current && document.body.contains(readingGuideRef.current)) {
        document.body.removeChild(readingGuideRef.current)
        readingGuideRef.current = null
      }
      return
    }

    const guide = document.createElement('div')
    guide.className = 'a11y-reading-guide'
    document.body.appendChild(guide)
    readingGuideRef.current = guide

    const handleMouseMove = (e: MouseEvent) => {
      guide.style.top = `${e.clientY}px`
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      if (readingGuideRef.current && document.body.contains(readingGuideRef.current)) {
        document.body.removeChild(readingGuideRef.current)
        readingGuideRef.current = null
      }
    }
  }, [preferences.readingGuide])

  // Text-to-Speech click-to-read functionality
  useEffect(() => {
    if (!preferences.textToSpeech || !preferences.audioEnabled) {
      // Remove event listeners and styling when disabled
      const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li')
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

    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li')
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
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
  }, [preferences.textToSpeech, preferences.audioEnabled, speakText])

  const updatePreference = <K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const togglePreference = (key: keyof AccessibilityPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof AccessibilityPreferences]
    } as AccessibilityPreferences))
  }

  const increaseFontSize = () => {
    setPreferences(prev => ({
      ...prev,
      fontSize: Math.min(5, prev.fontSize + 1)
    }))
  }

  const decreaseFontSize = () => {
    setPreferences(prev => ({
      ...prev,
      fontSize: Math.max(0, prev.fontSize - 1)
    }))
  }

  const resetAll = () => {
    setPreferences(defaultPreferences)
    document.documentElement.className = ''
    document.documentElement.style.fontSize = ''
    localStorage.removeItem('accessibility-preferences-v2')
  }

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? '' : section)
  }

  // Only allow one contrast mode at a time
  const setContrastMode = (mode: 'bright' | 'dark' | 'inverted' | 'none') => {
    setPreferences(prev => ({
      ...prev,
      brightContrast: mode === 'bright',
      darkContrast: mode === 'dark',
      invertedColors: mode === 'inverted',
    }))
  }

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[100] bg-blue-700 hover:bg-blue-800 text-white p-3 md:p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="פתח תפריט נגישות"
        title="נגישות"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="md:w-7 md:h-7">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9H15V22H13V16H11V22H9V9H3V7H21V9Z"/>
        </svg>
      </button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div
          className="fixed bottom-20 left-4 md:bottom-24 md:left-6 z-[100] bg-white rounded-2xl md:rounded-3xl shadow-2xl w-[calc(100vw-2rem)] sm:w-[400px] md:w-[500px] max-h-[calc(100vh-120px)] md:max-h-[calc(100vh-150px)] overflow-hidden flex flex-col"
          dir="rtl"
          role="dialog"
          aria-label="פאנל נגישות"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-800 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="bg-white bg-opacity-20 p-1.5 md:p-2 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="md:w-6 md:h-6">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <path d="M2 9h20"/>
                  <path d="M7 21h10"/>
                  <path d="M12 17v4"/>
                </svg>
              </div>
              <button
                onClick={() => updatePreference('language', preferences.language === 'he' ? 'en' : 'he')}
                className="text-white font-bold text-base md:text-lg hover:bg-white hover:bg-opacity-10 px-2 md:px-3 py-1 rounded transition-colors"
              >
                עברית
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                aria-label="סגור"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>

              <button
                onClick={() => setShowInfo(!showInfo)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                aria-label="מידע"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </button>

              <button
                onClick={() => updatePreference('audioEnabled', !preferences.audioEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  preferences.audioEnabled
                    ? 'text-white hover:bg-white hover:bg-opacity-20'
                    : 'text-red-300 bg-white bg-opacity-10'
                }`}
                aria-label={preferences.audioEnabled ? 'השתק קול' : 'הפעל קול'}
              >
                {preferences.audioEnabled ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Info Tooltip */}
          {showInfo && (
            <div className="bg-blue-50 border-b border-blue-200 px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm text-blue-900">
              השתמש בכלי הנגישות כדי להתאים את האתר לצרכים שלך. כל ההגדרות נשמרות אוטומטית.
            </div>
          )}

          {/* Accessibility Statement Button */}
          <div className="px-4 md:px-6 py-2 md:py-3 border-b border-gray-200">
            <Link
              to="/accessibility-statement"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-blue-700 hover:bg-blue-800 text-white text-center py-2.5 md:py-3 rounded-lg md:rounded-xl text-sm md:text-base font-medium transition-colors"
            >
              נגישות
            </Link>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto flex-1 px-4 md:px-6 py-3 md:py-4 space-y-3 md:space-y-4">
            {/* Intelligence Assistance Section */}
            <CollapsibleSection
              title="סיוע בינה מלאכותית"
              isOpen={activeSection === 'intelligence'}
              onToggle={() => toggleSection('intelligence')}
            >
              <div className="space-y-4">
                {/* Font Size Controls */}
                <div className="flex items-center justify-between bg-gray-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                  <button
                    onClick={decreaseFontSize}
                    className="w-10 h-10 md:w-12 md:h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-lg flex items-center justify-center font-bold text-xl md:text-2xl transition-colors"
                    aria-label="הקטן טקסט"
                  >
                    −
                  </button>

                  <div className="text-center">
                    <div className="font-medium text-sm md:text-base text-gray-800">פרופיל נגישות</div>
                    <div className="text-xs md:text-sm text-gray-600">רמה {preferences.fontSize}</div>
                  </div>

                  <button
                    onClick={increaseFontSize}
                    className="w-10 h-10 md:w-12 md:h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-lg flex items-center justify-center font-bold text-xl md:text-2xl transition-colors"
                    aria-label="הגדל טקסט"
                  >
                    +
                  </button>
                </div>

                {/* Intelligence Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                  <FeatureCard
                    icon={<GridIcon />}
                    title="ניווט אוזרים"
                    active={preferences.gridNavigation}
                    onClick={() => togglePreference('gridNavigation')}
                  />
                  <FeatureCard
                    icon={<KeyboardIcon />}
                    title="ניווט מקלדת"
                    active={preferences.keyboardNavigation}
                    onClick={() => togglePreference('keyboardNavigation')}
                  />
                  <FeatureCard
                    icon={<EarIcon />}
                    title="התאמה לקורא-מסך"
                    active={preferences.screenReaderMode}
                    onClick={() => togglePreference('screenReaderMode')}
                  />
                  <FeatureCard
                    icon={<HandIcon />}
                    title="פקודת קוליות"
                    active={preferences.voiceCommands}
                    onClick={() => togglePreference('voiceCommands')}
                  />
                  <FeatureCard
                    icon={<SpeakerIcon />}
                    title="הקראת טקסט"
                    active={preferences.textToSpeech}
                    onClick={() => togglePreference('textToSpeech')}
                  />
                  <FeatureCard
                    icon={<TextSpacingIcon />}
                    title="התאמת האתר לניווט באמצעות מקשים נמרים"
                    disabled={true}
                    active={false}
                    onClick={() => {}}
                  />
                </div>

                {/* TTS Test Button */}
                {preferences.textToSpeech && preferences.audioEnabled && (
                  <button
                    onClick={() => speakText('שלום, זהו בדיקת קריאה בקול')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    בדיקת קריאה בקול
                  </button>
                )}
              </div>
            </CollapsibleSection>

            {/* Visibility Adjustments Section */}
            <CollapsibleSection
              title="התאמות נגישודיות"
              isOpen={activeSection === 'visibility'}
              onToggle={() => toggleSection('visibility')}
            >
              <div className="space-y-4">
                {/* Contrast Modes Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                  <FeatureCard
                    icon={<SunIcon />}
                    title="נגישודיות בהירה"
                    active={preferences.brightContrast}
                    onClick={() => setContrastMode(preferences.brightContrast ? 'none' : 'bright')}
                  />
                  <FeatureCard
                    icon={<MoonIcon />}
                    title="נגישודיות כהה"
                    active={preferences.darkContrast}
                    onClick={() => setContrastMode(preferences.darkContrast ? 'none' : 'dark')}
                  />
                  <FeatureCard
                    icon={<MonochromeIcon />}
                    title="מונוכרום"
                    active={preferences.monochrome}
                    onClick={() => togglePreference('monochrome')}
                  />
                  <FeatureCard
                    icon={<ContrastIcon />}
                    title="מוד נגישודיות"
                    active={preferences.invertedColors}
                    onClick={() => setContrastMode(preferences.invertedColors ? 'none' : 'inverted')}
                  />
                  <FeatureCard
                    icon={<DropHighIcon />}
                    title="רוויה גבוהה"
                    active={preferences.highSaturation}
                    onClick={() => {
                      updatePreference('highSaturation', !preferences.highSaturation)
                      if (!preferences.highSaturation) updatePreference('lowSaturation', false)
                    }}
                  />
                  <FeatureCard
                    icon={<DropLowIcon />}
                    title="רוויה נמוכה"
                    active={preferences.lowSaturation}
                    onClick={() => {
                      updatePreference('lowSaturation', !preferences.lowSaturation)
                      if (!preferences.lowSaturation) updatePreference('highSaturation', false)
                    }}
                  />
                </div>

                {/* Color Customization */}
                <div className="bg-gray-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                  <h4 className="font-medium text-sm md:text-base mb-2 md:mb-3 flex items-center gap-2 text-gray-800">
                    <DropIcon />
                    התאמת צבעים - שינוי צבעי האתר
                  </h4>
                  <div className="flex gap-1.5 md:gap-2 mb-2 md:mb-3">
                    <button
                      onClick={() => updatePreference('colorTarget', 'backgrounds')}
                      className={`px-2 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                        preferences.colorTarget === 'backgrounds'
                          ? 'bg-blue-900 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      רקעים
                    </button>
                    <button
                      onClick={() => updatePreference('colorTarget', 'headings')}
                      className={`px-2 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                        preferences.colorTarget === 'headings'
                          ? 'bg-blue-900 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      כותרות
                    </button>
                    <button
                      onClick={() => updatePreference('colorTarget', 'contents')}
                      className={`px-2 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                        preferences.colorTarget === 'contents'
                          ? 'bg-blue-900 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      תכנים
                    </button>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={preferences.customColorHue}
                    onChange={(e) => {
                      updatePreference('customColorHue', parseInt(e.target.value))
                      updatePreference('colorCustomizationActive', true)
                    }}
                    className="w-full h-8 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: 'linear-gradient(to right, #000, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)',
                    }}
                  />
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => {
                        updatePreference('colorCustomizationActive', false)
                        updatePreference('customColorHue', 200)
                      }}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <DropIcon />
                      איפוס צבעים
                    </button>
                  </div>
                </div>
              </div>
            </CollapsibleSection>

            {/* Content Adjustments Section */}
            <CollapsibleSection
              title="התאמות תוכן"
              isOpen={activeSection === 'content'}
              onToggle={() => toggleSection('content')}
            >
              <div className="space-y-4">
                {/* Font Adjustments */}
                <div className="bg-gray-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                  <h4 className="font-medium text-sm md:text-base mb-2 md:mb-3 flex items-center gap-2 text-gray-800">
                    <BellIcon />
                    התאמות גופן - הגדלת וקטנת הגופן
                  </h4>
                  <div className="flex gap-1.5 md:gap-2 mb-2 md:mb-3 flex-wrap">
                    <button
                      onClick={() => updatePreference('fontAdjustmentType', 'size')}
                      className={`px-2 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                        preferences.fontAdjustmentType === 'size'
                          ? 'bg-blue-900 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      גודל גופן
                    </button>
                    <button
                      onClick={() => updatePreference('fontAdjustmentType', 'wordSpacing')}
                      className={`px-2 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                        preferences.fontAdjustmentType === 'wordSpacing'
                          ? 'bg-blue-900 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      ריווח בין מילים
                    </button>
                    <button
                      onClick={() => updatePreference('fontAdjustmentType', 'letterSpacing')}
                      className={`px-2 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                        preferences.fontAdjustmentType === 'letterSpacing'
                          ? 'bg-blue-900 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      ריווח אותיות
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        const key = preferences.fontAdjustmentType === 'size' ? 'fontSizeLevel' :
                                    preferences.fontAdjustmentType === 'wordSpacing' ? 'wordSpacingLevel' :
                                    'letterSpacingLevel'
                        updatePreference(key, Math.max(0, preferences[key] - 1))
                      }}
                      className="w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-full flex items-center justify-center font-bold transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={
                        preferences.fontAdjustmentType === 'size' ? preferences.fontSizeLevel :
                        preferences.fontAdjustmentType === 'wordSpacing' ? preferences.wordSpacingLevel :
                        preferences.letterSpacingLevel
                      }
                      onChange={(e) => {
                        const key = preferences.fontAdjustmentType === 'size' ? 'fontSizeLevel' :
                                    preferences.fontAdjustmentType === 'wordSpacing' ? 'wordSpacingLevel' :
                                    'letterSpacingLevel'
                        updatePreference(key, parseInt(e.target.value))
                      }}
                      className="flex-1"
                    />
                    <button
                      onClick={() => {
                        const key = preferences.fontAdjustmentType === 'size' ? 'fontSizeLevel' :
                                    preferences.fontAdjustmentType === 'wordSpacing' ? 'wordSpacingLevel' :
                                    'letterSpacingLevel'
                        updatePreference(key, Math.min(5, preferences[key] + 1))
                      }}
                      className="w-10 h-10 bg-blue-700 hover:bg-blue-800 text-white rounded-full flex items-center justify-center font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Cursor Controls */}
                <div className="bg-gray-50 p-3 md:p-4 rounded-lg md:rounded-xl">
                  <h4 className="font-medium text-sm md:text-base mb-2 md:mb-3 flex items-center gap-2 text-gray-800">
                    <CursorIcon />
                    סמן העכבר - הגדלת סמן העכבר ושינוי צבעו
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updatePreference('cursorColor', 'white')}
                      className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                        preferences.cursorColor === 'white'
                          ? 'bg-blue-900 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      לבן
                    </button>
                    <button
                      onClick={() => updatePreference('cursorColor', 'black')}
                      className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${
                        preferences.cursorColor === 'black'
                          ? 'bg-blue-900 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      שחור
                    </button>
                  </div>
                </div>

                {/* Content Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                  <FeatureCard
                    icon={<SearchIcon />}
                    title="הגדלת תצוגה"
                    active={preferences.enlargeDisplay}
                    onClick={() => togglePreference('enlargeDisplay')}
                  />
                  <FeatureCard
                    icon={<SubtitlesIcon />}
                    title="תוסף לכותבים (ביטא)"
                    active={preferences.subtitles}
                    onClick={() => togglePreference('subtitles')}
                  />
                  <FeatureCard
                    icon={<StopFlashIcon />}
                    title="חסימת הבהובים"
                    active={preferences.blockFlashing}
                    onClick={() => togglePreference('blockFlashing')}
                  />
                  <FeatureCard
                    icon={<LinkIcon />}
                    title="הדגשת קישורים"
                    active={preferences.highlightLinks}
                    onClick={() => togglePreference('highlightLinks')}
                  />
                  <FeatureCard
                    icon={<ImageIcon />}
                    title="תיאור לתמונות"
                    active={preferences.imageDescriptions}
                    onClick={() => togglePreference('imageDescriptions')}
                  />
                  <FeatureCard
                    icon={<ReadableIcon />}
                    title="גופן קריא"
                    active={preferences.readableFont}
                    onClick={() => togglePreference('readableFont')}
                  />
                  <FeatureCard
                    icon={<MagnifierTextIcon />}
                    title="הגדלת תכנים"
                    active={preferences.enlargeContent}
                    onClick={() => togglePreference('enlargeContent')}
                  />
                  <FeatureCard
                    icon={<ReadingGuideIcon />}
                    title="תצוגה קריאה"
                    active={preferences.readingView}
                    onClick={() => togglePreference('readingView')}
                  />
                  <FeatureCard
                    icon={<HighlightTitlesIcon />}
                    title="הדגשת כותרות"
                    active={preferences.highlightHeadings}
                    onClick={() => togglePreference('highlightHeadings')}
                  />
                  <FeatureCard
                    icon={<FocusIcon />}
                    title="מיקוד קריאה"
                    active={preferences.focusReading}
                    onClick={() => togglePreference('focusReading')}
                  />
                  <FeatureCard
                    icon={<MuteIcon />}
                    title="השתק מדיה"
                    active={preferences.muteMedia}
                    onClick={() => togglePreference('muteMedia')}
                  />
                  <FeatureCard
                    icon={<MapIcon />}
                    title="מבנה העמוד"
                    active={preferences.pageStructure}
                    onClick={() => togglePreference('pageStructure')}
                  />
                  <FeatureCard
                    icon={<KeyboardVirtualIcon />}
                    title="מקלדת וירטואלית"
                    active={preferences.virtualKeyboard}
                    onClick={() => togglePreference('virtualKeyboard')}
                  />
                  <FeatureCard
                    icon={<DictionaryIcon />}
                    title="מילון"
                    active={preferences.dictionary}
                    onClick={() => togglePreference('dictionary')}
                  />
                  <FeatureCard
                    icon={<GuideIcon />}
                    title="מדריך קריאה"
                    active={preferences.readingGuide}
                    onClick={() => togglePreference('readingGuide')}
                  />
                </div>
              </div>
            </CollapsibleSection>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-4 md:px-6 py-3 md:py-4 bg-gray-50">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-3">
              <button
                onClick={resetAll}
                className="px-3 md:px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:bg-gray-100 transition-colors"
              >
                ביטול נגישות
              </button>
              <Link
                to="/accessibility-statement"
                onClick={() => setIsOpen(false)}
                className="px-3 md:px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:bg-gray-100 text-center transition-colors"
              >
                הצהרת נגישות
              </Link>
              <button
                onClick={() => alert('תודה על המשוב! ניצור איתך קשר בקרוב.')}
                className="px-3 md:px-4 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:bg-gray-100 transition-colors"
              >
                שלח משוב
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Components
interface CollapsibleSectionProps {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: ReactNode
}

const CollapsibleSection = ({ title, isOpen, onToggle, children }: CollapsibleSectionProps) => (
  <div className="border border-gray-200 rounded-lg md:rounded-xl overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white hover:bg-gray-50 flex items-center justify-between font-medium text-sm md:text-base text-blue-900 transition-colors"
    >
      <span>{title}</span>
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`md:w-5 md:h-5 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
      >
        <path d="M7 10l5 5 5-5z"/>
      </svg>
    </button>
    {isOpen && (
      <div className="px-3 md:px-4 py-3 md:py-4 bg-white border-t border-gray-200">
        {children}
      </div>
    )}
  </div>
)

interface FeatureCardProps {
  icon: ReactNode
  title: string
  active: boolean
  onClick: () => void
  disabled?: boolean
}

const FeatureCard = ({ icon, title, active, onClick, disabled = false }: FeatureCardProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-3 md:p-4 rounded-lg md:rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 md:gap-2 text-center min-h-[80px] md:min-h-[100px] transition-all ${
      active
        ? 'bg-gray-700 text-white border-gray-700'
        : disabled
        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60'
        : 'bg-white text-blue-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
    }`}
  >
    <div className="text-xl md:text-2xl">{icon}</div>
    <span className="text-[10px] md:text-xs font-medium leading-tight">{title}</span>
  </button>
)

// Icons
const GridIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>
const KeyboardIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/></svg>
const EarIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17 20c-.29 0-.56-.06-.76-.15-.71-.37-1.21-.88-1.71-2.38-.51-1.56-1.47-2.29-2.39-3-.79-.61-1.61-1.24-2.32-2.53C9.29 10.98 9 9.93 9 9c0-2.8 2.2-5 5-5s5 2.2 5 5h2c0-3.93-3.07-7-7-7S7 5.07 7 9c0 1.26.38 2.65 1.07 3.9.91 1.65 1.98 2.48 2.85 3.15.81.62 1.39 1.07 1.71 2.05.6 1.82 1.37 2.84 2.73 3.55.51.23 1.07.35 1.64.35 2.21 0 4-1.79 4-4h-2c0 1.1-.9 2-2 2z"/></svg>
const HandIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"/></svg>
const SpeakerIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
const TextSpacingIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/></svg>
const SunIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>
const MoonIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/></svg>
const MonochromeIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
const ContrastIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86z"/></svg>
const DropHighIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/></svg>
const DropLowIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z"/></svg>
const DropIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/></svg>
const BellIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4v3h5.5v12h3V7H19V4z"/></svg>
const CursorIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13.64 21.97c-.21 0-.42-.05-.61-.15-.4-.21-.68-.62-.68-1.06V14.5h-6.5c-.44 0-.85-.28-1.06-.68-.21-.4-.15-.88.15-1.24l10-12c.35-.42.96-.52 1.44-.25.47.28.68.83.53 1.33L15.5 9.5h6.5c.44 0 .85.28 1.06.68.21.4.15.88-.15 1.24l-10 12c-.24.29-.6.45-.99.45z"/></svg>
const SearchIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
const SubtitlesIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 12h4v2H4v-2zm10 6H4v-2h10v2zm6 0h-4v-2h4v2zm0-4H10v-2h10v2z"/></svg>
const StopFlashIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3.27 3L2 4.27l5 5V13h3v9l3.58-6.14L17.73 20 19 18.73 3.27 3zM17 10h-4l4-8H7v2.18l8.46 8.46L17 10z"/></svg>
const LinkIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>
const ImageIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
const ReadableIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4v3h5.5v12h3V7H19V4z"/></svg>
const MagnifierTextIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
const ReadingGuideIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>
const HighlightTitlesIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5 4v3h5.5v12h3V7H19V4z"/></svg>
const FocusIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/></svg>
const MuteIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
const MapIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/></svg>
const KeyboardVirtualIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/></svg>
const DictionaryIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z"/></svg>
const GuideIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>

export default AccessibilityWidget
