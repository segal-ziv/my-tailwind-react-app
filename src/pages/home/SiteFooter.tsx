import { Link } from 'react-router-dom'
import { Button } from '../../components'
import { PhoneIcon, WhatsAppIcon, InstagramIcon } from './icons'

const SiteFooter = () => (
  <footer className="bg-neutral-100 py-8 lg:py-10" dir="rtl">
    <div className="container mx-auto px-6 text-center lg:px-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:gap-4 sm:justify-center">
        <Button
          href="tel:0504020170"
          aria-label="חייגו עכשיו: 050-402-0170"
          size="md"
          variant="phone"
          icon={<PhoneIcon className="h-3.5 w-3.5" />}
          className="w-full max-w-64 mx-auto sm:mx-0 sm:w-auto"
        >
          חייגו עכשיו
        </Button>

        <Button
          href="https://wa.me/972504020170"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="פתיחת שיחת WhatsApp עם 050-402-0170"
          size="md"
          variant="whatsapp"
          icon={<WhatsAppIcon className="h-3.5 w-3.5" />}
          className="w-full max-w-64 mx-auto sm:mx-0 sm:w-auto"
        >
          WhatsApp
        </Button>

        <Button
          href="https://www.instagram.com/poppipe.plumbing?igsh=MTR5b3ExamVodzVoaQ=="
          target="_blank"
          rel="noopener noreferrer"
          aria-label="עקבו אחרינו באינסטגרם"
          size="md"
          variant="instagram"
          icon={<InstagramIcon className="h-3.5 w-3.5" />}
          className="w-full max-w-64 mx-auto sm:mx-0 sm:w-auto"
        >
          Instagram
        </Button>
      </div>

      <div className="mb-4 text-sm text-blue-900 lg:text-base leading-relaxed">
        כל הזכויות שמורות ל־T.S PLUMBING © 2025
      </div>

      <div className="mb-4 flex flex-wrap justify-center gap-4 text-sm leading-relaxed">
        <Link
          to="/privacy-policy"
          className="text-blue-700 hover:text-blue-900 underline transition-colors"
        >
          מדיניות פרטיות
        </Link>
        <Link
          to="/cookie-policy"
          className="text-blue-700 hover:text-blue-900 underline transition-colors"
        >
          מדיניות עוגיות
        </Link>
        <Link
          to="/accessibility-statement"
          className="text-blue-700 hover:text-blue-900 underline transition-colors"
        >
          הצהרת נגישות
        </Link>
      </div>

      <div className="text-sm text-blue-900 lg:text-base leading-relaxed">
        האתר נבנה על ידי{' '}
        <a
          href="https://zivsegal.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-900 underline transition hover:text-blue-700"
        >
          Ziv Segal
        </a>
      </div>
    </div>
  </footer>
)

export default SiteFooter
