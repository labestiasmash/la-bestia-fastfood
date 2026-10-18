export type CategoryId = 'combos' | 'hamburguesas' | 'alitas' | 'salchipapas' | 'bebidas';

export type ItemType = 'combo' | 'hamburguesa' | 'alitas' | 'salchipapa' | 'bebida';

export interface Product {
  id: string;
  category: CategoryId;
  itemType: ItemType;
  title: string;
  description: string;
  price: number;
  image: string;
  badge?: string; // 'MÁS VENDIDO' | 'PROMO' | 'BESTIAL' | 'FAVORITO'
  disponible: boolean;
  allowsDrink?: boolean;
  allowsWingSauce?: boolean;
  allowsCremas?: boolean;
  allowsExtras?: boolean;
}

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export interface CartItemOption {
  drink?: string;
  wingSauce?: string; // Para Alitas (BBQ, Acevichadas, Pasión Maracuyá, Búfalo Picante)
  cremas: string[]; // Para Hamburguesas y Salchipapas
  extras: ExtraOption[]; // Extras (+3, +4, +5, +2)
  notes?: string;
}

export interface CartItem {
  cartItemId: string; // único por combinación de opciones
  productId: string;
  title: string;
  basePrice: number;
  unitPrice: number;
  quantity: number;
  image: string;
  options: CartItemOption;
}

export type DeliveryType = 'delivery' | 'pickup';
export type PaymentMethod = 'yape' | 'plin' | 'bcp' | 'efectivo';

export interface CustomerOrderData {
  deliveryType: DeliveryType;
  fullName: string;
  phone: string;
  address: string;
  reference: string;
  paymentMethod: PaymentMethod;
  cashAmount?: string;
  notes: string;
}
