"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight, Wifi, Zap, Crown } from "lucide-react";

const navLinks = [
  {
    label: "Packages",
    href: "#packages",
  },
  {
    label: "Coverage",
    href: "#coverage",
  },
  {
    label: "Careers",
    href: "/careers",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

// Package data from your flyer
export const packages = [
  { 
    speed: "8", 
    price: "999", 
    originalPrice: "1,500",
    accent: "from-green-500 to-emerald-400",
    icon: Wifi,
    popular: false,
    tag: "Starter"
  },
  { 
    speed: "15", 
    price: "1,500", 
    originalPrice: "2,000",
    accent: "from-blue-500 to-cyan-400",
    icon: Wifi,
    popular: true,
    tag: "Most Popular"
  },
  { 
    speed: "50", 
    price: "4,000", 
    originalPrice: "5,000",
    accent: "from-purple-500 to-violet-400",
    icon: Crown,
    popular: false,
    tag: "Premium"
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showPackages, setShowPackages] = useState(false);

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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200"
            : "bg-gradient-to-b from-blue-950/90 to-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo - Updated to UltrafyFiberNet */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold shadow-lg transition-transform duration-300 group-hover:scale-105 text-[10px] leading-tight text-center">
                UFN
              </div>

              <div className="hidden sm:block">
                <h1
                  className={`font-bold text-lg transition-colors duration-300 ${
                    isScrolled
                      ? "text-gray-900"
                      : "text-white"
                  }`}
                >
                  UltrafyFiberNet
                </h1>

                <p
                  className={`text-xs transition-colors duration-300 ${
                    isScrolled
                      ? "text-gray-500"
                      : "text-gray-200"
                  }`}
                >
                  Fast • Reliable • Unlimited
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors duration-300 hover:text-blue-600 ${
                    isScrolled
                      ? "text-gray-700"
                      : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="tel:0700541561"
                className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                  isScrolled
                    ? "text-blue-600 hover:bg-blue-50"
                    : "text-white hover:bg-white/10"
                }`}
              >
                📞 0700 541 561
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                Get Connected
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={`md:hidden rounded-xl p-2 transition-colors duration-300 ${
                isScrolled
                  ? "text-gray-900 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              aria-label="Open Menu"
            >
              <Menu className="h-7 w-7" />
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
          {/* Drawer Header - Updated */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-[10px] leading-tight text-center">
                UFN
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  UltrafyFiberNet
                </h2>

                <p className="text-xs text-gray-500">
                  Fast • Reliable
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-xl p-2 text-gray-600 hover:bg-gray-100"
              aria-label="Close Menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Drawer Navigation */}
          <div className="flex flex-col px-6 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl px-4 py-4 text-lg font-medium text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}

            {/* Packages Display in Mobile */}
            <div className="mt-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-4">
              <h3 className="text-sm font-semibold text-blue-900 mb-3">🔥 Hot Packages</h3>
              {packages.map((pkg, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-blue-200/50 last:border-0">
                  <div className="flex items-center gap-2">
                    <pkg.icon className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-gray-900">{pkg.speed} Mbps</span>
                  </div>
                  <div>
                    <span className="font-bold text-blue-600">KSh {pkg.price}</span>
                    <span className="text-xs text-gray-500 line-through ml-2">KSh {pkg.originalPrice}</span>
                  </div>
                </div>
              ))}
              <p className="text-xs text-blue-700 mt-2">* Limited time offer</p>
            </div>

            {/* Mobile CTA */}
            <Link
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-4 font-semibold text-white shadow-lg transition hover:shadow-xl"
            >
              Get Connected
              <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-4 flex items-center justify-center gap-4 text-sm">
              <a href="tel:0700541561" className="text-blue-600 font-medium">
                📞 0700 541 561
              </a>
              <span className="text-gray-300">|</span>
              <a href="tel:0703199691" className="text-blue-600 font-medium">
                0703 199 691
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 px-6 py-5">
            <p className="text-sm text-gray-500">
              Monday – Saturday
            </p>
            <p className="font-medium text-gray-900">
              8:00 AM – 5:00 PM
            </p>
            <p className="mt-2 text-sm text-blue-600 font-medium">
              24/7 Technical Support Available
            </p>
          </div>
        </aside>
      </div>
    </>
  );
      }
