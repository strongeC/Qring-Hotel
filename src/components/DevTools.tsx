import { useState } from 'react';
import { useGuestStore } from '../store/guestStore';
import { Settings, MapPin, MapPinOff, QrCode, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { api } from '../services/mockApi';
import { MOCK_HOTEL_ID } from '../lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function DevTools() {
  const [isOpen, setIsOpen] = useState(false);
  const { isInsideGeofence, setInsideGeofence, setLocation, currentLocation } = useGuestStore();
  const queryClient = useQueryClient();

  const createTestOrderMutation = useMutation({
    mutationFn: async () => {
      await api.createOrder({
        hotelId: MOCK_HOTEL_ID,
        zoneId: 'A',
        umbrellaId: 'A-101',
        items: [{ productId: 'p1', quantity: 2 }, { productId: 'p5', quantity: 1 }],
        clientSessionId: 'test-session',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bar-orders'] });
      alert('Test order created! Check Bar Console.');
    },
  });

  const handleSimulateScan = (type: 'BEACH' | 'ROOM', id: string, zoneId?: string) => {
    if (type === 'BEACH') {
      setLocation('BEACH', id, zoneId);
      alert(`Simulated QR Scan: Beach ${id}`);
    } else {
      setLocation('ROOM', id);
      alert(`Simulated QR Scan: Room ${id}`);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-12 right-0 bg-slate-800 text-white p-4 rounded-xl shadow-xl min-w-[240px] mb-2 space-y-4"
          >
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Geofence</h3>
              <button
                onClick={() => setInsideGeofence(!isInsideGeofence)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isInsideGeofence ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                }`}
              >
                {isInsideGeofence ? <MapPin className="w-4 h-4" /> : <MapPinOff className="w-4 h-4" />}
                {isInsideGeofence ? 'Inside Zone' : 'Outside Zone'}
              </button>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Simulate QR Scan</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSimulateScan('BEACH', 'A-101', 'A')}
                  className="flex flex-col items-center justify-center p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs"
                >
                  <QrCode className="w-4 h-4 mb-1" />
                  Beach A-101
                </button>
                <button
                  onClick={() => handleSimulateScan('BEACH', 'B-205', 'B')}
                  className="flex flex-col items-center justify-center p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs"
                >
                  <QrCode className="w-4 h-4 mb-1" />
                  Beach B-205
                </button>
                <button
                  onClick={() => handleSimulateScan('BEACH', 'C-310', 'C')}
                  className="flex flex-col items-center justify-center p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs"
                >
                  <QrCode className="w-4 h-4 mb-1" />
                  Beach C-310
                </button>
                <button
                  onClick={() => handleSimulateScan('ROOM', '1207')}
                  className="flex flex-col items-center justify-center p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs"
                >
                  <QrCode className="w-4 h-4 mb-1" />
                  Room 1207
                </button>
              </div>
              <div className="mt-2 text-xs text-slate-500 text-center">
                Current: {currentLocation.id ? `${currentLocation.type} ${currentLocation.id}` : 'None'}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Navigation</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => window.location.href = '/g'}
                  className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs"
                >
                  Guest App
                </button>
                <button
                  onClick={() => window.location.href = '/b'}
                  className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs"
                >
                  Bar Console
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 transition-colors"
      >
        <Settings className="w-5 h-5" />
      </button>
    </div>
  );
}
