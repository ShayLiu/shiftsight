'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-[#fafaf7]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-bold text-[#1a365d] tracking-tight">
            识变 ShiftSight
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#about" className="text-sm text-gray-600 hover:text-[#1a365d] transition-colors">
              测试说明
            </a>
            <a href="#audience" className="text-sm text-gray-600 hover:text-[#1a365d] transition-colors">
              适合人群
            </a>
            <Link
              href="/test"
              className="rounded-md bg-[#1a365d] px-4 py-2 text-sm font-medium text-white hover:bg-[#2a4a7f] transition-colors"
            >
              开始测试
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="切换菜单"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-gray-100">
            <div className="flex flex-col gap-3 pt-4">
              <a
                href="#about"
                className="text-sm text-gray-600 hover:text-[#1a365d] px-2 py-1"
                onClick={() => setMobileOpen(false)}
              >
                测试说明
              </a>
              <a
                href="#audience"
                className="text-sm text-gray-600 hover:text-[#1a365d] px-2 py-1"
                onClick={() => setMobileOpen(false)}
              >
                适合人群
              </a>
              <Link
                href="/test"
                className="rounded-md bg-[#1a365d] px-4 py-2 text-sm font-medium text-white text-center hover:bg-[#2a4a7f] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                开始测试
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
