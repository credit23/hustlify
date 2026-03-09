import { Outlet, useNavigate, useLocation } from "react-router";
import { User, LayoutGrid, Users, MessageSquare, Bot, Send, X, Sparkles, Bell, LogOut, Sun, Moon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import hustlifyLogo from "../../../assets/ee079ff6b92e2af14de5404d0251f4a3326be5ea.png";

export default function ClientDashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showAI, setShowAI] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const [aiMessage, setAiMessage] = useState("");
  const [aiMessages, setAiMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  const handleSendAiMessage = () => {
    if (!aiMessage.trim()) return;
    setAiMessages((prev) => [...prev, { role: "user", text: aiMessage }]);
    setTimeout(() => {
      const responses = [
        "I can help you find the perfect candidate! What specific skills are you looking for?",
        "Based on your requirements, I'd recommend filtering by location and rating to find the best match.",
        "Great question! Let me analyze the available candidates for you...",
        "I found several highly-rated professionals who match your criteria. Would you like me to show you their profiles?",
      ];
      setAiMessages((prev) => [...prev, { role: "ai", text: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 1000);
    setAiMessage("");
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const menuItems = [
    { id: "browse", label: "Browse Employees", icon: Users, path: "/client/browse" },
    { id: "overview", label: "Dashboard", icon: LayoutGrid, path: "/client/overview" },
    { id: "messages", label: "Messages", icon: MessageSquare, path: "/client/messages" },
  ];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? "bg-[#0F0F1A]" : "bg-gradient-to-br from-[#F5F3FF] via-[#FAFBFF] to-[#EBF4FF]"}`}>

      {/* Top Navbar */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b shadow-sm transition-colors duration-300 ${darkMode ? "bg-[#1A1A2E]/90 border-[#2D2D4A]" : "bg-white/90 border-[#E5E7EB]"}`}>
        <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between gap-4">

          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center flex-shrink-0">
            <img src={hustlifyLogo} alt="Hustlify" className="h-12 object-contain" />
          </button>

          {/* Center Nav Pills */}
          <nav className={`flex items-center rounded-2xl p-1 gap-1 transition-colors duration-300 ${darkMode ? "bg-[#2D2D4A]" : "bg-[#F3F4F6]"}`}>
            {menuItems.map((item) => (
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

          {/* Right: User info + dropdown */}
          <div className="flex items-center gap-3 flex-shrink-0 relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors cursor-pointer ${darkMode ? "hover:bg-[#2D2D4A]" : "hover:bg-[#F8F7FF]"}`}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#2563EB] flex items-center justify-center">
                <User size={18} className="text-white" />
              </div>
              <div className="text-left">
                <p className={`${darkMode ? "text-white" : "text-[#1A1A3E]"}`} style={{ fontSize: "0.88rem", fontWeight: 600 }}>Alex Johnson</p>
                <p className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>Client</p>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className={`absolute top-full right-0 mt-2 w-64 rounded-2xl shadow-2xl border py-2 z-[200] transition-colors duration-300 ${darkMode ? "bg-[#1A1A2E] border-[#2D2D4A]" : "bg-white border-[#E5E7EB]"}`}>
                {/* User header */}
                <div className={`flex items-center gap-3 px-4 py-3 border-b mb-1 ${darkMode ? "border-[#2D2D4A]" : "border-[#F3F4F6]"}`}>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#2563EB] flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div>
                    <p className={darkMode ? "text-white" : "text-[#1A1A3E]"} style={{ fontSize: "0.92rem", fontWeight: 700 }}>Alex Johnson</p>
                    <p className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>Client</p>
                  </div>
                </div>

                {/* Profile */}
                <button
                  onClick={() => { navigate("/client/profile"); setShowUserMenu(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left ${darkMode ? "hover:bg-[#2D2D4A]" : "hover:bg-[#F8F7FF]"}`}
                  style={{ fontSize: "0.9rem" }}
                >
                  <User size={18} className="text-[#6D28D9]" />
                  <span className={darkMode ? "text-[#E5E7EB]" : "text-[#1A1A3E]"} style={{ fontWeight: 500 }}>Profile</span>
                </button>

                {/* Notifications */}
                <button
                  onClick={() => setShowUserMenu(false)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left ${darkMode ? "hover:bg-[#2D2D4A]" : "hover:bg-[#F8F7FF]"}`}
                  style={{ fontSize: "0.9rem" }}
                >
                  <Bell size={18} className="text-[#6D28D9]" />
                  <span className={darkMode ? "text-[#E5E7EB]" : "text-[#1A1A3E]"} style={{ fontWeight: 500 }}>Notifications</span>
                </button>

                {/* Dark / Light Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 transition-colors ${darkMode ? "hover:bg-[#2D2D4A]" : "hover:bg-[#F8F7FF]"}`}
                >
                  <div className="flex items-center gap-3">
                    {/* Animated icon */}
                    <div className="relative w-[18px] h-[18px]">
                      <Sun
                        size={18}
                        className={`absolute inset-0 text-[#F59E0B] transition-all duration-500 ${darkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"}`}
                      />
                      <Moon
                        size={18}
                        className={`absolute inset-0 text-[#6D28D9] transition-all duration-500 ${darkMode ? "opacity-0 -rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}`}
                      />
                    </div>
                    <span className={darkMode ? "text-[#E5E7EB]" : "text-[#1A1A3E]"} style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                      {darkMode ? "Light Mode" : "Dark Mode"}
                    </span>
                  </div>
                  {/* Toggle pill */}
                  <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${darkMode ? "bg-[#6D28D9]" : "bg-[#D1D5DB]"}`}>
                    <div className={`absolute top-0.5 w-5 h-5 rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${darkMode ? "translate-x-5 bg-white" : "translate-x-0.5 bg-white"}`}>
                      {darkMode
                        ? <Sun size={11} className="text-[#F59E0B]" />
                        : <Moon size={11} className="text-[#6D28D9]" />
                      }
                    </div>
                  </div>
                </button>

                {/* Hustlify AI */}
                <button
                  onClick={() => { setShowAI(true); setShowUserMenu(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left ${darkMode ? "hover:bg-[#2D2D4A]" : "hover:bg-[#F8F7FF]"}`}
                  style={{ fontSize: "0.9rem" }}
                >
                  <Bot size={18} className="text-[#6D28D9]" />
                  <span className={darkMode ? "text-[#E5E7EB]" : "text-[#1A1A3E]"} style={{ fontWeight: 500 }}>Hustlify.AI</span>
                </button>

                {/* Logout */}
                <div className={`border-t mt-1 pt-1 ${darkMode ? "border-[#2D2D4A]" : "border-[#F3F4F6]"}`}>
                  <button
                    onClick={() => { navigate("/"); setShowUserMenu(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left ${darkMode ? "hover:bg-[#2D1515]" : "hover:bg-[#FEF2F2]"}`}
                    style={{ fontSize: "0.9rem" }}
                  >
                    <LogOut size={18} className="text-[#EF4444]" />
                    <span className="text-[#EF4444]" style={{ fontWeight: 500 }}>Log out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>

      {/* Hustlify.AI Floating Button */}
      {!showAI && (
        <button
          onClick={() => setShowAI(true)}
          className="group fixed bottom-8 right-8 z-[100] flex items-center gap-3 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white shadow-2xl hover:shadow-blue-300 transition-all duration-300 rounded-full p-4"
          style={{ fontSize: "0.95rem", fontWeight: 600 }}
        >
          <Bot size={24} className="flex-shrink-0 animate-pulse" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 group-hover:ml-2">Ask Hustlify.AI</span>
        </button>
      )}

      {showAI && (
        <div className={`fixed bottom-8 right-8 z-[100] w-96 rounded-2xl shadow-2xl border overflow-hidden transition-colors duration-300 ${darkMode ? "bg-[#1A1A2E] border-[#2D2D4A]" : "bg-white border-[#E5E7EB]"}`}>
          <div className="bg-gradient-to-r from-[#6D28D9] to-[#2563EB] p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white" style={{ fontSize: "1rem", fontWeight: 700 }}>Hustlify.AI</h3>
                <p className="text-white/80" style={{ fontSize: "0.75rem" }}>Your hiring assistant</p>
              </div>
            </div>
            <button onClick={() => setShowAI(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X size={18} className="text-white" />
            </button>
          </div>
          <div className={`p-5 h-80 overflow-y-auto space-y-4 ${darkMode ? "bg-[#12122A]" : "bg-[#F8F7FF]"}`}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#6D28D9] to-[#2563EB] flex items-center justify-center flex-shrink-0">
                <Bot size={14} className="text-white" />
              </div>
              <div className={`flex-1 rounded-2xl rounded-tl-sm p-4 shadow-sm ${darkMode ? "bg-[#2D2D4A]" : "bg-white"}`}>
                <p className={darkMode ? "text-[#E5E7EB]" : "text-[#1A1A3E]"} style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>
                  Hello! I'm Hustlify.AI. How can I help you find the perfect hire today?
                </p>
              </div>
            </div>
            {aiMessages.map((msg, idx) => (
              <div key={idx} className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                {msg.role === "ai" && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#6D28D9] to-[#2563EB] flex items-center justify-center flex-shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                )}
                <div className={`flex-1 rounded-2xl p-4 shadow-sm ${
                  msg.role === "user"
                    ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-tr-sm ml-8"
                    : darkMode ? "bg-[#2D2D4A] text-[#E5E7EB] rounded-tl-sm" : "bg-white text-[#1A1A3E] rounded-tl-sm"
                }`}>
                  <p style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={`p-4 border-t ${darkMode ? "bg-[#1A1A2E] border-[#2D2D4A]" : "bg-white border-[#E5E7EB]"}`}>
            <div className="relative">
              <input
                type="text"
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendAiMessage()}
                placeholder="Ask me anything..."
                className={`w-full pl-4 pr-12 py-3 rounded-xl border outline-none transition-all ${darkMode ? "bg-[#2D2D4A] border-[#3D3D5A] text-white placeholder-[#6B7280] focus:border-[#6D28D9]" : "bg-[#F8F7FF] border-[#E5E7EB] text-[#1A1A3E] placeholder-[#9CA3AF] focus:border-[#6D28D9]"}`}
                style={{ fontSize: "0.85rem" }}
              />
              <button
                onClick={handleSendAiMessage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-lg hover:shadow-md transition-all"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
