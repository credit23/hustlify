import { Outlet, NavLink, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  MessageSquare,
  Bell,
  Settings,
  User,
  Search,
  ChevronDown,
  LogOut,
  Building2,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import hustlifyLogo from "figma:asset/ee079ff6b92e2af14de5404d0251f4a3326be5ea.png";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
  { icon: MessageSquare, label: "Messages", to: "/dashboard/messages" },
  { icon: Bell, label: "Notifications", to: "/dashboard/notifications" },
  { icon: Settings, label: "Settings", to: "/dashboard/settings" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#EEF2FF] to-[#EBF4FF] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-white/90 backdrop-blur-sm border-r border-slate-200 flex flex-col shadow-sm shrink-0">
        {/* Logo */}
        <div className="p-5 border-b border-slate-100">
          <button
            onClick={() => navigate("/")}
            className="flex items-center"
          >
            <img src={hustlifyLogo} alt="Hustlify" className="h-12 object-contain" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/dashboard"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#6D28D9]/10 to-[#2563EB]/10 text-[#6D28D9]"
                    : "text-[#6B7280] hover:bg-blue-50 hover:text-[#6D28D9]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    size={18}
                    className={isActive ? "text-[#6D28D9]" : "text-[#9CA3AF]"}
                  />
                  <span
                    style={{ fontWeight: isActive ? 600 : 400, fontSize: "0.875rem" }}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6D28D9]" />
                  )}
                </>
              )}
            </NavLink>
          ))}

          <div className="pt-4 border-t border-slate-100 mt-4">
            {/* Hustlify.AI special nav item */}
            <NavLink
              to="/dashboard/hustlify-ai"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 mb-2 ${
                  isActive
                    ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white shadow-md shadow-blue-200/50"
                    : "bg-gradient-to-r from-[#6D28D9]/5 to-[#2563EB]/5 text-[#6D28D9] hover:from-[#6D28D9]/10 hover:to-[#2563EB]/10"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Sparkles
                    size={18}
                    className={isActive ? "text-white" : "text-[#6D28D9]"}
                  />
                  <span
                    style={{ fontWeight: 700, fontSize: "0.875rem" }}
                  >
                    Hustlify.AI
                  </span>
                  {!isActive && (
                    <span className="ml-auto px-1.5 py-0.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-md" style={{ fontSize: "0.6rem", fontWeight: 700 }}>
                      NEW
                    </span>
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-[#6D28D9]/10 to-[#2563EB]/10 text-[#6D28D9]"
                    : "text-[#6B7280] hover:bg-blue-50 hover:text-[#6D28D9]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <User
                    size={18}
                    className={isActive ? "text-[#6D28D9]" : "text-[#9CA3AF]"}
                  />
                  <span
                    style={{ fontWeight: isActive ? 600 : 400, fontSize: "0.875rem" }}
                  >
                    My Profile
                  </span>
                </>
              )}
            </NavLink>
          </div>
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-slate-100 relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="flex items-center gap-2 w-full px-2 py-2 rounded-xl hover:bg-blue-50 transition-colors"
          >
            <img
              src="https://images.unsplash.com/photo-1738750908048-14200459c3c9?w=80&q=80"
              className="w-8 h-8 rounded-full object-cover border-2 border-blue-200"
              alt="Alex Johnson"
            />
            <div className="flex-1 text-left min-w-0">
              <p
                className="text-[#1A1A3E] truncate"
                style={{ fontSize: "0.8rem", fontWeight: 600 }}
              >
                Alex Johnson
              </p>
              <p className="text-[#9CA3AF] truncate" style={{ fontSize: "0.7rem" }}>
                Client
              </p>
            </div>
            <ChevronDown size={14} className="text-[#9CA3AF]" />
          </button>

          {userMenuOpen && (
            <div className="absolute bottom-16 left-4 right-4 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
              <button
                onClick={() => navigate("/enterprise/dashboard")}
                className="flex items-center gap-2 w-full px-3 py-2.5 hover:bg-blue-50 text-[#1A1A3E] transition-colors"
                style={{ fontSize: "0.8rem" }}
              >
                <Building2 size={14} className="text-[#6D28D9]" />
                Enterprise Dashboard
              </button>
              <button
                onClick={() => navigate("/client/dashboard")}
                className="flex items-center gap-2 w-full px-3 py-2.5 hover:bg-blue-50 text-[#1A1A3E] transition-colors"
                style={{ fontSize: "0.8rem" }}
              >
                <Briefcase size={14} className="text-[#6D28D9]" />
                Client Dashboard
              </button>
              <div className="border-t border-slate-100" />
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 w-full px-3 py-2.5 hover:bg-red-50 text-red-500 transition-colors"
                style={{ fontSize: "0.8rem" }}
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-16 bg-white/70 backdrop-blur-sm border-b border-slate-200 flex items-center px-6 gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
              />
              <input
                type="text"
                placeholder="Search employees..."
                className="w-full pl-9 pr-4 py-2 bg-blue-50 rounded-xl border border-blue-100 text-[#1A1A3E] placeholder-[#9CA3AF] outline-none focus:border-[#6D28D9] transition-colors"
                style={{ fontSize: "0.875rem" }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button className="relative p-2 rounded-xl hover:bg-blue-50 transition-colors">
              <Bell size={18} className="text-[#6B7280]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="relative p-2 rounded-xl hover:bg-blue-50 transition-colors">
              <MessageSquare size={18} className="text-[#6B7280]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#6D28D9] rounded-full" />
            </button>
            <img
              src="https://images.unsplash.com/photo-1738750908048-14200459c3c9?w=80&q=80"
              className="w-9 h-9 rounded-xl object-cover border-2 border-blue-200 cursor-pointer"
              alt="Profile"
            />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}