import { useState } from "react";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  CheckCheck,
  Smile,
  Image,
  File,
  X,
} from "lucide-react";

const CONVERSATIONS = [
  {
    id: "1",
    name: "John Smith",
    role: "Software Developer",
    lastMsg: "Sure, I can start on Monday!",
    time: "2m",
    unread: 3,
    online: true,
    img: "https://images.unsplash.com/photo-1565687981296-535f09db714e?w=80&q=80",
  },
  {
    id: "2",
    name: "Sonia Amrani",
    role: "UX/UI Designer",
    lastMsg: "I've sent the design files.",
    time: "1h",
    unread: 0,
    online: true,
    img: "https://images.unsplash.com/photo-1765648580528-8d659861d81a?w=80&q=80",
  },
  {
    id: "3",
    name: "TechCorp DZ",
    role: "Enterprise",
    lastMsg: "We'd like to discuss the contract terms.",
    time: "3h",
    unread: 1,
    online: false,
    img: "https://images.unsplash.com/photo-1764690690771-b4522d66b433?w=80&q=80",
  },
  {
    id: "4",
    name: "Yacine Messaoud",
    role: "Digital Marketer",
    lastMsg: "The campaign is live ✓",
    time: "1d",
    unread: 0,
    online: false,
    img: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=80&q=80",
  },
  {
    id: "5",
    name: "Nadia Kaci",
    role: "Data Analyst",
    lastMsg: "Report attached below.",
    time: "2d",
    unread: 0,
    online: false,
    img: "https://images.unsplash.com/photo-1738750908048-14200459c3c9?w=80&q=80",
  },
];

const INITIAL_MESSAGES = [
  {
    id: "m1",
    from: "other",
    text: "Hi Alex! I saw your job post and I'm very interested. I have 5 years of experience in full-stack development.",
    time: "10:22 AM",
    read: true,
  },
  {
    id: "m2",
    from: "me",
    text: "Great to hear! Can you share your portfolio?",
    time: "10:24 AM",
    read: true,
  },
  {
    id: "m3",
    from: "other",
    text: "Of course! Here's my latest project: a SaaS dashboard built with React and Node.js. I can also send my CV.",
    time: "10:25 AM",
    read: true,
  },
  {
    id: "m4",
    from: "me",
    text: "Impressive! When can you start?",
    time: "10:30 AM",
    read: true,
  },
  {
    id: "m5",
    from: "other",
    text: "Sure, I can start on Monday!",
    time: "10:31 AM",
    read: false,
  },
];

export default function MessagesPage() {
  const [selectedConv, setSelectedConv] = useState(CONVERSATIONS[0]);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [newMsg, setNewMsg] = useState("");
  const [searchConv, setSearchConv] = useState("");

  const filteredConvs = CONVERSATIONS.filter((c) =>
    c.name.toLowerCase().includes(searchConv.toLowerCase())
  );

  const sendMessage = () => {
    if (!newMsg.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `m${Date.now()}`,
        from: "me",
        text: newMsg,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      },
    ]);
    setNewMsg("");
  };

  return (
    <div className="flex h-full" style={{ height: "calc(100vh - 64px)" }}>
      {/* Conversation List */}
      <div className="w-72 bg-white border-r border-purple-100 flex flex-col">
        <div className="p-4 border-b border-purple-50">
          <h2 className="text-[#1A1A3E] mb-3" style={{ fontWeight: 700, fontSize: "1rem" }}>
            Messages
          </h2>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              value={searchConv}
              onChange={(e) => setSearchConv(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-8 pr-4 py-2 bg-[#F5F3FF] rounded-xl border border-transparent focus:border-[#6C63FF] outline-none text-[#1A1A3E] placeholder-[#9CA3AF]"
              style={{ fontSize: "0.8rem" }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredConvs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F3FF] flex items-center justify-center mb-3">
                <Search size={20} className="text-[#C4B5FD]" />
              </div>
              <p className="text-[#9CA3AF]" style={{ fontSize: "0.8rem" }}>
                No conversations found
              </p>
            </div>
          ) : (
            filteredConvs.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConv(conv)}
                className={`w-full flex items-start gap-3 p-4 hover:bg-purple-50 transition-colors border-b border-purple-50 ${
                  selectedConv.id === conv.id ? "bg-[#F5F3FF]" : ""
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={conv.img}
                    alt={conv.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  {conv.online && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-0.5">
                    <p
                      className="text-[#1A1A3E] truncate"
                      style={{ fontWeight: conv.unread ? 600 : 400, fontSize: "0.85rem" }}
                    >
                      {conv.name}
                    </p>
                    <span className="text-[#9CA3AF] flex-shrink-0 ml-1" style={{ fontSize: "0.7rem" }}>
                      {conv.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p
                      className="text-[#9CA3AF] truncate"
                      style={{ fontSize: "0.75rem", fontWeight: conv.unread ? 500 : 400 }}
                    >
                      {conv.lastMsg}
                    </p>
                    {conv.unread > 0 && (
                      <span className="ml-1 w-5 h-5 rounded-full bg-[#6C63FF] text-white flex items-center justify-center flex-shrink-0" style={{ fontSize: "0.65rem", fontWeight: 700 }}>
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gradient-to-br from-[#F5F3FF] to-[#EBF4FF]">
        {/* Chat Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 px-5 py-3 flex items-center gap-3">
          <div className="relative">
            <img
              src={selectedConv.img}
              alt={selectedConv.name}
              className="w-9 h-9 rounded-xl object-cover"
            />
            {selectedConv.online && (
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.9rem" }}>
              {selectedConv.name}
            </p>
            <p className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>
              {selectedConv.online ? "Online" : "Offline"} · {selectedConv.role}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl hover:bg-purple-50 transition-colors">
              <Phone size={16} className="text-[#6B7280]" />
            </button>
            <button className="p-2 rounded-xl hover:bg-purple-50 transition-colors">
              <Video size={16} className="text-[#6B7280]" />
            </button>
            <button className="p-2 rounded-xl hover:bg-purple-50 transition-colors">
              <MoreVertical size={16} className="text-[#6B7280]" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
            >
              {msg.from === "other" && (
                <img
                  src={selectedConv.img}
                  alt=""
                  className="w-7 h-7 rounded-lg object-cover mr-2 mt-1 flex-shrink-0"
                />
              )}
              <div
                className={`max-w-xs lg:max-w-sm px-4 py-2.5 rounded-2xl ${
                  msg.from === "me"
                    ? "bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-br-sm"
                    : "bg-white text-[#1A1A3E] rounded-bl-sm shadow-sm border border-purple-100"
                }`}
              >
                <p style={{ fontSize: "0.85rem", lineHeight: 1.5 }}>{msg.text}</p>
                <div className={`flex items-center gap-1 mt-1 ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                  <span
                    className={msg.from === "me" ? "text-white/60" : "text-[#9CA3AF]"}
                    style={{ fontSize: "0.65rem" }}
                  >
                    {msg.time}
                  </span>
                  {msg.from === "me" && (
                    <CheckCheck size={12} className={msg.read ? "text-white" : "text-white/50"} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="bg-white/80 backdrop-blur-sm border-t border-purple-100 p-4">
          <div className="flex items-end gap-3">
            <div className="flex-1 bg-[#F5F3FF] rounded-2xl border border-purple-100 focus-within:border-[#6C63FF] transition-colors">
              <textarea
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type a message..."
                rows={1}
                className="w-full px-4 pt-3 pb-2 bg-transparent outline-none text-[#1A1A3E] placeholder-[#9CA3AF] resize-none"
                style={{ fontSize: "0.875rem" }}
              />
              <div className="flex items-center gap-2 px-3 pb-2">
                <button className="p-1 rounded-lg hover:bg-purple-100 transition-colors">
                  <Paperclip size={15} className="text-[#9CA3AF]" />
                </button>
                <button className="p-1 rounded-lg hover:bg-purple-100 transition-colors">
                  <Image size={15} className="text-[#9CA3AF]" />
                </button>
                <button className="p-1 rounded-lg hover:bg-purple-100 transition-colors">
                  <File size={15} className="text-[#9CA3AF]" />
                </button>
                <button className="p-1 rounded-lg hover:bg-purple-100 transition-colors">
                  <Smile size={15} className="text-[#9CA3AF]" />
                </button>
              </div>
            </div>
            <button
              onClick={sendMessage}
              disabled={!newMsg.trim()}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
