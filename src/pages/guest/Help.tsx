import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, MapPin, Globe } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import { useGuestStore } from '../../store/guestStore';

export default function Help() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setLanguage } = useGuestStore();

  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <button onClick={() => navigate(-1)} className="mb-8 text-stone-500 flex items-center gap-2">
        <ArrowLeft className="w-4 h-4" /> {t('back')}
      </button>

      <h1 className="text-2xl font-serif italic text-stone-900 mb-8">Help & Settings</h1>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="font-medium">Language</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setLanguage('en')} className="px-4 py-2 border rounded-lg hover:bg-stone-50">English</button>
            <button onClick={() => setLanguage('tr')} className="px-4 py-2 border rounded-lg hover:bg-stone-50">Türkçe</button>
            <button onClick={() => setLanguage('de')} className="px-4 py-2 border rounded-lg hover:bg-stone-50">Deutsch</button>
            <button onClick={() => setLanguage('ru')} className="px-4 py-2 border rounded-lg hover:bg-stone-50">Русский</button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="font-medium">Location Access</h2>
          </div>
          <p className="text-sm text-stone-500 mb-4">
            We use your location to ensure you are within the service area for beach orders.
          </p>
          <button className="text-sm font-medium text-blue-600">
            Check Permissions
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h2 className="font-medium">FAQ</h2>
          </div>
          <div className="space-y-4 text-sm text-stone-600">
            <details className="group">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                How long does delivery take?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-2 text-stone-500">Usually 10-15 minutes depending on how busy we are.</p>
            </details>
            <details className="group">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                Can I pay with cash?
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <p className="mt-2 text-stone-500">All orders are charged to your room. No payment is required at the beach.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
