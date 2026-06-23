import { Package, Warehouse, FileText, Bell } from 'lucide-react'
import { FeatureCard } from './FeatureCard'

const features = [
  {
    icon: Package,
    title: 'Product Management',
    description:
      'Add, edit, delete and organize\nproducts effortlessly.',
  },
  {
    icon: Warehouse,
    title: 'Inventory Tracking',
    description:
      'Monitor stock levels in real-time\nand avoid shortages.',
  },
  {
    icon: FileText,
    title: 'Invoice Generation',
    description:
      'Create professional invoices\nand manage transactions.',
  },
  {
    icon: Bell,
    title: 'Low Stock Alerts',
    description:
      'Get notified when stock is low\nand never miss a reorder.',
  },
] as const

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-neutral-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-[11px] font-extrabold text-navy-600 uppercase tracking-[0.15em] mb-3">
            FEATURES
          </span>
          <h2 className="text-[clamp(1.875rem,4vw,2.75rem)] font-extrabold text-navy-800 leading-tight tracking-tight mb-4">
            Everything You Need to
            <br />
            Grow Your Business
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed">
            Powerful tools designed to simplify your inventory management and
            help your business scale effortlessly.
          </p>
        </div>

        {/* Grid — cards in equal-height row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="animate-fade-in-up h-full"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <FeatureCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
