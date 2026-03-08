import { useNavigate } from "react-router";
import { useState } from "react";
import { Search, MapPin, Star, Heart, MessageSquare, Filter, Bell, User, Briefcase, TrendingUp, CheckCircle, Sparkles, Send, X, LayoutGrid, Users, Clock, Award, ChevronRight, Bot, Settings, CreditCard, LogOut, DollarSign, Calendar } from "lucide-react";
import { motion } from "motion/react";
import hustlifyLogo from "figma:asset/ee079ff6b92e2af14de5404d0251f4a3326be5ea.png";
import imgImage6 from "figma:asset/225350e362ddcd84f3581c2fdf7b5ea867eadc53.png";

const TOP_EMPLOYEES = [
  {
    id: 1,
    name: "Abdelkader Boualam",
    title: "Web Developer, Mobile Apps",
    location: "Algiers, Dergana",
    rating: 4.9,
    reviews: 127,
    rate: "3000DA",
    image: imgImage6,
    verified: true,
    available: true,
    skills: ["React", "Node.js"],
    completedProjects: 47,
    yearsExperience: 5,
  },
  {
    id: 2,
    name: "Sarah Messaoudi",
    title: "UI/UX Designer",
    location: "Oran, Es Senia",
    rating: 4.8,
    reviews: 94,
    rate: "2500DA",
    image: imgImage6,
    verified: true,
    available: true,
    skills: ["Figma", "Adobe XD"],
    completedProjects: 38,
    yearsExperience: 4,
  },
  {
    id: 3,
    name: "Karim Benali",
    title: "Mobile Developer",
    location: "Constantine",
    rating: 4.9,
    reviews: 156,
    rate: "3200DA",
    image: imgImage6,
    verified: true,
    available: true,
    skills: ["React Native", "Flutter"],
    completedProjects: 62,
    yearsExperience: 6,
  },
  {
    id: 4,
    name: "Yasmine Larbi",
    title: "Digital Marketer",
    location: "Oran",
    rating: 4.7,
    reviews: 118,
    rate: "2500DA",
    image: imgImage6,
    verified: true,
    available: false,
    skills: ["SEO", "Social Media"],
    completedProjects: 55,
    yearsExperience: 5,
  },
];

const ALL_EMPLOYEES = [
  {
    id: 1,
    name: "Abdelkader Bouam",
    title: "Web Developer",
    location: "Algiers, Dergana",
    rating: 4.9,
    reviews: 127,
    rate: "3000DA/H",
    image: imgImage6,
    verified: true,
    available: true,
    saved: false,
  },
  {
    id: 2,
    name: "Yacine Benali",
    title: "Mobile Developer",
    location: "Constantine",
    rating: 4.7,
    reviews: 89,
    rate: "2800DA/H",
    image: imgImage6,
    verified: true,
    available: true,
    saved: false,
  },
  {
    id: 3,
    name: "Amira Khelifi",
    title: "Graphic Designer",
    location: "Tizi Ouzou",
    rating: 4.8,
    reviews: 102,
    rate: "2200DA/H",
    image: imgImage6,
    verified: false,
    available: false,
    saved: true,
  },
  {
    id: 4,
    name: "Mohamed Bencherif",
    title: "Electrician",
    location: "Blida",
    rating: 4.6,
    reviews: 73,
    rate: "1500DA/H",
    image: imgImage6,
    verified: true,
    available: true,
    saved: false,
  },
  {
    id: 5,
    name: "Lina Hamidi",
    title: "Content Writer",
    location: "Algiers, Bab Ezzouar",
    rating: 4.9,
    reviews: 156,
    rate: "1800DA/H",
    image: imgImage6,
    verified: true,
    available: true,
    saved: false,
  },
  {
    id: 6,
    name: "Karim Boudjemaa",
    title: "Plumber",
    location: "Setif",
    rating: 4.5,
    reviews: 61,
    rate: "1200DA/H",
    image: imgImage6,
    verified: false,
    available: false,
    saved: false,
  },
  {
    id: 7,
    name: "Yasmine Larbi",
    title: "Digital Marketer",
    location: "Oran",
    rating: 4.8,
    reviews: 118,
    rate: "2500DA/H",
    image: imgImage6,
    verified: true,
    available: false,
    saved: true,
  },
  {
    id: 8,
    name: "Riad Meziane",
    title: "Photographer",
    location: "Annaba",
    rating: 4.7,
    reviews: 85,
    rate: "3500DA/H",
    image: imgImage6,
    verified: true,
    available: true,
    saved: false,
  },
];

const CONTACTED_WORKERS = [
  {
    id: 1,
    name: "Karim Benali",
    role: "Developer",
    lastMessage: "Sure, I can start next week",
    time: "2h ago",
    img: imgImage6,
    unread: true,
  },
  {
    id: 2,
    name: "Sonia Amrani",
    role: "Designer",
    lastMessage: "Thank you for reaching out!",
    time: "1 day ago",
    img: imgImage6,
    unread: false,
  },
  {
    id: 3,
    name: "Ahmed Meziani",
    role: "Plumber",
    lastMessage: "I'm available this weekend",
    time: "3 days ago",
    img: imgImage6,
    unread: false,
  },
];

const ACTIVE_JOBS = [
  { id: "1", title: "React Developer needed", candidates: 8, status: "active", posted: "2 days ago", budget: "120,000 DZD" },
  { id: "2", title: "UX Designer for landing page", candidates: 5, status: "active", posted: "5 days ago", budget: "45,000 DZD" },
  { id: "3", title: "Content Writer (French/Arabic)", candidates: 12, status: "reviewing", posted: "1 week ago", budget: "30,000 DZD" },
];

type TabType = "browse" | "dashboard" | "messages";

export default function ClientDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("browse");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [savedOnly, setSavedOnly] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiMessages, setAiMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Filter states
  const [locationFilter, setLocationFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<string | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number>(0);

  // Applied filters (only applied when user clicks "Filter" button)
  const [appliedLocationFilter, setAppliedLocationFilter] = useState("");
  const [appliedPriceFilter, setAppliedPriceFilter] = useState<string | null>(null);
  const [appliedAvailabilityFilter, setAppliedAvailabilityFilter] = useState<string | null>(null);
  const [appliedRatingFilter, setAppliedRatingFilter] = useState<number>(0);

  // Apply filters function
  const applyFilters = () => {
    setAppliedLocationFilter(locationFilter);
    setAppliedPriceFilter(priceFilter);
    setAppliedAvailabilityFilter(availabilityFilter);
    setAppliedRatingFilter(ratingFilter);
    setActiveFilter(null); // Close all dropdowns
  };

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

  // Helper function to parse rate from string like "3000DA/H"
  const getRateValue = (rateStr: string): number => {
    return parseInt(rateStr.replace(/[^\d]/g, ""));
  };

  // Filter employees based on applied filters
  let filteredEmployees = savedOnly ? ALL_EMPLOYEES.filter((e) => e.saved) : ALL_EMPLOYEES;

  // Apply location filter
  if (appliedLocationFilter) {
    filteredEmployees = filteredEmployees.filter((e) => 
      e.location.toLowerCase().includes(appliedLocationFilter.toLowerCase())
    );
  }

  // Apply price filter
  if (appliedPriceFilter) {
    filteredEmployees = filteredEmployees.filter((e) => {
      const rate = getRateValue(e.rate);
      switch (appliedPriceFilter) {
        case "0-1500":
          return rate <= 1500;
        case "1500-2500":
          return rate > 1500 && rate <= 2500;
        case "2500-3500":
          return rate > 2500 && rate <= 3500;
        case "3500+":
          return rate > 3500;
        default:
          return true;
      }
    });
  }

  // Apply availability filter
  if (appliedAvailabilityFilter === "available") {
    filteredEmployees = filteredEmployees.filter((e) => e.available);
  } else if (appliedAvailabilityFilter === "not-available") {
    filteredEmployees = filteredEmployees.filter((e) => !e.available);
  }

  // Apply rating filter
  if (appliedRatingFilter > 0) {
    filteredEmployees = filteredEmployees.filter((e) => e.rating >= appliedRatingFilter);
  }

  const tabs = [
    { id: "browse" as TabType, label: "Browse Employees", icon: Users },
    { id: "dashboard" as TabType, label: "Dashboard", icon: LayoutGrid },
    { id: "messages" as TabType, label: "Messages", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#FAFBFF] to-[#EBF4FF]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB]">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <img src={hustlifyLogo} alt="Hustlify" className="h-12 object-contain" />
          </button>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 bg-[#F8F7FF] p-1.5 rounded-2xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => tab.id === "messages" ? navigate("/client/messages") : setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white shadow-md"
                    : "text-[#6B7280] hover:bg-white/50"
                }`}
                style={{ fontSize: "0.9rem", fontWeight: activeTab === tab.id ? 600 : 500 }}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            
<div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-[#F8F7FF] transition-colors w-full"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#2563EB] flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="text-[#1A1A3E]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    Alex Johnson
                  </p>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                    Client
                  </p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E5E7EB] overflow-hidden z-50"
                >
                  <div className="py-2">
                    <button
                      onClick={() => {
                        navigate("/client/profile");
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#F8F7FF] transition-colors text-left"
                    >
                      <User size={18} className="text-[#6D28D9]" />
                      <span className="text-[#1A1A3E]" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                        Profile
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        navigate("/client/notifications");
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#F8F7FF] transition-colors text-left"
                    >
                      <Bell size={18} className="text-[#6D28D9]" />
                      <span className="text-[#1A1A3E]" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                        Notifications
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        navigate("/client/settings");
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#F8F7FF] transition-colors text-left"
                    >
                      <Settings size={18} className="text-[#6D28D9]" />
                      <span className="text-[#1A1A3E]" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                        Settings
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        navigate("/client/payment");
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#F8F7FF] transition-colors text-left"
                    >
                      <CreditCard size={18} className="text-[#6D28D9]" />
                      <span className="text-[#1A1A3E]" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                        Payment
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setShowAI(true);
                        setShowProfileMenu(false);
                      }}
                      className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-[#F8F7FF] transition-colors text-left"
                    >
                      <Bot size={18} className="text-[#6D28D9]" />
                      <span className="text-[#1A1A3E]" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                        Hustlify.AI
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Browse Employees Tab */}
        {activeTab === "browse" && (
          <>
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-3xl mx-auto">
                <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Search for employees, skills, or services..."
                  className="w-full pl-14 pr-5 py-4 bg-white rounded-2xl border border-[#E5E7EB] text-[#1A1A3E] placeholder-[#9CA3AF] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all shadow-sm"
                  style={{ fontSize: "1rem" }}
                />
              </div>
            </div>

            {/* Featured Employees Section */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-[#1A1A3E] mb-1.5 flex items-center gap-2" style={{ fontSize: "1.85rem", fontWeight: 700 }}>
                    <Sparkles size={28} className="text-[#6D28D9]" />
                    Featured Employees
                  </h2>
                  <p className="text-[#6B7280]" style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                    Meet some of the most talented professionals ready to bring your ideas to life.
                  </p>
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#1E3A8A] rounded-3xl p-8 border border-[#6D28D9]/30 shadow-2xl">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-60 h-60 bg-gradient-to-br from-[#6D28D9]/30 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-tl from-[#3B82F6]/30 to-transparent rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-[#8B5CF6]/20 to-transparent rounded-full blur-3xl" />
                
                <div className="relative grid grid-cols-3 gap-8">
                  {TOP_EMPLOYEES.slice(0, 3).map((employee, idx) => (
                    <motion.div
                      key={employee.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.15, duration: 0.6 }}
                      className="group relative bg-gradient-to-br from-white via-[#F8F7FF] to-[#EEF2FF] backdrop-blur-sm rounded-3xl p-8 border-2 border-[#C7D2FE]/40 hover:border-[#6D28D9]/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3"
                    >
                      {/* Featured Badge - Only for first card */}
                      {idx === 0 && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                          <div className="relative">
                            <div className="px-5 py-2 bg-gradient-to-r from-[#F59E0B] via-[#EF4444] to-[#EC4899] rounded-full flex items-center gap-2 shadow-lg">
                              <Award size={16} className="text-white" />
                              <span className="text-white" style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.5px" }}>
                                TOP RATED
                              </span>
                            </div>
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#F59E0B] via-[#EF4444] to-[#EC4899] rounded-full blur-lg opacity-50 animate-pulse" />
                          </div>
                        </div>
                      )}

                      {/* Avatar with gradient ring */}
                      <div className="flex flex-col items-center mb-6">
                        <div className="relative group/avatar">
                          <div className="absolute -inset-2 bg-gradient-to-r from-[#6D28D9] via-[#3B82F6] to-[#8B5CF6] rounded-full opacity-80 group-hover/avatar:opacity-100 blur-sm transition-opacity duration-300" />
                          <div className="relative">
                            <img 
                              src={employee.image} 
                              alt={employee.name} 
                              className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-lg"
                            />
                            {/* Availability Badge */}
                            <div className="absolute -bottom-2 -right-2">
                              <div className="relative">
                                {employee.available ? (
                                  <>
                                    <div className="w-11 h-11 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                      <CheckCircle size={20} className="text-white" />
                                    </div>
                                    <div className="absolute inset-0 bg-[#10B981] rounded-full animate-ping opacity-30" />
                                  </>
                                ) : (
                                  <>
                                    <div className="w-11 h-11 bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                      <X size={20} className="text-white" />
                                    </div>
                                    <div className="absolute inset-0 bg-[#EF4444] rounded-full animate-ping opacity-30" />
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Employee Info */}
                      <div className="text-center mb-5">
                        <h3 className="text-[#1A1A3E] mb-2" style={{ fontSize: "1.35rem", fontWeight: 700, lineHeight: "1.3" }}>
                          {employee.name}
                        </h3>
                        <p className="text-[#6B7280] mb-4" style={{ fontSize: "0.95rem", fontWeight: 500 }}>
                          {employee.title}
                        </p>
                        
                        {/* Location */}
                        <div className="flex items-center justify-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-[#F0EEFF] to-[#EBF4FF] rounded-xl">
                          <MapPin size={16} className="text-[#6D28D9]" />
                          <span className="text-[#6D28D9]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                            {employee.location}
                          </span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center justify-center gap-3 mb-4 px-5 py-2.5 bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] rounded-xl">
                          <div className="flex items-center gap-1.5">
                            <Star size={18} className="fill-[#F59E0B] text-[#F59E0B]" />
                            <span className="text-[#92400E]" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                              {employee.rating}
                            </span>
                          </div>
                          <span className="text-[#92400E]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                            ({employee.reviews} reviews)
                          </span>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
                        {employee.skills.map((skill, skillIdx) => (
                          <span 
                            key={skillIdx} 
                            className="px-4 py-2 bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] text-white rounded-xl hover:shadow-lg hover:scale-110 transition-all cursor-pointer font-semibold" 
                            style={{ fontSize: "0.8rem" }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Hover Details - shown on hover */}
                      <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 mb-5">
                        <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-[#F0EEFF] via-[#EBF4FF] to-[#F0EEFF] rounded-2xl border border-[#6D28D9]/20">
                          <div className="text-center">
                            <p className="bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] bg-clip-text text-transparent mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                              {employee.completedProjects}
                            </p>
                            <p className="text-[#6B7280]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                              Projects Done
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] bg-clip-text text-transparent mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                              {employee.yearsExperience}+ yrs
                            </p>
                            <p className="text-[#6B7280]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                              Experience
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Hourly Rate */}
                      <div className="text-center mb-6 pb-6 border-b-2 border-dashed border-[#E5E7EB]">
                        <p className="bg-gradient-to-r from-[#6D28D9] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent" style={{ fontSize: "2rem", fontWeight: 700, lineHeight: "1" }}>
                          {employee.rate}
                          <span className="text-[#9CA3AF]" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                            {" "}/ hr
                          </span>
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3">
                        <button className="w-full px-5 py-3.5 border-2 border-[#6D28D9] text-[#6D28D9] rounded-xl hover:bg-gradient-to-r hover:from-[#F0EEFF] hover:to-[#EBF4FF] hover:shadow-lg transition-all" style={{ fontSize: "0.9rem", fontWeight: 700 }}>
                          View Profile
                        </button>
                        <button className="group/btn w-full px-5 py-3.5 bg-gradient-to-r from-[#6D28D9] via-[#3B82F6] to-[#2563EB] text-white rounded-xl hover:shadow-2xl hover:shadow-blue-300 transition-all relative overflow-hidden hover:scale-105" style={{ fontSize: "0.9rem", fontWeight: 700 }}>
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            <MessageSquare size={18} />
                            Connect Now
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#6D28D9] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="relative mb-8 z-30">
              <div className="bg-white/60 backdrop-blur-md rounded-3xl px-6 py-4 border border-[#E5E7EB]/50 shadow-lg flex items-center gap-3">
                {/* Location Filter */}
                <div className="relative">
                  <button
                    onClick={() => setActiveFilter(activeFilter === "Location" ? null : "Location")}
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#6D28D9] transition-all shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#8B5CF6] flex items-center justify-center">
                      <MapPin size={16} className="text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[#1A1A3E]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                        Location
                      </span>
                      {locationFilter ? (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white rounded-md" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                          {locationFilter}
                        </span>
                      ) : (
                        <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                          Any
                        </span>
                      )}
                    </div>
                    <ChevronRight size={14} className="text-[#9CA3AF]" />
                  </button>

                  {/* Location Dropdown */}
                  {activeFilter === "Location" && (
                    <div className="absolute top-full mt-2 left-0 z-[100] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] p-4 w-72">
                      <p className="text-[#1A1A3E] mb-2" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                        Enter Wilaya or Commune
                      </p>
                      <input
                        type="text"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        placeholder="e.g., Algiers, Oran, Constantine..."
                        className="w-full px-3 py-2 bg-[#F8F7FF] rounded-lg border border-[#E5E7EB] text-[#1A1A3E] placeholder-[#9CA3AF] outline-none focus:border-[#6D28D9] transition-all"
                        style={{ fontSize: "0.85rem" }}
                      />
                    </div>
                  )}
                </div>

                {/* Price Filter */}
                <div className="relative">
                  <button
                    onClick={() => setActiveFilter(activeFilter === "Price" ? null : "Price")}
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#6D28D9] transition-all shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
                      <DollarSign size={16} className="text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[#1A1A3E]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                        Price
                      </span>
                      {priceFilter ? (
                        <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                          {priceFilter === "0-1500" && "0-1,500DA"}
                          {priceFilter === "1500-2500" && "1,500-2,500DA"}
                          {priceFilter === "2500-3500" && "2,500-3,500DA"}
                          {priceFilter === "3500+" && "3,500+DA"}
                        </span>
                      ) : (
                        <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                          Any Range
                        </span>
                      )}
                    </div>
                    <ChevronRight size={14} className="text-[#9CA3AF]" />
                  </button>

                  {/* Price Dropdown */}
                  {activeFilter === "Price" && (
                    <div className="absolute top-full mt-2 left-0 z-[100] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] p-4 w-64">
                      <p className="text-[#1A1A3E] mb-3" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                        Hourly Rate Range
                      </p>
                      <div className="space-y-2">
                        {[
                          { label: "0 - 1,500 DA/H", value: "0-1500" },
                          { label: "1,500 - 2,500 DA/H", value: "1500-2500" },
                          { label: "2,500 - 3,500 DA/H", value: "2500-3500" },
                          { label: "3,500+ DA/H", value: "3500+" },
                        ].map((range) => (
                          <button
                            key={range.value}
                            onClick={() => setPriceFilter(priceFilter === range.value ? null : range.value)}
                            className={`w-full px-3 py-2 rounded-lg text-left transition-all ${
                              priceFilter === range.value
                                ? "bg-[#6D28D9] text-white"
                                : "bg-[#F8F7FF] text-[#6B7280] hover:bg-[#F0EEFF]"
                            }`}
                            style={{ fontSize: "0.8rem", fontWeight: 500 }}
                          >
                            {range.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Availability Filter */}
                <div className="relative">
                  <button
                    onClick={() => setActiveFilter(activeFilter === "Availability" ? null : "Availability")}
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#6D28D9] transition-all shadow-sm"
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      availabilityFilter === "available" 
                        ? "bg-gradient-to-br from-[#10B981] to-[#059669]"
                        : availabilityFilter === "not-available"
                        ? "bg-gradient-to-br from-[#EF4444] to-[#DC2626]"
                        : "bg-gradient-to-br from-[#10B981] to-[#059669]"
                    }`}>
                      {availabilityFilter === "not-available" ? (
                        <X size={16} className="text-white" />
                      ) : (
                        <CheckCircle size={16} className="text-white" />
                      )}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[#1A1A3E]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                        Availability
                      </span>
                      {availabilityFilter === "available" ? (
                        <span className="text-[#10B981]" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                          Available Now
                        </span>
                      ) : availabilityFilter === "not-available" ? (
                        <span className="text-[#EF4444]" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                          Not Available
                        </span>
                      ) : (
                        <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                          Any Status
                        </span>
                      )}
                    </div>
                    <ChevronRight size={14} className="text-[#9CA3AF]" />
                  </button>

                  {/* Availability Dropdown */}
                  {activeFilter === "Availability" && (
                    <div className="absolute top-full mt-2 left-0 z-[100] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] p-4 w-56">
                      <p className="text-[#1A1A3E] mb-3" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                        Employee Status
                      </p>
                      <div className="space-y-2">
                        <button
                          onClick={() => setAvailabilityFilter(availabilityFilter === "available" ? null : "available")}
                          className={`w-full px-3 py-2.5 rounded-lg text-left transition-all flex items-center gap-2 ${
                            availabilityFilter === "available"
                              ? "bg-[#10B981] text-white"
                              : "bg-[#D1FAE5] text-[#059669] hover:bg-[#A7F3D0]"
                          }`}
                          style={{ fontSize: "0.8rem", fontWeight: 600 }}
                        >
                          <Check size={16} />
                          Available
                        </button>
                        <button
                          onClick={() => setAvailabilityFilter(availabilityFilter === "not-available" ? null : "not-available")}
                          className={`w-full px-3 py-2.5 rounded-lg text-left transition-all flex items-center gap-2 ${
                            availabilityFilter === "not-available"
                              ? "bg-[#EF4444] text-white"
                              : "bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FECACA]"
                          }`}
                          style={{ fontSize: "0.8rem", fontWeight: 600 }}
                        >
                          <X size={16} />
                          Not Available
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Ratings Filter */}
                <div className="relative">
                  <button
                    onClick={() => setActiveFilter(activeFilter === "Ratings" ? null : "Ratings")}
                    className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#6D28D9] transition-all shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] flex items-center justify-center">
                      <Star size={16} className="text-white fill-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[#1A1A3E]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                        Ratings
                      </span>
                      {ratingFilter > 0 ? (
                        <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                          {ratingFilter}.0 +
                        </span>
                      ) : (
                        <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                          All Ratings
                        </span>
                      )}
                    </div>
                    <ChevronRight size={14} className="text-[#9CA3AF]" />
                  </button>

                  {/* Ratings Dropdown */}
                  {activeFilter === "Ratings" && (
                    <div className="absolute top-full mt-2 left-0 z-[100] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] p-4 w-64">
                      <p className="text-[#1A1A3E] mb-3" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                        Minimum Rating
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRatingFilter(ratingFilter === star ? 0 : star)}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star
                              size={32}
                              className={
                                star <= ratingFilter
                                  ? "fill-[#FBBF24] text-[#FBBF24]"
                                  : "fill-none text-[#D1D5DB]"
                              }
                            />
                          </button>
                        ))}
                      </div>
                      {ratingFilter > 0 && (
                        <p className="text-center mt-3 text-[#6D28D9]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                          {ratingFilter}+ stars selected
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Saved Only */}
                <button
                  onClick={() => setSavedOnly(!savedOnly)}
                  className={`ml-auto px-4 py-2 rounded-xl border transition-all flex items-center gap-2 ${
                    savedOnly ? "bg-[#EC4899] text-white border-[#EC4899]" : "bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#EC4899]"
                  }`}
                  style={{ fontSize: "0.85rem", fontWeight: 500 }}
                >
                  <Heart size={14} className={savedOnly ? "fill-white" : ""} />
                  Saved Only
                </button>

                {/* Apply Filter Button */}
                <button 
                  onClick={applyFilters}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-2xl hover:shadow-xl hover:shadow-blue-300/50 transition-all" 
                  style={{ fontSize: "0.95rem", fontWeight: 700 }}
                >
                  Filter
                </button>
              </div>
            </div>

            {/* All Employees Grid */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[#1A1A3E]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                  All Employees
                </h2>
                <p className="text-[#9CA3AF]" style={{ fontSize: "0.85rem" }}>
                  1 of 15 Pages · <button className="text-[#6D28D9] hover:underline">Next Page</button>
                </p>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {filteredEmployees.map((employee) => (
                  <div 
                    key={employee.id} 
                    onClick={() => navigate(`/employee/${employee.id}`)}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="relative">
                        <img src={employee.image} alt={employee.name} className="w-16 h-16 rounded-xl object-cover" />
                        {/* Availability Badge */}
                        <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-white ${
                          employee.available 
                            ? "bg-gradient-to-br from-[#10B981] to-[#059669]" 
                            : "bg-gradient-to-br from-[#EF4444] to-[#DC2626]"
                        }`}>
                          {employee.available ? (
                            <CheckCircle size={10} className="text-white" />
                          ) : (
                            <X size={10} className="text-white" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[#1A1A3E] mb-0.5" style={{ fontSize: "0.95rem", fontWeight: 700 }}>
                          {employee.name}
                        </h3>
                        <p className="text-[#9CA3AF] mb-1" style={{ fontSize: "0.75rem" }}>
                          {employee.title}
                        </p>
                      </div>
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="p-1.5 rounded-lg hover:bg-[#FCE7F3] transition-colors"
                      >
                        <Heart size={16} className={employee.saved ? "fill-[#EC4899] text-[#EC4899]" : "text-[#9CA3AF]"} />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      <MapPin size={12} className="text-[#9CA3AF]" />
                      <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                        {employee.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#F3F4F6]">
                      <Star size={12} className="fill-[#FBBF24] text-[#FBBF24]" />
                      <span className="text-[#1A1A3E]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                        {employee.rating}
                      </span>
                      <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                        ({employee.reviews})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <p className="bg-gradient-to-r from-[#6D28D9] to-[#2563EB] bg-clip-text text-transparent" style={{ fontSize: "0.95rem", fontWeight: 700 }}>
                        {employee.rate}
                      </p>
                    </div>

                    <button 
                      className="w-full px-3 py-2.5 border-2 border-[#6D28D9] text-[#6B7280] bg-white rounded-2xl hover:bg-[#F0EEFF] transition-all" 
                      style={{ fontSize: "0.9rem", fontWeight: 600 }}
                    >
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Hustlify.AI Widget */}
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
          </>
        )}

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <>
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-[#1A1A3E] mb-2" style={{ fontSize: "2rem", fontWeight: 700 }}>
                Welcome back, <span className="bg-gradient-to-r from-[#6D28D9] to-[#2563EB] bg-clip-text text-transparent">Alex!</span>
              </h1>
              <p className="text-[#9CA3AF]" style={{ fontSize: "1rem" }}>
                Here's your hiring overview
              </p>
            </div>

            {/* Quick Stats - Enhanced */}
            <div className="grid grid-cols-4 gap-5 mb-10">
              {[
                { icon: Briefcase, label: "Active Searches", value: "3", color: "#6D28D9", bg: "#F0EEFF", gradientFrom: "#6D28D9", gradientTo: "#8B5CF6", trend: "+2 this week", trendUp: true },
                { icon: Users, label: "Contacted", value: "12", color: "#2563EB", bg: "#EBF4FF", gradientFrom: "#2563EB", gradientTo: "#3B82F6", trend: "+5 this week", trendUp: true },
                { icon: Heart, label: "Saved Profiles", value: "7", color: "#EC4899", bg: "#FCE7F3", gradientFrom: "#EC4899", gradientTo: "#F472B6", trend: "+1 this week", trendUp: true },
                { icon: CheckCircle, label: "Hired", value: "5", color: "#10B981", bg: "#D1FAE5", gradientFrom: "#10B981", gradientTo: "#34D399", trend: "2 active", trendUp: false },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-[#E5E7EB] shadow-sm hover:shadow-xl hover:scale-105 transition-all cursor-pointer relative overflow-hidden"
                >
                  {/* Gradient Overlay on Hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity"
                    style={{ 
                      background: `linear-gradient(135deg, ${stat.gradientFrom}, ${stat.gradientTo})`
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: stat.bg }}
                      >
                        <stat.icon size={24} style={{ color: stat.color }} />
                      </div>
                      <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg ${stat.trendUp ? 'bg-green-50' : 'bg-blue-50'}`}>
                        <TrendingUp size={14} className={stat.trendUp ? 'text-[#10B981]' : 'text-[#2563EB]'} />
                        <span className={`${stat.trendUp ? 'text-[#10B981]' : 'text-[#2563EB]'}`} style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                          {stat.trendUp ? '+' : ''}
                        </span>
                      </div>
                    </div>
                    <p className="text-[#1A1A3E] mb-1" style={{ fontSize: "2.25rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
                      {stat.value}
                    </p>
                    <p className="text-[#9CA3AF] mb-2.5" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                      {stat.label}
                    </p>
                    <div className="flex items-center gap-1.5 text-[#6B7280]" style={{ fontSize: "0.75rem" }}>
                      <Clock size={12} />
                      <span>{stat.trend}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Active Job Posts - Enhanced */}
              <div className="col-span-2 bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-[#1A1A3E] mb-1" style={{ fontSize: "1.35rem", fontWeight: 700 }}>
                      Your Active Searches
                    </h3>
                    <p className="text-[#9CA3AF]" style={{ fontSize: "0.85rem" }}>
                      {ACTIVE_JOBS.length} active job posts
                    </p>
                  </div>
                  <button className="flex items-center gap-1.5 px-4 py-2 text-[#6D28D9] hover:bg-[#F0EEFF] rounded-xl transition-all" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    View All
                    <ChevronRight size={16} />
                  </button>
                </div>
                <div className="space-y-3">
                  {ACTIVE_JOBS.map((job, idx) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group flex items-center gap-4 p-5 bg-gradient-to-br from-[#F8F7FF] to-[#FAFBFF] rounded-2xl hover:shadow-md hover:scale-[1.02] transition-all border border-transparent hover:border-[#E5D9FF]"
                    >
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#2563EB] flex items-center justify-center flex-shrink-0">
                        <Briefcase size={20} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#1A1A3E] mb-1.5 truncate" style={{ fontSize: "1rem", fontWeight: 600 }}>
                          {job.title}
                        </p>
                        <div className="flex items-center gap-3 text-[#9CA3AF]" style={{ fontSize: "0.8rem" }}>
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {job.posted}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign size={12} />
                            {job.budget}
                          </span>
                        </div>
                      </div>
                      <span className="flex items-center gap-2 px-3.5 py-2 bg-white/80 rounded-xl text-[#6B7280] shadow-sm" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                        <Users size={16} className="text-[#6D28D9]" /> 
                        <span className="font-semibold text-[#1A1A3E]">{job.candidates}</span> candidates
                      </span>
                      <span
                        className={`px-3.5 py-2 rounded-xl capitalize font-semibold ${
                          job.status === "active" 
                            ? "bg-gradient-to-br from-green-100 to-emerald-100 text-green-700" 
                            : "bg-gradient-to-br from-yellow-100 to-amber-100 text-yellow-700"
                        }`}
                        style={{ fontSize: "0.75rem" }}
                      >
                        {job.status}
                      </span>
                      <button className="px-5 py-2.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                        Review
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent Activity - Enhanced */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-[#1A1A3E] mb-1" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                      Recent Activity
                    </h3>
                    <p className="text-[#9CA3AF]" style={{ fontSize: "0.8rem" }}>
                      Last 24 hours
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#F0EEFF] flex items-center justify-center">
                    <Award size={16} className="text-[#6D28D9]" />
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { action: "New application", name: "Karim Benali", time: "2h ago", type: "application", badge: "New" },
                    { action: "Message received", name: "Sonia Amrani", time: "5h ago", type: "message", badge: null },
                    { action: "Profile viewed", name: "Ahmed Meziani", time: "1d ago", type: "view", badge: null },
                    { action: "Job post updated", name: "React Developer", time: "2d ago", type: "update", badge: null },
                  ].map((activity, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group flex items-start gap-3 pb-4 border-b border-[#F3F4F6] last:border-0 last:pb-0 hover:bg-[#F8F7FF] -mx-3 px-3 py-3 rounded-xl transition-all cursor-pointer"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform ${
                          activity.type === "application"
                            ? "bg-gradient-to-br from-[#F0EEFF] to-[#E5D9FF]"
                            : activity.type === "message"
                            ? "bg-gradient-to-br from-[#EBF4FF] to-[#DBEAFE]"
                            : activity.type === "view"
                            ? "bg-gradient-to-br from-[#FCE7F3] to-[#FBCFE8]"
                            : "bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0]"
                        }`}
                      >
                        {activity.type === "application" && <Briefcase size={16} className="text-[#6D28D9]" />}
                        {activity.type === "message" && <MessageSquare size={16} className="text-[#2563EB]" />}
                        {activity.type === "view" && <User size={16} className="text-[#EC4899]" />}
                        {activity.type === "update" && <CheckCircle size={16} className="text-[#10B981]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[#1A1A3E] truncate" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                            {activity.action}
                          </p>
                          {activity.badge && (
                            <span className="px-2 py-0.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-md text-[0.65rem] font-semibold">
                              {activity.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[#9CA3AF] truncate" style={{ fontSize: "0.8rem" }}>
                          {activity.name}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                          {activity.time}
                        </span>
                        <ChevronRight size={14} className="text-[#9CA3AF] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* View All Activity */}
                <button className="w-full mt-4 py-3 text-[#6D28D9] hover:bg-[#F0EEFF] rounded-xl transition-all" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                  View All Activity
                </button>
              </div>
            </div>
          </>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="grid grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="col-span-1 bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-[#E5E7EB] shadow-sm">
              <div className="mb-5">
                <h3 className="text-[#1A1A3E] mb-4" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
                  Messages
                </h3>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-3 py-2 bg-[#F8F7FF] rounded-xl border border-[#E5E7EB] text-[#1A1A3E] placeholder-[#9CA3AF] outline-none focus:border-[#6D28D9] transition-all"
                    style={{ fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                {CONTACTED_WORKERS.map((worker) => (
                  <div
                    key={worker.id}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      worker.unread ? "bg-[#F0EEFF] hover:bg-[#E5D9FF]" : "bg-[#F8F7FF] hover:bg-[#F0EEFF]"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img src={worker.img} alt={worker.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[#1A1A3E]" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                            {worker.name}
                          </p>
                          {worker.unread && <div className="w-2.5 h-2.5 bg-[#6D28D9] rounded-full" />}
                        </div>
                        <p className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>
                          {worker.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#6B7280] mb-1 line-clamp-1" style={{ fontSize: "0.8rem" }}>
                      {worker.lastMessage}
                    </p>
                    <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                      {worker.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl border border-[#E5E7EB] shadow-sm flex flex-col">
              {/* Chat Header */}
              <div className="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={imgImage6} alt="Karim Benali" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <p className="text-[#1A1A3E]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                      Karim Benali
                    </p>
                    <p className="text-[#9CA3AF]" style={{ fontSize: "0.8rem" }}>
                      Developer · Online
                    </p>
                  </div>
                </div>
                <button className="px-4 py-2 border border-[#6D28D9] text-[#6D28D9] rounded-xl hover:bg-[#F0EEFF] transition-all" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                  View Profile
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto bg-[#F8F7FF]">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <img src={imgImage6} alt="" className="w-8 h-8 rounded-lg object-cover" />
                    <div className="flex-1 bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-md">
                      <p className="text-[#1A1A3E]" style={{ fontSize: "0.9rem", lineHeight: "1.5" }}>
                        Hello! Thank you for reaching out. I'd be happy to discuss the React Developer position.
                      </p>
                      <span className="text-[#9CA3AF] mt-2 block" style={{ fontSize: "0.7rem" }}>
                        10:30 AM
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 justify-end">
                    <div className="flex-1 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] rounded-2xl rounded-tr-sm p-4 shadow-sm max-w-md ml-auto">
                      <p className="text-white" style={{ fontSize: "0.9rem", lineHeight: "1.5" }}>
                        Great! I'm looking for someone to start next week. Are you available?
                      </p>
                      <span className="text-white/80 mt-2 block text-right" style={{ fontSize: "0.7rem" }}>
                        10:32 AM
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <img src={imgImage6} alt="" className="w-8 h-8 rounded-lg object-cover" />
                    <div className="flex-1 bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm max-w-md">
                      <p className="text-[#1A1A3E]" style={{ fontSize: "0.9rem", lineHeight: "1.5" }}>
                        Sure, I can start next week. Let me know the details and we can schedule a call.
                      </p>
                      <span className="text-[#9CA3AF] mt-2 block" style={{ fontSize: "0.7rem" }}>
                        10:35 AM
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-5 border-t border-[#E5E7EB]">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full pl-4 pr-12 py-3 bg-[#F8F7FF] rounded-xl border border-[#E5E7EB] text-[#1A1A3E] placeholder-[#9CA3AF] outline-none focus:border-[#6D28D9] transition-all"
                    style={{ fontSize: "0.9rem" }}
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-lg hover:shadow-md transition-all">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}