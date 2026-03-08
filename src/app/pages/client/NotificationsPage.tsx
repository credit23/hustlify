import { useState } from "react";
import { motion } from "motion/react";
import { Bell, Briefcase, MessageSquare, User, CheckCircle, X, Settings, Trash2 } from "lucide-react";

type Notification = {
  id: string;
  type: "application" | "message" | "profile_view" | "job_update";
  title: string;
  message: string;
  time: string;
  read: boolean;
};

export default function ClientNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "application",
      title: "New Application Received",
      message: "Karim Benali applied for React Developer position",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "message",
      title: "New Message",
      message: "Sonia Amrani sent you a message",
      time: "5 hours ago",
      read: false,
    },
    {
      id: "3",
      type: "profile_view",
      title: "Profile Viewed",
      message: "Ahmed Meziani viewed your job post for UI/UX Designer",
      time: "1 day ago",
      read: true,
    },
    {
      id: "4",
      type: "job_update",
      title: "Job Post Updated",
      message: "Your React Developer job post has been published successfully",
      time: "2 days ago",
      read: true,
    },
    {
      id: "5",
      type: "application",
      title: "New Application Received",
      message: "Leila Mansouri applied for Python Developer position",
      time: "3 days ago",
      read: true,
    },
  ]);

  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications = filter === "all" ? notifications : notifications.filter((n) => !n.read);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "application":
        return <Briefcase size={18} className="text-[#6D28D9]" />;
      case "message":
        return <MessageSquare size={18} className="text-[#2563EB]" />;
      case "profile_view":
        return <User size={18} className="text-[#EC4899]" />;
      case "job_update":
        return <CheckCircle size={18} className="text-[#10B981]" />;
    }
  };

  const getIconBg = (type: Notification["type"]) => {
    switch (type) {
      case "application":
        return "bg-gradient-to-br from-[#F0EEFF] to-[#E5D9FF]";
      case "message":
        return "bg-gradient-to-br from-[#EBF4FF] to-[#DBEAFE]";
      case "profile_view":
        return "bg-gradient-to-br from-[#FCE7F3] to-[#FBCFE8]";
      case "job_update":
        return "bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0]";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#FAFBFF] to-[#EBF4FF] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-[#1A1A3E] mb-2" style={{ fontSize: "2rem", fontWeight: 700 }}>
              Notifications
            </h1>
            <p className="text-[#9CA3AF]" style={{ fontSize: "1rem" }}>
              {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "You're all caught up!"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-3 rounded-xl border border-[#E5E7EB] hover:bg-white transition-all">
              <Settings size={20} className="text-[#6B7280]" />
            </button>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="px-5 py-3 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-lg transition-all"
                style={{ fontSize: "0.9rem", fontWeight: 600 }}
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-xl transition-all ${
              filter === "all"
                ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white shadow-lg"
                : "bg-white text-[#6B7280] hover:bg-[#F8F7FF]"
            }`}
            style={{ fontSize: "0.9rem", fontWeight: 600 }}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-6 py-3 rounded-xl transition-all ${
              filter === "unread"
                ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white shadow-lg"
                : "bg-white text-[#6B7280] hover:bg-[#F8F7FF]"
            }`}
            style={{ fontSize: "0.9rem", fontWeight: 600 }}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-12 text-center border border-[#E5E7EB]"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#F0EEFF] to-[#E5D9FF] flex items-center justify-center">
                <Bell size={32} className="text-[#6D28D9]" />
              </div>
              <h3 className="text-[#1A1A3E] mb-2" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                No notifications
              </h3>
              <p className="text-[#9CA3AF]" style={{ fontSize: "0.95rem" }}>
                {filter === "unread" ? "You're all caught up!" : "You don't have any notifications yet"}
              </p>
            </motion.div>
          ) : (
            filteredNotifications.map((notification, idx) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`group bg-white/95 backdrop-blur-sm rounded-2xl p-5 border transition-all hover:shadow-lg ${
                  notification.read ? "border-[#E5E7EB]" : "border-[#6D28D9]/30 bg-[#F8F7FF]"
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getIconBg(notification.type)}`}>
                    {getIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h4 className="text-[#1A1A3E] flex items-center gap-2" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                        {notification.title}
                        {!notification.read && (
                          <span className="w-2 h-2 bg-[#6D28D9] rounded-full"></span>
                        )}
                      </h4>
                      <span className="text-[#9CA3AF] flex-shrink-0" style={{ fontSize: "0.75rem" }}>
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-[#6B7280] mb-3" style={{ fontSize: "0.85rem" }}>
                      {notification.message}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0EEFF] text-[#6D28D9] rounded-lg hover:bg-[#E5D9FF] transition-all"
                          style={{ fontSize: "0.8rem", fontWeight: 600 }}
                        >
                          <CheckCircle size={14} />
                          Mark as read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FEE2E2] text-[#EF4444] rounded-lg hover:bg-[#FECACA] transition-all"
                        style={{ fontSize: "0.8rem", fontWeight: 600 }}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
