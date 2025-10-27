import { useEffect, useState } from 'react'
import { Card } from '../../components'

const ExpertiseSection = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return (
    <section id="expertise" aria-labelledby="expertise-heading" className="bg-accent-sand py-8 sm:py-12 lg:py-16" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-8 xl:gap-12">
          <div className="flex justify-center">
            <video
              src="/ts-video.mp4"
              className="h-auto w-full max-w-sm rounded-2xl shadow-2xl sm:max-w-md lg:max-w-lg xl:max-w-full"
              autoPlay={!prefersReducedMotion}
              muted
              loop={!prefersReducedMotion}
              playsInline
              controls={prefersReducedMotion}
              preload="metadata"
              aria-label="סרטון הדגמה של עבודות אינסטלציה מקצועיות"
              title="סרטון הדגמה של עבודות אינסטלציה"
            />
          </div>
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 id="expertise-heading" className="mb-6 text-2xl font-black leading-tight text-neutral-700 sm:text-3xl sm:mb-8 lg:text-4xl lg:mb-10 xl:text-5xl">
              מומחיות ואמינות
            </h2>
            <p className="mb-8 text-base font-medium leading-7 text-neutral-600 sm:text-lg sm:leading-8 lg:mb-10 lg:text-xl lg:leading-9 xl:text-2xl">
              עם ניסיון רב שנים בתחום האינסטלציה, אני מתמחה בפתרונות מתקדמים ויעילים לבעיות אינסטלציה. כל עבודה מבוצעת ברמה הגבוהה ביותר עם התחייבות למצוינות ושביעות רצון הלקוח.
            </p>
            <Card variant="glass" padding="lg" rounded="3xl">
              <ul className="space-y-4 text-base font-medium text-neutral-700 lg:text-lg">
                <li className="flex items-start">
                  <span className="ml-3 text-xl text-neutral-600" aria-hidden="true" role="presentation">✓</span>
                  <span>ציוד מתקדם וטכנולוגיה חדישה</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-3 text-xl text-neutral-600" aria-hidden="true" role="presentation">✓</span>
                  <span>אחריות מלאה על כל העבודות</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-3 text-xl text-neutral-600" aria-hidden="true" role="presentation">✓</span>
                  <span>מחירים הוגנים ושקיפות מלאה</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExpertiseSection
