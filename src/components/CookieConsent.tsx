import { useState, useEffect, useRef } from 'react'
import Button from './Button'
import Checkbox from './Checkbox'

interface CookieConsentProps {
  onAccept: (preferences: CookiePreferences) => void
  onReject: () => void
}

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

const CookieConsent = ({ onAccept, onReject }: CookieConsentProps) => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // תמיד חיוניות
    analytics: false,
    marketing: false,
    functional: false,
  })

  const [showDetails, setShowDetails] = useState(false)
  const firstButtonRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Focus management
  useEffect(() => {
    if (firstButtonRef.current) {
      firstButtonRef.current.focus()
    }
  }, [])

  // Trap focus within modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onReject()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onReject])

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return // לא ניתן לשנות
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const handleAcceptAll = () => {
    onAccept({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    })
  }

  const handleAcceptSelected = () => {
    onAccept(preferences)
  }

  const handleRejectAll = () => {
    onReject()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div className="fixed inset-0 bg-black/50" />
      <div 
        ref={modalRef}
        className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <div className="mb-6">
          <h2 id="cookie-consent-title" className="text-2xl font-bold text-neutral-800 mb-4">
            עוגיות באתר שלנו
          </h2>
          <p id="cookie-consent-description" className="text-neutral-600 leading-relaxed">
            אנו משתמשים בעוגיות כדי לשפר את חוויית הגלישה שלכם, לנתח את התנועה באתר ולספק תוכן מותאם אישית. 
            אתם יכולים לבחור אילו עוגיות לאפשר.
          </p>
        </div>

        {!showDetails ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                ref={firstButtonRef}
                onClick={handleAcceptAll}
                variant="primary"
                size="lg"
                className="flex-1"
                aria-label="קבל את כל סוגי העוגיות"
              >
                קבל הכל
              </Button>
              <Button
                onClick={handleRejectAll}
                variant="secondary"
                size="lg"
                className="flex-1"
                aria-label="דחה את כל העוגיות שאינן חיוניות"
              >
                דחה הכל
              </Button>
              <Button
                onClick={() => setShowDetails(true)}
                variant="outline"
                size="lg"
                className="flex-1"
                aria-label="פתח אפשרויות התאמה אישית של עוגיות"
              >
                התאמה אישית
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <Checkbox
                checked={preferences.necessary}
                disabled
                label="עוגיות חיוניות"
                helperText="נדרשות לפעולת האתר הבסיסית. לא ניתן לבטל אותן."
              />
              
              <Checkbox
                checked={preferences.analytics}
                onChange={() => handlePreferenceChange('analytics')}
                label="עוגיות אנליטיקה"
                helperText="עוזרות לנו להבין איך משתמשים באתר (Google Analytics)"
              />
              
              <Checkbox
                checked={preferences.marketing}
                onChange={() => handlePreferenceChange('marketing')}
                label="עוגיות שיווק"
                helperText="משמשות להצגת פרסומות מותאמות אישית"
              />
              
              <Checkbox
                checked={preferences.functional}
                onChange={() => handlePreferenceChange('functional')}
                label="עוגיות פונקציונליות"
                helperText="משפרות את הפונקציונליות והאישיות של האתר"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAcceptSelected}
                variant="primary"
                size="lg"
                className="flex-1"
              >
                שמור העדפות
              </Button>
              <Button
                onClick={() => setShowDetails(false)}
                variant="outline"
                size="lg"
                className="flex-1"
              >
                חזור
              </Button>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-accent-border">
          <p className="text-sm text-neutral-500 text-center">
            למידע נוסף, עיינו ב{' '}
            <a href="/privacy-policy" className="text-primary-600 hover:underline">
              מדיניות הפרטיות
            </a>
            {' '}וב{' '}
            <a href="/cookie-policy" className="text-primary-600 hover:underline">
              מדיניות העוגיות
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
