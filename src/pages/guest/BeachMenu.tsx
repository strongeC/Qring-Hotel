import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../../services/mockApi';
import { useGuestStore, useCartStore } from '../../store/guestStore';
import { useTranslation } from '../../hooks/useTranslation';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Plus, Minus, X, ChevronRight, AlertTriangle, Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { MOCK_HOTEL_ID } from '../../lib/utils';

export default function BeachMenu() {
  const { currentLocation, isInsideGeofence } = useGuestStore();
  const { t, language } = useTranslation();
  const { items, addItem, removeItem, updateQuantity, clearCart } = useCartStore();
  const [activeCategory, setActiveCategory] = useState<string>('c1');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const { sessionToken } = useGuestStore();

  const { data: menu, isLoading } = useQuery({
    queryKey: ['menu'],
    queryFn: api.getMenu,
  });

  const handleAddItem = (productId: string) => {
    addItem(productId);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const createOrderMutation = useMutation({
    mutationFn: api.createOrder,
    onSuccess: (data) => {
      clearCart();
      setIsCartOpen(false);
      navigate(`/g/beach/order/${data.id}`);
    },
  });

  const cartTotalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!currentLocation.id) {
      alert(t('beach.location.missing'));
      return;
    }
    
    // Ensure we have items
    if (items.length === 0) {
      return;
    }

    createOrderMutation.mutate({
      hotelId: MOCK_HOTEL_ID,
      zoneId: currentLocation.zoneId || 'A',
      umbrellaId: currentLocation.id,
      items: items,
      clientSessionId: sessionToken || 'session-123',
    });
  };

  if (isLoading || !menu) return <div className="p-8 text-center text-stone-400">{t('loading')}</div>;

  return (
    <div className="pb-24 relative min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-stone-100 px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/g')} className="p-2 -ml-2 hover:bg-stone-50 rounded-full">
            <ArrowLeft className="w-5 h-5 text-stone-600" />
          </button>
          <div>
            <h1 className="text-xl font-serif italic text-stone-800">{t('beach.title')}</h1>
            <p className="text-xs text-stone-500 uppercase tracking-wider">
              {currentLocation.zoneId ? `Zone ${currentLocation.zoneId} • ` : ''} 
              {currentLocation.id || 'No Location'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/g/orders')}
            className="p-2 rounded-full hover:bg-stone-100 transition-colors"
          >
            <Clock className="w-6 h-6 text-stone-800" />
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-stone-100 transition-colors"
          >
            <motion.div
              animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <ShoppingBag className="w-6 h-6 text-stone-800" />
            </motion.div>
            {cartTotalItems > 0 && (
              <span className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartTotalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {!isInsideGeofence && (
        <div className="bg-orange-50 p-4 mx-4 mt-4 rounded-xl flex items-start gap-3 border border-orange-100">
          <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0" />
          <div>
            <p className="text-sm font-medium text-orange-800">You are outside the service area</p>
            <p className="text-xs text-orange-600 mt-1">Please move closer to the beach area to place orders.</p>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="sticky top-[73px] z-10 bg-white border-b border-stone-100 overflow-x-auto no-scrollbar">
        <div className="flex px-4 py-3 gap-4 min-w-max">
          {menu.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "text-sm font-medium transition-colors whitespace-nowrap pb-1 border-b-2",
                activeCategory === cat.id 
                  ? "text-stone-900 border-stone-900" 
                  : "text-stone-400 border-transparent hover:text-stone-600"
              )}
            >
              {cat.name[language]}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="p-4 space-y-4">
        {menu.products
          .filter(p => p.categoryId === activeCategory)
          .map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 p-3 rounded-2xl bg-white border border-stone-100 shadow-sm"
            >
              <div className="flex-shrink-0">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name[language]} 
                    className="w-24 h-24 object-cover rounded-xl bg-stone-100"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/300x300/f5f5f4/a8a29e?text=${encodeURIComponent(product.name[language].charAt(0))}`;
                    }}
                  />
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-stone-100 flex items-center justify-center text-stone-300">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-medium text-stone-900">{product.name[language]}</h3>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                    Refreshing and cold.
                  </p>
                </div>
                
                <div className="flex justify-end mt-2">
                  {items.find(i => i.productId === product.id) ? (
                    <div className="flex items-center gap-3 bg-stone-100 rounded-full px-2 py-1">
                      <button 
                        onClick={() => updateQuantity(product.id, -1)}
                        className="p-1 hover:bg-white rounded-full transition-colors"
                      >
                        <Minus className="w-4 h-4 text-stone-600" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">
                        {items.find(i => i.productId === product.id)?.quantity}
                      </span>
                      <button 
                        onClick={() => handleAddItem(product.id)}
                        className="p-1 hover:bg-white rounded-full transition-colors"
                      >
                        <Plus className="w-4 h-4 text-stone-600" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleAddItem(product.id)}
                      disabled={!isInsideGeofence}
                      className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-xs font-medium rounded-full hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t('beach.add')}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col max-w-md mx-auto"
            >
              <div className="p-4 border-b border-stone-100 flex justify-between items-center">
                <h2 className="text-lg font-serif italic">{t('beach.cart.title')}</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-100 rounded-full">
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center text-stone-400 py-12">{t('beach.cart.empty')}</div>
                ) : (
                  items.map(item => {
                    const product = menu.products.find(p => p.id === item.productId);
                    if (!product) return null;
                    return (
                      <div key={item.productId} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-stone-900 w-6">{item.quantity}x</span>
                          <span className="text-stone-700">{product.name[language]}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <button 
                            onClick={() => updateQuantity(item.productId, -1)}
                            className="p-1 bg-stone-100 rounded-full"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => handleAddItem(item.productId)}
                            className="p-1 bg-stone-100 rounded-full"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="p-4 border-t border-stone-100 bg-stone-50 safe-area-bottom">
                <button
                  onClick={handlePlaceOrder}
                  disabled={items.length === 0 || createOrderMutation.isPending || (!isInsideGeofence && false)} // Disable geofence check for demo
                  className="w-full py-4 bg-stone-900 text-white rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createOrderMutation.isPending ? t('beach.order.sending') : t('beach.order.place')}
                  {!createOrderMutation.isPending && <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
