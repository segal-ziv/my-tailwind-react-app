import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Header'
import LoadingSpinner from './components/LoadingSpinner'
import CookieConsent from './components/CookieConsent'
import AccessibilityButton from './components/AccessibilityButton'
import { useCookieConsent } from './hooks/useCookieConsent'

const HomePage = lazy(() => import('./pages/home/HomePage.lazy'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'))
const AccessibilityStatement = lazy(() => import('./pages/AccessibilityStatement'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  const { showBanner, acceptCookies, rejectCookies } = useCookieConsent()

  return (
    <Router>
      <div className="min-h-screen bg-accent-light" dir="rtl">
        {/* Skip Links for Accessibility */}
        <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50">
          <a 
            href="#main-content" 
            className="bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300"
          >
            דלג לתוכן הראשי
          </a>
          <a 
            href="#contact" 
            className="bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 mr-2"
          >
            דלג לטופס יצירת קשר
          </a>
        </div>
        
        <Header />
        <main id="main-content">
          <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center">
              <LoadingSpinner />
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        
        {showBanner && (
          <CookieConsent
            onAccept={acceptCookies}
            onReject={rejectCookies}
          />
        )}
        
        <AccessibilityButton />
      </div>
    </Router>
  )
}

export default App
