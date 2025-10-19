import { Button, ServiceCard, OptimizedImage } from '../../components'
import { services } from './content'
import { PhoneIcon, WhatsAppIcon } from './icons'

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
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12 xl:gap-16">
          <div className="lg:pt-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h1
                id="home-heading"
                className="mb-4 text-2xl font-black leading-tight tracking-tight text-neutral-700 sm:text-3xl sm:mb-6 lg:text-4xl lg:mb-8 xl:text-5xl"
              >
                אינסטלציה T.S
              </h1>
              <p className="max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9 xl:text-2xl xl:leading-10">
                שלום, שמי תומר שאול ואני מספק שירותי אינסטלציה. אני מקפיד להעניק שירות מקצועי, יעיל ואמין, עם דגש על יחס אישי, חיובי ונעים. נותן שירות לדירות, בניינים, בתים פרטיים, מוסדות וגופים.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 lg:mt-10">
              <Button
                href="tel:0504020170"
                aria-label="חייגו עכשיו: 050-402-0170"
                size="md"
                variant="phone"
                icon={<PhoneIcon className="h-4 w-4" />}
                className="relative w-full max-w-64 mx-auto sm:mx-0 sm:w-auto"
              >
                חייגו עכשיו
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-white">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white" />
                </span>
              </Button>

              <Button
                href="https://wa.me/972504020170"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="פתיחת שיחת WhatsApp עם 050-402-0170"
                size="md"
                variant="whatsapp"
                icon={<WhatsAppIcon className="h-4 w-4" />}
                className="w-full max-w-64 mx-auto sm:mx-0 sm:w-auto"
              >
                WhatsApp
              </Button>
            </div>
          </div>

          <div className="order-last mt-8 flex items-center justify-center lg:order-none lg:mt-0">
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
