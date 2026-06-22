import { Menu, Search, Bell, ChevronDown } from 'lucide-react';

export default function Header({ title = "Sales Management", breadcrumb = "Sales", onToggleSidebar }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 px-5 lg:px-8 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <button onClick={onToggleSidebar} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
          <Menu size={24} className="text-gray-700" />
        </button>
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500">
            Home / <span className="text-blue-600 font-medium">{breadcrumb}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-4">
        <div className="relative w-full max-w-xs hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help..."
            className="pl-10 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white w-full text-sm"
          />
        </div>
        
        <div className="relative">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Bell size={20} className="text-gray-700" />
          </button>
        </div>

        <div className="flex items-center gap-3 pl-3 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">admin@smartstock.com</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
            AU
          </div>
          <button className="p-1 hover:bg-gray-100 rounded-lg">
            <ChevronDown size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
}
