import { Product, ExtraOption } from '../types';

import laBestiaBannerImg from '../assets/images/la_bestia_banner_1792361478103.jpg';
import salchipapaBestialImg from '../assets/images/salchipapa_bestial_1792361478693.jpg';
import alitasComboImg from '../assets/images/alitas_combo_bestia_1792361478508.jpg';
import burgerMonsterImg from '../assets/images/burger_bacon_monster_1792360757946.jpg';
import burgerSmashImg from '../assets/images/burger_smash_classic_1792360758826.jpg';
import friesLoadedImg from '../assets/images/fries_loaded_crispy_1792360758936.jpg';
import drinksImg from '../assets/images/drinks_sauces_combo_1792360759006.jpg';

export const BANNER_IMAGE = laBestiaBannerImg;

export const CATEGORIES = [
  { id: 'combos', name: 'Combos Bestiales', icon: 'fa-solid fa-fire', description: 'Platos completos con papas crujientes y bebida fría' },
  { id: 'hamburguesas', name: 'Hamburguesas', icon: 'fa-solid fa-burger', description: 'Carne 100% de res, pan brioche dorado y cremas al gusto' },
  { id: 'alitas', name: 'Alitas & Antojos', icon: 'fa-solid fa-drumstick-bite', description: 'Alitas crocantes bañadas en salsa Acevichada, BBQ o Búfalo' },
  { id: 'salchipapas', name: 'Salchipapas', icon: 'fa-solid fa-utensils', description: 'Montañas de papas nativas, salchichas frankfurter y huevo frito' },
  { id: 'bebidas', name: 'Bebidas & Salsas', icon: 'fa-solid fa-wine-glass', description: 'Gaseosas bien heladas, chicha casera y potes de cremas extra' },
] as const;

// Sabores para Alitas
export const WING_SAUCES = [
  'Acevichadas Especiales',
  'BBQ Ahumada',
  'Pasión Maracuyá',
  'Búfalo Picante'
];

// Cremas para Hamburguesas y Salchipapas
export const CREMAS_LIST = [
  'Mayonesa de la casa',
  'Tártara criolla',
  'Ají pollero',
  'Salsa BBQ',
  'Ketchup',
  'Mostaza'
];

// Extras con precio según requerimiento
export const AVAILABLE_EXTRAS: ExtraOption[] = [
  { id: 'extra_cheddar', name: 'Extra Queso Cheddar', price: 3.00 },
  { id: 'extra_bacon', name: 'Extra Tocino Crocante', price: 4.00 },
  { id: 'extra_fries_xl', name: 'Papas XL', price: 5.00 },
  { id: 'extra_egg', name: 'Huevo Frito', price: 2.00 }
];

// Bebidas para Combos
export const AVAILABLE_DRINKS = [
  'Inca Kola Personal (500ml)',
  'Coca-Cola Original (500ml)',
  'Chicha Morada Casera (500ml)',
  'Coca-Cola Zero (500ml)',
  'Agua Mineral San Mateo (500ml)'
];

/**
 * Catálogo estructurado para sincronización con Google Sheets
 * Columnas: id, category, title, description, price, image, badge, disponible
 */
export const INITIAL_PRODUCTS: Product[] = [
  // 🔥 COMBOS BESTIALES
  {
    id: 'combo-bestia',
    category: 'combos',
    itemType: 'combo',
    title: 'Combo Bestia Suprema',
    description: 'Hamburguesa doble carne (240g), doble cheddar, tocino ahumado crocante, aros de cebolla crispy, papas fritas XL y gaseosa 500ml a elección.',
    price: 35.00,
    image: burgerMonsterImg,
    badge: 'MÁS VENDIDO',
    disponible: true,
    allowsDrink: true,
    allowsCremas: true,
    allowsExtras: true,
  },
  {
    id: 'combo-alitas-duo',
    category: 'combos',
    itemType: 'combo',
    title: 'Combo Alitas Bestiales (8 und)',
    description: '8 alitas crocantes bañadas en salsa a elección (Acevichadas, BBQ, Maracuyá o Búfalo) + porción de papas rústicas y bebida fría 500ml.',
    price: 32.50,
    image: alitasComboImg,
    badge: 'PROMO',
    disponible: true,
    allowsDrink: true,
    allowsWingSauce: true,
    allowsCremas: true,
    allowsExtras: true,
  },
  {
    id: 'combo-salchi-monster',
    category: 'combos',
    itemType: 'combo',
    title: 'Combo Salchipapa La Fiera',
    description: 'Montaña de papas doradas con abundante salchicha frankfurter parrillera, queso cheddar fundido, huevo frito montado, todas las cremas y bebida.',
    price: 29.50,
    image: salchipapaBestialImg,
    badge: 'FAVORITO',
    disponible: true,
    allowsDrink: true,
    allowsCremas: true,
    allowsExtras: true,
  },

  // 🍔 HAMBURGUESAS
  {
    id: 'burg-la-bestia',
    category: 'hamburguesas',
    itemType: 'hamburguesa',
    title: 'Hamburguesa La Bestia BBQ',
    description: 'Doble carne de res a la plancha con costra smashed, tiras de tocino crocante, queso cheddar fundido, aros de cebolla empanizados y salsa BBQ.',
    price: 26.00,
    image: burgerMonsterImg,
    badge: 'MÁS VENDIDO',
    disponible: true,
    allowsCremas: true,
    allowsExtras: true,
  },
  {
    id: 'burg-smash-classic',
    category: 'hamburguesas',
    itemType: 'hamburguesa',
    title: 'Smash Cheeseburger Clásica',
    description: 'Doble smash de res angus con costra caramelizada, queso cheddar fundido, cebolla picadita en brunoise, pepinillos encurtidos y mayonesa casera.',
    price: 22.00,
    image: burgerSmashImg,
    badge: 'CLÁSICA',
    disponible: true,
    allowsCremas: true,
    allowsExtras: true,
  },
  {
    id: 'burg-royal-bestial',
    category: 'hamburguesas',
    itemType: 'hamburguesa',
    title: 'Hamburguesa Royal Callejera',
    description: 'Carne artesanal de 180g, huevo frito con yema tierna, queso fundido, lechuga crocante y abundante crema de ají pollero y tártara.',
    price: 24.00,
    image: burgerMonsterImg,
    badge: 'PROMO',
    disponible: true,
    allowsCremas: true,
    allowsExtras: true,
  },

  // 🍗 ALITAS & ANTOJOS
  {
    id: 'alitas-6',
    category: 'alitas',
    itemType: 'alitas',
    title: 'Porción Alitas Crocantes (6 und)',
    description: 'Alitas de pollo extra crujientes rebozadas, bañadas en tu salsa favorita (BBQ, Acevichadas, Pasión Maracuyá o Búfalo Picante) con ajonjolí.',
    price: 21.00,
    image: alitasComboImg,
    badge: 'MÁS VENDIDO',
    disponible: true,
    allowsWingSauce: true,
    allowsCremas: true,
    allowsExtras: true,
  },
  {
    id: 'alitas-12',
    category: 'alitas',
    itemType: 'alitas',
    title: 'Ronda Bestial de Alitas (12 und)',
    description: '12 alitas extra crujientes para compartir. Puedes elegir tu salsa estrella favorita acompañada de porción de papas y cremas.',
    price: 38.00,
    image: alitasComboImg,
    badge: 'PROMO',
    disponible: true,
    allowsWingSauce: true,
    allowsCremas: true,
    allowsExtras: true,
  },
  {
    id: 'nuggets-antojo',
    category: 'alitas',
    itemType: 'alitas',
    title: 'Tequeños Crocantes con Queso (6 und)',
    description: 'Crujientes tequeños fritos al momento rellenos de queso fundido, servidos con salsa tártara de la casa y crema de ají pollero.',
    price: 15.00,
    image: friesLoadedImg,
    badge: 'PARA PICAR',
    disponible: true,
    allowsWingSauce: false,
    allowsCremas: true,
    allowsExtras: false,
  },

  // 🍟 SALCHIPAPAS
  {
    id: 'salchi-la-bestia',
    category: 'salchipapas',
    itemType: 'salchipapa',
    title: 'Salchipapa La Bestia Salvaje',
    description: 'Nuestra salchipapa insignia: Base de papas nativas doradas con doble salchicha frankfurter, huevo frito montado, queso cheddar fundido y trocitos de tocino.',
    price: 25.00,
    image: salchipapaBestialImg,
    badge: 'MÁS VENDIDO',
    disponible: true,
    allowsCremas: true,
    allowsExtras: true,
  },
  {
    id: 'salchi-clasica',
    category: 'salchipapas',
    itemType: 'salchipapa',
    title: 'Salchipapa Clásica Callejera',
    description: 'Generosa porción de papas fritas bien crocantes con abundante salchicha parrillera en rodajas doradas y todas las cremas que elijas.',
    price: 18.00,
    image: salchipapaBestialImg,
    badge: 'CLÁSICA',
    disponible: true,
    allowsCremas: true,
    allowsExtras: true,
  },
  {
    id: 'papas-cheddar-bacon',
    category: 'salchipapas',
    itemType: 'salchipapa',
    title: 'Papas Cheddar & Bacon Lovers',
    description: 'Cama de papas fritas rústicas bañadas en cremosa salsa cheddar tibia con lluvia de tocino crocante y cebollita china picada.',
    price: 17.50,
    image: friesLoadedImg,
    badge: 'PROMO',
    disponible: true,
    allowsCremas: true,
    allowsExtras: true,
  },

  // 🥤 BEBIDAS & SALSAS
  {
    id: 'beb-chicha',
    category: 'bebidas',
    itemType: 'bebida',
    title: 'Chicha Morada Casera (500ml)',
    description: 'Preparada artesanalmente con maíz morado, piña madura, manzana criolla, canela, clavo y gotas de limón fresco. Bien heladita.',
    price: 7.00,
    image: drinksImg,
    badge: 'DE LA CASA',
    disponible: true,
    allowsDrink: false,
    allowsCremas: false,
    allowsExtras: false,
  },
  {
    id: 'beb-inca',
    category: 'bebidas',
    itemType: 'bebida',
    title: 'Inca Kola Personal (500ml)',
    description: 'Gaseosa de sabor nacional bien fría en botella de 500ml.',
    price: 6.00,
    image: drinksImg,
    badge: '',
    disponible: true,
    allowsDrink: false,
    allowsCremas: false,
    allowsExtras: false,
  },
  {
    id: 'beb-coca',
    category: 'bebidas',
    itemType: 'bebida',
    title: 'Coca-Cola Personal (500ml)',
    description: 'Sabor original refrescante en botella de 500ml.',
    price: 6.00,
    image: drinksImg,
    badge: '',
    disponible: true,
    allowsDrink: false,
    allowsCremas: false,
    allowsExtras: false,
  },
  {
    id: 'salsas-pack',
    category: 'bebidas',
    itemType: 'bebida',
    title: 'Pack 3 Potes de Cremas Extra (2oz)',
    description: 'Elige tus cremas favoritas en porción extra generosa: Mayonesa de la casa, Tártara y Ají Pollero.',
    price: 4.50,
    image: drinksImg,
    badge: 'INFALTABLE',
    disponible: true,
    allowsDrink: false,
    allowsCremas: true,
    allowsExtras: false,
  }
];

export const RESTAURANT_INFO = {
  name: 'La Bestia Fast Food',
  tagline: 'Comida Rápida con Sabor Bestial · Hamburguesas, Alitas y Salchipapas',
  phone: '51987654321', // WhatsApp format 51 + 9 dígitos
  displayPhone: '987 654 321',
  schedule: 'Lun - Dom: 6:00 PM - 11:30 PM',
  status: 'Abierto para Delivery',
  isOpen: true,
  deliveryCost: 5.00,
  pickupAddress: 'Av. Las Palmeras 830, Los Olivos - Lima',
  paymentAccounts: {
    yape: {
      name: 'La Bestia Fast Food Oficial',
      number: '987 654 321',
      qrHint: 'Yapea al 987 654 321'
    },
    plin: {
      name: 'La Bestia Fast Food Oficial',
      number: '987 654 321',
      qrHint: 'Plin al 987 654 321'
    },
    bcp: {
      bank: 'Banco de Crédito BCP',
      accountNumber: '194-98765432-0-88',
      cci: '002-1940098765432088-91',
      beneficiary: 'LA BESTIA FAST FOOD S.A.C.'
    }
  }
};
