import { useNavigate } from "react-router";
import { Facebook, Linkedin, Instagram, Mail, MapPin } from "lucide-react";
import hustlifyLogo from "figma:asset/ee079ff6b92e2af14de5404d0251f4a3326be5ea.png";
import { useLanguage } from "../../context/LanguageContext";

export default function PublicFooter() {
  const navigate = useNavigate();
  const { t, dir } = useLanguage();

  return (
    <footer className="bg-white border-t border-slate-200" dir={dir}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: Links */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigate("/")}
              className="text-[#4A4A68] hover:text-[#6D28D9] transition-colors"
              style={{ fontSize: "0.9rem", fontWeight: 500 }}
            >
              {t("footer.home")}
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="text-[#4A4A68] hover:text-[#6D28D9] transition-colors"
              style={{ fontSize: "0.9rem", fontWeight: 500 }}
            >
              {t("footer.contactUs")}
            </button>
            <button
              onClick={() => navigate("/sponsors")}
              className="text-[#4A4A68] hover:text-[#6D28D9] transition-colors"
              style={{ fontSize: "0.9rem", fontWeight: 500 }}
            >
              {t("footer.sponsors")}
            </button>
          </div>

          {/* Center/Right: Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center"
          >
            <img src={hustlifyLogo} alt="Hustlify" className="h-18 object-contain" />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Follow Us */}
          <div className="flex items-center gap-4">
            <span className="text-[#6B7280]" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
              {t("footer.followUs")}
            </span>
            <div className="flex items-center gap-2">
              {[Facebook, Linkedin, Instagram, Mail].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full bg-blue-50 hover:bg-[#6D28D9] hover:text-white text-[#6B7280] flex items-center justify-center transition-all"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-[#6B7280]">
            <MapPin size={15} className="text-[#6D28D9]" />
            <span style={{ fontSize: "0.85rem" }}>{t("footer.location")}</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[#9CA3AF]" style={{ fontSize: "0.8rem" }}>
            {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}