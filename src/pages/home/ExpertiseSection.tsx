import { Card, OptimizedImage } from '../../components'

const ExpertiseSection = () => {
  return (
    <section id="expertise" aria-labelledby="expertise-heading" className="bg-accent-sand py-8 sm:py-12 lg:py-16" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-8 xl:gap-12">
          <div className="flex justify-center">
            <OptimizedImage
              src="/ts.png"
              alt="עבודות אינסטלציה מקצועיות"
              className="h-auto w-full max-w-sm rounded-2xl shadow-2xl sm:max-w-md lg:max-w-lg xl:max-w-full"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 576px"
            />
          </div>
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 id="expertise-heading" className="mb-6 text-2xl font-bold leading-tight text-blue-900 sm:text-3xl sm:mb-8 lg:text-4xl lg:mb-10 xl:text-5xl">
              מומחיות ואמינות
            </h2>
            <p className="mb-8 text-base font-normal leading-relaxed text-blue-700 sm:text-lg sm:leading-relaxed lg:mb-10 lg:text-xl lg:leading-relaxed xl:text-2xl xl:leading-relaxed">
              עם ניסיון רב שנים בתחום האינסטלציה, אני מתמחה בפתרונות מתקדמים ויעילים לבעיות אינסטלציה. כל עבודה מבוצעת ברמה הגבוהה ביותר עם התחייבות למצוינות ושביעות רצון הלקוח.
            </p>
            <Card variant="glass" padding="lg" rounded="3xl">
              <ul className="space-y-4 text-base font-normal leading-relaxed text-blue-900 lg:text-lg lg:leading-relaxed">
                <li className="flex items-start">
                  <span className="ml-3 text-xl text-blue-700" aria-hidden="true" role="presentation">✓</span>
                  <span>ציוד מתקדם וטכנולוגיה חדישה</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-3 text-xl text-blue-700" aria-hidden="true" role="presentation">✓</span>
                  <span>אחריות מלאה על כל העבודות</span>
                </li>
                <li className="flex items-start">
                  <span className="ml-3 text-xl text-blue-700" aria-hidden="true" role="presentation">✓</span>
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
