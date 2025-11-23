import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation } from 'react-router-dom'
import { PhoneIcon, WhatsAppIcon, InstagramIcon } from './pages/home/icons'

const navigation = [
  { name: 'ראשי', href: '#home' },
  { name: 'שירותים', href: '#services' },
  { name: 'מומחיות', href: '#expertise' },
  { name: 'צור קשר', href: '#contact' },
]

const Header = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const handleNavigation = (href: string) => {
    if (isHomePage) {
      // אם אנחנו בעמוד הבית, פשוט גלול לקטע
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // אם אנחנו בדף אחר, עבור לעמוד הבית עם הקטע
      window.location.href = `/${href}`
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleNavigation(href)
    }
  }

  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-gradient-to-b from-white via-white/98 to-white/95 shadow-lg backdrop-blur-md border-b border-neutral-200/50" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile layout: Clean single-line */}
        <div className="sm:hidden">
          <div className="relative flex items-center justify-between py-3">
            {/* Hamburger Menu - Right */}
            <DisclosureButton className="flex items-center justify-center rounded-xl p-2 text-neutral-700 hover:bg-neutral-100 active:scale-95 transition-all z-10">
              <span className="sr-only">פתח תפריט ראשי</span>
              <Bars3Icon aria-hidden="true" className="block h-5 w-5 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-5 w-5 group-data-open:block" />
            </DisclosureButton>

            {/* Centered Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <img
                alt="לוגו T.S אינסטלציה - שירותי אינסטלציה מקצועיים"
                src="/Untitled design (2).svg"
                className="h-12 w-auto"
              />
            </div>

            {/* Primary Contact Button - Left */}
            <a
              href="tel:0504020170"
              aria-label="חייגו עכשיו: 050-402-0170"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md active:scale-95 transition-transform z-10"
              dir="rtl"
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              <span className="text-xs font-semibold">חייגו</span>
            </a>
          </div>
        </div>

        {/* Desktop layout: Single-line elegant header */}
        <div className="hidden sm:block">
          <div className="flex items-center justify-between py-4 gap-8">
            {/* Navigation Menu - Right Side */}
            <div className="flex gap-8" dir="rtl">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  onKeyDown={(e) => handleKeyDown(e, item.href)}
                  className="relative text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors duration-200 group"
                  aria-label={`ניווט לקטע ${item.name}`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </button>
              ))}
            </div>

            {/* Centered Logo */}
            <div className="flex-shrink-0">
              <img
                alt="לוגו T.S אינסטלציה - שירותי אינסטלציה מקצועיים"
                src="/Untitled design (2).svg"
                className="h-16 w-auto md:h-20"
              />
            </div>

            {/* Contact Buttons - Left Side */}
            <div className="flex gap-2">
              <a
                href="tel:0504020170"
                aria-label="חייגו עכשיו: 050-402-0170"
                className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg group"
                dir="rtl"
              >
                <PhoneIcon className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">חייגו</span>
              </a>
              <a
                href="https://wa.me/972504020170"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="פתיחת שיחת WhatsApp"
                className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg group"
                dir="rtl"
              >
                <WhatsAppIcon className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">WhatsApp</span>
              </a>
              <a
                href="https://www.instagram.com/poppipe.plumbing?igsh=MTR5b3ExamVodzVoaQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="עקבו באינסטגרם"
                className="flex items-center justify-center p-2 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg group"
                dir="rtl"
              >
                <InstagramIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden" dir="rtl">
        <div className="px-4 py-3 space-y-3 bg-gradient-to-b from-neutral-50 to-white border-t border-neutral-200">
          {/* Navigation Links */}
          <div className="space-y-1">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="button"
                onClick={() => handleNavigation(item.href)}
                onKeyDown={(e) => handleKeyDown(e, item.href)}
                className="block w-full text-right rounded-xl px-4 py-2.5 text-base font-medium text-neutral-700 hover:bg-white hover:text-primary-600 transition-all focus:outline-none focus:ring-2 focus:ring-primary-300"
                aria-label={`ניווט לקטע ${item.name}`}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>

          {/* Contact Buttons */}
          <div className="pt-3 space-y-2 border-t border-neutral-200">
            <p className="text-xs font-semibold text-neutral-500 px-4">צרו קשר</p>
            <a
              href="https://wa.me/972504020170"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="פתיחת שיחת WhatsApp"
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md active:scale-98 transition-transform"
              dir="rtl"
            >
              <WhatsAppIcon className="h-4 w-4" />
              <span className="text-xs font-semibold">שלחו הודעה ב-WhatsApp</span>
            </a>
            <a
              href="https://www.instagram.com/poppipe.plumbing?igsh=MTR5b3ExamVodzVoaQ=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="עקבו באינסטגרם"
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md active:scale-98 transition-transform"
              dir="rtl"
            >
              <InstagramIcon className="h-4 w-4" />
              <span className="text-xs font-semibold">עקבו באינסטגרם</span>
            </a>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Header
