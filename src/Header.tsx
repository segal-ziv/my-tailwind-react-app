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
        // Get the actual header height dynamically
        const mobileHeader = document.querySelector('.sm\\:hidden.sticky')
        const desktopHeader = document.querySelector('nav.sticky')
        const header = window.innerWidth >= 640 ? desktopHeader : mobileHeader
        const headerHeight = header ? header.getBoundingClientRect().height : 160

        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - headerHeight - 16 // 16px extra padding

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
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
    <>
      {/* Mobile Header Container - Sticky wrapper for both top bar and logo */}
      <div className="sm:hidden sticky top-0 z-50 bg-white shadow-md">
      {/* Mobile Top Bar - Hamburger Menu & Contact Icons */}
      <Disclosure as="div" className="bg-gradient-to-b from-white to-white/95 border-b border-neutral-200/30">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4">
              <div className="flex justify-between items-center py-2">
                {/* Hamburger Menu - Right */}
                <DisclosureButton className="flex items-center justify-center rounded-xl p-1.5 text-neutral-700 hover:bg-neutral-100 active:scale-95 transition-all">
                  <span className="sr-only">פתח תפריט ראשי</span>
                  <Bars3Icon aria-hidden="true" className={`h-5 w-5 ${open ? 'hidden' : 'block'}`} />
                  <XMarkIcon aria-hidden="true" className={`h-5 w-5 ${open ? 'block' : 'hidden'}`} />
                </DisclosureButton>

                {/* Contact Icons - Left */}
                <div className="flex gap-1.5">
                  <a
                    href="tel:0504020170"
                    aria-label="חייגו עכשיו: 050-402-0170"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white shadow-md active:scale-95 transition-transform"
                    dir="rtl"
                  >
                    <PhoneIcon className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="https://wa.me/972504020170"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="פתיחת שיחת WhatsApp"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500 text-white shadow-md active:scale-95 transition-transform"
                    dir="rtl"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href="https://www.instagram.com/poppipe.plumbing?igsh=MTR5b3ExamVodzVoaQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="עקבו באינסטגרם"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-500 text-white shadow-md active:scale-95 transition-transform"
                    dir="rtl"
                  >
                    <InstagramIcon className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Mobile Menu Panel */}
            <DisclosurePanel className="border-t border-neutral-200" dir="rtl">
              <div className="px-4 py-3 space-y-3 bg-gradient-to-b from-neutral-50 to-white">
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
          </>
        )}
      </Disclosure>

      {/* Mobile Logo Section - Inside sticky container */}
      <div className="flex items-center justify-center py-3 bg-white">
        <img
          alt="לוגו T.S אינסטלציה - שירותי אינסטלציה מקצועיים"
          src="/goodlogo.png"
          className="h-24 w-auto"
        />
      </div>
      </div>

      {/* Desktop Header */}
      <Disclosure as="nav" className="hidden sm:block sticky top-0 z-50 bg-gradient-to-b from-white via-white/98 to-white/95 shadow-lg backdrop-blur-md border-b border-neutral-200/50" dir="rtl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Desktop layout: Single-line elegant header */}
          <div className="relative flex items-center justify-between py-4 min-h-40">
            {/* Navigation Menu - Right Side */}
            <div className="flex gap-8" dir="rtl">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  onKeyDown={(e) => handleKeyDown(e, item.href)}
                  className="relative text-sm font-medium text-neutral-700 hover:text-primary-600 transition-colors duration-200 group whitespace-nowrap"
                  aria-label={`ניווט לקטע ${item.name}`}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </button>
              ))}
            </div>

            {/* Centered Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <img
                alt="לוגו T.S אינסטלציה - שירותי אינסטלציה מקצועיים"
                src="/goodlogo.png"
                className="h-32 w-auto md:h-38 lg:h-40"
              />
            </div>

            {/* Contact Buttons - Left Side */}
            <div className="flex gap-3">
              <a
                href="tel:0504020170"
                aria-label="חייגו עכשיו: 050-402-0170"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 group"
                dir="rtl"
              >
                <PhoneIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://wa.me/972504020170"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="פתיחת שיחת WhatsApp"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-green-500 text-white hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 group"
                dir="rtl"
              >
                <WhatsAppIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.instagram.com/poppipe.plumbing?igsh=MTR5b3ExamVodzVoaQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="עקבו באינסטגרם"
                className="flex items-center justify-center w-11 h-11 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 group"
                dir="rtl"
              >
                <InstagramIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
    </Disclosure>
  </>
  )
}

export default Header
