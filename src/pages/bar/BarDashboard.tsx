import { useQuery } from '@tanstack/react-query';
import { api, PRODUCTS } from '../../services/mockApi';
import { Order } from '../../types';
import { motion } from 'motion/react';
import { BarChart3, Clock, ShoppingBag, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function BarDashboard() {
  const { data: orders } = useQuery({
    queryKey: ['bar-orders'],
    queryFn: () => api.getOrders(),
    refetchInterval: 10000,
  });

  const todayOrders = orders || [];
  const totalOrders = todayOrders.length;
  
  // Calculate average delivery time (mock calculation)
  const deliveredOrders = todayOrders.filter(o => o.status === 'DELIVERED');
  const avgDeliveryTime = deliveredOrders.length > 0 
    ? Math.round(deliveredOrders.reduce((acc, o) => {
        const start = new Date(o.createdAt).getTime();
        const end = new Date(o.updatedAt).getTime(); // Using updatedAt as delivered time for mock
        return acc + (end - start);
      }, 0) / deliveredOrders.length / 1000 / 60)
    : 0;

  // Top products
  const productCounts: Record<string, number> = {};
  todayOrders.forEach(o => {
    o.items.forEach(i => {
      productCounts[i.productId] = (productCounts[i.productId] || 0) + i.quantity;
    });
  });
  
  const topProducts = Object.entries(productCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([id, count]) => {
      const product = PRODUCTS.find(p => p.id === id);
      return { name: product?.name.en || 'Unknown', count };
    });

  // Orders by Hour
  const ordersByHour = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    label: `${i}:00`,
    count: 0,
  }));

  todayOrders.forEach(order => {
    const hour = new Date(order.createdAt).getHours();
    if (ordersByHour[hour]) {
      ordersByHour[hour].count++;
    }
  });

  // Filter to show only hours with data or a range around current time if empty
  // For demo purposes, let's show a range or all if sparse
  const currentHour = new Date().getHours();
  const displayData = ordersByHour.map(d => ({
    ...d,
    isCurrent: d.hour === currentHour
  }));

  // Calculate Peak Hour
  const peakHourData = ordersByHour.reduce((max, current) => 
    current.count > max.count ? current : max
  , { hour: 0, count: 0, label: '0:00' });

  return (
    <div className="p-6 max-w-7xl mx-auto text-stone-900">
      <div className="mb-10">
        <h1 className="text-3xl font-serif italic text-stone-900">Operations Dashboard</h1>
        <p className="text-stone-500 mt-1">Real-time overview of resort activities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-stone-50 rounded-2xl text-stone-600">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <span className="text-stone-500 font-medium">Total Orders</span>
          </div>
          <p className="text-5xl font-serif text-stone-900">{totalOrders}</p>
          <p className="text-sm text-emerald-600 mt-3 flex items-center gap-1 font-medium">
            <TrendingUp className="w-4 h-4" /> +12% vs yesterday
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-stone-50 rounded-2xl text-stone-600">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-stone-500 font-medium">Avg Delivery</span>
          </div>
          <p className="text-5xl font-serif text-stone-900">{avgDeliveryTime}<span className="text-2xl font-sans text-stone-400 ml-1">min</span></p>
          <p className="text-sm text-stone-400 mt-3">Target: 15 min</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-stone-50 rounded-2xl text-stone-600">
              <BarChart3 className="w-6 h-6" />
            </div>
            <span className="text-stone-500 font-medium">Peak Hour</span>
          </div>
          <p className="text-5xl font-serif text-stone-900">{peakHourData.label}</p>
          <p className="text-sm text-stone-400 mt-3">{peakHourData.count} orders received</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-stone-50 rounded-2xl text-stone-600">
              <BarChart3 className="w-6 h-6" />
            </div>
            <span className="text-stone-500 font-medium">Active Zones</span>
          </div>
          <p className="text-5xl font-serif text-stone-900">3</p>
          <p className="text-sm text-stone-400 mt-3">Zones A, B, C active</p>
        </div>
      </div>

      {/* Hourly Order Volume Chart */}
      <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm mb-8">
        <h2 className="text-xl font-serif italic mb-6 text-stone-900">Peak Hours & Order Volume</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f4" />
              <XAxis 
                dataKey="label" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#a8a29e', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#a8a29e', fontSize: 12 }} 
              />
              <Tooltip 
                cursor={{ fill: '#f5f5f4' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {displayData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.isCurrent ? '#1c1917' : '#e7e5e4'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
          <h2 className="text-xl font-serif italic mb-6 text-stone-900">Top Products</h2>
          <div className="space-y-6">
            {topProducts.map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-stone-50 text-stone-500 font-serif italic">
                    {i + 1}
                  </span>
                  <span className="font-medium text-stone-700">{p.name}</span>
                </div>
                <span className="text-stone-400 font-medium">{p.count} sold</span>
              </div>
            ))}
            {topProducts.length === 0 && <p className="text-stone-400 italic">No data yet</p>}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
          <h2 className="text-xl font-serif italic mb-6 text-stone-900">Zone Performance</h2>
          <div className="space-y-6">
            {['A', 'B', 'C'].map(zone => {
              const count = todayOrders.filter(o => o.zoneId === zone).length;
              const percentage = totalOrders > 0 ? (count / totalOrders) * 100 : 0;
              return (
                <div key={zone} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-stone-700">Zone {zone}</span>
                    <span className="text-stone-400">{count} orders</span>
                  </div>
                  <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-stone-800 rounded-full transition-all duration-500" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
