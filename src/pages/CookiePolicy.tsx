import { Card } from '../components'

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-accent-light py-16" dir="rtl">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card variant="glass" padding="lg" rounded="3xl">
            <div className="prose prose-lg max-w-none">
              <h1 className="text-4xl font-bold text-neutral-800 mb-8">
                מדיניות עוגיות
              </h1>
              
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                    מה הן עוגיות?
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    עוגיות הן קבצים קטנים הנשמרים במכשיר שלכם כאשר אתם מבקרים באתר. 
                    הן עוזרות לאתר לזכור מידע על הביקור שלכם, כגון העדפות הגלישה שלכם, 
                    מה שמאפשר לספק לכם חוויית גלישה מותאמת אישית.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                    איך אנו משתמשים בעוגיות
                  </h2>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    אנו משתמשים בעוגיות למטרות הבאות:
                  </p>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>להבטיח שהאתר פועל כראוי</li>
                    <li>לשפר את ביצועי האתר</li>
                    <li>לנתח איך משתמשים באתר</li>
                    <li>לספק תוכן מותאם אישית</li>
                    <li>לשפר את חוויית המשתמש</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                    סוגי העוגיות שאנו משתמשים
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="border border-accent-border rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-neutral-700 mb-3">
                        עוגיות חיוניות
                      </h3>
                      <p className="text-neutral-600 leading-relaxed mb-3">
                        עוגיות אלה נדרשות לפעולת האתר הבסיסית ולא ניתן לבטל אותן. 
                        הן כוללות עוגיות לניהול הפעלת האתר, אבטחה ופונקציונליות בסיסית.
                      </p>
                      <div className="bg-accent-cream p-4 rounded-lg">
                        <p className="text-sm text-neutral-600">
                          <strong>דוגמאות:</strong> עוגיות הפעלה, עוגיות אבטחה, עוגיות העדפות שפה
                        </p>
                      </div>
                    </div>

                    <div className="border border-accent-border rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-neutral-700 mb-3">
                        עוגיות אנליטיקה
                      </h3>
                      <p className="text-neutral-600 leading-relaxed mb-3">
                        עוגיות אלה עוזרות לנו להבין איך משתמשים באתר, איזה דפים פופולריים 
                        ואיך משתמשים מנווטים באתר. המידע עוזר לנו לשפר את האתר.
                      </p>
                      <div className="bg-accent-cream p-4 rounded-lg">
                        <p className="text-sm text-neutral-600">
                          <strong>דוגמאות:</strong> Google Analytics, עוגיות מעקב התנהגות
                        </p>
                      </div>
                    </div>

                    <div className="border border-accent-border rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-neutral-700 mb-3">
                        עוגיות שיווק
                      </h3>
                      <p className="text-neutral-600 leading-relaxed mb-3">
                        עוגיות אלה משמשות להצגת פרסומות מותאמות אישית ולמדידת יעילות 
                        קמפיינים שיווקיים. הן עוזרות לנו להבין איזה פרסומות רלוונטיות לכם.
                      </p>
                      <div className="bg-accent-cream p-4 rounded-lg">
                        <p className="text-sm text-neutral-600">
                          <strong>דוגמאות:</strong> פיקסלי פרסום, עוגיות רשתות חברתיות
                        </p>
                      </div>
                    </div>

                    <div className="border border-accent-border rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-neutral-700 mb-3">
                        עוגיות פונקציונליות
                      </h3>
                      <p className="text-neutral-600 leading-relaxed mb-3">
                        עוגיות אלה משפרות את הפונקציונליות והאישיות של האתר. 
                        הן מאפשרות לזכור את ההעדפות שלכם ולספק תכונות מותאמות אישית.
                      </p>
                      <div className="bg-accent-cream p-4 rounded-lg">
                        <p className="text-sm text-neutral-600">
                          <strong>דוגמאות:</strong> עוגיות העדפות, עוגיות תצוגה
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                    ניהול העדפות העוגיות
                  </h2>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    אתם יכולים לנהל את העדפות העוגיות שלכם בכל עת באמצעות:
                  </p>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2">
                    <li>הבאנר המופיע בכניסה הראשונה לאתר</li>
                    <li>הגדרות הדפדפן שלכם</li>
                    <li>קישור "הגדרות עוגיות" בפוטר האתר</li>
                  </ul>
                  
                  <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                    <p className="text-primary-800 font-medium">
                      חשוב לדעת: ביטול עוגיות מסוימות עלול להשפיע על פונקציונליות האתר.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                    עוגיות של צדדים שלישיים
                  </h2>
                  <p className="text-neutral-600 leading-relaxed mb-4">
                    אנו משתמשים בשירותים של צדדים שלישיים שעשויים להציב עוגיות במכשיר שלכם:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary-500 pl-4">
                      <h3 className="text-lg font-semibold text-neutral-700 mb-2">
                        Google Analytics
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        עוזר לנו להבין איך משתמשים באתר. למידע נוסף: 
                        <a href="https://policies.google.com/privacy" className="text-primary-600 hover:underline ml-1">
                          מדיניות הפרטיות של Google
                        </a>
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-primary-500 pl-4">
                      <h3 className="text-lg font-semibold text-neutral-700 mb-2">
                        פיקסלי פרסום
                      </h3>
                      <p className="text-neutral-600 text-sm">
                        עוזר לנו למדוד יעילות קמפיינים שיווקיים. למידע נוסף: 
                        <a href="https://www.facebook.com/privacy/explanation" className="text-primary-600 hover:underline ml-1">
                          מדיניות הפרטיות של Meta
                        </a>
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                    משך שמירת העוגיות
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    משך הזמן שבו העוגיות נשמרות משתנה בהתאם לסוג העוגיה:
                  </p>
                  <ul className="list-disc list-inside text-neutral-600 space-y-2 mt-4">
                    <li><strong>עוגיות הפעלה:</strong> עד 24 שעות</li>
                    <li><strong>עוגיות אנליטיקה:</strong> עד 2 שנים</li>
                    <li><strong>עוגיות שיווק:</strong> עד 90 יום</li>
                    <li><strong>עוגיות פונקציונליות:</strong> עד 1 שנה</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-neutral-700 mb-4">
                    יצירת קשר
                  </h2>
                  <p className="text-neutral-600 leading-relaxed">
                    אם יש לכם שאלות בנוגע למדיניות העוגיות שלנו, אנא צרו קשר איתנו:
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

export default CookiePolicy
