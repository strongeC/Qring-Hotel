import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, PRODUCTS } from '../../services/mockApi';
import { CheckCircle2, Layers } from 'lucide-react';
import { OrderStatus } from '../../types';

export default function BarBatchView() {
  const queryClient = useQueryClient();
  const { data: orders } = useQuery({
    queryKey: ['bar-orders', 'received'],
    queryFn: () => api.getOrders('RECEIVED'), // Only show received orders for batching
    refetchInterval: 5000,
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ orderIds, productId, status }: { orderIds: string[]; productId: string; status: OrderStatus }) => {
      // Parallel update for all orders in the batch
      // Mark specific items as completed in the orders
      await Promise.all(orderIds.map(async (id) => {
        const order = await api.getOrder(id);
        if (order) {
          const updatedItems = order.items.map(item => 
            item.productId === productId ? { ...item, isCompleted: true } : item
          );
          
          // Check if all items in the order are completed
          const allCompleted = updatedItems.every(item => item.isCompleted);
          const newStatus = allCompleted ? 'READY' : order.status;

          await api.updateOrder(id, { items: updatedItems, status: newStatus });
        }
      }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bar-orders'] });
    },
  });

  // Group items by product ID
  const batchedItems: Record<string, { quantity: number; locations: string[]; orderIds: string[] }> = {};

  orders?.forEach(order => {
    order.items.forEach(item => {
      // Only include items that are NOT completed yet
      if (!item.isCompleted) {
        if (!batchedItems[item.productId]) {
          batchedItems[item.productId] = { quantity: 0, locations: [], orderIds: [] };
        }
        batchedItems[item.productId].quantity += item.quantity;
        batchedItems[item.productId].locations.push(`${order.umbrellaId} (Z${order.zoneId})`);
        if (!batchedItems[item.productId].orderIds.includes(order.id)) {
          batchedItems[item.productId].orderIds.push(order.id);
        }
      }
    });
  });

  const sortedBatches = Object.entries(batchedItems)
    .sort(([, a], [, b]) => b.quantity - a.quantity);

  const handleMarkBatchReady = (productId: string, orderIds: string[]) => {
    if (confirm(`Mark ${orderIds.length} orders containing this item as processed?`)) {
      updateStatusMutation.mutate({ orderIds, productId, status: 'READY' });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto text-stone-900">
      <div className="mb-10">
        <h1 className="text-3xl font-serif italic text-stone-900">Batch Preparation</h1>
        <p className="text-stone-500 mt-1">Grouped items for efficient workflow</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedBatches.map(([productId, data]) => {
          const product = PRODUCTS.find(p => p.id === productId);
          return (
            <div key={productId} className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-stone-100 bg-stone-50/50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900">{product?.name.en}</h3>
                    <p className="text-sm text-stone-400 mt-1">Category: {product?.categoryId}</p>
                  </div>
                  <div className="bg-stone-900 text-white text-2xl font-serif italic px-5 py-2 rounded-2xl">
                    x{data.quantity}
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-white flex-1">
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4" /> Locations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {data.locations.map((loc, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-stone-100 text-stone-600 rounded-lg text-sm font-medium">
                      {loc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-stone-50 border-t border-stone-100">
                <button 
                  onClick={() => handleMarkBatchReady(productId, data.orderIds)}
                  disabled={updateStatusMutation.isPending}
                  className="w-full py-4 bg-white border border-stone-200 hover:bg-stone-50 text-stone-900 rounded-2xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  {updateStatusMutation.isPending ? 'Updating...' : 'Mark Batch Ready'}
                </button>
              </div>
            </div>
          );
        })}

        {sortedBatches.length === 0 && (
          <div className="col-span-full py-32 text-center">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Layers className="w-8 h-8 text-stone-300" />
            </div>
            <h3 className="text-xl font-serif italic text-stone-900">No batches pending</h3>
            <p className="text-stone-400 mt-2">Waiting for new orders...</p>
          </div>
        )}
      </div>
    </div>
  );
}
