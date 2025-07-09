"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b p-4 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          Digital Diary
        </Link>
        <div className="space-x-4">
          <Link href="/diary" className="hover:underline">
            Diary
          </Link>
          <Link href="/todos" className="hover:underline">
            To-Dos
          </Link>
          <Link href="/calendar" className="hover:underline">
            Calendar
          </Link>
          <Link href="/portfolio" className="hover:underline">
            Portfolio
          </Link>
        </div>
      </div>
    </nav>
  );
}
