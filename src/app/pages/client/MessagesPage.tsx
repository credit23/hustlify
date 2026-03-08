import { useState } from "react";
import { Search, Send, Paperclip, Phone, Video, Info, MoreVertical, Smile, CheckCheck, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import imgImage6 from "figma:asset/225350e362ddcd84f3581c2fdf7b5ea867eadc53.png";

const CONTACTED_WORKERS = [
  {
    id: 1,
    name: "Karim Benali",
    role: "Developer",
    lastMessage: "Sure, I can start next week",
    time: "2h ago",
    img: imgImage6,
    online: true,
  },
  {
    id: 2,
    name: "Sonia Amrani",
    role: "Designer",
    lastMessage: "Thank you for reaching out!",
    time: "1 day ago",
    img: imgImage6,
    online: false,
  },
  {
    id: 3,
    name: "Ahmed Meziani",
    role: "Plumber",
    lastMessage: "I'm available this weekend",
    time: "3 days ago",
    img: imgImage6,
    online: false,
  },
  {
    id: 4,
    name: "Yasmine Larbi",
    role: "Digital Marketer",
    lastMessage: "I'd love to discuss your project",
    time: "4 days ago",
    img: imgImage6,
    online: false,
  },
  {
    id: 5,
    name: "Riad Meziane",
    role: "Photographer",
    lastMessage: "My portfolio is ready for review",
    time: "5 days ago",
    img: imgImage6,
    online: false,
  },
];

const SAMPLE_MESSAGES = [
  { id: 1, sender: "them", text: "Hi! I saw your job posting and I'm very interested.", time: "10:30 AM" },
  { id: 2, sender: "me", text: "Great! Can you tell me more about your experience?", time: "10:35 AM" },
  { id: 3, sender: "them", text: "Sure! I have 5 years of experience in React and Node.js development.", time: "10:38 AM" },
  { id: 4, sender: "me", text: "That sounds perfect. When can you start?", time: "10:42 AM" },
  { id: 5, sender: "them", text: "Sure, I can start next week", time: "10:45 AM" },
];

export default function MessagesPage() {
  const navigate = useNavigate();
  const [selectedWorker, setSelectedWorker] = useState(CONTACTED_WORKERS[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  const filteredWorkers = CONTACTED_WORKERS.filter(
    (worker) =>
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen bg-[#F5F5F5] flex flex-col">
      {/* Back Button Header */}
      <div className="bg-white border-b border-[#E0E0E0] px-6 py-4">
        <motion.button
          onClick={() => navigate("/client/dashboard")}
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-[#616161] hover:text-[#7C3AED] transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:text-[#7C3AED]" />
          <span style={{ fontSize: "0.9375rem", fontWeight: 500 }}>Back to Dashboard</span>
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Conversations */}
        <div className="w-80 bg-white border-r border-[#E0E0E0] flex flex-col">
          {/* Header */}
          <div className="px-5 py-5 border-b border-[#E0E0E0]">
            <h2 className="text-[#1A1A1A] mb-4" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
              Conversations
            </h2>
            <div className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9E9E9E]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages..."
                className="w-full pl-10 pr-3 py-2.5 bg-[#F5F5F5] rounded-lg text-[#1A1A1A] placeholder-[#9E9E9E] outline-none focus:bg-[#EEEEEE] transition-all"
                style={{ fontSize: "0.875rem" }}
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredWorkers.map((worker) => (
              <motion.div
                key={worker.id}
                onClick={() => setSelectedWorker(worker)}
                className={`px-5 py-4 cursor-pointer transition-all border-l-4 ${
                  selectedWorker.id === worker.id
                    ? "bg-[#F3E8FF] border-[#7C3AED]"
                    : "bg-white border-transparent hover:bg-[#FAFAFA]"
                }`}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-start gap-3">
                  <div className="relative flex-shrink-0">
                    <img src={worker.img} alt={worker.name} className="w-12 h-12 rounded-full object-cover" />
                    {worker.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[#1A1A1A] truncate" style={{ fontSize: "0.9375rem", fontWeight: 600 }}>
                        {worker.name}
                      </p>
                      <span className="text-[#9E9E9E] flex-shrink-0 ml-2" style={{ fontSize: "0.75rem" }}>
                        {worker.time}
                      </span>
                    </div>
                    <p className="text-[#9E9E9E] mb-1" style={{ fontSize: "0.8125rem" }}>
                      {worker.role}
                    </p>
                    <p className="text-[#616161] line-clamp-1" style={{ fontSize: "0.8125rem" }}>
                      {worker.lastMessage}
                    </p>
                    {selectedWorker.id === worker.id && (
                      <div className="w-2 h-2 bg-[#7C3AED] rounded-full mt-1" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side - Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="px-8 py-5 border-b border-[#E0E0E0] bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={selectedWorker.img}
                    alt={selectedWorker.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {selectedWorker.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#10B981] border-2 border-white rounded-full" />
                  )}
                </div>
                <div>
                  <h3 className="text-[#1A1A1A]" style={{ fontSize: "1.125rem", fontWeight: 600 }}>
                    {selectedWorker.name}
                  </h3>
                  {selectedWorker.online && (
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
                      <span className="text-[#10B981]" style={{ fontSize: "0.8125rem" }}>
                        Active now
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 hover:bg-[#F5F5F5] rounded-full transition-colors"
                >
                  <Phone size={20} className="text-[#616161]" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 hover:bg-[#F5F5F5] rounded-full transition-colors"
                >
                  <Video size={20} className="text-[#616161]" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 hover:bg-[#F5F5F5] rounded-full transition-colors"
                >
                  <Info size={20} className="text-[#616161]" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2.5 hover:bg-[#F5F5F5] rounded-full transition-colors"
                >
                  <MoreVertical size={20} className="text-[#616161]" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-8 py-6 bg-[#FAFAFA]">
            {/* Date Separator */}
            <div className="flex items-center justify-center mb-6">
              <div className="px-4 py-1.5 bg-white/80 rounded-full">
                <span className="text-[#9E9E9E]" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                  Today
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-4 max-w-4xl mx-auto">
              <AnimatePresence>
                {SAMPLE_MESSAGES.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[70%] ${message.sender === "me" ? "flex-row-reverse" : ""}`}>
                      {message.sender === "them" && (
                        <img src={selectedWorker.img} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                      )}
                      <div>
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            message.sender === "me"
                              ? "bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white"
                              : "bg-white text-[#1A1A1A] border border-[#E0E0E0]"
                          }`}
                        >
                          <p style={{ fontSize: "0.9375rem", lineHeight: "1.5" }}>{message.text}</p>
                        </div>
                        <div className={`flex items-center gap-1.5 mt-1.5 px-2 ${message.sender === "me" ? "justify-end" : ""}`}>
                          <span className="text-[#9E9E9E]" style={{ fontSize: "0.75rem" }}>
                            {message.time}
                          </span>
                          {message.sender === "me" && <CheckCheck size={14} className="text-[#7C3AED]" />}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Message Input */}
          <div className="px-8 py-5 border-t border-[#E0E0E0] bg-white">
            <div className="flex items-center gap-3 max-w-4xl mx-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 hover:bg-[#F5F5F5] rounded-full transition-colors"
              >
                <Paperclip size={20} className="text-[#616161]" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 hover:bg-[#F5F5F5] rounded-full transition-colors"
              >
                <Smile size={20} className="text-[#616161]" />
              </motion.button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 bg-[#F5F5F5] rounded-full text-[#1A1A1A] placeholder-[#9E9E9E] outline-none focus:bg-[#EEEEEE] transition-all"
                  style={{ fontSize: "0.9375rem" }}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="p-3 bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}