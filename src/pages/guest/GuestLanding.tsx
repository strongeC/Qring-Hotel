import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useGuestStore } from '../../store/guestStore';
import { useTranslation } from '../../hooks/useTranslation';
import { motion } from 'motion/react';
import { MapPin, Home, HelpCircle } from 'lucide-react';

export default function GuestLanding() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setLocation, setSessionToken, setLanguage } = useGuestStore();
  const { t } = useTranslation();

  useEffect(() => {
    const hotel = searchParams.get('hotel');
    const zone = searchParams.get('zone');
    const umbrella = searchParams.get('umbrella');
    const room = searchParams.get('room');
    const token = searchParams.get('token');

    if (token) setSessionToken(token);

    if (umbrella && zone) {
      setLocation('BEACH', umbrella, zone);
      navigate('/g/beach', { replace: true });
    } else if (room) {
      setLocation('ROOM', room);
      navigate('/g/room', { replace: true });
    }
  }, [searchParams, navigate, setLocation, setSessionToken]);

  // Fallback UI if no params (e.g. user just went to /g)
  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 text-center space-y-8 relative">
      <button 
        onClick={() => navigate('/g/help')}
        className="absolute top-6 right-6 p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-serif italic text-stone-800">{t('app.name')}</h1>
        <p className="text-stone-500 text-sm">{t('landing.welcome')}</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <button 
          onClick={() => navigate('/g/beach')}
          className="flex flex-col items-center justify-center p-6 bg-stone-100 rounded-2xl hover:bg-stone-200 transition-colors"
        >
          <MapPin className="w-8 h-8 mb-3 text-stone-600" />
          <span className="font-medium">{t('landing.beach')}</span>
        </button>

        <button 
          onClick={() => navigate('/g/room')}
          className="flex flex-col items-center justify-center p-6 bg-stone-100 rounded-2xl hover:bg-stone-200 transition-colors"
        >
          <Home className="w-8 h-8 mb-3 text-stone-600" />
          <span className="font-medium">{t('landing.room')}</span>
        </button>
      </div>

      <div className="absolute bottom-8 flex gap-4 text-sm text-stone-400">
        <button onClick={() => setLanguage('en')} className="hover:text-stone-600">EN</button>
        <button onClick={() => setLanguage('tr')} className="hover:text-stone-600">TR</button>
        <button onClick={() => setLanguage('de')} className="hover:text-stone-600">DE</button>
        <button onClick={() => setLanguage('ru')} className="hover:text-stone-600">RU</button>
      </div>
    </div>
  );
}
