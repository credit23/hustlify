import { useState } from "react";
import { motion } from "motion/react";
import { User, Mail, Phone, MapPin, Briefcase, Building, Edit2, Camera, Save, X } from "lucide-react";

export default function ClientProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+213 555 123 456",
    company: "TechCorp Algeria",
    position: "Hiring Manager",
    location: "Algiers, Algeria",
    bio: "Experienced hiring manager looking for top talent in the tech industry. Passionate about building great teams and fostering innovation.",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#FAFBFF] to-[#EBF4FF] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#1A1A3E] mb-2" style={{ fontSize: "2rem", fontWeight: 700 }}>
            Profile Settings
          </h1>
          <p className="text-[#9CA3AF]" style={{ fontSize: "1rem" }}>
            Manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-[#E5E7EB] overflow-hidden"
        >
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] relative">
            <button className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all">
              <Camera size={18} className="text-white" />
            </button>
          </div>

          {/* Profile Picture */}
          <div className="px-8 -mt-16 mb-6">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#6D28D9] to-[#2563EB] border-4 border-white shadow-xl flex items-center justify-center">
                <User size={48} className="text-white" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-lg shadow-lg hover:scale-110 transition-all">
                <Camera size={16} className="text-[#6D28D9]" />
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="px-8 pb-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-[#1A1A3E] mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                  {formData.name}
                </h2>
                <p className="text-[#9CA3AF]" style={{ fontSize: "0.95rem" }}>
                  Client Account
                </p>
              </div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-lg transition-all"
                  style={{ fontSize: "0.9rem", fontWeight: 600 }}
                >
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-6 py-3 border border-[#E5E7EB] text-[#6B7280] rounded-xl hover:bg-[#F8F7FF] transition-all"
                    style={{ fontSize: "0.9rem", fontWeight: 600 }}
                  >
                    <X size={18} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-lg transition-all"
                    style={{ fontSize: "0.9rem", fontWeight: 600 }}
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="flex items-center gap-2 text-[#1A1A3E] mb-2" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  <User size={16} className="text-[#6D28D9]" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#1A1A3E] outline-none transition-all ${
                    isEditing
                      ? "bg-[#F8F7FF] focus:border-[#6D28D9] focus:bg-white"
                      : "bg-[#F8F7FF] cursor-not-allowed opacity-75"
                  }`}
                  style={{ fontSize: "0.95rem" }}
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-[#1A1A3E] mb-2" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  <Mail size={16} className="text-[#6D28D9]" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#1A1A3E] outline-none transition-all ${
                    isEditing
                      ? "bg-[#F8F7FF] focus:border-[#6D28D9] focus:bg-white"
                      : "bg-[#F8F7FF] cursor-not-allowed opacity-75"
                  }`}
                  style={{ fontSize: "0.95rem" }}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-[#1A1A3E] mb-2" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  <Phone size={16} className="text-[#6D28D9]" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#1A1A3E] outline-none transition-all ${
                    isEditing
                      ? "bg-[#F8F7FF] focus:border-[#6D28D9] focus:bg-white"
                      : "bg-[#F8F7FF] cursor-not-allowed opacity-75"
                  }`}
                  style={{ fontSize: "0.95rem" }}
                />
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-[#1A1A3E] mb-2" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  <MapPin size={16} className="text-[#6D28D9]" />
                  Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#1A1A3E] outline-none transition-all ${
                    isEditing
                      ? "bg-[#F8F7FF] focus:border-[#6D28D9] focus:bg-white"
                      : "bg-[#F8F7FF] cursor-not-allowed opacity-75"
                  }`}
                  style={{ fontSize: "0.95rem" }}
                >
                  <option value="Algiers, Algeria">Algiers</option>
                  <option value="Oran, Algeria">Oran</option>
                  <option value="Constantine, Algeria">Constantine</option>
                  <option value="Annaba, Algeria">Annaba</option>
                  <option value="Blida, Algeria">Blida</option>
                </select>
              </div>

              {/* Company */}
              <div>
                <label className="flex items-center gap-2 text-[#1A1A3E] mb-2" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  <Building size={16} className="text-[#6D28D9]" />
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#1A1A3E] outline-none transition-all ${
                    isEditing
                      ? "bg-[#F8F7FF] focus:border-[#6D28D9] focus:bg-white"
                      : "bg-[#F8F7FF] cursor-not-allowed opacity-75"
                  }`}
                  style={{ fontSize: "0.95rem" }}
                />
              </div>

              {/* Position */}
              <div>
                <label className="flex items-center gap-2 text-[#1A1A3E] mb-2" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  <Briefcase size={16} className="text-[#6D28D9]" />
                  Position
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#1A1A3E] outline-none transition-all ${
                    isEditing
                      ? "bg-[#F8F7FF] focus:border-[#6D28D9] focus:bg-white"
                      : "bg-[#F8F7FF] cursor-not-allowed opacity-75"
                  }`}
                  style={{ fontSize: "0.95rem" }}
                />
              </div>

              {/* Bio - Full Width */}
              <div className="col-span-2">
                <label className="flex items-center gap-2 text-[#1A1A3E] mb-2" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  <Edit2 size={16} className="text-[#6D28D9]" />
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  disabled={!isEditing}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#1A1A3E] outline-none transition-all resize-none ${
                    isEditing
                      ? "bg-[#F8F7FF] focus:border-[#6D28D9] focus:bg-white"
                      : "bg-[#F8F7FF] cursor-not-allowed opacity-75"
                  }`}
                  style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-[#E5E7EB] p-6"
        >
          <h3 className="text-[#1A1A3E] mb-4" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
            Account Settings
          </h3>
          <div className="space-y-3">
            <button className="w-full px-5 py-3 text-left rounded-xl hover:bg-[#F8F7FF] transition-all flex items-center justify-between">
              <span className="text-[#1A1A3E]" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                Change Password
              </span>
              <span className="text-[#9CA3AF]" style={{ fontSize: "0.85rem" }}>
                •••••••••
              </span>
            </button>
            <button className="w-full px-5 py-3 text-left rounded-xl hover:bg-[#F8F7FF] transition-all flex items-center justify-between">
              <span className="text-[#1A1A3E]" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                Email Preferences
              </span>
              <span className="text-[#6D28D9]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                Configure
              </span>
            </button>
            <button className="w-full px-5 py-3 text-left rounded-xl hover:bg-[#FEE2E2] transition-all flex items-center justify-between">
              <span className="text-[#EF4444]" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                Delete Account
              </span>
              <span className="text-[#EF4444]" style={{ fontSize: "0.85rem" }}>
                Permanent
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
