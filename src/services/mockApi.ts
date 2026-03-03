import { Category, Product, Order, ServiceRequest, OrderStatus } from '../types';
import { generateId } from '../lib/utils';

// Mock Data
export const CATEGORIES: Category[] = [
  { id: 'c1', name: { en: 'Soft Drinks', tr: 'Meşrubat', de: 'Alkoholfrei', ru: 'Напитки' }, sortOrder: 1 },
  { id: 'c2', name: { en: 'Cocktails', tr: 'Kokteyller', de: 'Cocktails', ru: 'Коктейли' }, sortOrder: 2 },
  { id: 'c3', name: { en: 'Beer', tr: 'Bira', de: 'Bier', ru: 'Пиво' }, sortOrder: 3 },
  { id: 'c5', name: { en: 'Wine', tr: 'Şarap', de: 'Wein', ru: 'Вино' }, sortOrder: 4 },
  { id: 'c6', name: { en: 'Hot Drinks', tr: 'Sıcak İçecekler', de: 'Heiße Getränke', ru: 'Горячие напитки' }, sortOrder: 5 },
  { id: 'c4', name: { en: 'Snacks', tr: 'Atıştırmalık', de: 'Snacks', ru: 'Закуски' }, sortOrder: 6 },
  { id: 'c7', name: { en: 'Salads', tr: 'Salatalar', de: 'Salate', ru: 'Салаты' }, sortOrder: 7 },
  { id: 'c8', name: { en: 'Burgers & Sandwiches', tr: 'Burger & Sandviç', de: 'Burger & Sandwiches', ru: 'Бургеры и сэндвичи' }, sortOrder: 8 },
  { id: 'c9', name: { en: 'Pizza', tr: 'Pizza', de: 'Pizza', ru: 'Пицца' }, sortOrder: 9 },
  { id: 'c10', name: { en: 'Desserts', tr: 'Tatlılar', de: 'Desserts', ru: 'Десерты' }, sortOrder: 10 },
  { id: 'c11', name: { en: 'Kids Menu', tr: 'Çocuk Menüsü', de: 'Kindermenü', ru: 'Детское меню' }, sortOrder: 11 },
];

export const PRODUCTS: Product[] = [
  // Soft Drinks (c1)
  { id: 'p1', categoryId: 'c1', name: { en: 'Coca Cola', tr: 'Coca Cola', de: 'Coca Cola', ru: 'Кока-кола' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=300&q=80' },
  { id: 'p2', categoryId: 'c1', name: { en: 'Fanta', tr: 'Fanta', de: 'Fanta', ru: 'Фанта' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=300&q=80' },
  { id: 'p6', categoryId: 'c1', name: { en: 'Sprite', tr: 'Sprite', de: 'Sprite', ru: 'Спрайт' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=300&q=80' },
  { id: 'p7', categoryId: 'c1', name: { en: 'Ice Tea Peach', tr: 'Soğuk Çay Şeftali', de: 'Eistee Pfirsich', ru: 'Холодный чай (персик)' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80' },
  { id: 'p13', categoryId: 'c1', name: { en: 'Ice Tea Lemon', tr: 'Soğuk Çay Limon', de: 'Eistee Zitrone', ru: 'Холодный чай (лимон)' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=300&q=80' },
  { id: 'p14', categoryId: 'c1', name: { en: 'Mineral Water', tr: 'Maden Suyu', de: 'Mineralwasser', ru: 'Минеральная вода' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1603394630850-69b3ca8121ca?auto=format&fit=crop&w=300&q=80' },
  { id: 'p15', categoryId: 'c1', name: { en: 'Fresh Orange Juice', tr: 'Taze Portakal Suyu', de: 'Frischer Orangensaft', ru: 'Свежевыжатый апельсиновый сок' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=300&q=80' },
  { id: 'p16', categoryId: 'c1', name: { en: 'Lemonade', tr: 'Limonata', de: 'Limonade', ru: 'Лимонад' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80' },
  { id: 'p17', categoryId: 'c1', name: { en: 'Ayran', tr: 'Ayran', de: 'Ayran', ru: 'Айран' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=300&q=80' },

  // Cocktails (c2)
  { id: 'p3', categoryId: 'c2', name: { en: 'Mojito', tr: 'Mojito', de: 'Mojito', ru: 'Мохито' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=300&q=80' },
  { id: 'p8', categoryId: 'c2', name: { en: 'Margarita', tr: 'Margarita', de: 'Margarita', ru: 'Маргарита' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=300&q=80' },
  { id: 'p9', categoryId: 'c2', name: { en: 'Pina Colada', tr: 'Pina Colada', de: 'Pina Colada', ru: 'Пина Колада' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=300&q=80' },
  { id: 'p18', categoryId: 'c2', name: { en: 'Aperol Spritz', tr: 'Aperol Spritz', de: 'Aperol Spritz', ru: 'Апероль Шприц' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1560512823-8db03e1b0f1b?auto=format&fit=crop&w=300&q=80' },
  { id: 'p19', categoryId: 'c2', name: { en: 'Cosmopolitan', tr: 'Cosmopolitan', de: 'Cosmopolitan', ru: 'Космополитен' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=300&q=80' },
  { id: 'p20', categoryId: 'c2', name: { en: 'Long Island Iced Tea', tr: 'Long Island', de: 'Long Island', ru: 'Лонг Айленд' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=300&q=80' },
  { id: 'p21', categoryId: 'c2', name: { en: 'Tequila Sunrise', tr: 'Tequila Sunrise', de: 'Tequila Sunrise', ru: 'Текила Санрайз' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1536935338788-843bb52b3634?auto=format&fit=crop&w=300&q=80' },
  { id: 'p22', categoryId: 'c2', name: { en: 'Sex on the Beach', tr: 'Sex on the Beach', de: 'Sex on the Beach', ru: 'Секс на пляже' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=300&q=80' },

  // Beer (c3)
  { id: 'p4', categoryId: 'c3', name: { en: 'Efes Pilsen', tr: 'Efes Pilsen', de: 'Efes Pilsen', ru: 'Эфес' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=300&q=80' },
  { id: 'p10', categoryId: 'c3', name: { en: 'Heineken', tr: 'Heineken', de: 'Heineken', ru: 'Хайнекен' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?auto=format&fit=crop&w=300&q=80' },
  { id: 'p23', categoryId: 'c3', name: { en: 'Corona', tr: 'Corona', de: 'Corona', ru: 'Корона' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1605218427368-35b019b8a394?auto=format&fit=crop&w=300&q=80' },
  { id: 'p24', categoryId: 'c3', name: { en: 'Miller', tr: 'Miller', de: 'Miller', ru: 'Миллер' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1618183479302-1e0aa382c36b?auto=format&fit=crop&w=300&q=80' },
  { id: 'p25', categoryId: 'c3', name: { en: 'Bomonti Filtresiz', tr: 'Bomonti Filtresiz', de: 'Bomonti Ungefiltert', ru: 'Бомонти нефильтрованное' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1535958636474-b021ee8876a3?auto=format&fit=crop&w=300&q=80' },

  // Wine (c5)
  { id: 'p26', categoryId: 'c5', name: { en: 'House Red Wine', tr: 'Kırmızı Ev Şarabı', de: 'Hauswein Rot', ru: 'Домашнее красное вино' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=300&q=80' },
  { id: 'p27', categoryId: 'c5', name: { en: 'House White Wine', tr: 'Beyaz Ev Şarabı', de: 'Hauswein Weiß', ru: 'Домашнее белое вино' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1572569998601-f597a1a4574c?auto=format&fit=crop&w=300&q=80' },
  { id: 'p28', categoryId: 'c5', name: { en: 'Rosé Wine', tr: 'Roze Şarap', de: 'Roséwein', ru: 'Розовое вино' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1559563362-c667ba5f5480?auto=format&fit=crop&w=300&q=80' },
  { id: 'p29', categoryId: 'c5', name: { en: 'Sparkling Wine', tr: 'Köpüklü Şarap', de: 'Sekt', ru: 'Игристое вино' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1598155523122-3842334d6c10?auto=format&fit=crop&w=300&q=80' },

  // Hot Drinks (c6)
  { id: 'p30', categoryId: 'c6', name: { en: 'Turkish Coffee', tr: 'Türk Kahvesi', de: 'Türkischer Kaffee', ru: 'Турецкий кофе' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1568379685788-294747d25392?auto=format&fit=crop&w=300&q=80' },
  { id: 'p31', categoryId: 'c6', name: { en: 'Turkish Tea', tr: 'Çay', de: 'Türkischer Tee', ru: 'Турецкий чай' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1576092768241-dec231847233?auto=format&fit=crop&w=300&q=80' },
  { id: 'p32', categoryId: 'c6', name: { en: 'Espresso', tr: 'Espresso', de: 'Espresso', ru: 'Эспрессо' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1610889556283-43f3539955d9?auto=format&fit=crop&w=300&q=80' },
  { id: 'p33', categoryId: 'c6', name: { en: 'Cappuccino', tr: 'Cappuccino', de: 'Cappuccino', ru: 'Капучино' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=300&q=80' },
  { id: 'p34', categoryId: 'c6', name: { en: 'Latte', tr: 'Latte', de: 'Latte', ru: 'Латте' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1593443320739-77f74952dabd?auto=format&fit=crop&w=300&q=80' },
  { id: 'p35', categoryId: 'c6', name: { en: 'Hot Chocolate', tr: 'Sıcak Çikolata', de: 'Heiße Schokolade', ru: 'Горячий шоколад' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&w=300&q=80' },

  // Snacks (c4)
  { id: 'p5', categoryId: 'c4', name: { en: 'Club Sandwich', tr: 'Kulüp Sandviç', de: 'Club Sandwich', ru: 'Клубный сэндвич' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?auto=format&fit=crop&w=300&q=80' },
  { id: 'p11', categoryId: 'c4', name: { en: 'Hamburger', tr: 'Hamburger', de: 'Hamburger', ru: 'Гамбургер' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80' },
  { id: 'p12', categoryId: 'c4', name: { en: 'French Fries', tr: 'Patates Kızartması', de: 'Pommes Frites', ru: 'Картофель фри' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=300&q=80' },
  { id: 'p36', categoryId: 'c4', name: { en: 'Onion Rings', tr: 'Soğan Halkası', de: 'Zwiebelringe', ru: 'Луковые кольца' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=300&q=80' },
  { id: 'p37', categoryId: 'c4', name: { en: 'Chicken Nuggets', tr: 'Tavuk Parçaları', de: 'Chicken Nuggets', ru: 'Куриные наггетсы' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=300&q=80' },
  { id: 'p38', categoryId: 'c4', name: { en: 'Nachos', tr: 'Nachos', de: 'Nachos', ru: 'Начос' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1513456852971-30cfa382c972?auto=format&fit=crop&w=300&q=80' },
  { id: 'p39', categoryId: 'c4', name: { en: 'Fruit Plate', tr: 'Meyve Tabağı', de: 'Obstteller', ru: 'Фруктовая тарелка' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1615485925694-a031e341f713?auto=format&fit=crop&w=300&q=80' },

  // Salads (c7)
  { id: 'p40', categoryId: 'c7', name: { en: 'Caesar Salad', tr: 'Sezar Salata', de: 'Caesar Salat', ru: 'Цезарь' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=300&q=80' },
  { id: 'p41', categoryId: 'c7', name: { en: 'Greek Salad', tr: 'Yunan Salatası', de: 'Griechischer Salat', ru: 'Греческий салат' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=300&q=80' },
  { id: 'p42', categoryId: 'c7', name: { en: 'Tuna Salad', tr: 'Ton Balıklı Salata', de: 'Thunfischsalat', ru: 'Салат с тунцом' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80' },
  { id: 'p43', categoryId: 'c7', name: { en: 'Quinoa Salad', tr: 'Kinoa Salatası', de: 'Quinoa Salat', ru: 'Салат с киноа' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&w=300&q=80' },

  // Burgers & Sandwiches (c8)
  { id: 'p44', categoryId: 'c8', name: { en: 'Cheeseburger', tr: 'Cheeseburger', de: 'Cheeseburger', ru: 'Чизбургер' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80' },
  { id: 'p45', categoryId: 'c8', name: { en: 'Chicken Burger', tr: 'Tavuk Burger', de: 'Chicken Burger', ru: 'Куриный бургер' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1615297928064-24977384d0f9?auto=format&fit=crop&w=300&q=80' },
  { id: 'p46', categoryId: 'c8', name: { en: 'Veggie Burger', tr: 'Vejetaryen Burger', de: 'Veggie Burger', ru: 'Вегетарианский бургер' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=300&q=80' },
  { id: 'p47', categoryId: 'c8', name: { en: 'Tuna Sandwich', tr: 'Ton Balıklı Sandviç', de: 'Thunfisch Sandwich', ru: 'Сэндвич с тунцом' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1553909489-cd47e35046d1?auto=format&fit=crop&w=300&q=80' },
  { id: 'p48', categoryId: 'c8', name: { en: 'Cheese Toast', tr: 'Kaşarlı Tost', de: 'Käsetoast', ru: 'Тост с сыром' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1584776296944-ab6fb4f25e6e?auto=format&fit=crop&w=300&q=80' },

  // Pizza (c9)
  { id: 'p49', categoryId: 'c9', name: { en: 'Margherita', tr: 'Margarita', de: 'Margherita', ru: 'Маргарита' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80' },
  { id: 'p50', categoryId: 'c9', name: { en: 'Pepperoni', tr: 'Pepperoni', de: 'Pepperoni', ru: 'Пепперони' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80' },
  { id: 'p51', categoryId: 'c9', name: { en: 'Vegetarian', tr: 'Vejetaryen', de: 'Vegetarisch', ru: 'Вегетарианская' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80' },
  { id: 'p52', categoryId: 'c9', name: { en: 'BBQ Chicken', tr: 'Barbekü Tavuklu', de: 'BBQ Chicken', ru: 'Барбекю с курицей' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80' },

  // Desserts (c10)
  { id: 'p53', categoryId: 'c10', name: { en: 'Ice Cream (3 Scoops)', tr: 'Dondurma (3 Top)', de: 'Eis (3 Kugeln)', ru: 'Мороженое (3 шарика)' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=300&q=80' },
  { id: 'p54', categoryId: 'c10', name: { en: 'Cheesecake', tr: 'Cheesecake', de: 'Käsekuchen', ru: 'Чизкейк' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df26?auto=format&fit=crop&w=300&q=80' },
  { id: 'p55', categoryId: 'c10', name: { en: 'Chocolate Brownie', tr: 'Çikolatalı Brownie', de: 'Schokoladen Brownie', ru: 'Шоколадный брауни' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476d?auto=format&fit=crop&w=300&q=80' },
  { id: 'p56', categoryId: 'c10', name: { en: 'Fruit Salad', tr: 'Meyve Salatası', de: 'Obstsalat', ru: 'Фруктовый салат' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1519996529931-28324d1a630e?auto=format&fit=crop&w=300&q=80' },
  { id: 'p57', categoryId: 'c10', name: { en: 'Waffle', tr: 'Waffle', de: 'Waffel', ru: 'Вафли' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1568051243851-f9b136146e97?auto=format&fit=crop&w=300&q=80' },

  // Kids Menu (c11)
  { id: 'p58', categoryId: 'c11', name: { en: 'Mini Burger', tr: 'Mini Burger', de: 'Mini Burger', ru: 'Мини-бургер' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80' },
  { id: 'p59', categoryId: 'c11', name: { en: 'Spaghetti Bolognese', tr: 'Spagetti Bolonez', de: 'Spaghetti Bolognese', ru: 'Спагетти Болоньезе' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?auto=format&fit=crop&w=300&q=80' },
  { id: 'p60', categoryId: 'c11', name: { en: 'Chicken Fingers', tr: 'Çıtır Tavuk', de: 'Hähnchenfinger', ru: 'Куриные палочки' }, isAvailable: true, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=300&q=80' },
];

// In-memory storage for prototype (initialized from localStorage if available)
const loadFromStorage = (key: string, defaultVal: any[]) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
};

const saveToStorage = (key: string, data: any[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
};

let orders: Order[] = loadFromStorage('resort_orders', []);
let requests: ServiceRequest[] = loadFromStorage('resort_requests', []);

// Mock API Service
export const api = {
  getMenu: async () => {
    await new Promise(r => setTimeout(r, 500));
    return { categories: CATEGORIES, products: PRODUCTS };
  },

  createOrder: async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    await new Promise(r => setTimeout(r, 800));
    const newOrder: Order = {
      ...orderData,
      id: generateId(),
      status: 'RECEIVED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    orders = [newOrder, ...orders]; // Prepend
    saveToStorage('resort_orders', orders);
    return newOrder;
  },

  getOrder: async (id: string) => {
    await new Promise(r => setTimeout(r, 300));
    // Reload from storage to get latest updates from other tabs
    orders = loadFromStorage('resort_orders', []);
    return orders.find(o => o.id === id);
  },

  getOrders: async (status?: OrderStatus, clientSessionId?: string) => {
    await new Promise(r => setTimeout(r, 500));
    orders = loadFromStorage('resort_orders', []);
    let filtered = orders;
    if (status) filtered = filtered.filter(o => o.status === status);
    if (clientSessionId) filtered = filtered.filter(o => o.clientSessionId === clientSessionId);
    return filtered;
  },

  updateOrderStatus: async (id: string, status: OrderStatus) => {
    await new Promise(r => setTimeout(r, 300));
    orders = loadFromStorage('resort_orders', []);
    const order = orders.find(o => o.id === id);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      saveToStorage('resort_orders', orders);
    }
    return order;
  },

  updateOrder: async (id: string, updates: Partial<Order>) => {
    await new Promise(r => setTimeout(r, 300));
    orders = loadFromStorage('resort_orders', []);
    const orderIndex = orders.findIndex(o => o.id === id);
    if (orderIndex > -1) {
      orders[orderIndex] = { ...orders[orderIndex], ...updates, updatedAt: new Date().toISOString() };
      saveToStorage('resort_orders', orders);
      return orders[orderIndex];
    }
    return null;
  },

  createRequest: async (requestData: Omit<ServiceRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    await new Promise(r => setTimeout(r, 800));
    const newRequest: ServiceRequest = {
      ...requestData,
      id: generateId(),
      status: 'RECEIVED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    requests = [newRequest, ...requests];
    saveToStorage('resort_requests', requests);
    return newRequest;
  },
  
  getRequest: async (id: string) => {
     await new Promise(r => setTimeout(r, 300));
     requests = loadFromStorage('resort_requests', []);
     return requests.find(r => r.id === id);
  },

  getRequests: async () => {
    await new Promise(r => setTimeout(r, 500));
    requests = loadFromStorage('resort_requests', []);
    return requests;
  },

  updateRequestStatus: async (id: string, status: ServiceRequest['status']) => {
    await new Promise(r => setTimeout(r, 300));
    requests = loadFromStorage('resort_requests', []);
    const request = requests.find(r => r.id === id);
    if (request) {
      request.status = status;
      request.updatedAt = new Date().toISOString();
      saveToStorage('resort_requests', requests);
    }
    return request;
  },

  updateRequest: async (id: string, updates: Partial<ServiceRequest>) => {
    await new Promise(r => setTimeout(r, 300));
    requests = loadFromStorage('resort_requests', []);
    const requestIndex = requests.findIndex(r => r.id === id);
    if (requestIndex > -1) {
      requests[requestIndex] = { ...requests[requestIndex], ...updates, updatedAt: new Date().toISOString() };
      saveToStorage('resort_requests', requests);
      return requests[requestIndex];
    }
    return null;
  }
};
