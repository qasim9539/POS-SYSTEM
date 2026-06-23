import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '#features' },
  { label: 'Contact', href: '#contact' },
]

const featureLinks = [
  { label: 'Product Management', href: '#features' },
  { label: 'Inventory Tracking', href: '#features' },
  { label: 'Invoice Generation', href: '#features' },
  { label: 'Low Stock Alerts', href: '#features' },
]

const contactInfo = [
  { icon: Mail, label: 'hello@smartstock.com' },
  { icon: Phone, label: '+1 (555) 123-4567' },
  { icon: MapPin, label: '123 Business Ave,\nNew York, NY 10001' },
]

const socialLinks = [
  {
    label: 'Facebook',
    href: '#',
    path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
  },
  {
    label: 'Twitter',
    href: '#',
    path: 'M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768m2.46-2.46L20 4',
  },
  {
    label: 'LinkedIn',
    href: '#',
    path: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  },
  {
    label: 'Instagram',
    href: '#',
    path: 'M2 2h20v20H2zM16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01',
  },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo + name */}
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4 hover:no-underline">
              <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-extrabold text-navy-800 leading-tight tracking-tight">
                  SmartStock
                </span>
                <span className="text-[11px] text-neutral-500 font-medium leading-tight">
                  Inventory & Sales System
                </span>
              </div>
            </Link>

            {/* Description */}
            <p className="text-sm text-neutral-500 leading-relaxed max-w-xs mb-6">
              SmartStock is a simple and powerful
              <br />
              inventory &amp; sales management system
              <br />
              built for modern businesses.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-white hover:bg-navy-800 transition-all duration-200"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <h4 className="text-xs font-extrabold text-navy-800 uppercase tracking-[0.08em] mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-sm text-neutral-500 hover:text-navy-800 transition-colors duration-200 hover:no-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Features */}
          <div>
            <h4 className="text-xs font-extrabold text-navy-800 uppercase tracking-[0.08em] mb-5">
              Features
            </h4>
            <ul className="space-y-3">
              {featureLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-sm text-neutral-500 hover:text-navy-800 transition-colors duration-200 hover:no-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="text-xs font-extrabold text-navy-800 uppercase tracking-[0.08em] mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              {contactInfo.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-3 text-sm text-neutral-500">
                  <Icon className="w-4 h-4 flex-shrink-0 mt-0.5 text-neutral-400" strokeWidth={1.5} />
                  <span className="whitespace-pre-line leading-relaxed">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-center">
          <p className="text-sm text-neutral-400">
            &copy; 2024 SmartStock. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
