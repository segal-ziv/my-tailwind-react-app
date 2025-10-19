# T.S אינסטלציה – אתר תדמית

אתר תדמית רספונסיבי עבור T.S PLUMBING, שנבנה עם React, TypeScript, Vite ו־Tailwind CSS. הפרויקט עושה שימוש במערכת קומפוננטות פנימית וב־design tokens להתאמה למיתוג של העסק.

## טכנולוגיות וכלים
- React 19 עם TypeScript ו־Vite
- Tailwind CSS 4 ו־PostCSS
- Headless UI ו־Heroicons עבור נגישות ואינטראקציה
- ESLint עם TypeScript-eslint

## הרצה מקומית
```bash
npm install
npm run dev
```

### פקודות שימושיות
- `npm run dev` – פיתוח עם Vite ו־HMR
- `npm run build` – קומפילציה ל־production
- `npm run preview` – הרצת build מקומי
- `npm run lint` – הרצת ESLint על כל הפרויקט

## מבנה פרויקט
```
├── public/              # נכסים סטטיים הזמינים ב־/root
├── src/
│   ├── components/      # ספריית קומפוננטות רב־שימושיות (Button, Card וכו')
│   ├── design-system/   # design tokens וגדירי סגנון
│   ├── styles/          # בסיס Tailwind והרחבות גלובליות
│   ├── HeroSection.tsx  # עמוד הבית (יתפצל לקומפוננטות פנימיות בהמשך)
│   └── main.tsx         # נקודת כניסה של האפליקציה
└── tailwind.config.mjs  # קונפיגורציית Tailwind
```

## סטנדרטים ונגישות
- הפרויקט פועל ב־RTL, כולל תמיכה מלאה בשפה העברית.
- קומפוננטות הטופס תומכות ב־ARIA, במצבי טעינה ובהודעות שגיאה ידידותיות.
- העיצוב מותאם למכשירים ניידים ולמסכים גדולים כאחד.

## משימות המשך
- פירוק HeroSection לקומפוננטות משנה כדי לשפר קריאות ותחזוקה.
- שילוב design tokens בתצורת Tailwind לקבלת מקור אמת יחיד.
- הוספת בדיקות יחידה ואינטגרציה למסכים ולקומפוננטות.

## רישיון
הקוד מיועד לשימוש פנימי של T.S PLUMBING. אין הפצה מחדש ללא אישור מפורש מבעלי הזכויות.
