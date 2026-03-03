export type Language = 'tr' | 'en' | 'de' | 'ru';

export type OrderStatus = 'RECEIVED' | 'IN_PREP' | 'READY' | 'DELIVERED' | 'CANCELLED';
export type RequestStatus = 'RECEIVED' | 'IN_PROGRESS' | 'CLOSED';
export type RequestType = 'HOUSEKEEPING' | 'TECHNICAL' | 'MINIBAR' | 'RECEPTION_MESSAGE';

export interface Product {
  id: string;
  categoryId: string;
  name: Record<Language, string>;
  description?: Record<Language, string>;
  price?: number; // Optional as per "no payment" rule, but good for data structure
  image?: string;
  isAvailable: boolean;
}

export interface Category {
  id: string;
  name: Record<Language, string>;
  sortOrder: number;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  notes?: string;
  isCompleted?: boolean;
}

export interface Order {
  id: string;
  hotelId: string;
  zoneId: string;
  umbrellaId: string;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string; // ISO string
  updatedAt: string;
  notes?: string;
  estimatedTime?: string;
  clientSessionId?: string;
}

export interface ServiceRequest {
  id: string;
  hotelId: string;
  roomId: string;
  type: RequestType;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  clientSessionId?: string;
  assignedTo?: string;
  assignedAt?: string;
}

export interface Zone {
  id: string;
  name: string;
}

export interface Umbrella {
  id: string;
  zoneId: string;
  code: string;
}

// Mock Data Types
export interface MockDatabase {
  orders: Order[];
  requests: ServiceRequest[];
  products: Product[];
  categories: Category[];
}
