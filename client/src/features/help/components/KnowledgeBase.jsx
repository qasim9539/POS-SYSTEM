import { FileText } from 'lucide-react';

export default function KnowledgeBase({ onArticleClick }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Knowledge Base</h3>
      <div className="space-y-3">
        {[
          { id: 1, title: "Product Setup Guide", description: "Learn how to add and manage products." },
          { id: 2, title: "Inventory Tracking Guide", description: "Understand inventory tracking and stock." },
          { id: 3, title: "Sales Management Guide", description: "Manage sales, customers, and invoices." },
          { id: 4, title: "Reports & Analytics Guide", description: "Generate reports and analyze data." },
          { id: 5, title: "Account Settings Guide", description: "Configure your account and preferences." }
        ].map((article) => (
          <div key={article.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => onArticleClick(article.id)}>
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
              <FileText size={16} className="text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">{article.title}</p>
              <p className="text-xs text-gray-500">{article.description}</p>
            </div>
            <button className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold hover:bg-blue-100 transition-colors shrink-0">
              Read More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}