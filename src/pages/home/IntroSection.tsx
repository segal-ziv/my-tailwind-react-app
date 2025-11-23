import { ServiceCard, OptimizedImage } from '../../components'
import { services } from './content'

const HeroIntro = () => {
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative overflow-hidden bg-accent-light"
    >
      <div className="absolute inset-0">
        <OptimizedImage
          src="/plumbing-background.png"
          alt=""
          className="h-full w-full object-cover opacity-5"
          priority
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-12 lg:px-8 lg:pt-20 lg:pb-16 xl:pt-24 xl:pb-20">
        <div className="flex flex-col items-center gap-8 lg:gap-12">
          <div className="text-center max-w-3xl">
            <h1
              id="home-heading"
              className="mb-4 text-2xl font-black leading-tight tracking-tight text-blue-900 sm:text-3xl sm:mb-6 lg:text-4xl lg:mb-8 xl:text-5xl"
            >
              אינסטלציה T.S
            </h1>
            <p className="text-base font-normal leading-relaxed text-blue-700 sm:text-lg sm:leading-relaxed lg:text-xl lg:leading-relaxed xl:text-2xl xl:leading-relaxed">
              שלום, שמי תומר שאול ואני מספק שירותי אינסטלציה. אני מקפיד להעניק שירות מקצועי, יעיל ואמין, עם דגש על יחס אישי, חיובי ונעים. נותן שירות לדירות, בניינים, בתים פרטיים, מוסדות וגופים.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <OptimizedImage
              src="/plumbing.svg"
              className="h-auto w-full max-w-sm rounded-2xl shadow-2xl sm:max-w-md lg:max-w-lg xl:max-w-xl"
              alt="T.S אינסטלציה - שירותי אינסטלציה מקצועיים"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 576px"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

const ServicesShowcase = () => (
  <section id="services" aria-labelledby="services-heading" className="bg-accent-light py-8 sm:py-12 lg:py-16">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <ServiceCard title="השירותים המקצועיים שלי" services={services} />
      </div>
    </div>
  </section>
)

const HeroSection = () => (
  <div className="relative" dir="rtl">
    <HeroIntro />
    <ServicesShowcase />
  </div>
)

export default HeroSection
