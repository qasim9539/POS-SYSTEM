import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';

const SettingsPage = () => {
  const [twoFA, setTwoFA] = useState(true);
  const [lowStock, setLowStock] = useState(true);
  const [salesReports, setSalesReports] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [sidebarCollapse, setSidebarCollapse] = useState(false);
  const [lightMode, setLightMode] = useState(true);

  const Toggle = ({ checked, onChange }) => (
    <div
      onClick={() => onChange(!checked)}
      className={`w-10 h-6 rounded-full cursor-pointer transition-all duration-300 flex items-center px-1 ${checked ? 'bg-blue-600' : 'bg-gray-300'}`}
    >
      <div className={`w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">

      <Sidebar collapsed={sidebarCollapse} setCollapsed={setSidebarCollapse} />

      {/* ========== MAIN CONTENT ========== */}
      <div className="flex-1 overflow-y-auto flex flex-col h-screen">

        {/* TOPBAR */}
        <div className="bg-white border-b border-gray-200 px-7 py-3 flex items-center justify-between sticky top-0 z-40">
          <div>
            <h1 className="text-xl font-bold text-[#1e2a4a]">Settings</h1>
            <p className="text-xs text-gray-400">Home / <span className="text-blue-600">Settings</span></p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 w-52">
              <span className="text-gray-400 text-sm">🔍</span>
              <input className="bg-transparent outline-none text-sm text-gray-600 w-full" placeholder="Search anything..." />
              <span className="bg-gray-200 text-gray-500 text-[10px] px-1.5 py-0.5 rounded">⌘ K</span>
            </div>
            <div className="relative w-9 h-9 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer">
              <span className="text-base">🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center">8</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-indigo-200 flex items-center justify-center text-xs">👤</div>
              <span className="text-sm font-semibold text-[#1e2a4a]">Admin</span>
              <span className="text-gray-400 text-xs">▾</span>
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-7 flex flex-col gap-5">

          {/* TOP 3 CARDS */}
          <div className="grid grid-cols-3 gap-5">

            {/* Security */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="flex items-center gap-2 font-bold text-[#1e2a4a] text-sm mb-4">
                <span className="text-blue-600">🛡️</span> Security
              </h2>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-sm">🔒</div>
                  <div>
                    <div className="text-xs font-semibold text-[#1e2a4a]">Change Password</div>
                    <div className="text-[10px] text-gray-400 leading-tight">Update your password regularly<br/>to keep your account secure.</div>
                  </div>
                </div>
                <span className="text-gray-300 text-lg">›</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-sm">🛡️</div>
                  <div>
                    <div className="text-xs font-semibold text-[#1e2a4a]">Two-Factor Authentication</div>
                    <div className="text-[10px] text-gray-400 leading-tight">Add an extra layer of security<br/>to your account.</div>
                  </div>
                </div>
                <Toggle checked={twoFA} onChange={setTwoFA} />
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-sm">📈</div>
                  <div>
                    <div className="text-xs font-semibold text-[#1e2a4a]">Login Activity</div>
                    <div className="text-[10px] text-gray-400 leading-tight">See where and when your account<br/>has been accessed.</div>
                  </div>
                </div>
                <span className="text-gray-300 text-lg">›</span>
              </div>
              <button className="w-full mt-3 border border-gray-200 rounded-lg py-2 text-xs text-blue-600 font-semibold hover:bg-blue-50 transition-all">
                View All Security Activity
              </button>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="flex items-center gap-2 font-bold text-[#1e2a4a] text-sm mb-4">
                <span className="text-blue-600">🔔</span> Notifications
              </h2>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-sm">🔔</div>
                  <div>
                    <div className="text-xs font-semibold text-[#1e2a4a]">Low Stock Alerts</div>
                    <div className="text-[10px] text-gray-400">Get notified when stock is low</div>
                  </div>
                </div>
                <Toggle checked={lowStock} onChange={setLowStock} />
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-sm">📊</div>
                  <div>
                    <div className="text-xs font-semibold text-[#1e2a4a]">Sales Reports</div>
                    <div className="text-[10px] text-gray-400">Receive daily/weekly sales reports</div>
                  </div>
                </div>
                <Toggle checked={salesReports} onChange={setSalesReports} />
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-sm">✉️</div>
                  <div>
                    <div className="text-xs font-semibold text-[#1e2a4a]">Email Notifications</div>
                    <div className="text-[10px] text-gray-400">Receive important updates via email</div>
                  </div>
                </div>
                <Toggle checked={emailNotif} onChange={setEmailNotif} />
              </div>
              <button className="w-full mt-3 border border-gray-200 rounded-lg py-2 text-xs text-blue-600 font-semibold hover:bg-blue-50 transition-all">
                Manage All Notifications
              </button>
            </div>

            {/* Business Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="flex items-center gap-2 font-bold text-[#1e2a4a] text-sm mb-4">
                <span className="text-blue-600">💼</span> Business Settings
              </h2>
              <div className="mb-3">
                <label className="text-[11px] text-gray-400 block mb-1">Business Name</label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1e2a4a] outline-none focus:border-blue-400" defaultValue="SmartStock Solutions" />
              </div>
              <div className="mb-3">
                <label className="text-[11px] text-gray-400 block mb-1">Currency</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1e2a4a] outline-none appearance-none">
                  <option>USD - US Dollar</option>
                  <option>EUR - Euro</option>
                  <option>PKR - Pakistani Rupee</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="text-[11px] text-gray-400 block mb-1">Time Zone</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-[#1e2a4a] outline-none appearance-none">
                  <option>(UTC-08:00) Pacific Time (US & Canada)</option>
                  <option>(UTC+05:00) Karachi</option>
                </select>
              </div>
              <button className="w-full bg-[#0f1f45] text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-[#1a2f5e] transition-all">
                Save Changes
              </button>
            </div>
          </div>

          {/* BOTTOM 2 CARDS */}
          <div className="grid grid-cols-2 gap-5">

            {/* Appearance */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="flex items-center gap-2 font-bold text-[#1e2a4a] text-sm mb-4">
                <span className="text-blue-600">🎨</span> Appearance
              </h2>
              <div
                onClick={() => setLightMode(true)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 mb-2 cursor-pointer transition-all ${lightMode ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">☀️</span>
                  <div>
                    <div className="text-xs font-semibold text-[#1e2a4a]">Light Mode</div>
                    <div className="text-[10px] text-gray-400">Clean and bright interface</div>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${lightMode ? 'border-blue-600' : 'border-gray-300'}`}>
                  {lightMode && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                </div>
              </div>
              <div
                onClick={() => setLightMode(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${!lightMode ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🌙</span>
                  <div>
                    <div className="text-xs font-semibold text-[#1e2a4a]">Dark Mode</div>
                    <div className="text-[10px] text-gray-400">Comfortable for low light</div>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${!lightMode ? 'border-blue-600' : 'border-gray-300'}`}>
                  {!lightMode && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 mt-1 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="text-base">⊟</span>
                  <div>
                    <div className="text-xs font-semibold text-[#1e2a4a]">Sidebar Collapse</div>
                    <div className="text-[10px] text-gray-400">Allow sidebar to be collapsed</div>
                  </div>
                </div>
                <Toggle checked={sidebarCollapse} onChange={setSidebarCollapse} />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="flex items-center gap-2 font-bold text-[#1e2a4a] text-sm mb-4">
                <span className="text-blue-600">⚡</span> Quick Actions
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center gap-1">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-1">💾</div>
                  <div className="text-xs font-semibold text-[#1e2a4a]">Save Settings</div>
                  <div className="text-[10px] text-gray-400 leading-tight">Save all configuration changes</div>
                  <button className="w-full mt-1 bg-[#0f1f45] text-white text-xs py-1.5 rounded-lg hover:bg-[#1a2f5e] transition-all">Save Now</button>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-2xl mb-1">🔄</div>
                  <div className="text-xs font-semibold text-[#1e2a4a]">Reset Settings</div>
                  <div className="text-[10px] text-gray-400 leading-tight">Reset all settings to default values</div>
                  <button className="w-full mt-1 bg-[#0f1f45] text-white text-xs py-1.5 rounded-lg hover:bg-[#1a2f5e] transition-all">Reset Now</button>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl mb-1">☁️</div>
                  <div className="text-xs font-semibold text-[#1e2a4a]">Backup Data</div>
                  <div className="text-[10px] text-gray-400 leading-tight">Create a backup of your system data</div>
                  <button className="w-full mt-1 bg-[#0f1f45] text-white text-xs py-1.5 rounded-lg hover:bg-[#1a2f5e] transition-all">Backup Now</button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-auto px-7 py-4 border-t border-gray-200 bg-white flex justify-between text-xs text-gray-400">
          <span>© 2025 SmartStock Solutions. All rights reserved.</span>
          <span>Version 2.1.0</span>
        </div>
      </div>

    </div>
  );
};

export default SettingsPage;