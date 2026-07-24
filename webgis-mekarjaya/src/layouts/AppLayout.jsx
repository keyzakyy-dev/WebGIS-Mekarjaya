import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingActionButton from '@/components/FloatingActionButton';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
      <ScrollToTop />
      <FloatingActionButton />
    </div>
  );
}