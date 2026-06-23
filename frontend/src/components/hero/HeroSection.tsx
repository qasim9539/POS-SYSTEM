import { Link } from 'react-router-dom'
import { ShieldCheck, Shield, Cloud } from 'lucide-react'
import { cn } from '@/lib/utils'

const trustItems = [
  { icon: ShieldCheck, label: 'Easy to Use' },
  { icon: Shield, label: 'Secure & Reliable' },
  { icon: Cloud, label: 'Cloud Based' },
] as const

export function HeroSection() {
  return (
    <section className="relative pt-[112px] pb-20 lg:pb-28 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-navy-50/30 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neutral-50 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="animate-fade-in-up">
            {/* Heading */}
            <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold text-navy-800 leading-[1.08] tracking-tight mb-6">
              Manage Inventory &
              <br />
              Sales Smarter
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed max-w-lg mb-8">
              Track products, manage stock, record sales,
              <br />
              generate invoices, and receive low-stock
              <br />
              alerts from one simple platform.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10">
              <Link
                to="/signup"
                className={cn(
                  'inline-flex items-center justify-center px-7 py-3.5',
                  'text-base font-semibold text-white',
                  'bg-navy-800 rounded-xl',
                  'shadow-sm shadow-navy-800/10',
                  'hover:bg-navy-hover hover:shadow-md hover:shadow-navy-800/15',
                  'transition-all duration-200 hover:no-underline',
                )}
              >
                Get Started
              </Link>
              <Link
                to="#features"
                className={cn(
                  'inline-flex items-center justify-center px-7 py-3.5',
                  'text-base font-semibold text-navy-800',
                  'bg-white border-2 border-neutral-200 rounded-xl',
                  'hover:border-navy-200 hover:bg-navy-50/30',
                  'transition-all duration-200 hover:no-underline',
                )}
              >
                View Features
              </Link>
            </div>

            {/* Trust items */}
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-5 border-t border-neutral-200">
              {trustItems.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 text-navy-800 text-sm font-semibold"
                >
                  <Icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — Inventory illustration */}
          <div className="animate-slide-in-right flex items-center justify-center">
            <img
              src="/image copy.png"
              alt="SmartStock Inventory Management"
              className="w-full max-w-[560px] h-auto"
              width={560}
              height={420}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
