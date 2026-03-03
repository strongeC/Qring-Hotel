import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Language } from '../types';

interface GuestState {
  language: Language;
  setLanguage: (lang: Language) => void;
  sessionToken: string | null;
  setSessionToken: (token: string) => void;
  currentLocation: {
    type: 'BEACH' | 'ROOM' | null;
    id: string | null; // umbrellaId or roomId
    zoneId?: string;
  };
  setLocation: (type: 'BEACH' | 'ROOM', id: string, zoneId?: string) => void;
  isInsideGeofence: boolean;
  setInsideGeofence: (inside: boolean) => void;
}

export const useGuestStore = create<GuestState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
      sessionToken: null,
      setSessionToken: (token) => set({ sessionToken: token }),
      currentLocation: { type: null, id: null },
      setLocation: (type, id, zoneId) => set({ currentLocation: { type, id, zoneId } }),
      isInsideGeofence: true,
      setInsideGeofence: (inside) => set({ isInsideGeofence: inside }),
    }),
    {
      name: 'resort-flow-guest-storage',
    }
  )
);

interface CartItem {
  productId: string;
  quantity: number;
  notes?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  orderNotes: string;
  setOrderNotes: (notes: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  orderNotes: '',
  addItem: (productId) =>
    set((state) => {
      const existing = state.items.find((i) => i.productId === productId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { productId, quantity: 1 }] };
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    })),
  updateQuantity: (productId, delta) =>
    set((state) => {
      const newItems = state.items
        .map((i) => {
          if (i.productId === productId) {
            return { ...i, quantity: Math.max(0, i.quantity + delta) };
          }
          return i;
        })
        .filter((i) => i.quantity > 0);
      return { items: newItems };
    }),
  clearCart: () => set({ items: [], orderNotes: '' }),
  setOrderNotes: (notes) => set({ orderNotes: notes }),
}));
