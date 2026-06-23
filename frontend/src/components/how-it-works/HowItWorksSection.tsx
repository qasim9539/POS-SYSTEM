import { Tag, ShoppingCart, FileText } from 'lucide-react'

const steps = [
  {
    number: 1,
    icon: Tag,
    title: 'Add Products',
    description: 'Add your products and set\nstock details in just a few\nsimple steps.',
  },
  {
    number: 2,
    icon: ShoppingCart,
    title: 'Manage Inventory\n& Sales',
    description: 'Track inventory, record\nsales, and manage your\nbusiness efficiently.',
  },
  {
    number: 3,
    icon: FileText,
    title: 'Generate Reports',
    description: 'Generate reports and\ninsights to make better\nbusiness decisions.',
  },
] as const

function DashedArrow() {
  return (
    <div className="hidden lg:flex items-center shrink-0 mx-4">
      <svg
        width="56"
        height="24"
        viewBox="0 0 56 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-navy-300"
      >
        <line
          x1="0"
          y1="12"
          x2="38"
          y2="12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 5"
          strokeLinecap="round"
        />
        <polyline
          points="38,8 50,12 38,16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function HowItWorksSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-[11px] font-extrabold text-navy-600 uppercase tracking-[0.15em] mb-3">
            HOW IT WORKS
          </span>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.25rem)] font-extrabold text-navy-800 leading-tight tracking-tight">
            Simple Steps to Get Started
          </h2>
        </div>

        {/* Steps — horizontal row on desktop, vertical stack on mobile */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center gap-10 lg:gap-0">
          {steps.map(({ number, icon: Icon, title, description }, index) => (
            <div key={number} className="flex items-center">
              {/* Step — icon left, text right */}
              <div
                className="animate-fade-in-up flex items-center gap-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon circle with badge */}
                <div className="relative shrink-0">
                  <div className="w-[60px] h-[60px] rounded-full bg-neutral-100 flex items-center justify-center">
                    <Icon className="w-[26px] h-[26px] text-navy-700" strokeWidth={1.5} />
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-1 -right-1 w-[22px] h-[22px] rounded-full bg-navy-800 text-white flex items-center justify-center text-[11px] font-bold">
                    {number}
                  </div>
                </div>

                {/* Text block */}
                <div className="max-w-[180px]">
                  <h3 className="text-base font-bold text-navy-800 mb-1.5 whitespace-pre-line leading-snug">
                    {title}
                  </h3>
                  <p className="text-[13px] text-neutral-500 leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                </div>
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && <DashedArrow />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
