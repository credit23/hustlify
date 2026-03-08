import { useState } from "react";
import { Bot, Send, Sparkles, TrendingUp, Users, Briefcase } from "lucide-react";

export default function AIPage() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([
    {
      role: "ai",
      text: "Hi! I'm Hustlify AI, your intelligent hiring assistant. I can help you find the perfect candidates, optimize your job posts, and provide insights on your hiring process. What would you like help with today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", text: input }]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on your requirements, I recommend filtering candidates with React and Node.js skills in the Algiers area.",
        "I found 15 highly-rated professionals who match your criteria. Would you like me to show you their profiles?",
        "Let me analyze your recent job postings and suggest improvements to attract more qualified candidates.",
        "I can help you schedule interviews with the top 3 candidates. When would you like to meet them?",
        "Based on market data, I suggest offering a rate between 2,500-3,500 DA/hour for this role to attract top talent.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [...prev, { role: "ai", text: randomResponse }]);
    }, 1000);

    setInput("");
  };

  const quickActions = [
    { label: "Find React Developers", icon: Users },
    { label: "Analyze My Job Posts", icon: TrendingUp },
    { label: "Suggest Market Rates", icon: Briefcase },
    { label: "Generate Job Description", icon: Sparkles },
  ];

  return (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-[#1A1A3E] mb-2 flex items-center gap-3" style={{ fontSize: "2.25rem", fontWeight: 700 }}>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#6D28D9] to-[#2563EB] flex items-center justify-center">
            <Bot size={28} className="text-white" />
          </div>
          Hustlify AI
        </h1>
        <p className="text-[#6B7280]" style={{ fontSize: "1rem" }}>
          Your intelligent hiring assistant powered by advanced AI technology.
        </p>
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="mb-6 grid grid-cols-4 gap-4">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => setInput(action.label)}
              className="p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-[#E5E7EB] hover:border-[#6D28D9] hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F0EEFF] to-[#EBF4FF] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <action.icon size={20} className="text-[#6D28D9]" />
              </div>
              <p className="text-[#1A1A3E] text-left" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                {action.label}
              </p>
            </button>
          ))}
        </div>
      )}

      {/* Chat Area */}
      <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl border border-[#E5E7EB] shadow-sm flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, idx) => (
            <div key={idx} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {message.role === "ai" && (
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#2563EB] flex items-center justify-center mr-3 flex-shrink-0">
                  <Bot size={20} className="text-white" />
                </div>
              )}
              <div
                className={`max-w-[70%] px-5 py-3 rounded-2xl ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white"
                    : "bg-[#F8F7FF] text-[#1A1A3E]"
                }`}
              >
                <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-[#E5E7EB]">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask me anything about hiring, candidates, or your recruiting strategy..."
                rows={3}
                className="w-full px-4 py-3 bg-[#F8F7FF] rounded-xl border border-[#E5E7EB] text-[#1A1A3E] placeholder-[#9CA3AF] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all resize-none"
                style={{ fontSize: "0.95rem" }}
              />
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              style={{ fontSize: "0.9rem", fontWeight: 600, height: "fit-content" }}
            >
              <Send size={18} />
              Send
            </button>
          </div>
          <p className="text-[#9CA3AF] mt-3 text-center" style={{ fontSize: "0.75rem" }}>
            Hustlify AI can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  );
}
