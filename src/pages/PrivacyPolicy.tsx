import { Card } from '../components'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-accent-light py-16" dir="rtl">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card variant="glass" padding="lg" rounded="3xl">
            <div className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-bold text-neutral-800 mb-8">
                מדיניות פרטיות
              </h1>
              
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                    מבוא
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    אנו מכבדים את פרטיותכם ומחויבים להגן על המידע האישי שלכם. 
                    מדיניות פרטיות זו מסבירה איך אנו אוספים, משתמשים ומגנים על המידע שלכם 
                    בעת השימוש באתר שלנו.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                    איזה מידע אנו אוספים
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-medium text-neutral-700 mb-2">
                        מידע אישי
                      </h3>
                      <ul className="list-disc list-inside text-neutral-600 space-y-1">
                        <li>שם מלא</li>
                        <li>מספר טלפון</li>
                        <li>כתובת דוא"ל</li>
                        <li>פרטי הפרויקט המבוקש</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-medium text-neutral-700 mb-2">
                        מידע טכני
                      </h3>
                      <ul className="list-disc list-inside text-neutral-600 space-y-1">
                        <li>כתובת IP</li>
                        <li>סוג הדפדפן ומערכת ההפעלה</li>
                        <li>זמן הגישה לאתר</li>
                        <li>דפים שנצפו באתר</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                    מטרת איסוף המידע
                  </h2>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>יצירת קשר עם לקוחות פוטנציאליים</li>
                    <li>מתן שירותי ייעוץ מקצועי</li>
                    <li>שיפור חוויית המשתמש באתר</li>
                    <li>ניתוח התנהגות משתמשים לשיפור השירות</li>
                    <li>מתן תמיכה טכנית</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                    שיתוף מידע עם צדדים שלישיים
                  </h2>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    אנו לא מוכרים, משכירים או חושפים את המידע האישי שלכם לצדדים שלישיים, 
                    למעט במקרים הבאים:
                  </p>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>כאשר נדרש על פי חוק</li>
                    <li>עם ספקי שירותים מהימנים שעובדים בשמנו (כגון שירותי אחסון)</li>
                    <li>כאשר אתם נותנים הסכמה מפורשת לכך</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                    אבטחת המידע
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    אנו נוקטים באמצעי אבטחה מתאימים כדי להגן על המידע האישי שלכם מפני 
                    גישה לא מורשית, שינוי, חשיפה או השמדה. אמצעי האבטחה כוללים:
                  </p>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2 mt-4">
                    <li>הצפנת המידע בעת העברה</li>
                    <li>אחסון מאובטח של המידע</li>
                    <li>הגבלת גישה למידע רק למי שצריך</li>
                    <li>עדכון שוטף של מערכות האבטחה</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                    זכויותיכם
                  </h2>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    בהתאם לחוק הגנת הפרטיות, יש לכם הזכות:
                  </p>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>לעיין במידע האישי שלנו עליכם</li>
                    <li>לתקן מידע שגוי או לא מעודכן</li>
                    <li>לבקש מחיקת המידע האישי</li>
                    <li>להתנגד לעיבוד המידע</li>
                    <li>לבקש העברת המידע לגורם אחר</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                    עוגיות (Cookies)
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    אנו משתמשים בעוגיות כדי לשפר את חוויית הגלישה שלכם. 
                    למידע מפורט על השימוש בעוגיות, עיינו ב{' '}
                    <a href="/cookie-policy" className="text-primary-600 hover:underline">
                      מדיניות העוגיות
                    </a>.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                    עדכון המדיניות
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    אנו עשויים לעדכן מדיניות פרטיות זו מעת לעת. כל שינוי יפורסם בדף זה 
                    עם תאריך העדכון. מומלץ לבדוק את המדיניות מעת לעת.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                    יצירת קשר
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    אם יש לכם שאלות בנוגע למדיניות פרטיות זו או ברצונכם לממש את זכויותיכם, 
                    אנא צרו קשר איתנו:
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-neutral-600">
                      <strong>דוא"ל:</strong> Poppipe.service@gmail.com
                    </p>
                    <p className="text-neutral-600">
                      <strong>טלפון:</strong> 050-4020170
                    </p>
                  </div>
                </section>

                <div className="pt-8 border-t border-accent-border">
                  <p className="text-sm text-neutral-500">
                    עדכון אחרון: {new Date().toLocaleDateString('he-IL')}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
