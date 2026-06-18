"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Search, CheckCircle2, Clock, Phone } from "lucide-react";

type CoverageStatus = "live" | "coming-soon";

interface CoverageArea {
  name: string;
  status: CoverageStatus;
  note?: string;
}

const coverageAreas: CoverageArea[] = [
  // Live areas in Thika
  { name: "Thika Town", status: "live" },
  { name: "Weitethie", status: "live" },
  { name: "Ngoingwa", status: "live" },
  { name: "Gatukuyu", status: "live" },
  { name: "Mangu", status: "live" },
  { name: "Section 9", status: "live" },
  { name: "Kiganjo", status: "live" },
  { name: "Makongeni", status: "live" },
  // Coming soon areas
  { name: "Kimbo", status: "coming-soon", note: "Expected Q3 2026" },
  { name: "Kiboko", status: "coming-soon", note: "Expected Q3 2026" },
  { name: "Gatuanyaga", status: "coming-soon", note: "Expected Q4 2026" },
];

export default function CoveragePage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<CoverageArea | null | "not-found">(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return;

    const match = coverageAreas.find(
      (area) =>
        area.name.toLowerCase().includes(trimmed) ||
        trimmed.includes(area.name.toLowerCase())
    );

    setResult(match ?? "not-found");
  };

  const liveAreas = coverageAreas.filter((a) => a.status === "live");
  const comingSoonAreas = coverageAreas.filter((a) => a.status === "coming-soon");

  return (
    <div className="min-h-screen bg-white">

      {/* ============ HEADER ============ */}
      <div className="relative bg-blue-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] bg-[length:36px_36px]" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
          <p className="text-yellow-400 font-semibold tracking-widest text-xs sm:text-sm">COVERAGE AREA</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2 sm:mt-3 max-w-2xl leading-tight">
            Are we already in your neighbourhood?
          </h1>
          <p className="text-blue-100 text-sm sm:text-base mt-3 sm:mt-4 max-w-xl leading-relaxed">
            We're expanding fibre across Thika and surrounding areas every quarter. Check your area below or call us directly.
          </p>
        </div>
      </div>

      {/* ============ CHECKER ============ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-blue-950 mb-1">Check your area</h2>
            <p className="text-slate-500 text-xs sm:text-sm mb-4 sm:mb-6">Type your estate, road, or town to see if you're covered.</p>

            <form onSubmit={handleCheck} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Thika Town, Section 9..."
                  className="w-full pl-11 pr-4 py-3 sm:py-4 rounded-xl border border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-900 placeholder:text-slate-400 text-sm sm:text-base"
                />
              </div>
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 sm:px-7 py-3 sm:py-4 rounded-xl transition-colors shrink-0 text-sm sm:text-base"
              >
                Check
              </button>
            </form>

            {result === "not-found" && (
              <div className="mt-4 sm:mt-5 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900 text-xs sm:text-sm">Not in our coverage zone yet</p>
                  <p className="text-amber-700 text-xs sm:text-sm mt-1">
                    We couldn't find that area on our list. Call us and we'll let you know if it's planned, or register your interest.
                  </p>
                </div>
              </div>
            )}

            {result && result !== "not-found" && result.status === "live" && (
              <div className="mt-4 sm:mt-5 flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3 sm:p-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-emerald-900 text-xs sm:text-sm">Good news — {result.name} is live</p>
                  <p className="text-emerald-700 text-xs sm:text-sm mt-1">
                    You're in our coverage zone. Get in touch and we'll schedule your free installation.
                  </p>
                </div>
              </div>
            )}

            {result && result !== "not-found" && result.status === "coming-soon" && (
              <div className="mt-4 sm:mt-5 flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4">
                <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 text-xs sm:text-sm">{result.name} is coming soon</p>
                  <p className="text-blue-700 text-xs sm:text-sm mt-1">
                    {result.note ?? "We're expanding here soon."} Register your interest and we'll notify you the moment we go live.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ FULL LIST ============ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-emerald-600 font-semibold tracking-widest text-xs sm:text-sm">FULL COVERAGE LIST</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 mt-2 sm:mt-3 mb-6 sm:mb-10">
            Where we're connected today
          </h2>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">

            {/* Live */}
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <h3 className="font-bold text-blue-950 text-sm sm:text-base">Live now</h3>
              </div>
              <div className="space-y-2 sm:space-y-2.5">
                {liveAreas.map((area, i) => (
                  <div key={i} className="flex items-center justify-between bg-white rounded-xl border border-slate-100 px-4 sm:px-5 py-2.5 sm:py-3.5">
                    <span className="flex items-center gap-2 sm:gap-2.5 text-slate-800 font-medium text-sm sm:text-base">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      {area.name}
                    </span>
                    <span className="text-[10px] sm:text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 sm:px-2.5 py-1 rounded-full shrink-0">
                      Connected
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming soon */}
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <h3 className="font-bold text-blue-950 text-sm sm:text-base">Coming soon</h3>
              </div>
              <div className="space-y-2 sm:space-y-2.5">
                {comingSoonAreas.map((area, i) => (
                  <div key={i} className="flex items-center justify-between bg-white rounded-xl border border-slate-100 px-4 sm:px-5 py-2.5 sm:py-3.5">
                    <div>
                      <span className="flex items-center gap-2 sm:gap-2.5 text-slate-800 font-medium text-sm sm:text-base">
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        {area.name}
                      </span>
                      {area.note && <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 sm:mt-1 ml-6">{area.note}</p>}
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-blue-700 bg-blue-50 px-2 sm:px-2.5 py-1 rounded-full shrink-0">
                      Planned
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-slate-500 text-xs sm:text-sm mt-6 sm:mt-8 text-center">
            Don't see your area? We add new zones based on demand — reach out and let us know where you are.
          </p>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[length:40px_40px]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-5">
            Outside our coverage for now?
          </h2>
          <p className="text-emerald-50 text-base sm:text-lg max-w-xl mx-auto mb-6 sm:mb-9 leading-relaxed">
            Register your interest and we'll reach out the moment fibre arrives in your area.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="tel:0700541561"
              className="bg-white text-emerald-700 font-bold px-6 sm:px-9 py-3 sm:py-4 rounded-full text-sm sm:text-lg hover:bg-yellow-400 hover:text-blue-950 transition-all duration-300 flex items-center gap-2 sm:gap-3"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              Call 0700 541 561
            </a>
            <Link
              href="/contact"
              className="border-2 border-white/80 hover:border-white font-semibold px-6 sm:px-9 py-3 sm:py-4 rounded-full text-sm sm:text-lg hover:bg-white/10 transition-all duration-300"
            >
              Register interest
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
