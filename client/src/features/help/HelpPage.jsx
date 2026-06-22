import { useState } from 'react';
import {
  Rocket,
  Package,
  Boxes,
  BarChart3,
  HelpCircle,
  BookOpen,
  Mail,
  ChevronRight,
  ChevronDown,
  Search,
  Bell,
  FileText,
  Clock,
  ArrowLeft
} from 'lucide-react';
import Sidebar from '../../components/Sidebar.jsx';
import Header from '../../components/Header.jsx';

// All data
const heroCards = [
  {
    id: 1,
    icon: Rocket,
    title: "Getting Started",
    description: "Learn the basics and set up your account quickly.",
    gradient: "from-blue-500 to-blue-700",
    bgGradient: "from-blue-50 to-blue-100",
    details: {
      sections: [
        {
          title: "1. Creating Your Account",
          content: "To create your SmartStock account, visit our website and click 'Sign Up'. Fill in your details including email, business name, and password. Verify your email to activate your account."
        },
        {
          title: "2. Initial Setup",
          content: "After logging in, you'll be guided through our setup wizard. This includes adding your first warehouse, setting up product categories, and configuring your default currency."
        },
        {
          title: "3. Adding Your First Product",
          content: "Go to Products > Add Product. Fill in product details including name, SKU, category, price, and initial stock level. Click 'Save' to add the product to your inventory."
        }
      ]
    }
  },
  {
    id: 2,
    icon: Package,
    title: "Product Management",
    description: "Manage your products, categories, and attributes.",
    gradient: "from-green-500 to-emerald-700",
    bgGradient: "from-green-50 to-emerald-100",
    details: {
      sections: [
        {
          title: "1. Adding Products",
          content: "Navigate to Products > Add Product. Enter product details: name, SKU, category, description, price, cost, and stock levels. You can also add product images and variants."
        },
        {
          title: "2. Managing Categories",
          content: "Go to Products > Categories to create and organize your products. Categories help customers find items and make inventory management easier."
        },
        {
          title: "3. Product Attributes",
          content: "Add custom attributes like size, color, or material to create product variants. This helps track different versions of the same product separately."
        }
      ]
    }
  },
  {
    id: 3,
    icon: Boxes,
    title: "Inventory Management",
    description: "Track stock, manage warehouses, and update inventory.",
    gradient: "from-orange-500 to-amber-700",
    bgGradient: "from-orange-50 to-amber-100",
    details: {
      sections: [
        {
          title: "1. Stock Tracking",
          content: "Monitor stock levels in real-time across all your warehouses. The dashboard shows current stock, reserved items, and low-stock alerts at a glance."
        },
        {
          title: "2. Warehouse Management",
          content: "Create and manage multiple warehouses. Transfer stock between locations, track bin locations, and set reorder points for each item."
        },
        {
          title: "3. Updating Inventory",
          content: "Use stock adjustments to add or remove inventory. Record reasons for adjustments (received, damaged, returned, etc.) for accurate audit trails."
        }
      ]
    }
  },
  {
    id: 4,
    icon: BarChart3,
    title: "Sales & Reports",
    description: "Manage sales, invoices, and generate reports.",
    gradient: "from-purple-500 to-violet-700",
    bgGradient: "from-purple-50 to-violet-100",
    details: {
      sections: [
        {
          title: "1. Creating Sales Orders",
          content: "Go to Sales > New Order. Select customer, add products, apply discounts, and process payment. Send invoices directly from the system."
        },
        {
          title: "2. Generating Reports",
          content: "Access Reports section to view sales performance, inventory status, and financial reports. Export reports as PDF or Excel for further analysis."
        },
        {
          title: "3. Sales Analytics",
          content: "Use built-in analytics to track best-selling products, revenue trends, and customer behavior. Make data-driven decisions for your business."
        }
      ]
    }
  }
];

const faqItems = [
  { id: 1, question: "How do I add a new product?", answer: "Navigate to Products > Add Product. Fill in product details including name, SKU, category, price, and initial stock. You can also add product images and variants. Click 'Save' when done." },
  { id: 2, question: "How do I update stock levels?", answer: "Go to Inventory > Stock Adjustments. Select the product, choose add/remove, enter quantity, and provide a reason. The system updates stock levels automatically." },
  { id: 3, question: "How can I generate reports?", answer: "Access Reports, select type (Sales/Inventory/Financial), choose date range, apply filters, then click Generate. Export as PDF or Excel." },
  { id: 4, question: "How do low stock alerts work?", answer: "Set reorder points in product settings. When stock falls below this level, you'll receive an alert. Configure notifications in Settings > Notifications." },
  { id: 5, question: "How can I download invoices?", answer: "Go to Sales > Invoices. Find the invoice you want, open it, and click the 'Download' button. Invoices are generated as PDF files with your business branding." },
  { id: 6, question: "Can I add multiple warehouses?", answer: "Yes! Go to Settings > Warehouses. Click 'Add Warehouse', fill in the details, and save. You can then assign products to specific warehouses and track stock separately." },
  { id: 7, question: "How do I manage user roles and permissions?", answer: "Navigate to Settings > Users. You can create new users, assign roles (Admin, Manager, Viewer), and set specific permissions for each user to control access to different features." }
];

const knowledgeBaseArticles = [
  {
    id: 1,
    title: "Product Setup Guide",
    description: "Learn how to add and manage products.",
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    content: `# Product Setup Guide

## Getting Started
This guide will walk you through setting up your products in SmartStock.

## Adding Products
1. Navigate to Products > Add Product
2. Enter basic information:
   - Product name
   - SKU (Stock Keeping Unit)
   - Category
   - Description

## Pricing & Inventory
3. Set pricing details:
   - Selling price
   - Cost price
   - Compare-at price (optional)

4. Configure inventory:
   - Initial stock level
   - Reorder point
   - Warehouse assignment

## Product Variants
5. Add variants (optional):
   - Size
   - Color
   - Material
   - Custom attributes`
  },
  {
    id: 2,
    title: "Inventory Tracking Guide",
    description: "Understand inventory tracking and stock.",
    color: "text-orange-600",
    bg: "bg-orange-50",
    content: `# Inventory Tracking Guide

## Real-time Tracking
SmartStock provides real-time inventory visibility across all your warehouses.

## Stock Levels
- **Available**: Stock ready for sale
- **Reserved**: Stock allocated to orders
- **Total**: Combined stock quantity

## Warehouse Management
- Create multiple warehouse locations
- Transfer stock between warehouses
- Track bin locations for precise organization

## Reorder Points
Set automatic reorder points to never run out of stock. When stock falls below this level, you'll receive an alert.`
  },
  {
    id: 3,
    title: "Sales Management Guide",
    description: "Manage sales, customers, and invoices.",
    color: "text-green-600",
    bg: "bg-green-50",
    content: `# Sales Management Guide

## Creating Orders
1. Go to Sales > New Order
2. Select or create a customer
3. Add products to the order
4. Apply discounts (if applicable)
5. Process payment
6. Send invoice to customer

## Customer Management
- Store customer information
- View order history
- Track customer lifetime value

## Invoicing
- Generate professional invoices
- Customize with your branding
- Send via email directly from the system
- Track payment status`
  },
  {
    id: 4,
    title: "Reports & Analytics Guide",
    description: "Generate reports and analyze data.",
    color: "text-rose-600",
    bg: "bg-rose-50",
    content: `# Reports & Analytics Guide

## Available Reports
- **Sales Reports**: Revenue, units sold, best sellers
- **Inventory Reports**: Stock levels, turnover, low stock
- **Financial Reports**: Profit & loss, taxes, payments

## Creating Reports
1. Navigate to Reports section
2. Select report type
3. Choose date range
4. Apply filters (if needed)
5. Click Generate
6. Export as PDF or Excel

## Analytics Dashboard
Get insights from visual charts and graphs:
- Sales trends over time
- Product performance
- Warehouse efficiency
- Customer behavior`
  },
  {
    id: 5,
    title: "Account Settings Guide",
    description: "Configure your account and preferences.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    content: `# Account Settings Guide

## Profile Settings
- Update business information
- Change password
- Set notification preferences

## Business Settings
- Add your business logo
- Configure currency and tax settings
- Set up invoice templates

## User Management
- Add team members
- Assign roles and permissions
- Track user activity

## Integration Settings
Connect with other tools and services:
- Payment gateways
- Accounting software
- E-commerce platforms`
  }
];



export default function PremiumHelpPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeView, setActiveView] = useState(null); // null, 'guide', 'faq', 'article', 'quickAction'
  const [activeItemId, setActiveItemId] = useState(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const handleBack = () => {
    setActiveView(null);
    setActiveItemId(null);
    setShowAllFaqs(false);
  };

  const handleSendEmail = () => {
    const to = "support@smartstock.com";
    const subject = "SmartStock Support Request";
    const body = "Hello SmartStock Team,\n\nI need help with:\n\n";
    
    const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const anchor = document.createElement('a');
    anchor.href = mailtoUrl;
    anchor.target = "_self";
    anchor.click();
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50/30 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarMobileOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`${sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 transition-transform duration-300 z-50'}`}>
        <Sidebar
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
          active="help"
        />
      </div>

      {/* Main Content */}
      <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}`}>
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-100 px-8 py-6 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {activeView && (
                <button
                  onClick={handleBack}
                  className="p-2 bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 rounded-xl transition-all"
                >
                  <ArrowLeft size={20} />
                </button>
              )}
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900">
                          {activeView === 'guide' ? heroCards.find(c => c.id === activeItemId)?.title :
                           activeView === 'article' ? knowledgeBaseArticles.find(a => a.id === activeItemId)?.title :
                           activeView === 'faq' ? 'Frequently Asked Questions' :
                           'Help & Support'}
                        </h1>
                {!activeView && (
                  <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                    <span>Home</span>
                    <ChevronRight size={14} />
                    <span className="text-blue-600 font-semibold">Help & Support</span>
                  </div>
                )}
              </div>
            </div>
            
            {!activeView && (
              <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search for help..."
                    className="pl-12 pr-16 py-3 border border-slate-200 bg-white rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 w-full max-w-md text-sm transition-all shadow-sm"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg">
                    <span>⌘</span><span>K</span>
                  </div>
                </div>

                {/* Notifications */}
                <div className="relative">
                  <button className="p-3 bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-2xl transition-all">
                    <Bell size={22} />
                  </button>
                </div>

                {/* Admin Profile */}
                <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-semibold text-slate-900">Admin User</p>
                    <p className="text-xs text-slate-500">admin@smartstock.com</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    AU
                  </div>
                  <button className="p-1 hover:bg-slate-100 rounded-lg">
                    <ChevronDown size={16} className="text-slate-500" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-8 py-8">
          {!activeView ? (
            <>
              {/* Hero Cards Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {heroCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.id}
                      onClick={() => {
                        setActiveView('guide');
                        setActiveItemId(card.id);
                      }}
                      className="relative group bg-gradient-to-br from-white to-slate-50 rounded-3xl p-7 border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer"
                    >
                      {/* Decorative Shapes */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${card.gradient} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500`} />
                      <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${card.gradient} opacity-10 rounded-full translate-y-1/2 -translate-x-1/2 group-hover:scale-110 transition-transform duration-500`} />
                      
                      <div className="relative flex flex-col h-full">
                        <div className="flex items-start justify-between mb-6">
                          <div className={`p-5 bg-gradient-to-br ${card.gradient} rounded-3xl shadow-lg shadow-blue-500/20`}>
                            <Icon size={36} className="text-white" />
                          </div>
                          <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-blue-50 text-slate-400 group-hover:text-blue-600 transition-colors">
                            <ChevronRight size={20} />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
                        <p className="text-slate-500 text-sm mb-6 flex-1">{card.description}</p>
                        <button className={`w-full py-4 bg-gradient-to-r ${card.gradient} text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all`}>
                          View Guide
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Middle Section - 2 Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                {/* Column 1: Knowledge Base */}
                <div className="bg-white rounded-3xl p-7 border border-slate-100 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-violet-50 rounded-2xl">
                      <BookOpen size={24} className="text-violet-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Knowledge Base</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {knowledgeBaseArticles.map((article) => (
                      <div
                        key={article.id}
                        onClick={() => {
                          setActiveView('article');
                          setActiveItemId(article.id);
                        }}
                        className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <div className={`p-2.5 ${article.bg} rounded-xl shrink-0`}>
                          <FileText size={18} className={article.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate">{article.title}</p>
                          <p className="text-xs text-slate-500 truncate">{article.description}</p>
                        </div>
                        <button className={`px-4 py-1.5 ${article.bg} ${article.color} rounded-xl text-xs font-bold hover:opacity-80 transition-opacity`}>
                          Read More
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Contact Support */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-7 border border-blue-100 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-100 rounded-2xl">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
                        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Contact Support</h3>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-slate-100">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <Mail size={24} className="text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800">Support Email</p>
                        <p className="text-sm text-slate-600">support@smartstock.com</p>
                      </div>
                    </div>

                    <button
                      onClick={handleSendEmail}
                      className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      <Mail size={18} />
                      Send Email
                    </button>

                    {/* Illustration Area */}
                    <div className="relative mt-4">
                      <div className="w-full h-40 bg-gradient-to-br from-blue-100/50 to-violet-100/50 rounded-3xl flex items-center justify-center overflow-hidden">
                        <div className="text-center">
                          <img
                            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop"
                            alt="Support"
                            className="w-32 h-32 object-cover rounded-2xl shadow-xl mx-auto mb-2"
                          />
                          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                            <Clock size={12} className="text-blue-600" />
                            <span className="text-xs font-bold text-blue-700">24/7 Support</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section - Horizontal */}
              <div className="bg-white rounded-3xl p-7 border border-slate-100 shadow-lg mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-50 rounded-2xl">
                    <HelpCircle size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {faqItems.map((item) => (
                    <div key={item.id} className="border border-slate-100 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => {
                          setOpenFaq(openFaq === item.id ? null : item.id);
                        }}
                        className="w-full flex items-center justify-between px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                      >
                        <span className="text-xs font-semibold text-slate-800 line-clamp-2">{item.question}</span>
                        <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${openFaq === item.id ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === item.id && (
                        <div className="px-4 pb-4 pt-2">
                          <p className="text-xs text-slate-600 leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            // Detailed views
            <div className="max-w-4xl mx-auto">
              {/* Guide Detail View */}
              {activeView === 'guide' && activeItemId && (
                <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-100 shadow-lg">
                  {(() => {
                    const guide = heroCards.find(c => c.id === activeItemId);
                    const Icon = guide?.icon;
                    return (
                      <>
                        <div className={`inline-flex p-5 bg-gradient-to-br ${guide?.gradient} rounded-3xl shadow-lg shadow-blue-500/20 mb-6`}>
                          <Icon size={40} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-8">{guide?.title}</h1>
                        <div className="space-y-8">
                          {guide?.details?.sections?.map((section, idx) => (
                            <div key={idx} className="border-l-4 border-blue-500 pl-6">
                              <h3 className="text-xl font-bold text-slate-900 mb-3">{section.title}</h3>
                              <p className="text-slate-600 leading-relaxed text-lg">{section.content}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* FAQ Detail View */}
              {activeView === 'faq' && (
                <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-100 shadow-lg">
                  <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Frequently Asked Questions</h1>
                  <div className="space-y-4">
                    {faqItems.map((item) => (
                      <div key={item.id} className="border border-slate-100 rounded-2xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                          className="w-full flex items-center justify-between px-6 py-5 hover:bg-slate-50 transition-colors text-left bg-slate-50/50"
                        >
                          <span className="text-base font-semibold text-slate-800">{item.question}</span>
                          <ChevronDown size={20} className={`text-slate-400 transition-transform duration-200 ${openFaq === item.id ? 'rotate-180' : ''}`} />
                        </button>
                        {openFaq === item.id && (
                          <div className="px-6 pb-5 pt-2 bg-white">
                            <p className="text-slate-600 leading-relaxed text-base">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Article Detail View */}
              {activeView === 'article' && activeItemId && (
                <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-100 shadow-lg">
                  {(() => {
                    const article = knowledgeBaseArticles.find(a => a.id === activeItemId);
                    return (
                      <>
                        <div className={`inline-flex p-4 ${article?.bg} rounded-2xl mb-6`}>
                          <FileText size={32} className={article?.color} />
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{article?.title}</h1>
                        <p className="text-slate-500 mb-8">{article?.description}</p>
                        <div className="whitespace-pre-line text-slate-700 leading-relaxed text-base">
                          {article?.content}
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}


            </div>
          )}
        </div>
      </main>
    </div>
  );
}
