import HeroSection from './IntroSection'
import ExpertiseSection from './ExpertiseSection'
import ContactSection from './ContactSection'
import SiteFooter from './SiteFooter'

const HomePage = () => (
  <div className="bg-accent-light" dir="rtl">
    <HeroSection />
    <ExpertiseSection />
    <ContactSection />
    <SiteFooter />
  </div>
)

export default HomePage
