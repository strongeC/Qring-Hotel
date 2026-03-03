import { useQuery } from '@tanstack/react-query';
import { api, PRODUCTS } from '../../services/mockApi';
import { useGuestStore } from '../../store/guestStore';
import { useTranslation } from '../../hooks/useTranslation';
import { formatDistanceToNow } from 'date-fns';
import { Clock, ShoppingBag, ChevronRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';

export default function OrderHistory() {
  const { sessionToken } = useGuestStore();
  const { t, language } = useTranslation();
  const navigate = useNavigate();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['guest-orders', sessionToken],
    queryFn: () => api.getOrders(undefined, sessionToken || 'session-123'), // Fallback for dev
  });

  if (isLoading) return <div className="p-8 text-center text-stone-400">{t('loading')}</div>;

  const sortedOrders = orders?.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RECEIVED': return 'bg-stone-100 text-stone-600';
      case 'IN_PREP': return 'bg-orange-50 text-orange-600';
      case 'READY': return 'bg-blue-50 text-blue-600';
      case 'DELIVERED': return 'bg-emerald-50 text-emerald-600'; // On the way for guest
      default: return 'bg-stone-100 text-stone-400';
    }
  };

  const getGuestStatusLabel = (status: string) => {
    switch (status) {
      case 'RECEIVED': return 'Received';
      case 'IN_PREP': return 'Preparing';
      case 'READY': return 'Ready';
      case 'DELIVERED': return 'On the Way';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-stone-100 px-4 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-stone-50 rounded-full">
          <ArrowLeft className="w-5 h-5 text-stone-600" />
        </button>
        <h1 className="text-xl font-serif italic text-stone-800">My Orders</h1>
      </header>

      <div className="p-4 space-y-4">
        {sortedOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-stone-300" />
            </div>
            <h3 className="text-lg font-medium text-stone-900">No orders yet</h3>
            <p className="text-stone-500 mt-1">Your past orders will appear here.</p>
            <button 
              onClick={() => navigate('/g/beach')}
              className="mt-6 px-6 py-2 bg-stone-900 text-white rounded-full text-sm font-medium"
            >
              Start Ordering
            </button>
          </div>
        ) : (
          sortedOrders.map(order => (
            <div 
              key={order.id}
              onClick={() => navigate(`/g/beach/order/${order.id}`)}
              className="border border-stone-100 rounded-2xl p-4 shadow-sm active:scale-[0.98] transition-transform"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                </div>
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide",
                  getStatusColor(order.status)
                )}>
                  {getGuestStatusLabel(order.status)}
                </span>
              </div>

              <div className="space-y-1 mb-4">
                {order.items.map((item, idx) => {
                  const product = PRODUCTS.find(p => p.id === item.productId);
                  return (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-stone-600">{item.quantity}x {product?.name[language]}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-stone-50">
                <span className="text-xs font-medium text-stone-400">Order #{order.id.slice(0, 8)}</span>
                <ChevronRight className="w-4 h-4 text-stone-300" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
