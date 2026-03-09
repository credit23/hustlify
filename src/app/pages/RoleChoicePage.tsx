import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Building2, User, Briefcase, ArrowLeft, Sparkles, CheckCircle } from "lucide-react";
import hustlifyLogo from "../../assets/ee079ff6b92e2af14de5404d0251f4a3326be5ea.png";
import img001A77B9959542688655C1C84F9Bc0442 from "../../assets/2dd15228dfab814dc2aea79c6c0b4dd8a218893b.png";
import img001A77B9959542688655C1C84F9Bc0441 from "../../assets/2cbd6267a883d07002f54fb0dd9e4ecc9b126db8.png";
import enterpriseImg from "../../assets/814f612e7387555832d4499fcbe1c165e4e322a9.png";

export default function RoleChoicePage() {
  const navigate = useNavigate();

  const roles = [
    {
      id: "employee",
      title: "Be an Employee",
      description: "Find job opportunities and grow your career across Algeria",
      image: img001A77B9959542688655C1C84F9Bc0442,
      route: "/auth?role=employee",
      icon: User,
      color: "#6D28D9",
      features: ["Browse 1000+ jobs", "AI-powered matching", "Verified employers"],
    },
    {
      id: "client",
      title: "Be a Client",
      description: "Hire skilled professionals and get your work done",
      image: img001A77B9959542688655C1C84F9Bc0441,
      route: "/auth?role=client",
      icon: Briefcase,
      color: "#2563EB",
      features: ["Browse verified profiles", "Direct communication", "Rate and review talent"],
    },
    {
      id: "enterprise",
      title: "Be an Enterprise",
      description: "Manage your team and hire at scale across all 69 wilayas",
      image: enterpriseImg,
      route: "/auth?role=enterprise",
      icon: Building2,
      color: "#4F46E5",
      features: ["Bulk hiring", "Team management", "Priority support"],
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-6 py-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8E5FF] via-[#F0EEFF] to-[#E0E7FF]" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#6D28D9]/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/8 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-16 h-16 rounded-full bg-gradient-to-br from-[#6D28D9]/20 to-[#2563EB]/20 blur-xl"
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[15%] right-[15%] w-20 h-20 rounded-full bg-gradient-to-br from-[#2563EB]/20 to-[#60A5FA]/20 blur-xl"
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate("/auth")}
        className="fixed top-6 left-6 z-20 flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-[#6D28D9]/30 transition-all group"
      >
        <ArrowLeft size={16} className="text-[#6B7280] group-hover:text-[#6D28D9] transition-colors" />
        <span
          className="text-[#6B7280] group-hover:text-[#6D28D9] transition-colors"
          style={{ fontSize: "0.875rem", fontWeight: 600 }}
        >
          Back
        </span>
      </motion.button>

      {/* Main container */}
      <div className="relative w-full max-w-6xl">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <img
            src={hustlifyLogo}
            alt="Hustlify"
            className="h-14 mx-auto mb-6"
          />
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-[#6D28D9]/20 rounded-full mb-4"
          >
            <Sparkles size={14} className="text-[#6D28D9]" />
            <span
              className="text-[#6D28D9]"
              style={{ fontSize: "0.8rem", fontWeight: 600 }}
            >
              Choose Your Path
            </span>
          </motion.div>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white/50 backdrop-blur-xl rounded-3xl border border-white/60 shadow-2xl shadow-blue-900/10 p-6 md:p-10"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1
              className="text-[#1A1A3E] mb-3"
              style={{
                fontWeight: 800,
                fontSize: "2.5rem",
                fontFamily: "'Poppins', sans-serif",
                lineHeight: 1.2,
              }}
            >
              Let's Get You Started
            </h1>
            <p
              className="text-[#6B7280] max-w-2xl mx-auto"
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.6,
              }}
            >
              Select the option that best describes you. You can always switch later.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
                onClick={() => navigate(role.route)}
                className="group cursor-pointer"
              >
                <div className="bg-white/80 backdrop-blur-md rounded-2xl border-2 border-slate-200/60 hover:border-[#6D28D9]/60 shadow-md hover:shadow-2xl hover:shadow-blue-200/30 transition-all duration-300 overflow-hidden h-full flex flex-col hover:-translate-y-1">
                  {/* Image with overlay */}
                  <div className="relative h-44 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-10" />
                    <img
                      src={role.image}
                      alt={role.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Icon badge */}
                    <div
                      className="absolute top-4 right-4 w-12 h-12 rounded-xl flex items-center justify-center z-20 backdrop-blur-md border border-white/40 shadow-lg"
                      style={{ backgroundColor: `${role.color}15` }}
                    >
                      <role.icon size={22} style={{ color: role.color }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3
                      className="text-[#1A1A3E] mb-2"
                      style={{
                        fontWeight: 700,
                        fontSize: "1.35rem",
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {role.title}
                    </h3>
                    <p
                      className="text-[#6B7280] mb-5"
                      style={{
                        fontSize: "0.9rem",
                        lineHeight: 1.6,
                      }}
                    >
                      {role.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6 flex-1">
                      {role.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle
                            size={14}
                            className="text-green-500 flex-shrink-0"
                          />
                          <span
                            className="text-[#6B7280]"
                            style={{ fontSize: "0.8rem" }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Continue button */}
                    <button
                      className="w-full py-3.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-xl hover:shadow-blue-300/40 transition-all duration-300 group-hover:scale-[1.02]"
                      style={{
                        fontWeight: 700,
                        fontSize: "0.95rem",
                      }}
                    >
                      Continue as {role.title.split(" ")[2]}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}