import { Link } from 'react-router-dom'

const SiteFooter = () => (
  <footer className="bg-neutral-100 py-8 lg:py-10" dir="rtl">
    <div className="container mx-auto px-6 text-center lg:px-8">
      <div className="mb-4 text-sm text-black lg:text-base">
        כל הזכויות שמורות ל־T.S PLUMBING © 2025
      </div>
      
      <div className="mb-4 flex flex-wrap justify-center gap-4 text-sm">
        <Link 
          to="/privacy-policy" 
          className="text-neutral-600 hover:text-neutral-800 underline transition-colors"
        >
          מדיניות פרטיות
        </Link>
        <Link 
          to="/cookie-policy" 
          className="text-neutral-600 hover:text-neutral-800 underline transition-colors"
        >
          מדיניות עוגיות
        </Link>
        <Link 
          to="/accessibility-statement" 
          className="text-neutral-600 hover:text-neutral-800 underline transition-colors"
        >
          הצהרת נגישות
        </Link>
      </div>
      
      <div className="text-sm text-black lg:text-base">
        האתר נבנה על ידי{' '}
        <a
          href="https://www.znbtech.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-black underline transition hover:text-neutral-700"
        >
          Ziv Segal
        </a>
      </div>
    </div>
  </footer>
)

export default SiteFooter
