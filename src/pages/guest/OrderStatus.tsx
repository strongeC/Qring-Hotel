import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/mockApi';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, ChefHat, Truck, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { OrderStatus as OrderStatusType } from '../../types';

const STATUS_STEPS: { status: OrderStatusType; label: string; icon: any }[] = [
  { status: 'RECEIVED', label: 'Received', icon: CheckCircle2 },
  { status: 'IN_PREP', label: 'Preparing', icon: ChefHat },
  { status: 'READY', label: 'On the way', icon: Truck }, // Simplified for guest: Ready -> On way
  { status: 'DELIVERED', label: 'Enjoy!', icon: CheckCircle2 },
];

export default function OrderStatus() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: () => api.getOrder(id!),
    refetchInterval: 3000, // Poll every 3s for updates
    enabled: !!id,
  });

  if (isLoading) return <div className="p-8 text-center">Loading status...</div>;
  if (!order) return <div className="p-8 text-center">Order not found</div>;

  const currentStepIndex = STATUS_STEPS.findIndex(s => s.status === order.status);
  // Handle edge case where status might be CANCELLED or not in list
  const activeIndex = currentStepIndex === -1 ? 0 : currentStepIndex;

  return (
    <div className="min-h-screen bg-stone-50 p-6 flex flex-col">
      <button onClick={() => navigate('/g/beach')} className="self-start mb-8 text-stone-500 flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back to Menu
      </button>

      <div className="flex-1 flex flex-col items-center justify-center space-y-12">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-serif italic text-stone-900">Order #{order.id.slice(0, 4)}</h1>
          <p className="text-stone-500">
            {order.items.length} items • Zone {order.zoneId} • {order.umbrellaId}
          </p>
        </div>

        <div className="w-full max-w-xs space-y-8 relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-stone-200 -z-10" />

          {STATUS_STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isCompleted = index < activeIndex;
            const Icon = step.icon;

            return (
              <motion.div 
                key={step.status}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors duration-500 bg-white",
                  isActive ? "border-stone-900 text-stone-900" : 
                  isCompleted ? "border-stone-900 bg-stone-900 text-white" : 
                  "border-stone-200 text-stone-300"
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className={cn(
                    "font-medium transition-colors duration-300",
                    isActive || isCompleted ? "text-stone-900" : "text-stone-300"
                  )}>
                    {step.label}
                  </p>
                  {isActive && (
                    <motion.p 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="text-xs text-stone-500"
                    >
                      Updated just now
                    </motion.p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-auto pt-8">
        <button 
          onClick={() => navigate('/g/beach')}
          className="w-full py-4 bg-white border border-stone-200 text-stone-900 rounded-xl font-medium shadow-sm hover:bg-stone-50 transition-colors"
        >
          Order Something Else
        </button>
      </div>
    </div>
  );
}
