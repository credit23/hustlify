import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Briefcase,
  TrendingUp,
  Users,
  MapPin,
  Star,
  ArrowRight,
  Lightbulb,
  Zap,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Copy,
  RotateCcw,
  Plus,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
  suggestions?: SuggestionCard[];
}

interface SuggestionCard {
  type: "job" | "client" | "tip";
  title: string;
  subtitle: string;
  tags?: string[];
  rating?: number;
  location?: string;
}

const QUICK_PROMPTS = [
  {
    icon: Briefcase,
    label: "Find me a job",
    prompt: "Find me the best job opportunities matching my skills",
    color: "#6C63FF",
  },
  {
    icon: Users,
    label: "Recommend clients",
    prompt: "Who are the best clients for a freelance developer in Algeria?",
    color: "#F59E0B",
  },
  {
    icon: TrendingUp,
    label: "Career advice",
    prompt: "What skills are trending in Algeria's job market right now?",
    color: "#10B981",
  },
  {
    icon: Lightbulb,
    label: "Improve my profile",
    prompt: "How can I improve my Hustlify profile to attract more clients?",
    color: "#EC4899",
  },
];

const MOCK_CONVERSATIONS: Message[] = [
  {
    id: "1",
    role: "ai",
    content:
      "Hey there! I'm **Hustlify AI**, your personal career assistant. I can help you find the best jobs, recommend top clients, give career advice, and optimize your profile. What would you like to explore today?",
    timestamp: new Date(),
  },
];

const MOCK_AI_RESPONSES: Record<string, { content: string; suggestions?: SuggestionCard[] }> = {
  "Find me the best job opportunities matching my skills": {
    content:
      "Based on your profile as a **Full-Stack Developer** with React & Node.js skills, here are the top opportunities I found for you in Algeria right now:",
    suggestions: [
      {
        type: "job",
        title: "Senior React Developer",
        subtitle: "Yassir — Remote / Algiers",
        tags: ["React", "TypeScript", "Node.js"],
        location: "Alger",
      },
      {
        type: "job",
        title: "Full-Stack Engineer",
        subtitle: "Djezzy — Hybrid",
        tags: ["Next.js", "PostgreSQL", "AWS"],
        location: "Alger",
      },
      {
        type: "job",
        title: "Frontend Lead",
        subtitle: "Tech Startup — Remote",
        tags: ["React", "Figma", "Leadership"],
        location: "Oran",
      },
    ],
  },
  "Who are the best clients for a freelance developer in Algeria?": {
    content:
      "Great question! Here are some **highly-rated clients** on Hustlify who are actively looking for developers like you:",
    suggestions: [
      {
        type: "client",
        title: "Ahmed Bouzid",
        subtitle: "CEO at DigiAlgeria — 12 hires on Hustlify",
        rating: 4.9,
        location: "Alger",
      },
      {
        type: "client",
        title: "Nadia Larbi",
        subtitle: "CTO at StartupDZ — 8 hires on Hustlify",
        rating: 5.0,
        location: "Constantine",
      },
      {
        type: "client",
        title: "Karim Saadi",
        subtitle: "Product Manager at InnoTech — 6 hires",
        rating: 4.8,
        location: "Oran",
      },
    ],
  },
  "What skills are trending in Algeria's job market right now?": {
    content:
      "Here are the **top trending skills** in Algeria's job market for 2026:\n\n1. **AI & Machine Learning** — demand up 340% YoY\n2. **React & Next.js** — still the #1 frontend stack\n3. **Cloud Engineering (AWS/GCP)** — growing rapidly\n4. **UI/UX Design** — every startup needs one\n5. **Digital Marketing & SEO** — essential for SMBs\n\nYour React skills are in high demand! I'd recommend adding **TypeScript** and **AI/ML basics** to stay ahead of the curve.",
  },
  "How can I improve my Hustlify profile to attract more clients?": {
    content:
      "Here are my top recommendations to **boost your profile visibility**:\n\n✅ **Add a professional photo** — profiles with photos get 3x more views\n✅ **Write a compelling bio** — highlight your unique value in 2-3 sentences\n✅ **Showcase your best projects** — add at least 3 portfolio items\n✅ **Get endorsements** — ask past clients to leave reviews\n✅ **Set competitive rates** — research market rates in your wilaya\n✅ **List all 69 wilayas** you're willing to work in\n\nYour profile is currently at **72% completion**. Completing it could increase your visibility by up to **5x**!",
  },
};

function formatContent(text: string) {
  // Simple markdown-like bold parsing
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <span key={i} style={{ fontWeight: 700, color: "#1A1A3E" }}>
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}

function SuggestionCardComponent({ card }: { card: SuggestionCard }) {
  const iconMap = { job: Briefcase, client: Users, tip: Lightbulb };
  const colorMap = { job: "#6C63FF", client: "#F59E0B", tip: "#10B981" };
  const Icon = iconMap[card.type];
  const color = colorMap[card.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-4 border border-purple-100/60 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${color}12` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#1A1A3E] truncate" style={{ fontSize: "0.88rem", fontWeight: 700 }}>
            {card.title}
          </p>
          <p className="text-[#6B7280] truncate" style={{ fontSize: "0.78rem" }}>
            {card.subtitle}
          </p>
          {card.rating && (
            <div className="flex items-center gap-1 mt-1.5">
              <Star size={12} className="text-yellow-400 fill-yellow-400" />
              <span className="text-[#1A1A3E]" style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                {card.rating}
              </span>
              {card.location && (
                <>
                  <span className="text-[#D1D5DB] mx-1">·</span>
                  <MapPin size={11} className="text-[#9CA3AF]" />
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>
                    {card.location}
                  </span>
                </>
              )}
            </div>
          )}
          {card.tags && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-[#F5F3FF] text-[#6C63FF] rounded-md"
                  style={{ fontSize: "0.68rem", fontWeight: 600 }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <ArrowRight
          size={16}
          className="text-[#D1D5DB] group-hover:text-[#6C63FF] transition-colors mt-1 flex-shrink-0"
        />
      </div>
    </motion.div>
  );
}

export default function HustlifyAIPage() {
  const [messages, setMessages] = useState<Message[]>(MOCK_CONVERSATIONS);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = MOCK_AI_RESPONSES[messageText] || {
        content:
          "That's a great question! Let me analyze your profile and the current market trends in Algeria to give you personalized recommendations. Based on your skills and location, I'd suggest exploring opportunities in **web development** and **digital transformation** projects. Would you like me to search for specific roles or clients?",
      };

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: response.content,
        timestamp: new Date(),
        suggestions: response.suggestions,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 1500 + Math.random() * 1000);
  };

  const handleNewChat = () => {
    setMessages(MOCK_CONVERSATIONS);
    setInput("");
  };

  return (
    <div className="flex h-full" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Chat History Sidebar */}
      <div className="w-64 bg-white/60 backdrop-blur-sm border-r border-purple-100/60 flex flex-col shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-purple-50">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl hover:shadow-lg hover:shadow-purple-200 transition-all"
            style={{ fontSize: "0.84rem", fontWeight: 600 }}
          >
            <Plus size={16} />
            New Chat
          </button>
        </div>

        {/* Recent chats */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <p
            className="px-3 py-2 text-[#9CA3AF]"
            style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em" }}
          >
            TODAY
          </p>
          {[
            { title: "Job recommendations", active: true },
            { title: "Profile optimization tips", active: false },
            { title: "Best clients in Alger", active: false },
          ].map((chat) => (
            <button
              key={chat.title}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition-all ${
                chat.active
                  ? "bg-gradient-to-r from-[#6C63FF]/8 to-[#9B8FFF]/8 text-[#6C63FF]"
                  : "text-[#6B7280] hover:bg-purple-50"
              }`}
              style={{ fontSize: "0.82rem", fontWeight: chat.active ? 600 : 400 }}
            >
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className={chat.active ? "text-[#6C63FF]" : "text-[#9CA3AF]"} />
                <span className="truncate">{chat.title}</span>
              </div>
            </button>
          ))}

          <p
            className="px-3 py-2 mt-4 text-[#9CA3AF]"
            style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em" }}
          >
            YESTERDAY
          </p>
          {[
            { title: "Trending skills 2026" },
            { title: "Freelance pricing guide" },
          ].map((chat) => (
            <button
              key={chat.title}
              className="w-full text-left px-3 py-2.5 rounded-xl text-[#6B7280] hover:bg-purple-50 transition-all"
              style={{ fontSize: "0.82rem" }}
            >
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-[#9CA3AF]" />
                <span className="truncate">{chat.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* AI Model info */}
        <div className="p-4 border-t border-purple-50">
          <div className="flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-[#6C63FF]/5 to-[#9B8FFF]/5 rounded-xl">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] flex items-center justify-center">
              <Sparkles size={13} className="text-white" />
            </div>
            <div>
              <p className="text-[#1A1A3E]" style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                Hustlify AI
              </p>
              <p className="text-[#9CA3AF]" style={{ fontSize: "0.65rem" }}>v2.0 — Pro Model</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-purple-100/40 bg-white/40 backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#9B8FFF] flex items-center justify-center shadow-md shadow-purple-200/50">
                <Sparkles size={18} className="text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div>
              <h1 className="text-[#1A1A3E]" style={{ fontSize: "1rem", fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>
                Hustlify.AI
              </h1>
              <p className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>
                Your AI-powered career assistant
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 rounded-full" style={{ fontSize: "0.72rem", fontWeight: 600 }}>
              <Zap size={12} />
              Online
            </span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Welcome banner (only if first message) */}
          {messages.length <= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <motion.div
                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#6C63FF] to-[#9B8FFF] flex items-center justify-center mx-auto mb-5 shadow-xl shadow-purple-200/50"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles size={32} className="text-white" />
              </motion.div>
              <h2
                className="text-[#1A1A3E] mb-2"
                style={{ fontSize: "1.5rem", fontWeight: 800, fontFamily: "'Poppins', sans-serif" }}
              >
                Welcome to{" "}
                <span className="bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] bg-clip-text text-transparent">
                  Hustlify.AI
                </span>
              </h2>
              <p className="text-[#6B7280] max-w-md mx-auto mb-8" style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
                I'm your personal AI assistant. Ask me anything about jobs, clients, career advice, or profile optimization.
              </p>

              {/* Quick prompt cards */}
              <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <motion.button
                    key={prompt.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    onClick={() => handleSend(prompt.prompt)}
                    className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-2xl border border-purple-100/60 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all text-left group"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${prompt.color}12` }}
                    >
                      <prompt.icon size={17} style={{ color: prompt.color }} />
                    </div>
                    <span className="text-[#1A1A3E]" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                      {prompt.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Chat Messages */}
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    msg.role === "ai"
                      ? "bg-gradient-to-br from-[#6C63FF] to-[#9B8FFF] shadow-md shadow-purple-200/30"
                      : "bg-gradient-to-br from-[#1A1A3E] to-[#2D2B55]"
                  }`}
                >
                  {msg.role === "ai" ? (
                    <Bot size={15} className="text-white" />
                  ) : (
                    <User size={15} className="text-white" />
                  )}
                </div>

                {/* Message bubble */}
                <div className={`max-w-[70%] ${msg.role === "user" ? "text-right" : ""}`}>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-br-md"
                        : "bg-white border border-purple-100/50 text-[#4A4A68] rounded-bl-md shadow-sm"
                    }`}
                    style={{ fontSize: "0.88rem", lineHeight: 1.75, whiteSpace: "pre-line" }}
                  >
                    {msg.role === "ai" ? formatContent(msg.content) : msg.content}
                  </div>

                  {/* Suggestion cards */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {msg.suggestions.map((card, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.15 }}
                        >
                          <SuggestionCardComponent card={card} />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* AI message actions */}
                  {msg.role === "ai" && msg.id !== "1" && (
                    <div className="flex items-center gap-1 mt-2">
                      {[
                        { icon: ThumbsUp, label: "Helpful" },
                        { icon: ThumbsDown, label: "Not helpful" },
                        { icon: Copy, label: "Copy" },
                        { icon: RotateCcw, label: "Regenerate" },
                      ].map((action) => (
                        <button
                          key={action.label}
                          className="p-1.5 rounded-lg text-[#C4C4D4] hover:text-[#6C63FF] hover:bg-purple-50 transition-all"
                          title={action.label}
                        >
                          <action.icon size={13} />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Timestamp */}
                  <p
                    className={`mt-1 text-[#C4C4D4] ${msg.role === "user" ? "text-right" : ""}`}
                    style={{ fontSize: "0.68rem" }}
                  >
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#9B8FFF] flex items-center justify-center shadow-md shadow-purple-200/30">
                  <Bot size={15} className="text-white" />
                </div>
                <div className="bg-white border border-purple-100/50 rounded-2xl rounded-bl-md px-5 py-3.5 shadow-sm">
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-[#6C63FF]"
                        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="px-6 py-4 border-t border-purple-100/40 bg-white/60 backdrop-blur-sm">
          {/* Suggestion chips */}
          {messages.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {["Show more jobs", "Compare salaries", "Update my skills"].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  className="px-3.5 py-1.5 bg-white border border-purple-100/60 text-[#6B7280] rounded-full hover:border-[#6C63FF]/40 hover:text-[#6C63FF] hover:bg-[#F5F3FF] transition-all"
                  style={{ fontSize: "0.78rem", fontWeight: 500 }}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Ask Hustlify AI anything..."
                className="w-full px-5 py-3.5 bg-white rounded-2xl border border-purple-200/60 focus:border-[#6C63FF]/50 outline-none text-[#1A1A3E] placeholder-[#B0AEC5] shadow-sm focus:shadow-md transition-all pr-12"
                style={{ fontSize: "0.88rem" }}
                disabled={isTyping}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Sparkles size={14} className="text-[#D1D5DB]" />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md ${
                input.trim() && !isTyping
                  ? "bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white shadow-purple-200 hover:shadow-lg hover:shadow-purple-300"
                  : "bg-[#F0EEF9] text-[#C4C4D4] shadow-none"
              }`}
            >
              <Send size={18} />
            </motion.button>
          </div>

          <p className="text-center mt-2.5 text-[#C4C4D4]" style={{ fontSize: "0.68rem" }}>
            Hustlify AI may produce inaccurate information. Verify important details.
          </p>
        </div>
      </div>
    </div>
  );
}
