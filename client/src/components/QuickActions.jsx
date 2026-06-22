import { PlusCircle, FileText, BarChart3, Download } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    { title: 'New Sale', desc: 'Create a new sale', icon: PlusCircle, bg: 'bg-[#1E40AF]', text: 'text-white', border: 'border-[#1E40AF]' },
    { title: 'Generate Invoice', desc: 'Create invoice', icon: FileText, bg: 'bg-white', text: 'text-[#1E40AF]', border: 'border-[#1E40AF]' },
    { title: 'Export Sales Report', desc: 'Download report', icon: BarChart3, bg: 'bg-white', text: 'text-[#1E40AF]', border: 'border-[#1E40AF]' },
    { title: 'Download CSV', desc: 'Export sales data', icon: Download, bg: 'bg-white', text: 'text-[#1E40AF]', border: 'border-[#1E40AF]' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-5">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((action, index) => {
          const IconComponent = action.icon;
          return (
            <button
              key={index}
              className={`p-4 rounded-xl border-2 ${action.bg} ${action.text} ${action.border} hover:shadow-md transition-all flex items-center gap-3 text-left`}
            >
              <IconComponent size={28} />
              <div>
                <p className="font-bold">{action.title}</p>
                <p className="text-xs opacity-80">{action.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
