"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Wifi, Phone } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "Packages",
    href: "/#packages",
  },
  {
    label: "Coverage",
    href: "/#coverage",
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "Testimonials",
    href: "/#testimonials",
  },
  {
    label: "Invest",
    href: "/invest",
  },
  {
    label: "Contact",
    href: "/#contact",
  },
];

export const packages = [
  { 
    speed: "5", 
    price: "1,000", 
    originalPrice: "1,500",
    accent: "from-emerald-500 to-emerald-400",
    icon: Wifi,
    popular: false,
    tag: "Starter"
  },
  { 
    speed: "8", 
    price: "1,500", 
    originalPrice: "2,000",
    accent: "from-blue-500 to-cyan-400",
    icon: Wifi,
    popular: true,
    tag: "Most Popular"
  },
  { 
    speed: "15", 
    price: "2,000", 
    originalPrice: "2,500",
    accent: "from-purple-500 to-violet-400",
    icon: Wifi,
    popular: false,
    tag: "Standard"
  },
  { 
    speed: "30", 
    price: "3,000", 
    originalPrice: "4,000",
    accent: "from-orange-500 to-amber-400",
    icon: Wifi,
    popular: false,
    tag: "Premium"
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdminPage = pathname?.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (isAdminPage) {
    return null;
  }

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      
      if (pathname === '/') {
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push('/');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 300);
      }
    } else {
      router.push(href);
    }
    
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200"
            : "bg-gradient-to-b from-blue-950/90 to-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo - Full Name */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
            >
              <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold shadow-lg transition-transform duration-300 group-hover:scale-105 text-[8px] sm:text-[10px] leading-tight text-center">
                UFN
              </div>

              <div className="hidden xs:block">
                <h1
                  className={`font-bold text-sm sm:text-lg transition-colors duration-300 ${
                    isScrolled
                      ? "text-gray-900"
                      : "text-white"
                  }`}
                >
                  UltrafyNetworks
                </h1>

                <p
                  className={`text-[10px] sm:text-xs transition-colors duration-300 ${
                    isScrolled
                      ? "text-gray-500"
                      : "text-gray-300"
                  }`}
                >
                  Fast • Reliable • Unlimited
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className={`font-medium transition-colors duration-300 ${
                    isScrolled
                      ? "text-gray-700 hover:text-emerald-600"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4">
              <a
                href="tel:0700541561"
                className={`inline-flex items-center gap-2 rounded-xl px-3 lg:px-5 py-2 lg:py-3 text-xs lg:text-sm font-semibold transition-all duration-300 ${
                  isScrolled
                    ? "text-emerald-600 hover:bg-emerald-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                <Phone className="w-3 h-3 lg:w-4 lg:h-4" />
                0700 541 561
              </a>
              <a
                href="/#contact"
                onClick={(e) => handleNavigation(e, "/#contact")}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-4 lg:px-5 py-2 lg:py-3 text-xs lg:text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                Get Connected
                <ArrowRight className="h-3 w-3 lg:h-4 lg:w-4" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={`md:hidden rounded-xl p-1.5 sm:p-2 transition-colors duration-300 ${
                isScrolled
                  ? "text-gray-900 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Open Menu"
            >
              <Menu className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 md:hidden ${
          mobileOpen
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <aside
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-4 sm:px-6 py-4 sm:py-5">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 sm:gap-3"
            >
              <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-[8px] sm:text-[10px] leading-tight text-center">
                UFN
              </div>

              <div>
                <h2 className="font-bold text-sm sm:text-base text-gray-900">
                  UltrafyNetworks
                </h2>

                <p className="text-[10px] sm:text-xs text-gray-500">
                  Fast • Reliable
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl p-1.5 sm:p-2 text-gray-600 hover:bg-gray-100"
              aria-label="Close Menu"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Drawer Navigation */}
          <div className="flex flex-col px-4 sm:px-6 py-6 sm:py-8 overflow-y-auto" style={{ maxHeight: "calc(100% - 120px)" }}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavigation(e, link.href)}
                className="rounded-xl px-4 py-3.5 sm:py-4 text-base sm:text-lg font-medium text-gray-700 transition hover:bg-gray-100 hover:text-emerald-600"
              >
                {link.label}
              </a>
            ))}

            {/* Packages Display in Mobile */}
            <div className="mt-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 p-3 sm:p-4">
              <h3 className="text-xs sm:text-sm font-semibold text-emerald-900 mb-2 sm:mb-3">
                Our Packages
              </h3>
              {packages.map((pkg, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 sm:py-2 border-b border-emerald-200/50 last:border-0">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
                    <span className="font-medium text-sm sm:text-base text-gray-900">{pkg.speed} Mbps</span>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="font-bold text-emerald-600 text-sm sm:text-base">KSh {pkg.price}</span>
                    <span className="text-[10px] sm:text-xs text-gray-500 line-through">KSh {pkg.originalPrice}</span>
                  </div>
                </div>
              ))}
              <p className="text-[10px] sm:text-xs text-emerald-700 mt-1 sm:mt-2">
                * 1 Month Free After Installation
              </p>
            </div>

            {/* Mobile CTA */}
            <a
              href="/#contact"
              onClick={(e) => handleNavigation(e, "/#contact")}
              className="mt-4 sm:mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-5 py-3.5 sm:py-4 font-semibold text-white shadow-lg transition hover:shadow-xl text-sm sm:text-base"
            >
              Get Connected
              <ArrowRight className="h-4 w-4" />
            </a>

            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
              <a href="tel:0700541561" className="text-emerald-600 font-medium">
                Call 0700 541 561
              </a>
              <span className="text-gray-300 hidden sm:inline">|</span>
              <a href="tel:0703199691" className="text-emerald-600 font-medium">
                WhatsApp 0703 199 691
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 px-4 sm:px-6 py-4 sm:py-5 bg-white">
            <p className="text-xs sm:text-sm text-gray-500">
              Monday – Saturday
            </p>
            <p className="font-medium text-gray-900 text-sm sm:text-base">
              8:00 AM – 5:00 PM
            </p>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-emerald-600 font-medium">
              24/7 Technical Support Available
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
