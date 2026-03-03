import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../services/mockApi';
import { RequestStatus, RequestType } from '../../types';
import { formatDistanceToNow } from 'date-fns';
import { Clock, BedDouble, Wrench, Wine, MessageSquare, Check, User, Timer, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useState, useEffect } from 'react';

const REQUEST_ICONS: Record<RequestType, any> = {
  HOUSEKEEPING: BedDouble,
  TECHNICAL: Wrench,
  MINIBAR: Wine,
  RECEPTION_MESSAGE: MessageSquare,
};

const RequestTimer = ({ createdAt, status }: { createdAt: string; status: RequestStatus }) => {
  const [elapsed, setElapsed] = useState<string>('');
  const [isOverdue, setIsOverdue] = useState(false);

  useEffect(() => {
    const update = () => {
      const diff = Date.now() - new Date(createdAt).getTime();
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setElapsed(`${minutes}m ${seconds}s`);
      // Consider overdue if > 30 mins and not closed
      setIsOverdue(minutes >= 30 && status !== 'CLOSED');
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

export default function BarRequests() {
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState<RequestStatus | 'ALL'>('ALL');

  const { data: requests, isLoading } = useQuery({
    queryKey: ['bar-requests'],
    queryFn: () => api.getRequests(),
    refetchInterval: 5000,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: RequestStatus }) => 
      api.updateRequestStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bar-requests'] });
    },
  });

  if (isLoading) return <div className="p-8 text-stone-400">Loading requests...</div>;

  const filteredRequests = requests?.filter(r => 
    filterStatus === 'ALL' ? true : r.status === filterStatus
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || [];

  return (
    <div className="max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-serif italic text-stone-900">Room Requests</h1>
          <p className="text-stone-500 mt-1">Housekeeping, Technical, and Guest Services</p>
        </div>
        
        <div className="flex gap-2 p-1 bg-white rounded-full border border-stone-200 shadow-sm self-start md:self-auto overflow-x-auto max-w-full">
          {(['ALL', 'RECEIVED', 'IN_PROGRESS', 'CLOSED'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                filterStatus === status 
                  ? "bg-stone-900 text-white shadow-sm" 
                  : "text-stone-500 hover:bg-stone-50"
              )}
            >
              {status === 'ALL' ? 'All' : status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRequests.map(request => {
          const Icon = REQUEST_ICONS[request.type];
          const isNew = new Date(request.createdAt).getTime() > Date.now() - 1000 * 60;

          return (
            <div 
              key={request.id} 
              className={cn(
                "bg-white rounded-3xl p-6 border transition-all hover:shadow-lg flex flex-col relative overflow-hidden",
                isNew ? "border-stone-300 shadow-md" : "border-stone-100 shadow-sm",
                request.status === 'CLOSED' ? "opacity-75" : ""
              )}
            >
              {isNew && (
                <div className="absolute top-0 right-0 p-4 z-10">
                  <span className="flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-4 rounded-2xl text-stone-700",
                    request.type === 'TECHNICAL' ? "bg-orange-50 text-orange-700" :
                    request.type === 'HOUSEKEEPING' ? "bg-blue-50 text-blue-700" :
                    "bg-stone-50"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-serif italic text-stone-900">Room {request.roomId}</span>
                    </div>
                    <span className="text-sm font-medium text-stone-400">{request.type.replace('_', ' ')}</span>
                  </div>
                </div>
                
                <div className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
                  request.status === 'RECEIVED' ? "bg-red-50 text-red-700" :
                  request.status === 'IN_PROGRESS' ? "bg-amber-50 text-amber-800" :
                  "bg-emerald-50 text-emerald-700"
                )}>
                  {request.status.replace('_', ' ')}
                </div>
              </div>

              {/* Notes */}
              {request.notes && (
                <div className="bg-[#FDFCF8] p-5 rounded-2xl mb-6 text-sm text-stone-600 italic border border-stone-100 leading-relaxed">
                  "{request.notes}"
                </div>
              )}

              {/* Footer */}
              <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-stone-500 font-medium bg-stone-50 px-3 py-1.5 rounded-lg">
                  <Timer className="w-3.5 h-3.5" />
                  <RequestTimer createdAt={request.createdAt} status={request.status} />
                </div>

                <div className="flex gap-2">
                  {request.status === 'RECEIVED' && (
                    <button
                      onClick={() => updateStatusMutation.mutate({ id: request.id, status: 'IN_PROGRESS' })}
                      className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium rounded-2xl transition-colors shadow-sm"
                    >
                      Start Request
                    </button>
                  )}
                  {request.status === 'IN_PROGRESS' && (
                    <button
                      onClick={() => updateStatusMutation.mutate({ id: request.id, status: 'CLOSED' })}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-2xl transition-colors shadow-sm"
                    >
                      Mark Done
                    </button>
                  )}
                  {request.status === 'CLOSED' && (
                    <div className="flex items-center gap-2 text-sm font-medium text-stone-400 px-4 py-2">
                      <Check className="w-4 h-4" />
                      Closed
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredRequests.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-stone-300" />
            </div>
            <h3 className="text-xl font-serif italic text-stone-900">All caught up</h3>
            <p className="text-stone-400 mt-2">No active requests matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
