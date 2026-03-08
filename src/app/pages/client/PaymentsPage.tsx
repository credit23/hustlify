import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Plus,
  TrendingUp,
  FileText,
  X,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

type PaymentStatus = "paid" | "pending" | "failed" | "processing";

const INVOICES = [
  {
    id: "INV-001",
    description: "Full-Stack Developer – Milestone 3",
    professional: "Karim Benali",
    amount: "39,000 DZD",
    date: "Feb 20, 2026",
    status: "paid" as PaymentStatus,
    img: "https://images.unsplash.com/photo-1565687981296-535f09db714e?w=80&q=80",
  },
  {
    id: "INV-002",
    description: "UX/UI Designer – Final Delivery",
    professional: "Sonia Amrani",
    amount: "45,000 DZD",
    date: "Jan 16, 2026",
    status: "paid" as PaymentStatus,
    img: "https://images.unsplash.com/photo-1765648580528-8d659861d81a?w=80&q=80",
  },
  {
    id: "INV-003",
    description: "Full-Stack Developer – Milestone 2",
    professional: "Karim Benali",
    amount: "39,000 DZD",
    date: "Jan 31, 2026",
    status: "paid" as PaymentStatus,
    img: "https://images.unsplash.com/photo-1565687981296-535f09db714e?w=80&q=80",
  },
  {
    id: "INV-004",
    description: "Content Writer – First Batch",
    professional: "Yacine Messaoud",
    amount: "9,000 DZD",
    date: "Feb 15, 2026",
    status: "pending" as PaymentStatus,
    img: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=80&q=80",
  },
  {
    id: "INV-005",
    description: "Full-Stack Developer – Milestone 1",
    professional: "Karim Benali",
    amount: "42,000 DZD",
    date: "Feb 25, 2026",
    status: "processing" as PaymentStatus,
    img: "https://images.unsplash.com/photo-1565687981296-535f09db714e?w=80&q=80",
  },
];

const SPEND_DATA = [
  { month: "Aug", amount: 0 },
  { month: "Sep", amount: 45000 },
  { month: "Oct", amount: 38000 },
  { month: "Nov", amount: 0 },
  { month: "Dec", amount: 45000 },
  { month: "Jan", amount: 39000 },
  { month: "Feb", amount: 90000 },
];

const STATUS_CONFIG: Record<PaymentStatus, { label: string; color: string; bg: string; icon: any }> = {
  paid: { label: "Paid", color: "#10B981", bg: "#D1FAE5", icon: CheckCircle },
  pending: { label: "Pending", color: "#F59E0B", bg: "#FEF3C7", icon: Clock },
  failed: { label: "Failed", color: "#EF4444", bg: "#FEE2E2", icon: AlertCircle },
  processing: { label: "Processing", color: "#4F8EF7", bg: "#EBF4FF", icon: Clock },
};

const PAYMENT_METHODS = [
  { id: "1", type: "CCP", label: "CCP Algeria", number: "•••• •••• 4529", default: true },
  { id: "2", type: "BARIDIMOB", label: "Baridimob", number: "•••• •••• 1107", default: false },
];

export default function PaymentsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"invoices" | "methods" | "overview">("overview");
  const [filterStatus, setFilterStatus] = useState<"all" | PaymentStatus>("all");
  const [showAddMethod, setShowAddMethod] = useState(false);

  const filtered = filterStatus === "all" ? INVOICES : INVOICES.filter((i) => i.status === filterStatus);

  const totalPaid = 123000;
  const totalPending = 9000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] to-[#EBF4FF] p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/client/dashboard")}
            className="p-2 rounded-xl bg-white border border-purple-100 hover:bg-purple-50 transition-colors"
          >
            <ArrowLeft size={16} className="text-[#6B7280]" />
          </button>
          <div>
            <h1 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.3rem" }}>
              Payments & Invoices
            </h1>
            <p className="text-[#6B7280]" style={{ fontSize: "0.82rem" }}>
              Manage your payments and track your spending
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["overview", "invoices", "methods"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl capitalize transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white"
                  : "bg-white border border-purple-100 text-[#6B7280] hover:border-purple-200"
              }`}
              style={{ fontSize: "0.85rem", fontWeight: 500 }}
            >
              {tab === "methods" ? "Payment Methods" : tab === "invoices" ? "Invoices" : "Overview"}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-5">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Total Paid", value: "123,000 DZD", change: "This quarter", icon: CheckCircle, color: "#10B981", bg: "#D1FAE5" },
                { label: "Pending Payments", value: "9,000 DZD", change: "1 invoice pending", icon: Clock, color: "#F59E0B", bg: "#FEF3C7" },
                { label: "Total Projects", value: "3 active", change: "Across 3 professionals", icon: FileText, color: "#6C63FF", bg: "#F0EEFF" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bg }}>
                      <stat.icon size={18} style={{ color: stat.color }} />
                    </div>
                    <p className="text-[#6B7280]" style={{ fontSize: "0.82rem" }}>{stat.label}</p>
                  </div>
                  <p className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.3rem" }}>{stat.value}</p>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>{stat.change}</p>
                </div>
              ))}
            </div>

            {/* Spend Chart */}
            <div className="bg-white rounded-2xl border border-purple-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#1A1A3E] flex items-center gap-2" style={{ fontWeight: 700, fontSize: "1rem" }}>
                  <TrendingUp size={16} className="text-[#6C63FF]" />
                  Spending Overview
                </h3>
                <span className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>Last 7 months</span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={SPEND_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0EEFF" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip
                    formatter={(v: number) => [`${v.toLocaleString()} DZD`, "Spent"]}
                    contentStyle={{ borderRadius: "12px", border: "1px solid #E9D5FF", fontSize: "0.8rem" }}
                  />
                  <Line type="monotone" dataKey="amount" stroke="#6C63FF" strokeWidth={2.5} dot={{ fill: "#6C63FF", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Invoices */}
            <div className="bg-white rounded-2xl border border-purple-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1rem" }}>Recent Invoices</h3>
                <button
                  onClick={() => setActiveTab("invoices")}
                  className="text-[#6C63FF] hover:underline"
                  style={{ fontSize: "0.78rem" }}
                >
                  View all →
                </button>
              </div>
              <div className="space-y-3">
                {INVOICES.slice(0, 3).map((inv) => {
                  const cfg = STATUS_CONFIG[inv.status];
                  return (
                    <div key={inv.id} className="flex items-center gap-3 p-3 bg-[#F5F3FF] rounded-xl">
                      <img src={inv.img} alt={inv.professional} className="w-9 h-9 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#1A1A3E] truncate" style={{ fontWeight: 600, fontSize: "0.85rem" }}>{inv.description}</p>
                        <p className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>{inv.id} · {inv.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "0.9rem" }}>{inv.amount}</p>
                        <span
                          className="px-2 py-0.5 rounded-lg"
                          style={{ backgroundColor: cfg.bg, color: cfg.color, fontSize: "0.65rem", fontWeight: 600 }}
                        >
                          {cfg.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === "invoices" && (
          <div>
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {(["all", "paid", "pending", "processing", "failed"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-4 py-2 rounded-xl whitespace-nowrap capitalize transition-all ${
                    filterStatus === s
                      ? "bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white"
                      : "bg-white border border-purple-100 text-[#6B7280] hover:border-purple-200"
                  }`}
                  style={{ fontSize: "0.8rem", fontWeight: 500 }}
                >
                  {s === "all" ? "All" : s}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-purple-100 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-[#F5F3FF] border-b border-purple-100">
                {["Invoice", "Description", "Professional", "Date", "Amount", "Status", ""].map((h, i) => (
                  <div
                    key={i}
                    className={`text-[#9CA3AF] ${i === 0 ? "col-span-1" : i === 1 ? "col-span-3" : i === 2 ? "col-span-2" : i === 3 ? "col-span-2" : i === 4 ? "col-span-2" : i === 5 ? "col-span-1" : "col-span-1"}`}
                    style={{ fontSize: "0.72rem", fontWeight: 600 }}
                  >
                    {h}
                  </div>
                ))}
              </div>

              {filtered.map((inv) => {
                const cfg = STATUS_CONFIG[inv.status];
                return (
                  <div key={inv.id} className="grid grid-cols-12 gap-3 px-5 py-4 border-b border-purple-50 last:border-0 items-center hover:bg-[#FAFAFF] transition-colors">
                    <div className="col-span-1">
                      <p className="text-[#6C63FF]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>{inv.id}</p>
                    </div>
                    <div className="col-span-3">
                      <p className="text-[#1A1A3E] truncate" style={{ fontSize: "0.82rem", fontWeight: 500 }}>{inv.description}</p>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <img src={inv.img} alt={inv.professional} className="w-6 h-6 rounded-lg object-cover" />
                      <p className="text-[#6B7280] truncate" style={{ fontSize: "0.78rem" }}>{inv.professional}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[#6B7280]" style={{ fontSize: "0.78rem" }}>{inv.date}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "0.85rem" }}>{inv.amount}</p>
                    </div>
                    <div className="col-span-1">
                      <span
                        className="flex items-center gap-1 px-2 py-0.5 rounded-lg w-fit"
                        style={{ backgroundColor: cfg.bg, color: cfg.color, fontSize: "0.65rem", fontWeight: 600 }}
                      >
                        <cfg.icon size={10} />
                        {cfg.label}
                      </span>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button className="p-1.5 rounded-lg hover:bg-purple-50 transition-colors">
                        <Download size={14} className="text-[#9CA3AF]" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <div className="py-12 text-center">
                  <FileText size={32} className="text-[#C4B5FD] mx-auto mb-2" />
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.875rem" }}>No invoices found</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === "methods" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "1rem" }}>Saved Methods</h3>
              <button
                onClick={() => setShowAddMethod(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl hover:opacity-90 transition-opacity"
                style={{ fontSize: "0.82rem", fontWeight: 600 }}
              >
                <Plus size={14} /> Add Method
              </button>
            </div>

            {PAYMENT_METHODS.map((method) => (
              <div key={method.id} className="bg-white rounded-2xl border border-purple-100 p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#9B8FFF] flex items-center justify-center">
                  <CreditCard size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.9rem" }}>{method.label}</p>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.8rem" }}>{method.number}</p>
                </div>
                {method.default && (
                  <span className="px-2.5 py-1 bg-[#F0EEFF] text-[#6C63FF] rounded-xl" style={{ fontSize: "0.72rem", fontWeight: 600 }}>
                    Default
                  </span>
                )}
                <button className="px-3 py-1.5 bg-[#F5F3FF] text-[#6B7280] rounded-xl hover:bg-purple-100 transition-colors" style={{ fontSize: "0.78rem" }}>
                  Edit
                </button>
              </div>
            ))}

            <div className="bg-white rounded-2xl border-2 border-dashed border-purple-200 p-6 text-center">
              <CreditCard size={28} className="text-[#C4B5FD] mx-auto mb-2" />
              <p className="text-[#6B7280] mb-1" style={{ fontWeight: 500, fontSize: "0.875rem" }}>
                Add a payment method
              </p>
              <p className="text-[#9CA3AF] mb-4" style={{ fontSize: "0.78rem" }}>
                Support for CCP, Baridimob, bank transfer, and more
              </p>
              <button
                onClick={() => setShowAddMethod(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl hover:opacity-90 transition-opacity"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                + Add Payment Method
              </button>
            </div>

            {/* Security notice */}
            <div className="bg-[#F0EEFF] rounded-2xl p-4 border border-purple-100 flex items-start gap-3">
              <CheckCircle size={18} className="text-[#6C63FF] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-[#6C63FF]" style={{ fontWeight: 600, fontSize: "0.85rem" }}>Secure Payments</p>
                <p className="text-[#6B7280]" style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>
                  All payments are processed securely. Funds are held in escrow and only released when you confirm project completion.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Method Modal */}
      {showAddMethod && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-purple-100 shadow-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>Add Payment Method</h3>
              <button onClick={() => setShowAddMethod(false)} className="p-2 rounded-xl hover:bg-purple-50 transition-colors">
                <X size={16} className="text-[#6B7280]" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { label: "CCP", desc: "Postal Checking Account" },
                { label: "Baridimob", desc: "Algeria Post Mobile Payment" },
                { label: "Bank Transfer", desc: "Direct bank transfer (BNA, BEA, CPA...)" },
              ].map((m) => (
                <button
                  key={m.label}
                  onClick={() => setShowAddMethod(false)}
                  className="w-full flex items-center gap-3 p-4 bg-[#F5F3FF] rounded-xl border-2 border-transparent hover:border-[#6C63FF] hover:bg-[#F0EEFF] transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#9B8FFF] flex items-center justify-center">
                    <CreditCard size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.875rem" }}>{m.label}</p>
                    <p className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>{m.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
