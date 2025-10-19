import { lazy, Suspense } from 'react'
import LoadingSpinner from '../../components/LoadingSpinner'

const HeroSection = lazy(() => import('./IntroSection'))
const ExpertiseSection = lazy(() => import('./ExpertiseSection'))
const ContactSection = lazy(() => import('./ContactSection'))
const SiteFooter = lazy(() => import('./SiteFooter'))

const SectionLoader = () => (
  <div className="flex items-center justify-center py-12">
    <LoadingSpinner />
  </div>
)

const HomePage = () => (
  <div className="bg-accent-light" dir="rtl">
    <Suspense fallback={<SectionLoader />}>
      <HeroSection />
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <ExpertiseSection />
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <ContactSection />
    </Suspense>
    <Suspense fallback={<SectionLoader />}>
      <SiteFooter />
    </Suspense>
  </div>
)

export default HomePage