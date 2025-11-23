import Card from './Card'
import type { ReactNode } from 'react'

interface ServiceItemProps {
  title: string
  description: string
}

interface ServiceCardProps {
  title: ReactNode
  services: ServiceItemProps[]
}

const ServiceCard = ({ title, services }: ServiceCardProps) => (
  <Card variant="glass" padding="lg" rounded="3xl">
    <h2 className="mb-10 text-3xl font-bold text-blue-900">{title}</h2>
    <ul className="space-y-8 text-lg font-medium text-blue-700">
      {services.map((service) => (
        <li key={service.title} className="flex items-start">
          <span className="ml-3 text-xl font-bold text-blue-700" aria-hidden="true" role="presentation">
            ✓
          </span>
          <div>
            <span className="font-semibold text-blue-900">{service.title}:</span> {service.description}
          </div>
        </li>
      ))}
    </ul>
  </Card>
)

export default ServiceCard
