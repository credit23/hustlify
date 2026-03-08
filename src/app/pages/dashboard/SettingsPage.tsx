import { useState } from "react";
import {
  User,
  Shield,
  Bell,
  Globe,
  Key,
  Smartphone,
  Eye,
  EyeOff,
  Check,
  ChevronRight,
  Moon,
  Sun,
  Languages,
} from "lucide-react";

type SettingsTab = "account" | "security" | "notifications" | "language";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account");
  const [showPassword, setShowPassword] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [notifSettings, setNotifSettings] = useState({
    emailJobs: true,
    emailMessages: true,
    emailSystem: false,
    pushJobs: true,
    pushMessages: true,
    pushSystem: true,
    smsJobs: false,
    smsMessages: false,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const tabs = [
    { key: "account" as const, icon: User, label: "Account Settings" },
    { key: "security" as const, icon: Shield, label: "Security" },
    { key: "notifications" as const, icon: Bell, label: "Notifications" },
    { key: "language" as const, icon: Globe, label: "Language & Region" },
  ];

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.4rem" }}>
          Settings
        </h1>
        <p className="text-[#6B7280]" style={{ fontSize: "0.875rem" }}>
          Manage your account preferences and settings
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <div className="w-52 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-purple-100 overflow-hidden">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-all border-b border-purple-50 last:border-0 ${
                  activeTab === tab.key
                    ? "bg-gradient-to-r from-[#6C63FF]/10 to-[#9B8FFF]/10 text-[#6C63FF]"
                    : "text-[#6B7280] hover:bg-purple-50"
                }`}
              >
                <tab.icon size={16} className={activeTab === tab.key ? "text-[#6C63FF]" : "text-[#9CA3AF]"} />
                <span style={{ fontSize: "0.85rem", fontWeight: activeTab === tab.key ? 600 : 400 }}>
                  {tab.label}
                </span>
                {activeTab === tab.key && (
                  <ChevronRight size={14} className="ml-auto text-[#6C63FF]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Account Settings */}
          {activeTab === "account" && (
            <div className="bg-white rounded-2xl border border-purple-100 p-6">
              <h2 className="text-[#1A1A3E] mb-5" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                Account Settings
              </h2>

              {/* Avatar */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-purple-50">
                <img
                  src="https://images.unsplash.com/photo-1738750908048-14200459c3c9?w=120&q=80"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-200"
                  alt="Profile"
                />
                <div>
                  <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                    Alex Johnson
                  </p>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.8rem" }}>
                    Client · Alger, Algeria
                  </p>
                  <button className="mt-2 px-3 py-1 text-[#6C63FF] bg-[#F0EEFF] rounded-lg hover:bg-purple-100 transition-colors" style={{ fontSize: "0.78rem", fontWeight: 500 }}>
                    Change Photo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "First Name", value: "Alex", placeholder: "First name" },
                  { label: "Last Name", value: "Johnson", placeholder: "Last name" },
                  { label: "Email", value: "alex@example.com", placeholder: "Email", full: true },
                  { label: "Phone", value: "+213 770 123 456", placeholder: "Phone number" },
                  { label: "City / Wilaya", value: "Alger", placeholder: "City" },
                  { label: "Profession", value: "Product Manager", placeholder: "Your profession" },
                ].map((field) => (
                  <div key={field.label} className={field.full ? "col-span-2" : ""}>
                    <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      {field.label}
                    </label>
                    <input
                      defaultValue={field.value}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-2.5 bg-[#F5F3FF] rounded-xl border border-purple-100 text-[#1A1A3E] outline-none focus:border-[#6C63FF] transition-colors"
                      style={{ fontSize: "0.875rem" }}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                  Bio
                </label>
                <textarea
                  rows={3}
                  defaultValue="Product Manager with 5+ years experience in SaaS and fintech. Based in Algiers."
                  className="w-full px-4 py-2.5 bg-[#F5F3FF] rounded-xl border border-purple-100 text-[#1A1A3E] outline-none focus:border-[#6C63FF] transition-colors resize-none"
                  style={{ fontSize: "0.875rem" }}
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all ${
                    saved
                      ? "bg-green-500 text-white"
                      : "bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white hover:opacity-90"
                  }`}
                  style={{ fontWeight: 600, fontSize: "0.875rem" }}
                >
                  {saved ? <><Check size={16} /> Saved!</> : "Save Changes"}
                </button>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="space-y-4">
              {/* Change Password */}
              <div className="bg-white rounded-2xl border border-purple-100 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Key size={18} className="text-[#6C63FF]" />
                  <h2 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                    Change Password
                  </h2>
                </div>
                <div className="space-y-4">
                  {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                    <div key={label}>
                      <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                        {label}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className="w-full px-4 py-2.5 pr-10 bg-[#F5F3FF] rounded-xl border border-purple-100 text-[#1A1A3E] outline-none focus:border-[#6C63FF] transition-colors"
                          style={{ fontSize: "0.875rem" }}
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6C63FF] transition-colors"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="text-[#9CA3AF] mb-1" style={{ fontSize: "0.78rem" }}>Password strength</div>
                  <div className="flex gap-1">
                    {["bg-red-400", "bg-yellow-400", "bg-green-400", "bg-green-400"].map((color, i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full ${color}`} />
                    ))}
                  </div>
                  <p className="text-green-500 mt-1" style={{ fontSize: "0.75rem" }}>Strong password</p>
                </div>
                <div className="flex justify-end mt-5">
                  <button className="px-5 py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl hover:opacity-90 transition-opacity" style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                    Update Password
                  </button>
                </div>
              </div>

              {/* 2FA */}
              <div className="bg-white rounded-2xl border border-purple-100 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F0EEFF] flex items-center justify-center">
                      <Smartphone size={18} className="text-[#6C63FF]" />
                    </div>
                    <div>
                      <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                        Two-Factor Authentication
                      </p>
                      <p className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setTwoFAEnabled(!twoFAEnabled)}
                    className={`w-12 h-6 rounded-full transition-all relative ${
                      twoFAEnabled ? "bg-[#6C63FF]" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${
                        twoFAEnabled ? "left-6" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
                {twoFAEnabled && (
                  <div className="mt-4 p-4 bg-[#F0EEFF] rounded-xl border border-purple-100">
                    <p className="text-[#6C63FF] mb-2" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      2FA is now active ✓
                    </p>
                    <p className="text-[#6B7280]" style={{ fontSize: "0.78rem" }}>
                      A verification code will be sent to your phone (+213 770 ***) on each login.
                    </p>
                  </div>
                )}
              </div>

              {/* Active Sessions */}
              <div className="bg-white rounded-2xl border border-purple-100 p-6">
                <h3 className="text-[#1A1A3E] mb-4" style={{ fontWeight: 600, fontSize: "0.95rem" }}>
                  Active Sessions
                </h3>
                {[
                  { device: "Chrome · Alger, Algeria", time: "Current session", current: true },
                  { device: "Firefox · Oran, Algeria", time: "2 hours ago", current: false },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-purple-50 last:border-0">
                    <div>
                      <p className="text-[#1A1A3E]" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                        {session.device}
                        {session.current && (
                          <span className="ml-2 px-1.5 py-0.5 bg-green-100 text-green-600 rounded-md" style={{ fontSize: "0.65rem" }}>
                            Current
                          </span>
                        )}
                      </p>
                      <p className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>{session.time}</p>
                    </div>
                    {!session.current && (
                      <button className="text-red-500 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors" style={{ fontSize: "0.78rem" }}>
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="bg-white rounded-2xl border border-purple-100 p-6">
              <h2 className="text-[#1A1A3E] mb-5" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                Notification Preferences
              </h2>
              <div className="space-y-6">
                {[
                  { key: "Jobs", label: "Job Invitations & Updates", desc: "Get notified about new job opportunities" },
                  { key: "Messages", label: "Messages", desc: "Notifications for new messages and replies" },
                  { key: "System", label: "System Alerts", desc: "Account updates, security alerts, platform news" },
                ].map((category) => (
                  <div key={category.key} className="pb-6 border-b border-purple-50 last:border-0 last:pb-0">
                    <p className="text-[#1A1A3E] mb-0.5" style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                      {category.label}
                    </p>
                    <p className="text-[#9CA3AF] mb-4" style={{ fontSize: "0.78rem" }}>
                      {category.desc}
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {["Email", "Push", "SMS"].map((channel) => {
                        const stateKey = `${channel.toLowerCase()}${category.key}` as keyof typeof notifSettings;
                        return (
                          <div key={channel} className="flex items-center justify-between p-3 bg-[#F5F3FF] rounded-xl">
                            <span className="text-[#6B7280]" style={{ fontSize: "0.8rem" }}>{channel}</span>
                            <button
                              onClick={() =>
                                setNotifSettings((prev) => ({
                                  ...prev,
                                  [stateKey]: !prev[stateKey],
                                }))
                              }
                              className={`w-10 h-5 rounded-full transition-all relative ${
                                notifSettings[stateKey] ? "bg-[#6C63FF]" : "bg-gray-200"
                              }`}
                            >
                              <div
                                className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${
                                  notifSettings[stateKey] ? "left-5" : "left-0.5"
                                }`}
                              />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all ${
                    saved ? "bg-green-500 text-white" : "bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white hover:opacity-90"
                  }`}
                  style={{ fontWeight: 600, fontSize: "0.875rem" }}
                >
                  {saved ? <><Check size={16} /> Saved!</> : "Save Preferences"}
                </button>
              </div>
            </div>
          )}

          {/* Language & Region */}
          {activeTab === "language" && (
            <div className="bg-white rounded-2xl border border-purple-100 p-6">
              <h2 className="text-[#1A1A3E] mb-5" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                Language & Region
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    <Languages size={14} className="inline mr-1.5" />
                    Interface Language
                  </label>
                  <select className="w-full px-4 py-2.5 bg-[#F5F3FF] rounded-xl border border-purple-100 text-[#1A1A3E] outline-none focus:border-[#6C63FF] transition-colors appearance-none" style={{ fontSize: "0.875rem" }}>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="ar">العربية</option>
                    <option value="tzm">Tamazight</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    <Globe size={14} className="inline mr-1.5" />
                    Country / Region
                  </label>
                  <select className="w-full px-4 py-2.5 bg-[#F5F3FF] rounded-xl border border-purple-100 text-[#1A1A3E] outline-none focus:border-[#6C63FF] transition-colors appearance-none" style={{ fontSize: "0.875rem" }}>
                    <option value="dz">Algeria 🇩🇿</option>
                    <option value="tn">Tunisia 🇹🇳</option>
                    <option value="ma">Morocco 🇲🇦</option>
                    <option value="fr">France 🇫🇷</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Timezone
                  </label>
                  <select className="w-full px-4 py-2.5 bg-[#F5F3FF] rounded-xl border border-purple-100 text-[#1A1A3E] outline-none focus:border-[#6C63FF] transition-colors appearance-none" style={{ fontSize: "0.875rem" }}>
                    <option>Africa/Algiers (UTC+1)</option>
                    <option>Europe/Paris (UTC+2)</option>
                    <option>UTC (UTC+0)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Currency
                  </label>
                  <select className="w-full px-4 py-2.5 bg-[#F5F3FF] rounded-xl border border-purple-100 text-[#1A1A3E] outline-none focus:border-[#6C63FF] transition-colors appearance-none" style={{ fontSize: "0.875rem" }}>
                    <option>DZD — Algerian Dinar</option>
                    <option>EUR — Euro</option>
                    <option>USD — US Dollar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#1A1A3E] mb-3" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Theme
                  </label>
                  <div className="flex gap-3">
                    {[
                      { label: "Light", icon: Sun, active: true },
                      { label: "Dark", icon: Moon, active: false },
                    ].map((theme) => (
                      <button
                        key={theme.label}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 transition-all ${
                          theme.active
                            ? "border-[#6C63FF] bg-[#F0EEFF] text-[#6C63FF]"
                            : "border-purple-100 bg-white text-[#6B7280] hover:border-purple-200"
                        }`}
                        style={{ fontSize: "0.875rem", fontWeight: 500 }}
                      >
                        <theme.icon size={15} />
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all ${
                    saved ? "bg-green-500 text-white" : "bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white hover:opacity-90"
                  }`}
                  style={{ fontWeight: 600, fontSize: "0.875rem" }}
                >
                  {saved ? <><Check size={16} /> Saved!</> : "Save Preferences"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
