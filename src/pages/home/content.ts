export interface ServiceDetail {
  title: string;
  description: string;
}

export interface ProjectOption {
  value: string;
  label: string;
}

export const services: ServiceDetail[] = [
  {
    title: 'התקנה, החלפה ותיקון צנרות',
    description: 'אני מטפל בכל סוגי הצנרות, כולל צנרת גבריט (HDPE), ומשתמש במכשור מקורי וייעודי כדי להבטיח עבודה איכותית ועמידות לאורך שנים.',
  },
  {
    title: 'תיקון והתקנת ניאגרות',
    description: 'אני מבצע תיקון מקצועי והתקנה של כל סוגי הניאגרות, החל מבעיות קטנות ועד להתקנת מערכות חדשות.',
  },
  {
    title: 'שחרור סתימות',
    description: 'אני מספק פתרון מהיר ויעיל לכל סוגי הסתימות, כולל סתימות מורכבות בשוחות ביוב, באמצעות ציוד מתקדם.',
  },
  {
    title: 'איתור ותיקון נזילות',
    description: 'אני מאתר במדויק את מקור הנזילה ומתקן אותה באופן יסודי, למניעת נזקים עתידיים וחיסכון במים.',
  },
  {
    title: 'התקנת כלים סניטריים',
    description: 'אני מתקין מגוון רחב של כלים סניטריים, תוך הקפדה על גימור אסתטי ועבודה תקנית ובטיחותית.',
  },
];

export const projectOptions: ProjectOption[] = [
  { value: '', label: 'בחר אופי פרויקט' },
  { value: 'residential', label: 'מגורים (דירה/בית פרטי)' },
  { value: 'commercial', label: 'עסקי/מסחרי' },
  { value: 'institutional', label: 'מוסדי/ציבורי' },
  { value: 'contractor', label: 'קבלן/יזמות' },
  { value: 'other', label: 'אחר' },
];

export const contactEmail = 'Poppipe.service@gmail.com';
