import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, Layers, LogOut, BellRing, Menu, X, ArrowLeft, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/mockApi';

export default function BarLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data: orders } = useQuery({
    queryKey: ['bar-orders-count'],
    queryFn: () => api.getOrders(),
    refetchInterval: 5000,
  });

  const activeOrdersCount = orders?.filter(o => o.status !== 'DELIVERED').length || 0;

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
    <NavLink 
      to={to} 
      onClick={() => setIsMobileMenuOpen(false)}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 font-medium",
        isActive 
          ? "bg-stone-900 text-white shadow-sm" 
          : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
      )}
    >
      <Icon className="w-5 h-5" />
      {label}
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-stone-900 font-sans flex flex-col md:flex-row">
      {/* Active Order Alert - "In your face" style */}
      {activeOrdersCount > 0 && (
        <div className="fixed z-50 md:top-6 md:right-8 top-3 right-14 animate-pulse">
          <NavLink 
            to="/b/orders"
            className="bg-red-600 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 font-bold border-2 border-white hover:bg-red-700 transition-colors"
          >
            <AlertCircle className="w-5 h-5 animate-bounce" />
            <span>{activeOrdersCount} Active</span>
          </NavLink>
        </div>
      )}

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-stone-200 bg-white z-20">
        <div className="flex items-center gap-2">
          <NavLink to="/g" className="p-2 -ml-2 text-stone-400 hover:text-stone-900">
            <ArrowLeft className="w-5 h-5" />
          </NavLink>
          <h1 className="text-xl font-serif italic text-stone-900">ResortFlow Staff</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-stone-500">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar / Mobile Menu */}
      <aside className={cn(
        "fixed inset-0 z-10 bg-[#FDFCF8] md:relative md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col w-full md:w-72 border-r border-stone-200 p-6 pt-20 md:pt-8",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="mb-10 px-2 hidden md:block">
          <h1 className="text-2xl font-serif italic text-stone-900">ResortFlow</h1>
          <p className="text-xs text-stone-400 font-medium uppercase tracking-wider mt-1">Staff Console</p>
        </div>

        <nav className="space-y-2 flex-1">
          <NavItem to="/b/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/b/orders" icon={ListOrdered} label="Live Orders" />
          <NavItem to="/b/requests" icon={BellRing} label="Room Requests" />
        </nav>

        <div className="mt-auto pt-6 border-t border-stone-200 space-y-2">
          <NavLink 
            to="/g" 
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Guest App
          </NavLink>
          
          <NavLink 
            to="/b/login" 
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-stone-400 hover:bg-red-50 hover:text-red-600 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </NavLink>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#FDFCF8] p-4 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
