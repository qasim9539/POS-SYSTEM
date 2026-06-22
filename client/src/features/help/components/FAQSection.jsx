import { ChevronRight } from 'lucide-react';

export const faqQuestions = [
  { id: 1, question: "How do I add a new product?" },
  { id: 2, question: "How do I update stock levels?" },
  { id: 3, question: "How can I generate reports?" },
  { id: 4, question: "How do low stock alerts work?" },
  { id: 5, question: "How can I download invoices?" },
];

export default function FAQSection({ onFaqClick }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
      <div className="space-y-2 mb-4">
        {faqQuestions.map((faq) => (
          <div
            key={faq.id}
            onClick={() => onFaqClick(faq.id)}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <p className="text-sm font-medium text-gray-800">{faq.question}</p>
            <ChevronRight className="text-gray-400" size={18} />
          </div>
        ))}
      </div>
      <button className="w-full py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-100 transition-colors">
        View All FAQs
      </button>
    </div>
  );
}