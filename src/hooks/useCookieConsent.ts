import { useState, useEffect } from 'react'

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const COOKIE_CONSENT_KEY = 'cookie-consent'

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookiePreferences | null>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (savedConsent) {
      setConsent(JSON.parse(savedConsent))
    } else {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = (preferences: CookiePreferences) => {
    setConsent(preferences)
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences))
    setShowBanner(false)
    
    // הפעלת עוגיות בהתאם להעדפות
    if (preferences.analytics) {
      // הפעלת Google Analytics
      console.log('Analytics cookies enabled')
      // כאן תוכל להוסיף את הקוד של Google Analytics
    }
    if (preferences.marketing) {
      // הפעלת עוגיות שיווק
      console.log('Marketing cookies enabled')
      // כאן תוכל להוסיף את הקוד של פיקסלי פרסום או שירותי שיווק אחרים
    }
    if (preferences.functional) {
      // הפעלת עוגיות פונקציונליות
      console.log('Functional cookies enabled')
      // כאן תוכל להוסיף עוגיות פונקציונליות
    }
  }

  const rejectCookies = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    setConsent(necessaryOnly)
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(necessaryOnly))
    setShowBanner(false)
  }

  const updateConsent = () => {
    setShowBanner(true)
  }

  const clearConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY)
    setConsent(null)
    setShowBanner(true)
  }

  return {
    consent,
    showBanner,
    acceptCookies,
    rejectCookies,
    updateConsent,
    clearConsent,
  }
}



