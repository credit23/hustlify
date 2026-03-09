import { Outlet, useNavigate, useLocation } from "react-router";
import { LayoutDashboard, Briefcase, FileText, User, LogOut, Sun, Moon, Bell, Bot, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import hustlifyLogo from "../../../assets/ee079ff6b92e2af14de5404d0251f4a3326be5ea.png";
import imgProfile from "../../../assets/225350e362ddcd84f3581c2fdf7b5ea867eadc53.png";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { id: "jobs",      label: "Browse Jobs", icon: Briefcase,       path: "/dashboard/jobs" },
  { id: "apps",      label: "Applications", icon: FileText,       path: "/dashboard/applications" },
  { id: "profile",   label: "Profile",     icon: User,            path: "/dashboard/profile" },
];

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) =>
    path === "/dashboard"
      ? location.pathname === "/dashboard"
      : location.pathname.startsWith(path);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setShowMenu(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-[#0F0F1A]" : "bg-gradient-to-br from-[#F5F3FF] via-[#FAFBFF] to-[#EBF4FF]"}`}>

      {/* Top Navbar */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b shadow-sm transition-colors duration-300 ${darkMode ? "bg-[#1A1A2E]/90 border-[#2D2D4A]" : "bg-white/90 border-[#E5E7EB]"}`}>
        <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between gap-4">

          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex-shrink-0">
            <img src={hustlifyLogo} alt="Hustlify" className="h-12 object-contain" />
          </button>

          {/* Nav pills */}
          <nav className={`flex items-center rounded-2xl p-1 gap-1 transition-colors duration-300 ${darkMode ? "bg-[#2D2D4A]" : "bg-[#F3F4F6]"}`}>
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white shadow-md"
                    : darkMode ? "text-[#9CA3AF] hover:text-white hover:bg-[#3D3D5A]" : "text-[#6B7280] hover:text-[#1A1A3E] hover:bg-white"
                }`}
                style={{ fontSize: "0.88rem", fontWeight: isActive(item.path) ? 600 : 500 }}
              >
                <item.icon size={17} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right: avatar + dropdown */}
          <div className="flex items-center gap-3 flex-shrink-0 relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${darkMode ? "hover:bg-[#2D2D4A]" : "hover:bg-[#F8F7FF]"}`}
            >
              <img src={imgProfile} alt="Profile" className="w-9 h-9 rounded-xl object-cover ring-2 ring-[#6D28D9]/30" />
              <div className="text-left">
                <p className={darkMode ? "text-white" : "text-[#1A1A3E]"} style={{ fontSize: "0.88rem", fontWeight: 600 }}>Karim Benali</p>
                <p className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>Employee</p>
              </div>
              <ChevronDown size={14} className="text-[#9CA3AF]" />
            </button>

            {showMenu && (
              <div className={`absolute top-full right-0 mt-2 w-64 rounded-2xl shadow-2xl border py-2 z-[200] ${darkMode ? "bg-[#1A1A2E] border-[#2D2D4A]" : "bg-white border-[#E5E7EB]"}`}>
                {/* Header */}
                <div className={`flex items-center gap-3 px-4 py-3 border-b mb-1 ${darkMode ? "border-[#2D2D4A]" : "border-[#F3F4F6]"}`}>
                  <img src={imgProfile} alt="Profile" className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <p className={darkMode ? "text-white" : "text-[#1A1A3E]"} style={{ fontSize: "0.92rem", fontWeight: 700 }}>Karim Benali</p>
                    <p className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>Mobile Developer</p>
                  </div>
                </div>

                {[
                  { icon: User, label: "Profile", action: () => { navigate("/dashboard/profile"); setShowMenu(false); } },
                  { icon: Bell, label: "Notifications", action: () => setShowMenu(false) },
                  { icon: Bot, label: "Hustlify.AI", action: () => setShowMenu(false) },
                ].map(({ icon: Icon, label, action }) => (
                  <button key={label} onClick={action}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left ${darkMode ? "hover:bg-[#2D2D4A]" : "hover:bg-[#F8F7FF]"}`}
                    style={{ fontSize: "0.9rem" }}>
                    <Icon size={18} className="text-[#6D28D9]" />
                    <span className={darkMode ? "text-[#E5E7EB]" : "text-[#1A1A3E]"} style={{ fontWeight: 500 }}>{label}</span>
                  </button>
                ))}

                {/* Dark mode toggle */}
                <button onClick={() => setDarkMode(!darkMode)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 transition-colors ${darkMode ? "hover:bg-[#2D2D4A]" : "hover:bg-[#F8F7FF]"}`}>
                  <div className="flex items-center gap-3">
                    <div className="relative w-[18px] h-[18px]">
                      <Sun size={18} className={`absolute inset-0 text-[#F59E0B] transition-all duration-500 ${darkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"}`} />
                      <Moon size={18} className={`absolute inset-0 text-[#6D28D9] transition-all duration-500 ${darkMode ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`} />
                    </div>
                    <span className={darkMode ? "text-[#E5E7EB]" : "text-[#1A1A3E]"} style={{ fontSize: "0.9rem", fontWeight: 500 }}>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                  </div>
                  <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${darkMode ? "bg-[#6D28D9]" : "bg-[#D1D5DB]"}`}>
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${darkMode ? "translate-x-5 bg-white" : "translate-x-0.5 bg-white"}`}>
                      {darkMode ? <Sun size={11} className="text-[#F59E0B]" /> : <Moon size={11} className="text-[#6D28D9]" />}
                    </div>
                  </div>
                </button>

                <div className={`border-t mt-1 pt-1 ${darkMode ? "border-[#2D2D4A]" : "border-[#F3F4F6]"}`}>
                  <button onClick={() => navigate("/")}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors ${darkMode ? "hover:bg-[#2D1515]" : "hover:bg-[#FEF2F2]"}`}
                    style={{ fontSize: "0.9rem" }}>
                    <LogOut size={18} className="text-[#EF4444]" />
                    <span className="text-[#EF4444]" style={{ fontWeight: 500 }}>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
