import { Mail } from 'lucide-react';

export default function ContactSupport() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Support</h3>
      <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
          <Mail size={20} className="text-gray-600" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900">Support Email</p>
          <p className="text-sm text-gray-600">support@smartstock.com</p>
        </div>
      </div>
    </div>
  );
}