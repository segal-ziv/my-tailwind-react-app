import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useLocation } from 'react-router-dom'

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
    <Disclosure as="nav" className="bg-white/95 shadow-sm backdrop-blur" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-28 sm:h-32 md:h-36 lg:h-40 justify-between" dir="ltr">
          {/* Mobile layout: Logo on left, hamburger on right */}
          <div className="flex items-center sm:hidden">
            <img alt="לוגו T.S אינסטלציה - שירותי אינסטלציה מקצועיים" src="/tomerlogo.png" className="h-24 w-auto -ml-8" />
          </div>

          <div className="flex items-center sm:hidden">
            <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-500">
              <span className="sr-only">פתח תפריט ראשי</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-open:block" />
            </DisclosureButton>
          </div>

          {/* Desktop layout */}
          <div className="hidden sm:flex flex-1 items-center justify-start">
            <div className="flex items-center">
              <img alt="לוגו T.S אינסטלציה - שירותי אינסטלציה מקצועיים" src="/tomerlogo.png" className="h-28 w-auto sm:h-32 md:h-36 lg:h-40 -ml-8" />
            </div>
            <div className="flex gap-6 ml-auto">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  onKeyDown={(e) => handleKeyDown(e, item.href)}
                  className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-neutral-600 transition hover:border-neutral-400 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
                  aria-label={`ניווט לקטע ${item.name}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden" dir="rtl">
        <div className="space-y-1 border-t border-gray-200 px-4 pb-4 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="button"
              onClick={() => handleNavigation(item.href)}
              onKeyDown={(e) => handleKeyDown(e, item.href)}
              className="block w-full text-right rounded-lg px-3 py-2 text-base font-medium text-neutral-600 transition hover:bg-neutral-50 hover:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-300"
              aria-label={`ניווט לקטע ${item.name}`}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Header
