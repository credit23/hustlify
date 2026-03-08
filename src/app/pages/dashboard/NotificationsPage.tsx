import { useState } from "react";
import {
  Bell,
  MessageSquare,
  Briefcase,
  Building2,
  Star,
  CheckCircle,
  Trash2,
  Settings,
  BellOff,
} from "lucide-react";

type NotifCategory = "all" | "messages" | "jobs" | "system";

const NOTIFICATIONS = [
  {
    id: "1",
    type: "job" as const,
    icon: Briefcase,
    color: "#6C63FF",
    bg: "#F0EEFF",
    title: "New Job Invitation",
    body: "TechCorp DZ invited you to apply for Senior React Developer position.",
    time: "2 minutes ago",
    read: false,
    category: "jobs",
  },
  {
    id: "2",
    type: "message" as const,
    icon: MessageSquare,
    color: "#4F8EF7",
    bg: "#EBF4FF",
    title: "New Message from John Smith",
    body: "Sure, I can start on Monday! Looking forward to working with you.",
    time: "15 minutes ago",
    read: false,
    category: "messages",
  },
  {
    id: "3",
    type: "enterprise" as const,
    icon: Building2,
    color: "#F59E0B",
    bg: "#FEF3C7",
    title: "Enterprise Request",
    body: "Sonatrach Group has sent you an enterprise collaboration request.",
    time: "1 hour ago",
    read: false,
    category: "jobs",
  },
  {
    id: "4",
    type: "review" as const,
    icon: Star,
    color: "#10B981",
    bg: "#D1FAE5",
    title: "New Review Received",
    body: "Jessica Lee left you a 5-star review: 'Excellent work, highly professional!'",
    time: "3 hours ago",
    read: true,
    category: "system",
  },
  {
    id: "5",
    type: "system" as const,
    icon: CheckCircle,
    color: "#10B981",
    bg: "#D1FAE5",
    title: "Profile Verified",
    body: "Congratulations! Your profile has been verified. You now have a trust badge.",
    time: "1 day ago",
    read: true,
    category: "system",
  },
  {
    id: "6",
    type: "job" as const,
    icon: Briefcase,
    color: "#6C63FF",
    bg: "#F0EEFF",
    title: "Job Application Update",
    body: "Your application for 'Full-Stack Developer at Yassir' has been reviewed.",
    time: "2 days ago",
    read: true,
    category: "jobs",
  },
  {
    id: "7",
    type: "message" as const,
    icon: MessageSquare,
    color: "#4F8EF7",
    bg: "#EBF4FF",
    title: "New Message from Nadia Kaci",
    body: "I've attached the final report. Please review at your earliest convenience.",
    time: "3 days ago",
    read: true,
    category: "messages",
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [activeCategory, setActiveCategory] = useState<NotifCategory>("all");

  const filtered = activeCategory === "all"
    ? notifications
    : notifications.filter((n) => n.category === activeCategory);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotif = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const categories: { key: NotifCategory; label: string; count?: number }[] = [
    { key: "all", label: "All", count: notifications.length },
    { key: "messages", label: "Messages", count: notifications.filter((n) => n.category === "messages").length },
    { key: "jobs", label: "Jobs & Invitations", count: notifications.filter((n) => n.category === "jobs").length },
    { key: "system", label: "System", count: notifications.filter((n) => n.category === "system").length },
  ];

  return (
    <div className="p-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.4rem" }}>
            Notifications
          </h1>
          <p className="text-[#6B7280]" style={{ fontSize: "0.875rem" }}>
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "You're all caught up!"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl border border-purple-100 text-[#6C63FF] hover:bg-purple-50 transition-colors"
              style={{ fontSize: "0.8rem", fontWeight: 500 }}
            >
              <CheckCircle size={14} />
              Mark all read
            </button>
          )}
          <button className="p-2 rounded-xl bg-white border border-purple-100 hover:bg-purple-50 transition-colors">
            <Settings size={16} className="text-[#6B7280]" />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeCategory === cat.key
                ? "bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white"
                : "bg-white border border-purple-100 text-[#6B7280] hover:border-[#6C63FF] hover:text-[#6C63FF]"
            }`}
            style={{ fontSize: "0.8rem", fontWeight: 500 }}
          >
            {cat.label}
            {cat.count !== undefined && cat.count > 0 && (
              <span
                className={`px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat.key
                    ? "bg-white/20 text-white"
                    : "bg-purple-100 text-[#6C63FF]"
                }`}
                style={{ fontSize: "0.65rem", fontWeight: 700 }}
              >
                {cat.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-purple-100">
          <div className="w-16 h-16 rounded-2xl bg-[#F5F3FF] flex items-center justify-center mb-4">
            <BellOff size={28} className="text-[#C4B5FD]" />
          </div>
          <p className="text-[#1A1A3E] mb-1" style={{ fontWeight: 600 }}>
            No notifications yet
          </p>
          <p className="text-[#9CA3AF]" style={{ fontSize: "0.875rem" }}>
            We'll notify you when something important happens
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markRead(notif.id)}
              className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer group ${
                notif.read
                  ? "border-purple-100 hover:border-purple-200"
                  : "border-[#6C63FF]/30 hover:border-[#6C63FF]/50 shadow-sm"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: notif.bg }}
                >
                  <notif.icon size={18} style={{ color: notif.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <p
                        className="text-[#1A1A3E]"
                        style={{ fontWeight: notif.read ? 500 : 600, fontSize: "0.875rem" }}
                      >
                        {notif.title}
                      </p>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-[#6C63FF] flex-shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteNotif(notif.id); }}
                        className="p-1 rounded-lg hover:bg-red-50 text-[#9CA3AF] hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-[#6B7280] mt-0.5" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
                    {notif.body}
                  </p>
                  <p className="text-[#9CA3AF] mt-1.5" style={{ fontSize: "0.72rem" }}>
                    {notif.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
