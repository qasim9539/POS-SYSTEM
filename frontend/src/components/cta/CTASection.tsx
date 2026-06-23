import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export function CTASection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 overflow-hidden shadow-cta">
          {/* Decorations */}
          <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-navy-600/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[280px] h-[280px] bg-navy-600/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />

          <div className="relative px-6 py-16 lg:py-20 lg:px-20 text-center">
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold text-white leading-tight tracking-tight mb-4">
              Ready to Simplify
              <br />
              Inventory Management?
            </h2>
            <p className="text-lg text-neutral-300 max-w-xl mx-auto mb-10 leading-relaxed">
              Join thousands of businesses using SmartStock
              <br />
              to manage inventory and sales smarter.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/signup"
                className={cn(
                  'inline-flex items-center justify-center px-8 py-3.5',
                  'text-base font-semibold text-navy-800',
                  'bg-white rounded-xl',
                  'shadow-lg shadow-navy-950/30',
                  'hover:bg-neutral-100',
                  'transition-all duration-200 hover:no-underline',
                )}
              >
                Sign Up Now
              </Link>
              <Link
                to="#contact"
                className={cn(
                  'inline-flex items-center justify-center px-8 py-3.5',
                  'text-base font-semibold text-white/90',
                  'bg-white/8 border border-white/12 rounded-xl',
                  'hover:bg-white/12 hover:text-white hover:border-white/20',
                  'transition-all duration-200 hover:no-underline',
                )}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
