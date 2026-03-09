import { useState } from "react";
import {
  Briefcase, MessageSquare, Search, Bell, Menu, X,
  Home, LayoutDashboard, BookOpen, ChevronDown, Zap,
  Settings, LogOut, HelpCircle, Star,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  active?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK — replace with real unread count from your state/store
// ─────────────────────────────────────────────────────────────────────────────
const UNREAD_MESSAGES = 5;
const UNREAD_NOTIFS   = 2;

const NAV_ITEMS: NavItem[] = [
  { label: "Accueil",     href: "/",          icon: Home },
  { label: "Tableau",     href: "/dashboard", icon: LayoutDashboard },
  { label: "Offres",      href: "/jobs",       icon: Briefcase, active: true },
  { label: "Formations",  href: "/learn",      icon: BookOpen },
];

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────────
export default function DashboardNavbar() {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-[9000] bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* ── LOGO ──────────────────────────────────────────────────── */}
            <a href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight">
                Work<span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Force</span>
              </span>
            </a>

            {/* ── DESKTOP NAV LINKS ─────────────────────────────────────── */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      item.active
                        ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-md shadow-purple-200/60"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </a>
                );
              })}
            </nav>

            {/* ── DESKTOP RIGHT ACTIONS ─────────────────────────────────── */}
            <div className="hidden md:flex items-center gap-2">

              {/* Search */}
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all duration-200 text-sm">
                <Search className="w-4 h-4" />
                <span className="text-xs text-slate-400 hidden lg:block pr-6">Rechercher…</span>
                <kbd className="hidden lg:block text-[10px] font-bold bg-white border border-slate-200 text-slate-400 px-1.5 py-0.5 rounded-md">⌘K</kbd>
              </button>

              {/* Messages — NEW (replaces Profile) */}
              <a
                href="/messages"
                className="relative p-2.5 rounded-xl text-slate-600 hover:text-violet-700 hover:bg-violet-50 border border-transparent hover:border-violet-200 transition-all duration-200 group"
                title="Messages"
              >
                <MessageSquare className="w-5 h-5" />
                {UNREAD_MESSAGES > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                    {UNREAD_MESSAGES > 9 ? "9+" : UNREAD_MESSAGES}
                  </span>
                )}
              </a>

              {/* Notifications */}
              <button
                className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all duration-200"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {UNREAD_NOTIFS > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                    {UNREAD_NOTIFS}
                  </span>
                )}
              </button>

              {/* User avatar + dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(o => !o)}
                  className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-xs">YA</span>
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-bold text-slate-800 leading-tight">Youssef A.</p>
                    <p className="text-[10px] text-slate-500">Électricien</p>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 hidden lg:block ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown menu */}
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 z-20 overflow-hidden">
                      {/* User info header */}
                      <div className="px-4 py-3 bg-gradient-to-r from-violet-50 to-blue-50 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-800">Youssef Amrani</p>
                        <p className="text-xs text-slate-500">youssef@example.com</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-semibold text-slate-600">4.8 · 32 missions</span>
                        </div>
                      </div>

                      <div className="py-1.5">
                        {[
                          { icon: LayoutDashboard, label: "Tableau de bord", href: "/dashboard" },
                          { icon: MessageSquare,   label: "Messages",        href: "/messages", badge: UNREAD_MESSAGES },
                          { icon: Bell,            label: "Notifications",   href: "/notifs",   badge: UNREAD_NOTIFS },
                          { icon: Settings,        label: "Paramètres",      href: "/settings" },
                          { icon: HelpCircle,      label: "Aide",            href: "/help" },
                        ].map(item => {
                          const Icon = item.icon;
                          return (
                            <a
                              key={item.label}
                              href={item.href}
                              className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-violet-700 transition-colors"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <span className="flex items-center gap-2.5">
                                <Icon className="w-4 h-4 text-slate-400" />
                                {item.label}
                              </span>
                              {item.badge && item.badge > 0 && (
                                <span className="w-4 h-4 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                                  {item.badge}
                                </span>
                              )}
                            </a>
                          );
                        })}
                      </div>

                      <div className="border-t border-slate-100 py-1.5">
                        <button className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors">
                          <LogOut className="w-4 h-4" />
                          Déconnexion
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ── MOBILE HAMBURGER ──────────────────────────────────────── */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-all"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ───────────────────────────────────────────────── */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-xl px-4 py-4 space-y-1 shadow-lg">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    item.active
                      ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </a>
              );
            })}

            {/* Messages mobile */}
            <a
              href="/messages"
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-all"
              onClick={() => setMobileOpen(false)}
            >
              <span className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4" />
                Messages
              </span>
              {UNREAD_MESSAGES > 0 && (
                <span className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {UNREAD_MESSAGES}
                </span>
              )}
            </a>

            <div className="pt-2 border-t border-slate-100 mt-2">
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-xs">YA</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Youssef Amrani</p>
                  <p className="text-xs text-slate-500">Électricien · 4.8 ⭐</p>
                </div>
              </div>
              <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-all">
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
