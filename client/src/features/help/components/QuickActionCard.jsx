import { Ticket, FileDown, BookOpen, ChevronRight } from 'lucide-react';

export const quickActions = [
  {
    id: 1,
    icon: <Ticket className="text-blue-600" size={24} />,
    iconBg: "bg-blue-50",
    title: "Create Support Ticket",
    description: "Submit a ticket and we'll get back to you."
  },
  {
    id: 2,
    icon: <FileDown className="text-green-600" size={24} />,
    iconBg: "bg-green-50",
    title: "Download User Manual",
    description: "Download the complete user manual (PDF)."
  },
  {
    id: 3,
    icon: <BookOpen className="text-purple-600" size={24} />,
    iconBg: "bg-purple-50",
    title: "View Documentation",
    description: "Browse detailed documentation."
  }
];

export default function QuickActionCard({ action, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className={`w-12 h-12 rounded-full ${action.iconBg} flex items-center justify-center shrink-0`}>
        {action.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-base font-bold text-gray-900">{action.title}</h4>
        <p className="text-sm text-gray-500">{action.description}</p>
      </div>
      <ChevronRight className="text-gray-400" size={20} />
    </div>
  );
}