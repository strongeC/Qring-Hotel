import { useGuestStore } from '../store/guestStore';
import { Language } from '../types';

const TRANSLATIONS: Record<string, Record<Language, string>> = {
  // Common
  'app.name': { en: 'ResortFlow', tr: 'ResortFlow', de: 'ResortFlow', ru: 'ResortFlow' },
  'loading': { en: 'Loading...', tr: 'Yükleniyor...', de: 'Laden...', ru: 'Загрузка...' },
  'back': { en: 'Back', tr: 'Geri', de: 'Zurück', ru: 'Назад' },
  
  // Landing
  'landing.welcome': { en: 'Welcome to your premium experience', tr: 'Premium deneyiminize hoş geldiniz', de: 'Willkommen zu Ihrem Premium-Erlebnis', ru: 'Добро пожаловать' },
  'landing.beach': { en: 'Beach Menu', tr: 'Plaj Menüsü', de: 'Strandmenü', ru: 'Пляжное меню' },
  'landing.room': { en: 'Room Service', tr: 'Oda Servisi', de: 'Zimmerservice', ru: 'Обслуживание номеров' },

  // Beach Menu
  'beach.title': { en: 'Beach Club', tr: 'Plaj Kulübü', de: 'Beach Club', ru: 'Пляжный клуб' },
  'beach.add': { en: 'Add', tr: 'Ekle', de: 'Hinzufügen', ru: 'Добавить' },
  'beach.cart.title': { en: 'Your Order', tr: 'Siparişiniz', de: 'Ihre Bestellung', ru: 'Ваш заказ' },
  'beach.cart.empty': { en: 'Your cart is empty', tr: 'Sepetiniz boş', de: 'Ihr Warenkorb ist leer', ru: 'Ваша корзина пуста' },
  'beach.order.place': { en: 'Place Order', tr: 'Siparişi Gönder', de: 'Bestellung aufgeben', ru: 'Оформить заказ' },
  'beach.order.sending': { en: 'Sending...', tr: 'Gönderiliyor...', de: 'Senden...', ru: 'Отправка...' },
  'beach.location.missing': { en: 'Please scan a QR code first', tr: 'Lütfen önce QR kodu okutun', de: 'Bitte scannen Sie zuerst einen QR-Code', ru: 'Пожалуйста, сначала отсканируйте QR-код' },

  // Room Requests
  'room.title': { en: 'Room Service', tr: 'Oda Servisi', de: 'Zimmerservice', ru: 'Обслуживание номеров' },
  'room.change': { en: 'Change', tr: 'Değiştir', de: 'Ändern', ru: 'Изменить' },
  'room.details.placeholder': { en: 'Add details...', tr: 'Detay ekleyin...', de: 'Details hinzufügen...', ru: 'Добавить детали...' },
  'room.send': { en: 'Send Request', tr: 'Talep Gönder', de: 'Anfrage senden', ru: 'Отправить запрос' },
  
  // Status
  'status.received': { en: 'Received', tr: 'Alındı', de: 'Erhalten', ru: 'Получено' },
  'status.preparing': { en: 'Preparing', tr: 'Hazırlanıyor', de: 'In Zubereitung', ru: 'Готовится' },
  'status.onway': { en: 'On the way', tr: 'Yolda', de: 'Unterwegs', ru: 'В пути' },
  'status.delivered': { en: 'Enjoy!', tr: 'Afiyet olsun!', de: 'Guten Appetit!', ru: 'Приятного аппетита!' },
  'status.order_new': { en: 'Order Something Else', tr: 'Yeni Sipariş Ver', de: 'Etwas anderes bestellen', ru: 'Заказать что-то еще' },
};

export function useTranslation() {
  const { language } = useGuestStore();

  const t = (key: string) => {
    return TRANSLATIONS[key]?.[language] || key;
  };

  return { t, language };
}
