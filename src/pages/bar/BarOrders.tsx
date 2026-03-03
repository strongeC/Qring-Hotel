import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, PRODUCTS } from '../../services/mockApi';
import { Order, OrderStatus } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Check, ChefHat, Truck, ArrowRight, Timer } from 'lucide-react';
import { cn } from '../../lib/utils';

const OrderTimer = ({ createdAt, status }: { createdAt: string; status: OrderStatus }) => {
  const [elapsed, setElapsed] = useState<string>('');
  const [isOverdue, setIsOverdue] = useState(false);

  useEffect(() => {
    const update = () => {
      const diff = Date.now() - new Date(createdAt).getTime();
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setElapsed(`${minutes}m ${seconds}s`);
      setIsOverdue(minutes >= 15 && status !== 'DELIVERED');
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [createdAt, status]);

  return (
    <span className={cn("font-mono font-bold", isOverdue ? "text-red-600 animate-pulse" : "")}>
      {elapsed}
    </span>
  );
};

export default function BarOrders() {
  const queryClient = useQueryClient();
  const [filterZone, setFilterZone] = useState<string>('ALL');
  
  const [previousOrderCount, setPreviousOrderCount] = useState(0);

  const { data: orders, isLoading } = useQuery({
    queryKey: ['bar-orders', 'all'],
    queryFn: () => api.getOrders(),
    refetchInterval: 5000,
  });

  useEffect(() => {
    if (orders) {
      const currentCount = orders.filter(o => o.status === 'RECEIVED').length;
      if (currentCount > previousOrderCount) {
        // Play notification sound
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play().catch(e => console.log('Audio play failed', e));
      }
      setPreviousOrderCount(currentCount);
    }
  }, [orders, previousOrderCount]);

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: OrderStatus }) => 
      api.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bar-orders'] });
    },
  });

  if (isLoading) return <div className="p-8 text-stone-400">Loading orders...</div>;

  const filteredOrders = orders?.filter(o => 
    filterZone === 'ALL' ? true : o.zoneId === filterZone
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || [];

  const getNextStatus = (current: OrderStatus): OrderStatus | null => {
    if (current === 'RECEIVED') return 'IN_PREP';
    if (current === 'IN_PREP') return 'READY';
    if (current === 'READY') return 'DELIVERED';
    return null;
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'RECEIVED': return 'New Order';
      case 'IN_PREP': return 'Preparing';
      case 'READY': return 'Ready';
      case 'DELIVERED': return 'Delivered';
      default: return status;
    }
  };

  const getButtonLabel = (nextStatus: OrderStatus) => {
    switch (nextStatus) {
      case 'IN_PREP': return 'Start Preparing';
      case 'READY': return 'Mark Ready';
      case 'DELIVERED': return 'Give to Waiter';
      default: return nextStatus;
    }
  };

  const getGradient = (status: OrderStatus, createdAt: string) => {
    const isOverdue = (Date.now() - new Date(createdAt).getTime()) > 15 * 60 * 1000;
    
    if (status !== 'DELIVERED' && isOverdue) {
      return 'bg-red-100 border-red-600 shadow-xl shadow-red-200 animate-pulse ring-2 ring-red-400';
    }

    switch (status) {
      case 'RECEIVED': return 'bg-gradient-to-br from-white to-red-50 border-red-100';
      case 'IN_PREP': return 'bg-gradient-to-br from-white to-orange-50 border-orange-100';
      case 'READY': return 'bg-gradient-to-br from-white to-blue-50 border-blue-100';
      case 'DELIVERED': return 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200';
      default: return 'bg-white border-stone-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-serif italic text-stone-900">Live Orders</h1>
          <p className="text-stone-500 mt-1">Manage incoming orders</p>
        </div>
        
        <div className="flex gap-2 p-1 bg-white rounded-full border border-stone-200 shadow-sm self-start md:self-auto">
          {['ALL', 'A', 'B', 'C'].map(zone => (
            <button
              key={zone}
              onClick={() => setFilterZone(zone)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all",
                filterZone === zone 
                  ? "bg-stone-900 text-white shadow-sm" 
                  : "text-stone-500 hover:bg-stone-50"
              )}
            >
              {zone === 'ALL' ? 'All' : `Zone ${zone}`}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredOrders.map(order => {
          const isNew = new Date(order.createdAt).getTime() > Date.now() - 1000 * 60;
          const nextStatus = getNextStatus(order.status);
          const isDelivered = order.status === 'DELIVERED';

          return (
            <div 
              key={order.id} 
              className={cn(
                "rounded-3xl p-6 border transition-all hover:shadow-lg flex flex-col relative overflow-hidden",
                isNew ? "shadow-md" : "shadow-sm",
                getGradient(order.status, order.createdAt)
              )}
            >
              {/* Active Order Indicator - Pulsing Dot */}
              {!isDelivered && (
                <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                  <span className="relative flex h-3 w-3">
                    <span className={cn(
                      "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                      order.status === 'RECEIVED' ? "bg-red-400" :
                      order.status === 'IN_PREP' ? "bg-orange-400" :
                      "bg-blue-400"
                    )}></span>
                    <span className={cn(
                      "relative inline-flex rounded-full h-3 w-3",
                      order.status === 'RECEIVED' ? "bg-red-500" :
                      order.status === 'IN_PREP' ? "bg-orange-500" :
                      "bg-blue-500"
                    )}></span>
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-serif italic text-stone-900">{order.umbrellaId}</span>
                  <span className="text-sm font-medium text-stone-500">Zone {order.zoneId}</span>
                </div>
                
                {/* Timer / Timestamp */}
                <div className="flex items-center gap-2 text-xs text-stone-500 mt-2">
                  {isDelivered ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-emerald-700 font-medium">
                        <Check className="w-3 h-3" />
                        <span>
                          Completed in {Math.round((new Date(order.updatedAt).getTime() - new Date(order.createdAt).getTime()) / 60000)}m
                        </span>
                      </div>
                      <span className="text-stone-400 text-[10px]">
                        {formatDistanceToNow(new Date(order.updatedAt), { addSuffix: true })}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-2 py-1 bg-white/50 rounded-lg border border-stone-200/50">
                      <Timer className="w-3 h-3 animate-pulse text-stone-600" />
                      <OrderTimer createdAt={order.createdAt} status={order.status} />
                      <span className="text-stone-400">waiting</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="space-y-4 mb-8 flex-1">
                {order.items.map((item, idx) => {
                  const product = PRODUCTS.find(p => p.id === item.productId);
                  return (
                    <div key={idx} className={cn("flex items-start justify-between group", item.isCompleted ? "opacity-50" : "")}>
                      <span className={cn("text-stone-700 font-medium leading-tight", item.isCompleted ? "line-through text-stone-400" : "")}>
                        {product?.name.en || 'Unknown'}
                      </span>
                      <span className={cn(
                        "flex items-center justify-center min-w-[1.5rem] h-6 rounded-full text-xs font-bold ml-3 shadow-sm border",
                        item.isCompleted ? "bg-stone-100 text-stone-400 border-stone-100" : "bg-white/80 text-stone-900 border-stone-100"
                      )}>
                        {item.quantity}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action */}
              <div className="mt-auto">
                {nextStatus ? (
                  <button
                    onClick={() => updateStatusMutation.mutate({ 
                      id: order.id, 
                      status: nextStatus 
                    })}
                    className={cn(
                      "w-full py-4 px-6 rounded-2xl font-medium text-sm flex items-center justify-between transition-all active:scale-95 group shadow-sm",
                      order.status === 'RECEIVED' ? "bg-stone-900 text-white hover:bg-stone-800" :
                      order.status === 'IN_PREP' ? "bg-white text-stone-900 border border-stone-200 hover:bg-stone-50" :
                      "bg-emerald-500 text-white hover:bg-emerald-600"
                    )}
                  >
                    <span>{getButtonLabel(nextStatus)}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <div className="w-full py-4 text-center text-sm font-medium text-emerald-700 flex items-center justify-center gap-2 bg-white/50 rounded-2xl border border-emerald-100">
                    <Check className="w-4 h-4" />
                    Delivered
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-stone-300" />
            </div>
            <h3 className="text-xl font-serif italic text-stone-900">All caught up</h3>
            <p className="text-stone-400 mt-2">No active orders at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
