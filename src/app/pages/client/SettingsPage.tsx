import { useState } from "react";
import { motion } from "motion/react";
import { Bell, Lock, Globe, Eye, Mail, Shield, CreditCard, Smartphone, Monitor, Moon, Sun, Check } from "lucide-react";

export default function ClientSettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [applicationAlerts, setApplicationAlerts] = useState(true);
  const [messageAlerts, setMessageAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "auto">("light");
  const [language, setLanguage] = useState("en");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#FAFBFF] to-[#EBF4FF] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#1A1A3E] mb-2" style={{ fontSize: "2rem", fontWeight: 700 }}>
            Settings
          </h1>
          <p className="text-[#9CA3AF]" style={{ fontSize: "1rem" }}>
            Manage your account preferences and settings
          </p>
        </div>

        {/* Notifications Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-[#E5E7EB] p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F0EEFF] to-[#E5D9FF] flex items-center justify-center">
              <Bell size={20} className="text-[#6D28D9]" />
            </div>
            <div>
              <h2 className="text-[#1A1A3E]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                Notifications
              </h2>
              <p className="text-[#9CA3AF]" style={{ fontSize: "0.85rem" }}>
                Configure how you receive notifications
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <ToggleSetting
              icon={Mail}
              label="Email Notifications"
              description="Receive notifications via email"
              checked={emailNotifications}
              onChange={setEmailNotifications}
            />
            <ToggleSetting
              icon={Smartphone}
              label="Push Notifications"
              description="Receive push notifications on your device"
              checked={pushNotifications}
              onChange={setPushNotifications}
            />
            <ToggleSetting
              icon={Bell}
              label="Application Alerts"
              description="Get notified when someone applies to your jobs"
              checked={applicationAlerts}
              onChange={setApplicationAlerts}
            />
            <ToggleSetting
              icon={Bell}
              label="Message Alerts"
              description="Get notified when you receive new messages"
              checked={messageAlerts}
              onChange={setMessageAlerts}
            />
            <ToggleSetting
              icon={Mail}
              label="Weekly Digest"
              description="Receive a weekly summary of your activity"
              checked={weeklyDigest}
              onChange={setWeeklyDigest}
            />
          </div>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-[#E5E7EB] p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EBF4FF] to-[#DBEAFE] flex items-center justify-center">
              <Shield size={20} className="text-[#2563EB]" />
            </div>
            <div>
              <h2 className="text-[#1A1A3E]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                Privacy & Security
              </h2>
              <p className="text-[#9CA3AF]" style={{ fontSize: "0.85rem" }}>
                Control your privacy and security settings
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Profile Visibility */}
            <div className="p-4 bg-[#F8F7FF] rounded-xl">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <Eye size={18} className="text-[#6D28D9]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#1A1A3E] mb-1" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                    Profile Visibility
                  </h4>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.8rem" }}>
                    Control who can see your profile
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["public", "private", "connections"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setProfileVisibility(option)}
                    className={`px-4 py-2.5 rounded-lg transition-all capitalize ${
                      profileVisibility === option
                        ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white shadow-md"
                        : "bg-white text-[#6B7280] hover:bg-[#F0EEFF]"
                    }`}
                    style={{ fontSize: "0.85rem", fontWeight: 600 }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <ToggleSetting
              icon={Lock}
              label="Two-Factor Authentication"
              description="Add an extra layer of security to your account"
              checked={twoFactorAuth}
              onChange={setTwoFactorAuth}
            />

            <button className="w-full p-4 bg-[#F8F7FF] rounded-xl hover:bg-[#F0EEFF] transition-all flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <Lock size={18} className="text-[#6D28D9]" />
                </div>
                <div className="text-left">
                  <h4 className="text-[#1A1A3E] mb-1" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                    Change Password
                  </h4>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.8rem" }}>
                    Update your password regularly
                  </p>
                </div>
              </div>
              <span className="text-[#6D28D9]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                Update
              </span>
            </button>
          </div>
        </motion.div>

        {/* Appearance Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-[#E5E7EB] p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FCE7F3] to-[#FBCFE8] flex items-center justify-center">
              <Monitor size={20} className="text-[#EC4899]" />
            </div>
            <div>
              <h2 className="text-[#1A1A3E]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                Appearance
              </h2>
              <p className="text-[#9CA3AF]" style={{ fontSize: "0.85rem" }}>
                Customize how Hustlify looks
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Theme Selection */}
            <div className="p-4 bg-[#F8F7FF] rounded-xl">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  {theme === "light" ? (
                    <Sun size={18} className="text-[#F59E0B]" />
                  ) : theme === "dark" ? (
                    <Moon size={18} className="text-[#6D28D9]" />
                  ) : (
                    <Monitor size={18} className="text-[#6D28D9]" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-[#1A1A3E] mb-1" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                    Theme
                  </h4>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.8rem" }}>
                    Choose your preferred color scheme
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "light", icon: Sun, label: "Light" },
                  { value: "dark", icon: Moon, label: "Dark" },
                  { value: "auto", icon: Monitor, label: "Auto" },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value as any)}
                    className={`px-4 py-3 rounded-lg transition-all flex flex-col items-center gap-1.5 ${
                      theme === option.value
                        ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white shadow-md"
                        : "bg-white text-[#6B7280] hover:bg-[#F0EEFF]"
                    }`}
                  >
                    <option.icon size={20} />
                    <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div className="p-4 bg-[#F8F7FF] rounded-xl">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <Globe size={18} className="text-[#6D28D9]" />
                </div>
                <div className="flex-1">
                  <h4 className="text-[#1A1A3E] mb-1" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                    Language
                  </h4>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.8rem" }}>
                    Select your preferred language
                  </p>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-3 bg-white rounded-lg border border-[#E5E7EB] text-[#1A1A3E] outline-none focus:border-[#6D28D9] transition-all"
                style={{ fontSize: "0.9rem" }}
              >
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-[#FEE2E2] p-6"
        >
          <h2 className="text-[#EF4444] mb-4" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
            Danger Zone
          </h2>
          <div className="space-y-3">
            <button className="w-full p-4 bg-[#FEE2E2] rounded-xl hover:bg-[#FECACA] transition-all flex items-center justify-between">
              <div className="text-left">
                <h4 className="text-[#EF4444] mb-1" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                  Deactivate Account
                </h4>
                <p className="text-[#DC2626]" style={{ fontSize: "0.8rem" }}>
                  Temporarily disable your account
                </p>
              </div>
              <span className="text-[#EF4444]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                Deactivate
              </span>
            </button>
            <button className="w-full p-4 bg-[#FEE2E2] rounded-xl hover:bg-[#FECACA] transition-all flex items-center justify-between">
              <div className="text-left">
                <h4 className="text-[#EF4444] mb-1" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                  Delete Account
                </h4>
                <p className="text-[#DC2626]" style={{ fontSize: "0.8rem" }}>
                  Permanently delete your account and all data
                </p>
              </div>
              <span className="text-[#EF4444]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                Delete
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Toggle Setting Component
function ToggleSetting({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: any;
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="p-4 bg-[#F8F7FF] rounded-xl flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
          <Icon size={18} className="text-[#6D28D9]" />
        </div>
        <div>
          <h4 className="text-[#1A1A3E] mb-1" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
            {label}
          </h4>
          <p className="text-[#9CA3AF]" style={{ fontSize: "0.8rem" }}>
            {description}
          </p>
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-14 h-8 rounded-full transition-all ${
          checked ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB]" : "bg-[#E5E7EB]"
        }`}
      >
        <motion.div
          animate={{ x: checked ? 28 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
        >
          {checked && <Check size={14} className="text-[#6D28D9]" />}
        </motion.div>
      </button>
    </div>
  );
}
