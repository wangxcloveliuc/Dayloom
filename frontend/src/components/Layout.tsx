"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || "/";
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="w-full border-b bg-white/50 dark:bg-black/50 border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-semibold text-lg">
              MyLife
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setOpen((s) => !s)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

            <nav className={`hidden md:flex gap-4` }>
              <Link href="/diary" className={`nav-link ${pathname.startsWith("/diary") ? "active" : ""}`}>
                Diary
              </Link>
              <Link href="/settings" className={`nav-link ${pathname === "/settings" ? "active" : ""}`}>
                Settings
              </Link>
              <Link href="/login" className={`nav-link ${pathname === "/login" ? "active" : ""}`}>
                Login
              </Link>
            </nav>
          </div>
        </div>

        {open && (
          <div className="md:hidden border-t">
            <div className="max-w-4xl mx-auto px-4 py-2 flex flex-col">
              <Link href="/diary" className={`nav-link ${pathname.startsWith("/diary") ? "active" : ""}`} onClick={() => setOpen(false)}>
                Diary
              </Link>
              <Link href="/settings" className={`nav-link ${pathname === "/settings" ? "active" : ""}`} onClick={() => setOpen(false)}>
                Settings
              </Link>
              <Link href="/login" className={`nav-link ${pathname === "/login" ? "active" : ""}`} onClick={() => setOpen(false)}>
                Login
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">{children}</main>

      <footer className="w-full border-t mt-8 py-6">
        <div className="max-w-4xl mx-auto px-6 text-sm text-center">© MyLife</div>
      </footer>
    </div>
  );
}
