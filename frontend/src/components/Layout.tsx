'use client';

import React from 'react';
import Navbar from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4">{children}</main>
      <footer className="w-full p-4 border-t text-sm text-center">© MyLife</footer>
    </div>
  );
}
