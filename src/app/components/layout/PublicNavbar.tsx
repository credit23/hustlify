import { useNavigate, NavLink } from "react-router";
import { Globe, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import hustlifyLogo from "figma:asset/ee079ff6b92e2af14de5404d0251f4a3326be5ea.png";
import { useLanguage, type Lang } from "../../context/LanguageContext";

const LANGUAGES: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "EN" },
  { code: "fr", label: "Français", flag: "FR" },
  { code: "ar", label: "العربية", flag: "AR" },
];

export default function PublicNavbar() {
  const navigate = useNavigate();
  const { lang, setLang, t, dir } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === lang)!;

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-200"
          : "bg-transparent"
      }`}
      dir={dir}
    >
      <div className="max-w-6xl mx-auto px-6 h-[76px] flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center"
        >
          <img src={hustlifyLogo} alt="Hustlify" className="h-16 object-contain" />
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: t("nav.sponsors"), to: "/sponsors" },
            { label: t("nav.whyUs"), to: "/why-us" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition-colors ${
                  isActive
                    ? "text-[#6D28D9]"
                    : "text-[#4A4A68] hover:text-[#6D28D9]"
                }`
              }
              style={{ fontSize: "0.9rem", fontWeight: 500 }}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate("/auth")}
            className="px-5 py-2.5 rounded-xl border-2 border-[#6D28D9] text-[#6D28D9] hover:bg-[#6D28D9]/5 transition-all"
            style={{ fontSize: "0.875rem", fontWeight: 600 }}
          >
            {t("nav.login")}
          </button>
          <button
            onClick={() => navigate("/auth")}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white hover:shadow-lg hover:shadow-blue-200 transition-all"
            style={{ fontSize: "0.875rem", fontWeight: 600 }}
          >
            {t("nav.signup")}
          </button>

          {/* Language Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl hover:bg-blue-50 transition-colors ${
                langOpen ? "bg-blue-50" : ""
              }`}
            >
              <Globe size={17} className="text-[#6B7280]" />
              <span className="text-[#6B7280]" style={{ fontSize: "0.78rem", fontWeight: 600 }}>
                {currentLang.flag}
              </span>
              <ChevronDown
                size={13}
                className={`text-[#9CA3AF] transition-transform ${langOpen ? "rotate-180" : ""}`}
              />
            </button>

            {langOpen && (
              <div
                className="absolute top-full mt-2 bg-white rounded-xl border border-slate-200 shadow-xl py-1.5 min-w-[160px] z-50"
                style={{ [dir === "rtl" ? "left" : "right"]: 0 }}
              >
                {LANGUAGES.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      setLang(language.code);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 transition-colors ${
                      lang === language.code
                        ? "bg-blue-50 text-[#6D28D9]"
                        : "text-[#4A4A68] hover:bg-blue-50"
                    }`}
                    style={{ fontSize: "0.85rem", fontWeight: lang === language.code ? 700 : 500 }}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                        lang === language.code ? "bg-[#6D28D9] text-white" : "bg-gray-100 text-[#6B7280]"
                      }`}
                      style={{ fontSize: "0.65rem", fontWeight: 700 }}
                    >
                      {language.flag}
                    </span>
                    <span>{language.label}</span>
                    {lang === language.code && (
                      <span className="ml-auto text-[#6D28D9]" style={{ fontSize: "0.9rem" }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile language */}
          <div className="relative" ref={undefined}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="p-2 rounded-lg hover:bg-blue-50"
            >
              <Globe size={20} className="text-[#6B7280]" />
            </button>
            {langOpen && (
              <div
                className="absolute top-full mt-1 bg-white rounded-xl border border-slate-200 shadow-xl py-1.5 min-w-[150px] z-50"
                style={{ [dir === "rtl" ? "left" : "right"]: 0 }}
              >
                {LANGUAGES.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => {
                      setLang(language.code);
                      setLangOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 transition-colors ${
                      lang === language.code
                        ? "bg-blue-50 text-[#6D28D9]"
                        : "text-[#4A4A68] hover:bg-blue-50"
                    }`}
                    style={{ fontSize: "0.82rem", fontWeight: lang === language.code ? 700 : 500 }}
                  >
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center ${
                        lang === language.code ? "bg-[#6D28D9] text-white" : "bg-gray-100 text-[#6B7280]"
                      }`}
                      style={{ fontSize: "0.6rem", fontWeight: 700 }}
                    >
                      {language.flag}
                    </span>
                    {language.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="p-2 rounded-lg hover:bg-blue-50"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 px-6 py-5 space-y-3">
          {[
            { label: t("nav.sponsors"), to: "/sponsors" },
            { label: t("nav.whyUs"), to: "/why-us" },
            { label: t("nav.contact"), to: "/contact" },
          ].map((item) => (
            <button
              key={item.to}
              onClick={() => { navigate(item.to); setMobileOpen(false); }}
              className="block w-full text-left text-[#4A4A68] hover:text-[#6D28D9] py-2"
              style={{ fontSize: "0.95rem", fontWeight: 500, textAlign: dir === "rtl" ? "right" : "left" }}
            >
              {item.label}
            </button>
          ))}
          <div className="flex gap-3 pt-3">
            <button
              onClick={() => navigate("/auth")}
              className="flex-1 py-2.5 rounded-xl border-2 border-[#6D28D9] text-[#6D28D9]"
              style={{ fontWeight: 600 }}
            >
              {t("nav.login")}
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white"
              style={{ fontWeight: 600 }}
            >
              {t("nav.signup")}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}