import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useGuestStore } from '../store/guestStore';
import { useEffect } from 'react';
import DevTools from '../components/DevTools';

export default function GuestLayout() {
  const { language } = useGuestStore();
  const location = useLocation();

  // Simple "vibe" check - if we are on a guest page, we want a clean, mobile-first layout
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="max-w-md mx-auto min-h-screen bg-white shadow-2xl shadow-stone-200/50 relative"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <DevTools />
    </div>
  );
}
