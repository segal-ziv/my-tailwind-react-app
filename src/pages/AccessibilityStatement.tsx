import { Link } from 'react-router-dom'
import { Card } from '../components'

const AccessibilityStatement = () => {
  return (
    <div className="min-h-screen bg-accent-light py-8 sm:py-12 lg:py-16" dir="rtl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <Card variant="glass" padding="lg" rounded="3xl">
            <div className="prose prose-lg max-w-none">
              <h1 className="text-3xl font-black text-neutral-800 mb-8">
                הצהרת נגישות
              </h1>
              
              <div className="space-y-6 text-neutral-700">
                <p className="text-lg">
                  אתר T.S אינסטלציה מחויב לספק שירות נגיש לכלל הציבור, כולל אנשים עם מוגבלויות. 
                  אנו פועלים ללא הרף לשיפור הנגישות והשימושיות של האתר שלנו.
                </p>

                <section>
                  <h2 className="text-2xl font-bold text-neutral-800 mb-4">
                    רמת הנגישות
                  </h2>
                  <p>
                    האתר שלנו עומד בתקן הישראלי ת"י 5568, המבוסס על הנחיות WCAG 2.0 ברמה AA. 
                    התקן מחייב אתרי אינטרנט המספקים שירותים לציבור בישראל.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-neutral-800 mb-4">
                    התאמות נגישות שבוצעו
                  </h2>
                  <ul className="list-disc list-inside space-y-2">
                    <li>קישורי דילוג (Skip Links) המאפשרים ניווט מהיר לתוכן הראשי</li>
                    <li>ניווט מלא באמצעות מקלדת ללא צורך בעכבר</li>
                    <li>ניהול מיקוד (Focus) ברור ונראה לעין</li>
                    <li>ניגודיות צבעים של לפחות 4.5:1 בין טקסט לרקע</li>
                    <li>טקסט חלופי מפורט לכל התמונות והאייקונים</li>
                    <li>טפסים נגישים עם תוויות ברורות והודעות שגיאה מובנות</li>
                    <li>תמיכה בקוראי מסך וטכנולוגיות מסייעות</li>
                    <li>תיאורים ברורים לקישורים ופעולות</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-neutral-800 mb-4">
                    כלי נגישות מתקדמים
                  </h2>
                  <p className="mb-4">
                    האתר כולל ווידג'ט נגישות מקצועי המאפשר התאמה אישית מלאה של חוויית הגלישה:
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-2">התאמות טקסט וגופנים</h3>
                      <ul className="list-disc list-inside space-y-1 mr-4">
                        <li>הגדלה והקטנה של גודל הטקסט עד 150%</li>
                        <li>שינוי ריווח בין שורות</li>
                        <li>שינוי ריווח בין אותיות</li>
                        <li>מעבר לגופן קריא (Arial)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-2">התאמות תצוגה וצבעים</h3>
                      <ul className="list-disc list-inside space-y-1 mr-4">
                        <li>מצב ניגודיות בהירה</li>
                        <li>מצב ניגודיות כהה</li>
                        <li>היפוך צבעים</li>
                        <li>מצב מונוכרום (שחור-לבן)</li>
                        <li>התאמת רוויה (גבוהה/נמוכה)</li>
                        <li>בחירת צבע מותאם אישית</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-2">התאמות תוכן וקריאה</h3>
                      <ul className="list-disc list-inside space-y-1 mr-4">
                        <li>הדגשת קישורים</li>
                        <li>הדגשת כותרות</li>
                        <li>סרגל קריאה - עוקב אחר מיקום העכבר</li>
                        <li>זכוכית מגדלת מתקדמת</li>
                        <li>הגדלת סמן העכבר</li>
                        <li>עצירת אנימציות</li>
                        <li>הסתרת תמונות</li>
                        <li>קריאת טקסט בקול</li>
                        <li>מבנה העמוד - הדגשת מבנה ההיררכיה</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-neutral-800 mb-2">נגישות מתקדמת</h3>
                      <ul className="list-disc list-inside space-y-1 mr-4">
                        <li>תמיכה מלאה בניווט מקלדת</li>
                        <li>תמיכה בטכנולוגיות מסייעות</li>
                        <li>שמירת העדפות נגישות למפגשים עתידיים</li>
                        <li>אפשרות איפוס מהיר של כל ההגדרות</li>
                      </ul>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-neutral-800 mb-4">
                    דרכי יצירת קשר
                  </h2>
                  <p>
                    אם נתקלתם בבעיית נגישות באתר שלנו, או אם יש לכם הצעות לשיפור, 
                    אנא צרו איתנו קשר:
                  </p>
                  <div className="bg-accent-sand p-4 rounded-lg mt-4">
                    <p><strong>טלפון:</strong> 050-402-0170</p>
                    <p><strong>מייל:</strong> Poppipe.service@gmail.com</p>
                    <p><strong>שעות פעילות:</strong> א'-ה' 8:00-18:00, ו' 8:00-14:00</p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-neutral-800 mb-4">
                    טיפול בפניות
                  </h2>
                  <p>
                    אנו מתחייבים לטפל בכל פנייה בנושא נגישות תוך 60 יום ממועד קבלתה. 
                    נשמח לקבל את המשוב שלכם ולשפר את האתר בהתאם.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-neutral-800 mb-4">
                    עדכון ההצהרה
                  </h2>
                  <p>
                    הצהרת נגישות זו עודכנה לאחרונה ב-{new Date().toLocaleDateString('he-IL')}. 
                    אנו מעדכנים את ההצהרה באופן קבוע בהתאם לשיפורים שביצענו באתר.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-neutral-800 mb-4">
                    קישורים נוספים
                  </h2>
                  <div className="space-y-2">
                    <p>
                      <Link to="/privacy-policy" className="text-primary-600 hover:underline font-medium">
                        מדיניות הפרטיות
                      </Link>
                    </p>
                    <p>
                      <Link to="/cookie-policy" className="text-primary-600 hover:underline font-medium">
                        מדיניות העוגיות
                      </Link>
                    </p>
                    <p>
                      <Link to="/" className="text-primary-600 hover:underline font-medium">
                        חזרה לעמוד הבית
                      </Link>
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AccessibilityStatement
