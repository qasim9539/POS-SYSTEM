import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <h1 className="text-7xl font-bold text-slate-200">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-slate-900">
        Page not found
      </h2>
      <p className="mt-2 text-slate-600 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link to="/" className="mt-8">
        <Button>Back to Home</Button>
      </Link>
    </div>
  )
}
