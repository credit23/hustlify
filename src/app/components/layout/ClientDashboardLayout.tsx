import { Outlet, useNavigate, useLocation } from "react-router";
import { Bell, User, LayoutGrid, Users, MessageSquare, Briefcase, Settings, LogOut, Sparkles, Bot, Send, X } from "lucide-react";
import { useState } from "react";
import hustlifyLogo from "figma:asset/ee079ff6b92e2af14de5404d0251f4a3326be5ea.png";

export default function ClientDashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // AI Chat State
  const [showAI, setShowAI] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiMessages, setAiMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  // Handle sending AI message
  const handleSendAiMessage = () => {
    if (!aiMessage.trim()) return;
    
    // Add user message
    setAiMessages((prev) => [...prev, { role: "user", text: aiMessage }]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you find the perfect candidate! What specific skills are you looking for?",
        "Based on your requirements, I'd recommend filtering by location and rating to find the best match.",
        "Great question! Let me analyze the available candidates for you...",
        "I found several highly-rated professionals who match your criteria. Would you like me to show you their profiles?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiMessages((prev) => [...prev, { role: "ai", text: randomResponse }]);
    }, 1000);
    
    setAiMessage("");
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutGrid, path: "/client/overview" },
    { id: "browse", label: "Browse Employees", icon: Users, path: "/client/browse" },
    { id: "messages", label: "Messages", icon: MessageSquare, path: "/client/messages" },
    { id: "jobs", label: "My Jobs", icon: Briefcase, path: "/client/jobs" },
    { id: "ai", label: "Hustlify AI", icon: Sparkles, path: "/client/ai" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#FAFBFF] to-[#EBF4FF] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-[#E5E7EB] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#E5E7EB]">
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <img src={hustlifyLogo} alt="Hustlify" className="h-12 object-contain" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all border ${
                isActive(item.path)
                  ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white shadow-md border-transparent"
                  : "text-[#6B7280] hover:bg-[#F8F7FF] border-[#E5E7EB]/60 bg-white/50 hover:border-[#6D28D9]/20"
              }`}
              style={{ fontSize: "0.9rem", fontWeight: isActive(item.path) ? 600 : 500 }}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#F8F7FF] transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#2563EB] flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-[#1A1A3E]" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                Alex Johnson
              </p>
              <p className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>
                Client
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/client/settings")}
            className="w-full mt-2 flex items-center gap-2 px-4 py-2 text-[#6B7280] hover:bg-[#F8F7FF] rounded-xl transition-colors"
            style={{ fontSize: "0.85rem", fontWeight: 500 }}
          >
            <Settings size={18} />
            Settings
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full mt-1 flex items-center gap-2 px-4 py-2 text-[#EF4444] hover:bg-[#FEF2F2] rounded-xl transition-colors"
            style={{ fontSize: "0.85rem", fontWeight: 500 }}
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB]">
          <div className="px-8 py-4 flex items-center justify-end gap-3">
            <button className="relative p-2.5 rounded-xl hover:bg-[#F8F7FF] transition-colors">
              <Bell size={20} className="text-[#6B7280]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Hustlify.AI Widget - Fixed Position, Available on All Pages */}
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
        <div className="fixed bottom-8 right-8 z-[100] w-96 bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden">
          {/* AI Header */}
          <div className="bg-gradient-to-r from-[#6D28D9] to-[#2563EB] p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white" style={{ fontSize: "1rem", fontWeight: 700 }}>
                  Hustlify.AI
                </h3>
                <p className="text-white/80" style={{ fontSize: "0.75rem" }}>
                  Your hiring assistant
                </p>
              </div>
            </div>
            <button onClick={() => setShowAI(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <X size={18} className="text-white" />
            </button>
          </div>

          {/* AI Chat */}
          <div className="p-5 h-96 overflow-y-auto bg-[#F8F7FF]">
            <div className="space-y-4">
              {/* Welcome Message */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#6D28D9] to-[#2563EB] flex items-center justify-center flex-shrink-0">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="flex-1 bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm">
                  <p className="text-[#1A1A3E]" style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>
                    Hello! I'm Hustlify.AI, your personal hiring assistant. I can help you:
                  </p>
                  <ul className="mt-2 space-y-1 text-[#6B7280]" style={{ fontSize: "0.8rem" }}>
                    <li>• Find the perfect employee for your needs</li>
                    <li>• Compare different candidates</li>
                    <li>• Get hiring recommendations</li>
                    <li>• Answer questions about the platform</li>
                  </ul>
                  <p className="mt-3 text-[#1A1A3E]" style={{ fontSize: "0.85rem" }}>
                    What can I help you with today?
                  </p>
                </div>
              </div>

              {/* Chat Messages */}
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
                      : "bg-white text-[#1A1A3E] rounded-tl-sm"
                  }`}>
                    <p style={{ fontSize: "0.85rem", lineHeight: "1.5" }}>
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Input */}
          <div className="p-4 border-t border-[#E5E7EB] bg-white">
            <div className="relative">
              <input
                type="text"
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendAiMessage()}
                placeholder="Ask me anything..."
                className="w-full pl-4 pr-12 py-3 bg-[#F8F7FF] rounded-xl border border-[#E5E7EB] text-[#1A1A3E] placeholder-[#9CA3AF] outline-none focus:border-[#6D28D9] transition-all"
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