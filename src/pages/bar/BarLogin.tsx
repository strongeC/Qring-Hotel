import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BarLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // Mock login
    if (email && password) {
      navigate('/b/orders');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCF8] p-4">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif italic text-stone-900 mb-2">ResortFlow</h1>
          <p className="text-stone-500">Staff Access Portal</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-500 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-stone-900 focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all"
              placeholder="staff@hotel.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-500 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-stone-900 focus:ring-2 focus:ring-stone-900 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium py-4 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-stone-200"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-stone-400">
            Protected system. Authorized personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}
