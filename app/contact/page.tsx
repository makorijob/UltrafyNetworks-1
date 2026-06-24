"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Mail, Phone, MessageCircle, Clock, MapPin, Headset } from "lucide-react";

const subjects = [
  "Fiber internet installations",
  "Technical support",
  "Billing inquiry",
  "Upgrade package",
  "Relocation",
  "Solar panel installation",
  "Electrical installation",
  "CCTV installation",
  "Electric fence installation",
  "Fire alarm system",
  "Burglar alarm system",
  "Investment opportunities",
  "Partnership inquiry",
  "Other",
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      toast.success(data.message || "Message sent!");
      setForm({ fullName: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ============ HEADER BAND ============ */}
      <div className="relative bg-blue-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] bg-[length:36px_36px]" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
          <p className="text-yellow-400 font-semibold tracking-widest text-xs sm:text-sm">GET IN TOUCH</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2 sm:mt-3 max-w-xl leading-tight">
            Talk to UltrafyNetworks
          </h1>
          <p className="text-blue-100 text-sm sm:text-base mt-3 sm:mt-4 max-w-lg leading-relaxed">
            Whether it's a new installation, investment opportunity, or something urgent — our team in Thika is ready to help.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-7">
            <span className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-blue-50">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              Mon–Sat, 8am–5pm
            </span>
            <span className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-blue-50">
              <Headset className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
              Technical support 24/7
            </span>
          </div>
        </div>
      </div>

      {/* ============ MAIN CONTENT ============ */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-10 pb-16 sm:pb-20 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-6">

          {/* ---- LEFT: contact info cards ---- */}
          <div className="space-y-4 sm:space-y-5">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-slate-100 p-5 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-950 flex items-center justify-center mb-3 sm:mb-4">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              </div>
              <p className="font-bold text-blue-950 text-base sm:text-lg mb-1">Call us</p>
              <p className="text-slate-500 text-xs sm:text-sm mb-3 sm:mb-4">Speak directly with our support team</p>
              <a href="tel:0740121382" className="text-emerald-600 font-semibold hover:text-emerald-800 transition-colors text-sm sm:text-base">
                0740121382
              </a>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-slate-100 p-5 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500 flex items-center justify-center mb-3 sm:mb-4">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <p className="font-bold text-blue-950 text-base sm:text-lg mb-1">WhatsApp</p>
              <p className="text-slate-500 text-xs sm:text-sm mb-3 sm:mb-4">Fastest way to reach us for quick queries</p>
              <a href="https://wa.me/254740121382" className="text-emerald-600 font-semibold hover:text-emerald-800 transition-colors text-sm sm:text-base">
                Chat with us →
              </a>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-slate-100 p-5 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500 flex items-center justify-center mb-3 sm:mb-4">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <p className="font-bold text-blue-950 text-base sm:text-lg mb-1">Email us</p>
              <p className="text-slate-500 text-xs sm:text-sm mb-3 sm:mb-4">For detailed inquiries and documentation</p>
              <a href="mailto:info.ultrafynetworks@gmail.com" className="text-emerald-600 font-semibold hover:text-emerald-800 transition-colors break-all text-sm sm:text-base">
                info.ultrafynetworks@gmail.com
              </a>
            </div>

            <div className="bg-blue-950 rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] bg-[length:24px_24px]" />
              <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-3 sm:mb-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                </div>
                <p className="font-bold text-base sm:text-lg mb-1">Visit our office</p>
                <p className="text-blue-100 text-xs sm:text-sm leading-relaxed">
                  Thika Town, Kenya<br />Open Monday to Saturday
                </p>
              </div>
            </div>
          </div>

          {/* ---- RIGHT: form ---- */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-slate-100 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 mb-1">Send us a message</h2>
            <p className="text-slate-500 text-sm sm:text-base mb-4 sm:mb-7">We typically respond within an hour during business hours.</p>

            <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full name"
                  className="w-full p-3 sm:p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400 text-sm sm:text-base"
                  required
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Phone number"
                  className="w-full p-3 sm:p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400 text-sm sm:text-base"
                  required
                />
              </div>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email address"
                className="w-full p-3 sm:p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400 text-sm sm:text-base"
              />

              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-slate-900 text-sm sm:text-base"
                required
              >
                <option value="">Select a subject</option>
                {subjects.map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us how we can help you..."
                className="w-full p-3 sm:p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-none text-sm sm:text-base"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20"
              >
                {loading ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
