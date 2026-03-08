import { useNavigate, useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { Globe, ArrowLeft, Building2, User, Briefcase, CheckCircle, Lock, Mail, Eye, EyeOff, Upload, IdCard } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import hustlifyLogo from "figma:asset/ee079ff6b92e2af14de5404d0251f4a3326be5ea.png";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type Step = "getstarted" | "login" | "role" | "employee-signup" | "client-signup" | "enterprise-detail";

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<Step>("getstarted");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"employee" | "client" | "enterprise" | null>(null);

  // Check for role parameter from URL
  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "employee") {
      setStep("employee-signup");
      setRole("employee");
    } else if (roleParam === "client") {
      setStep("client-signup");
      setRole("client");
    } else if (roleParam === "enterprise") {
      setStep("enterprise-detail");
      setRole("enterprise");
    }
  }, [searchParams]);

  const handleGetStarted = () => {
    if (email) navigate("/role-choice");
  };

  const handleLogin = () => {
    navigate("/dashboard");
  };

  const handleRoleSelect = (selectedRole: "employee" | "client" | "enterprise") => {
    setRole(selectedRole);
    if (selectedRole === "enterprise") {
      setStep("enterprise-detail");
    } else if (selectedRole === "client") {
      setStep("client-signup");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F0EEFF] via-[#F5F3FF] to-[#E8EAFF]" />
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#6D28D9]/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#2563EB]/8 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      {/* Globe icon */}
      <div className="fixed top-5 right-5 z-10">
        <button className="p-2.5 rounded-xl bg-white/80 hover:bg-white border border-slate-200 shadow-sm transition-all">
          <Globe size={18} className="text-[#6B7280]" />
        </button>
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-200/30 border border-slate-200 p-10 relative z-10"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-5">
              <img src={hustlifyLogo} alt="Hustlify" className="h-16 object-contain" />
            </div>

            {step === "getstarted" && (
              <div>
                <h2 className="text-[#1A1A3E] mb-1" style={{ fontWeight: 700, fontSize: "1.4rem" }}>
                  Get Started
                </h2>
                <p className="text-[#9CA3AF]" style={{ fontSize: "0.85rem" }}>
                  Create your Hustlify account
                </p>
              </div>
            )}
            {step === "login" && (
              <div>
                <h2 className="text-[#1A1A3E] mb-1" style={{ fontWeight: 700, fontSize: "1.4rem" }}>
                  Login
                </h2>
                <p className="text-[#9CA3AF]" style={{ fontSize: "0.85rem" }}>
                  Welcome back to Hustlify
                </p>
              </div>
            )}
            {step === "role" && (
              <div>
                <button
                  onClick={() => setStep("getstarted")}
                  className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#6D28D9] mb-3 mx-auto transition-colors"
                  style={{ fontSize: "0.82rem" }}
                >
                  <ArrowLeft size={14} /> Back
                </button>
                <h2 className="text-[#1A1A3E] mb-1" style={{ fontWeight: 700, fontSize: "1.4rem" }}>
                  Let's Continue
                </h2>
                <p className="text-[#9CA3AF]" style={{ fontSize: "0.85rem" }}>
                  Choose your account type
                </p>
              </div>
            )}
            {step === "client-signup" && (
              <div>
                <button
                  onClick={() => navigate("/role-choice")}
                  className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#6D28D9] mb-3 mx-auto transition-colors"
                  style={{ fontSize: "0.82rem" }}
                >
                  <ArrowLeft size={14} /> Back
                </button>
                <h2 className="text-[#1A1A3E] mb-1" style={{ fontWeight: 700, fontSize: "1.4rem" }}>
                  Create Your Client Account
                </h2>
                <p className="text-[#9CA3AF]" style={{ fontSize: "0.85rem" }}>
                  Fill in the details below to get started
                </p>
              </div>
            )}
            {step === "employee-signup" && (
              <div>
                <button
                  onClick={() => navigate("/role-choice")}
                  className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#6D28D9] mb-3 mx-auto transition-colors"
                  style={{ fontSize: "0.82rem" }}
                >
                  <ArrowLeft size={14} /> Back
                </button>
                <h2 className="text-[#1A1A3E] mb-1" style={{ fontWeight: 700, fontSize: "1.4rem" }}>
                  Create Your Employee Account
                </h2>
                <p className="text-[#9CA3AF]" style={{ fontSize: "0.85rem" }}>
                  Complete your profile to start applying
                </p>
              </div>
            )}
            {step === "enterprise-detail" && (
              <div>
                <button
                  onClick={() => navigate("/role-choice")}
                  className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#6D28D9] mb-3 mx-auto transition-colors"
                  style={{ fontSize: "0.82rem" }}
                >
                  <ArrowLeft size={14} /> Back
                </button>
                <h2 className="text-[#1A1A3E] mb-1" style={{ fontWeight: 700, fontSize: "1.4rem" }}>
                  Company Setup
                </h2>
                <p className="text-[#9CA3AF]" style={{ fontSize: "0.85rem" }}>
                  Tell us about your enterprise
                </p>
              </div>
            )}
          </div>

          {/* Get Started */}
          {step === "getstarted" && (
            <div className="space-y-4">
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0AEC5]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#F8F7FF] rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all"
                  style={{ fontSize: "0.9rem" }}
                  onKeyDown={(e) => e.key === "Enter" && handleGetStarted()}
                />
              </div>
              <button
                onClick={handleGetStarted}
                disabled={!email}
                className="w-full py-3.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ fontWeight: 700, fontSize: "0.95rem" }}
              >
                Sign Up
              </button>
              <div className="relative flex items-center gap-3 my-2">
                <div className="flex-1 border-t border-slate-200" />
                <span className="text-[#B0AEC5]" style={{ fontSize: "0.78rem" }}>or</span>
                <div className="flex-1 border-t border-slate-200" />
              </div>
              <p className="text-center text-[#9CA3AF]" style={{ fontSize: "0.82rem" }}>
                Already have an account?{" "}
                <button
                  onClick={() => setStep("login")}
                  className="text-[#6D28D9] hover:underline"
                  style={{ fontWeight: 600 }}
                >
                  Login
                </button>
              </p>
            </div>
          )}

          {/* Login */}
          {step === "login" && (
            <div className="space-y-4">
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0AEC5]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#F8F7FF] rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all"
                  style={{ fontSize: "0.9rem" }}
                />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0AEC5]" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 py-3.5 bg-[#F8F7FF] rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all"
                  style={{ fontSize: "0.9rem" }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B0AEC5] hover:text-[#6D28D9] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="flex justify-end">
                <button className="text-[#6D28D9] hover:underline" style={{ fontSize: "0.78rem", fontWeight: 500 }}>
                  Forgot password?
                </button>
              </div>
              <button
                onClick={handleLogin}
                className="w-full py-3.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all"
                style={{ fontWeight: 700, fontSize: "0.95rem" }}
              >
                Login
              </button>
              <p className="text-center text-[#9CA3AF]" style={{ fontSize: "0.82rem" }}>
                Don't have an account?{" "}
                <button
                  onClick={() => setStep("getstarted")}
                  className="text-[#6D28D9] hover:underline"
                  style={{ fontWeight: 600 }}
                >
                  Sign Up
                </button>
              </p>
            </div>
          )}

          {/* Role Selection - inspired by Figma choice screen */}
          {step === "role" && (
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  role: "employee" as const,
                  icon: User,
                  title: "Be an Employee",
                  desc: "Find job opportunities and grow your career",
                  img: "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=200&q=80",
                },
                {
                  role: "client" as const,
                  icon: Briefcase,
                  title: "Be a Client",
                  desc: "Hire skilled professionals and get your work done",
                  img: "https://images.unsplash.com/photo-1760611656007-f767a8082758?w=200&q=80",
                },
                {
                  role: "enterprise" as const,
                  icon: Building2,
                  title: "Enterprise",
                  desc: "Manage your team and post jobs at scale",
                  img: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=200&q=80",
                },
              ].map((item) => (
                <div
                  key={item.role}
                  onClick={() => handleRoleSelect(item.role)}
                  className="border-2 border-slate-200 rounded-2xl p-4 cursor-pointer hover:border-[#6D28D9] hover:bg-[#F8F7FF] transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200 group-hover:border-[#6D28D9] transition-colors">
                      <ImageWithFallback src={item.img} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p
                        className="text-[#1A1A3E] group-hover:text-[#6D28D9] transition-colors"
                        style={{ fontWeight: 700, fontSize: "0.95rem" }}
                      >
                        {item.title}
                      </p>
                      <p className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>
                        {item.desc}
                      </p>
                    </div>
                    <div className="w-7 h-7 rounded-full border-2 border-slate-300 group-hover:border-[#6D28D9] group-hover:bg-[#6D28D9] flex items-center justify-center transition-all">
                      <CheckCircle size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Client Signup - inspired by Figma client account screen */}
          {step === "client-signup" && (
            <div className="space-y-4">
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0AEC5]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#F8F7FF] rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all"
                  style={{ fontSize: "0.9rem" }}
                />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0AEC5]" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#F8F7FF] rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all"
                  style={{ fontSize: "0.9rem" }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0AEC5]" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full pl-11 pr-4 py-3.5 bg-[#F8F7FF] rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all"
                    style={{ fontSize: "0.9rem" }}
                  />
                </div>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0AEC5]" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full pl-11 pr-4 py-3.5 bg-[#F8F7FF] rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all"
                    style={{ fontSize: "0.9rem" }}
                  />
                </div>
              </div>
              <button
                onClick={() => navigate("/client/onboarding")}
                className="w-full py-3.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all"
                style={{ fontWeight: 700, fontSize: "0.95rem" }}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Employee Signup */}
          {step === "employee-signup" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0AEC5]" />
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full pl-11 pr-4 py-3.5 bg-[#F8F7FF] rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all"
                    style={{ fontSize: "0.9rem" }}
                  />
                </div>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0AEC5]" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full pl-11 pr-4 py-3.5 bg-[#F8F7FF] rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all"
                    style={{ fontSize: "0.9rem" }}
                  />
                </div>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0AEC5]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#F8F7FF] rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all"
                  style={{ fontSize: "0.9rem" }}
                />
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B0AEC5]" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#F8F7FF] rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all"
                  style={{ fontSize: "0.9rem" }}
                />
              </div>
              
              {/* ID Card Upload */}
              <div className="bg-[#F8F7FF] border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-[#6D28D9] transition-all cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-[#6D28D9]/10 flex items-center justify-center">
                    <IdCard size={20} className="text-[#6D28D9]" />
                  </div>
                  <p className="text-[#1A1A3E]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    Upload ID Card
                  </p>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>
                    PNG, JPG or PDF (Max 5MB)
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/dashboard")}
                className="w-full py-3.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all"
                style={{ fontWeight: 700, fontSize: "0.95rem" }}
              >
                Create Employee Account
              </button>
            </div>
          )}

          {/* Enterprise detail */}
          {step === "enterprise-detail" && (
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Company Name"
                className="w-full px-4 py-3.5 bg-[#F8F7FF] rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all"
                style={{ fontSize: "0.9rem" }}
              />
              <input
                type="text"
                placeholder="Industry / Sector"
                className="w-full px-4 py-3.5 bg-[#F8F7FF] rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all"
                style={{ fontSize: "0.9rem" }}
              />
              <select
                className="w-full px-4 py-3.5 bg-[#F8F7FF] rounded-xl border border-slate-200 text-[#1A1A3E] outline-none focus:border-[#6D28D9] transition-all appearance-none"
                style={{ fontSize: "0.9rem" }}
              >
                <option value="">Company Size</option>
                <option>1-10 employees</option>
                <option>11-50 employees</option>
                <option>51-200 employees</option>
                <option>200+ employees</option>
              </select>
              <input
                type="text"
                placeholder="City / Wilaya"
                className="w-full px-4 py-3.5 bg-[#F8F7FF] rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all"
                style={{ fontSize: "0.9rem" }}
              />
              <button
                onClick={() => navigate("/enterprise/onboarding")}
                className="w-full py-3.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all"
                style={{ fontWeight: 700, fontSize: "0.95rem" }}
              >
                Create Enterprise Account
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <div className="mt-10 text-center relative z-10">
        <div className="flex items-center justify-center mb-3">
          <img src={hustlifyLogo} alt="Hustlify" className="h-12 object-contain opacity-60" />
        </div>
        <div className="flex items-center justify-center gap-4 mb-2">
          <button
            onClick={() => navigate("/contact")}
            className="text-[#9CA3AF] hover:text-[#6D28D9] transition-colors"
            style={{ fontSize: "0.78rem" }}
          >
            CONTACT US
          </button>
        </div>
        <p className="text-[#B0AEC5]" style={{ fontSize: "0.75rem" }}>© 2026 Hustlify® Global LLC</p>
      </div>
    </div>
  );
}