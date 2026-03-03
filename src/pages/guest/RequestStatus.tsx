import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/mockApi';
import { ArrowLeft, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function RequestStatus() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: request, isLoading } = useQuery({
    queryKey: ['request', id],
    queryFn: () => api.getRequest(id!),
    refetchInterval: 3000,
  });

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!request) return <div className="p-8 text-center">Request not found</div>;

  const isClosed = request.status === 'CLOSED';

  return (
    <div className="min-h-screen bg-stone-50 p-6 flex flex-col">
      <button onClick={() => navigate('/g/room')} className="self-start mb-8 text-stone-500 flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <div className={cn(
          "w-20 h-20 rounded-full flex items-center justify-center mb-4",
          isClosed ? "bg-emerald-100 text-emerald-600" : "bg-blue-50 text-blue-600"
        )}>
          {isClosed ? <CheckCircle2 className="w-10 h-10" /> : <Clock className="w-10 h-10 animate-pulse" />}
        </div>

        <h1 className="text-2xl font-serif italic text-stone-900">
          {isClosed ? 'Request Completed' : 'We received your request'}
        </h1>
        
        <p className="text-stone-500 max-w-xs">
          {request.type} request for Room {request.roomId}.
          {request.notes && <span className="block mt-2 italic">"{request.notes}"</span>}
        </p>

        <div className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm w-full max-w-xs">
          <div className="flex justify-between text-sm py-2 border-b border-stone-50">
            <span className="text-stone-400">Status</span>
            <span className="font-medium text-stone-900">{request.status}</span>
          </div>
          <div className="flex justify-between text-sm py-2">
            <span className="text-stone-400">Time</span>
            <span className="font-medium text-stone-900">
              {new Date(request.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
