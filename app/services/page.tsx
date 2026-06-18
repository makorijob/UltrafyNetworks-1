import Link from "next/link";
import Image from "next/image";
import {
  Wifi,
  Sun,
  Zap,
  Video,
  ShieldAlert,
  Flame,
  Lock,
  Truck,
  ArrowUpCircle,
  Phone,
  CheckCircle2,
} from "lucide-react";

const internetPackages = [
  { speed: "5", price: "1,000", accent: "from-emerald-500 to-emerald-400" },
  { speed: "8", price: "1,500", accent: "from-blue-500 to-cyan-400" },
  { speed: "15", price: "2,000", accent: "from-purple-500 to-violet-400" },
  { speed: "30", price: "3,000", accent: "from-orange-500 to-amber-400" },
];

const otherServices = [
  {
    icon: Sun,
    title: "Solar panel installation",
    desc: "Design and installation of solar systems sized to your home or business power needs, with battery backup options.",
    color: "bg-amber-500",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
    features: ["Solar panel installation", "Battery backup systems", "System design", "Grid-tied solutions", "Off-grid systems"]
  },
  {
    icon: Zap,
    title: "Electrical installation",
    desc: "Full house and commercial wiring, fault diagnosis, and certified electrical work done to code.",
    color: "bg-yellow-500",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop",
    features: ["House wiring", "Commercial wiring", "Fault diagnosis", "Certified work", "Safety compliance"]
  },
  {
    icon: Video,
    title: "CCTV installation",
    desc: "Indoor and outdoor camera systems with remote viewing on your phone, sized for homes, shops, or compounds.",
    color: "bg-slate-700",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop",
    features: ["HD cameras", "Remote viewing", "Night vision", "Indoor/outdoor", "24/7 monitoring"]
  },
  {
    icon: ShieldAlert,
    title: "Electric fence installation",
    desc: "Perimeter security fencing with shock deterrent and alarm integration for homes and commercial premises.",
    color: "bg-red-600",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&h=600&fit=crop",
    features: ["Perimeter security", "Shock deterrent", "Alarm integration", "Commercial premises", "Home security"]
  },
  {
    icon: Flame,
    title: "Fire alarm systems",
    desc: "Smoke and heat detection systems with audible alerts, installed and tested to meet safety requirements.",
    color: "bg-orange-600",
    image: "https://images.unsplash.com/photo-1562311701-58c0a0f0b218?w=800&h=600&fit=crop",
    features: ["Smoke detection", "Heat detection", "Audible alerts", "Safety compliance", "System testing"]
  },
  {
    icon: Lock,
    title: "Burglar alarm systems",
    desc: "Motion-sensor and entry alarms with optional monitoring, giving you alerts the moment something's wrong.",
    color: "bg-blue-700",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop",
    features: ["Motion sensors", "Entry alarms", "Remote monitoring", "Instant alerts", "24/7 protection"]
  },
  {
    icon: Wifi,
    title: "Access Points Installation",
    desc: "Extend your network coverage with professional access point installation. Perfect for offices, hotels, and large homes.",
    color: "bg-cyan-600",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
    features: ["WiFi coverage extension", "Mesh network setup", "Guest WiFi", "Signal optimization", "Office network"]
  },
  {
    icon: ShieldAlert,
    title: "Technical Installations",
    desc: "Professional technical installation services for all your IT and security needs. Expert technicians with years of experience.",
    color: "bg-indigo-600",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop",
    features: ["IT infrastructure", "Network cabling", "Hardware installation", "System configuration", "Technical support"]
  },
];

const addOns = [
  { icon: Truck, title: "Relocation", desc: "Moving house? We'll transfer and reinstall your existing internet connection at the new address." },
  { icon: ArrowUpCircle, title: "Package upgrades", desc: "Outgrown your current speed? Switch to a faster plan anytime before your next billing cycle." },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ============ HEADER ============ */}
      <div className="relative bg-blue-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff12_1px,transparent_1px)] bg-[length:36px_36px]" />
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
          <p className="text-yellow-400 font-semibold tracking-widest text-xs sm:text-sm">OUR SERVICES</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-2 sm:mt-3 max-w-2xl leading-tight">
            More than internet — everything that keeps your home and business running
          </h1>
          <p className="text-blue-100 text-sm sm:text-base mt-3 sm:mt-4 max-w-xl leading-relaxed">
            From fibre installation to solar, security, and fire safety — our technicians handle it all under one roof in Thika.
          </p>
        </div>
      </div>

      {/* ============ INTERNET PACKAGES ============ */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2 sm:mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-950 flex items-center justify-center">
              <Wifi className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            </div>
            <p className="text-emerald-600 font-semibold tracking-widest text-xs sm:text-sm">FIBRE INTERNET</p>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 mb-6 sm:mb-10 max-w-xl">
            Pick a speed that fits your household
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {internetPackages.map((pkg, i) => (
              <div
                key={i}
                className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-slate-50 p-5 sm:p-7 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`text-4xl sm:text-5xl font-extrabold bg-gradient-to-br ${pkg.accent} bg-clip-text text-transparent`}>
                  {pkg.speed}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 -mt-1 mb-3 sm:mb-4">Mbps</div>
                <div className="text-xl sm:text-2xl font-bold text-blue-950">KSh {pkg.price}</div>
                <div className="text-[10px] sm:text-xs text-slate-400 mb-4 sm:mb-5">per month</div>
                <ul className="text-xs sm:text-sm text-slate-600 text-left space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 mt-0.5 shrink-0" />
                    Unlimited data
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 mt-0.5 shrink-0" />
                    Free installation
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 mt-0.5 shrink-0" />
                    24/7 technical support
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 mt-0.5 shrink-0" />
                    1 month free
                  </li>
                </ul>
                <Link
                  href="/contact"
                  className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition-colors text-sm sm:text-base"
                >
                  Choose plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ OTHER SERVICES WITH IMAGES ============ */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <p className="text-emerald-600 font-semibold tracking-widest text-xs sm:text-sm">INSTALLATIONS &amp; SECURITY</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 mt-2 sm:mt-3 mb-6 sm:mb-10 max-w-xl">
            Solar, electrical, and security work done right
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 bg-slate-200 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute top-4 right-4 z-10">
                    <div className={`w-10 h-10 rounded-full ${service.color} flex items-center justify-center shadow-lg`}>
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 z-10">
                    <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                      {service.title}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{service.desc}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                        +{service.features.length - 3} more
                      </span>
                    )}
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    Get a quote →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ADD-ONS ============ */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-emerald-600 font-semibold tracking-widest text-xs sm:text-sm">ALREADY A CUSTOMER?</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-950 mt-2 sm:mt-3 mb-6 sm:mb-10 max-w-xl">
            Manage your existing connection
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {addOns.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 sm:gap-5 bg-slate-50 rounded-2xl sm:rounded-3xl border border-slate-100 p-5 sm:p-7 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-950 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-blue-950 mb-1 sm:mb-1.5">{item.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] bg-[length:40px_40px]" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-5">
            Not sure which service you need?
          </h2>
          <p className="text-emerald-50 text-base sm:text-lg max-w-xl mx-auto mb-6 sm:mb-9 leading-relaxed">
            Tell us what you're trying to solve — internet, power, or security — and we'll recommend the right fit.
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
              Send us a message
            </Link>
          </div>
          <p className="text-emerald-200 text-xs sm:text-sm mt-4">
            WhatsApp: 0703 199 691
          </p>
        </div>
      </section>
    </div>
  );
}
