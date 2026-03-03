import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../services/mockApi';
import { useGuestStore } from '../../store/guestStore';
import { RequestType } from '../../types';
import { motion } from 'motion/react';
import { BedDouble, Wrench, Wine, MessageSquare, ChevronRight, Phone, ArrowLeft } from 'lucide-react';
import { MOCK_HOTEL_ID } from '../../lib/utils';
import { cn } from '../../lib/utils';

const REQUEST_TYPES: { type: RequestType; label: string; icon: any; color: string }[] = [
  { type: 'HOUSEKEEPING', label: 'Housekeeping', icon: BedDouble, color: 'bg-blue-50 text-blue-600' },
  { type: 'TECHNICAL', label: 'Technical Issue', icon: Wrench, color: 'bg-orange-50 text-orange-600' },
  { type: 'MINIBAR', label: 'Minibar Refill', icon: Wine, color: 'bg-purple-50 text-purple-600' },
  { type: 'RECEPTION_MESSAGE', label: 'Reception', icon: MessageSquare, color: 'bg-emerald-50 text-emerald-600' },
];

const PRESET_CHIPS: Record<RequestType, string[]> = {
  HOUSEKEEPING: ['Extra Towels', 'Extra Pillows', 'Clean Room', 'Toiletries'],
  TECHNICAL: ['AC Issue', 'TV Remote', 'Light Bulb', 'Safe Box'],
  MINIBAR: ['Water', 'Soda', 'Snacks', 'Full Refill'],
  RECEPTION_MESSAGE: ['Wake up call', 'Luggage Assistance', 'Taxi', 'Late Checkout'],
};

export default function RoomRequests() {
  const navigate = useNavigate();
  const { currentLocation } = useGuestStore();
  const [selectedType, setSelectedType] = useState<RequestType | null>(null);
  const [note, setNote] = useState('');

  const createRequestMutation = useMutation({
    mutationFn: api.createRequest,
    onSuccess: (data) => {
      navigate(`/g/room/request/${data.id}`);
    },
  });

  const handleSubmit = () => {
    if (!selectedType) return;
    if (!currentLocation.id) {
      alert("Please scan a room QR code first.");
      return;
    }

    createRequestMutation.mutate({
      hotelId: MOCK_HOTEL_ID,
      roomId: currentLocation.id,
      type: selectedType,
      notes: note,
      clientSessionId: 'session-123',
    });
  };

  const handleCallReception = () => {
    window.location.href = 'tel:100';
  };

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <header className="mb-8 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/g')} className="p-2 -ml-2 hover:bg-stone-200 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-stone-600" />
          </button>
          <div>
            <h1 className="text-2xl font-serif italic text-stone-900">Room Service</h1>
            <p className="text-stone-500">Room {currentLocation.id || 'Unknown'}</p>
          </div>
        </div>
        <button
          onClick={handleCallReception}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-colors shadow-sm"
        >
          <Phone className="w-4 h-4" />
          Call Reception
        </button>
      </header>

      {!selectedType ? (
        <div className="grid grid-cols-2 gap-4">
          {REQUEST_TYPES.map((req) => {
            const Icon = req.icon;
            return (
              <motion.button
                key={req.type}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedType(req.type)}
                className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-stone-100 aspect-square hover:border-stone-300 transition-colors"
              >
                <div className={cn("p-3 rounded-full mb-3", req.color)}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-medium text-stone-900 text-sm text-center">{req.label}</span>
              </motion.button>
            );
          })}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setSelectedType(null)} className="text-sm text-stone-500 hover:text-stone-900">
              Change
            </button>
            <div className="h-4 w-px bg-stone-300" />
            <span className="font-medium text-stone-900">
              {REQUEST_TYPES.find(r => r.type === selectedType)?.label}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {PRESET_CHIPS[selectedType].map(chip => (
              <button
                key={chip}
                onClick={() => setNote(prev => prev ? `${prev}, ${chip}` : chip)}
                className="px-3 py-1.5 bg-white border border-stone-200 rounded-full text-sm text-stone-600 hover:border-stone-400 hover:bg-stone-50 transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add details..."
            className="w-full p-4 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 min-h-[120px]"
          />

          <button
            onClick={handleSubmit}
            disabled={createRequestMutation.isPending}
            className="w-full py-4 bg-stone-900 text-white rounded-xl font-medium flex items-center justify-center gap-2"
          >
            {createRequestMutation.isPending ? 'Sending...' : 'Send Request'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
