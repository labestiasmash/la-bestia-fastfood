/**
 * ==========================================================================
 * LA BESTIA FAST FOOD - Lógica Frontend Vanilla JavaScript
 * ==========================================================================
 * Desarrollado para GitHub Pages (100% estático, sin backend ni dependencias)
 */

// 1. Configuración del Local / Restaurante
const RESTAURANT_CONFIG = {
  name: 'La Bestia Fast Food',
  phone: '51968 495 402', // WhatsApp: Código país 51 + 9 dígitos
  schedule: 'Lun - Dom: 6:00 PM - 11:30 PM',
  deliveryCost: 5.00,
  pickupAddress: 'Av. Las Palmeras 830, Los Olivos - Lima',
  yapeNumber: '968 495 402',
  plinNumber: '968 495 402',
  bcpAccount: '194-98765432-0-88'
};

// 2. Estructura de Datos que imita una hoja de Google Sheets
// Campos: id, category, title, description, price, image, badge, disponible, itemType
const MENU_DATA = [
  // 🔥 COMBOS BESTIALES
  {
    id: 'combo-bestia',
    category: 'combos',
    itemType: 'combo',
    title: 'Combo Bestia Suprema',
    description: 'Hamburguesa doble carne (240g), doble queso cheddar fundido, tocino crocante, aros de cebolla crispy, papas fritas XL y gaseosa 500ml a elección.',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=700&q=80',
    badge: 'MÁS VENDIDO',
    disponible: true,
    allowsDrink: true,
    allowsCremas: true,
    allowsExtras: true
  },
  {
    id: 'combo-alitas-duo',
    category: 'combos',
    itemType: 'combo',
    title: 'Combo Alitas Bestiales (8 und)',
    description: '8 alitas crocantes bañadas en salsa a elección (Acevichadas, BBQ, Pasión Maracuyá o Búfalo) + porción de papas rústicas y bebida 500ml.',
    price: 32.50,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=700&q=80',
    badge: 'PROMO',
    disponible: true,
    allowsDrink: true,
    allowsWingSauce: true,
    allowsCremas: true,
    allowsExtras: true
  },
  {
    id: 'combo-salchi-monster',
    category: 'combos',
    itemType: 'combo',
    title: 'Combo Salchipapa La Fiera',
    description: 'Montaña de papas doradas con abundante salchicha frankfurter, queso cheddar fundido, huevo frito montado, todas las cremas y bebida.',
    price: 29.50,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=700&q=80',
    badge: 'FAVORITO',
    disponible: true,
    allowsDrink: true,
    allowsCremas: true,
    allowsExtras: true
  },

  // 🍔 HAMBURGUESAS
  {
    id: 'burg-la-bestia',
    category: 'hamburguesas',
    itemType: 'hamburguesa',
    title: 'Hamburguesa La Bestia BBQ',
    description: 'Doble carne de res a la plancha, tiras de tocino ahumado crocante, queso cheddar fundido, aros de cebolla empanizados y salsa BBQ.',
    price: 26.00,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80',
    badge: 'MÁS VENDIDO',
    disponible: true,
    allowsCremas: true,
    allowsExtras: true
  },
  {
    id: 'burg-smash-classic',
    category: 'hamburguesas',
    itemType: 'hamburguesa',
    title: 'Smash Cheeseburger Clásica',
    description: 'Doble smash de res con costra crujiente caramelizada, queso cheddar derretido, cebollita blanca picadita y mayonesa casera en pan brioche.',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80',
    badge: 'CLÁSICA',
    disponible: true,
    allowsCremas: true,
    allowsExtras: true
  },
  {
    id: 'burg-royal-bestial',
    category: 'hamburguesas',
    itemType: 'hamburguesa',
    title: 'Hamburguesa Royal Callejera',
    description: 'Carne artesanal de 180g, huevo frito montado con yema tierna, queso fundido, lechuga crocante y abundante ají pollero y tártara.',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80',
    badge: 'PROMO',
    disponible: true,
    allowsCremas: true,
    allowsExtras: true
  },

  // 🍗 ALITAS & ANTOJOS
  {
    id: 'alitas-6',
    category: 'alitas',
    itemType: 'alitas',
    title: 'Porción Alitas Crocantes (6 und)',
    description: 'Alitas de pollo extra crujientes rebozadas, bañadas en tu salsa favorita (BBQ, Acevichadas, Pasión Maracuyá o Búfalo Picante) con ajonjolí.',
    price: 21.00,
    image: 'https://images.unsplash.com/photo-1527477321075-d3a7331a6256?auto=format&fit=crop&w=700&q=80',
    badge: 'MÁS VENDIDO',
    disponible: true,
    allowsWingSauce: true,
    allowsCremas: true,
    allowsExtras: true
  },
  {
    id: 'alitas-12',
    category: 'alitas',
    itemType: 'alitas',
    title: 'Ronda Bestial de Alitas (12 und)',
    description: '12 alitas extra crujientes para compartir. Elige tu salsa estrella favorita, servidas con porción de papas y cremas.',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=700&q=80',
    badge: 'PROMO',
    disponible: true,
    allowsWingSauce: true,
    allowsCremas: true,
    allowsExtras: true
  },
  {
    id: 'tequenos-queso',
    category: 'alitas',
    itemType: 'alitas',
    title: 'Tequeños Crocantes con Queso (6 und)',
    description: 'Tequeños fritos al momento rellenos de queso andino fundido, servidos con salsa tártara de la casa y crema de ají pollero.',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=700&q=80',
    badge: 'PARA PICAR',
    disponible: true,
    allowsWingSauce: false,
    allowsCremas: true,
    allowsExtras: false
  },

  // 🍟 SALCHIPAPAS
  {
    id: 'salchi-la-bestia',
    category: 'salchipapas',
    itemType: 'salchipapa',
    title: 'Salchipapa La Bestia Salvaje',
    description: 'Nuestra salchipapa insignia: Base de papas nativas doradas con doble salchicha frankfurter, huevo frito montado, queso cheddar fundido y tocino.',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=700&q=80',
    badge: 'MÁS VENDIDO',
    disponible: true,
    allowsCremas: true,
    allowsExtras: true
  },
  {
    id: 'salchi-clasica',
    category: 'salchipapas',
    itemType: 'salchipapa',
    title: 'Salchipapa Clásica Callejera',
    description: 'Generosa porción de papas fritas bien crocantes con abundante salchicha parrillera en rodajas doradas y todas las cremas que elijas.',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1639024471287-032f66ab750f?auto=format&fit=crop&w=700&q=80',
    badge: 'CLÁSICA',
    disponible: true,
    allowsCremas: true,
    allowsExtras: true
  },
  {
    id: 'papas-cheddar-bacon',
    category: 'salchipapas',
    itemType: 'salchipapa',
    title: 'Papas Cheddar & Bacon Lovers',
    description: 'Cama de papas fritas rústicas bañadas en cremosa salsa cheddar tibia con lluvia de tocino crocante y cebollita china picada.',
    price: 17.50,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=700&q=80',
    badge: 'PROMO',
    disponible: true,
    allowsCremas: true,
    allowsExtras: true
  },

  // 🥤 BEBIDAS & SALSAS
  {
    id: 'beb-chicha',
    category: 'bebidas',
    itemType: 'bebida',
    title: 'Chicha Morada Casera (500ml)',
    description: 'Receta tradicional con maíz morado, piña madura, manzana criolla, canela y toques de limón fresco. Bien heladita.',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    badge: 'DE LA CASA',
    disponible: true,
    allowsDrink: false,
    allowsCremas: false,
    allowsExtras: false
  },
  {
    id: 'beb-inca',
    category: 'bebidas',
    itemType: 'bebida',
    title: 'Inca Kola Personal (500ml)',
    description: 'La gaseosa del sabor nacional bien helada.',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=700&q=80',
    badge: '',
    disponible: true,
    allowsDrink: false,
    allowsCremas: false,
    allowsExtras: false
  },
  {
    id: 'beb-coca',
    category: 'bebidas',
    itemType: 'bebida',
    title: 'Coca-Cola Personal (500ml)',
    description: 'Coca-Cola sabor original bien helada.',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=700&q=80',
    badge: '',
    disponible: true,
    allowsDrink: false,
    allowsCremas: false,
    allowsExtras: false
  },
  {
    id: 'salsas-pack',
    category: 'bebidas',
    itemType: 'bebida',
    title: 'Pack 3 Potes de Cremas Extra (2oz)',
    description: 'Potes generosos de Mayonesa de la casa, Tártara y Crema de Ají Pollero.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=700&q=80',
    badge: 'INFALTABLE',
    disponible: true,
    allowsDrink: false,
    allowsCremas: true,
    allowsExtras: false
  }
];

// Opciones de Configuración
const WING_SAUCES_LIST = [
  'Acevichadas Especiales',
  'BBQ Ahumada',
  'Pasión Maracuyá',
  'Búfalo Picante'
];

const CREMAS_OPTIONS = [
  'Mayonesa de la casa',
  'Tártara criolla',
  'Ají pollero',
  'Salsa BBQ',
  'Ketchup',
  'Mostaza'
];

const EXTRAS_OPTIONS = [
  { id: 'extra_cheddar', name: 'Extra Queso Cheddar', price: 3.00 },
  { id: 'extra_bacon', name: 'Extra Tocino Crocante', price: 4.00 },
  { id: 'extra_fries_xl', name: 'Papas XL', price: 5.00 },
  { id: 'extra_egg', name: 'Huevo Frito', price: 2.00 }
];

const COMBO_DRINKS_LIST = [
  'Inca Kola Personal (500ml)',
  'Coca-Cola Original (500ml)',
  'Chicha Morada Casera (500ml)',
  'Coca-Cola Zero (500ml)'
];

// 3. Estado Global del Cliente
let currentCategory = 'combos';
let cart = JSON.parse(localStorage.getItem('la_bestia_cart') || '[]');
let activeCustomizingProduct = null;
let customizeState = {
  drink: COMBO_DRINKS_LIST[0],
  wingSauce: WING_SAUCES_LIST[0],
  cremas: ['Mayonesa de la casa', 'Ají pollero', 'Tártara criolla'],
  extras: [],
  quantity: 1,
  notes: ''
};

// Formato de moneda en Soles
function formatPrice(amount) {
  return `S/ ${Number(amount).toFixed(2)}`;
}

// Persistir carrito
function saveCart() {
  localStorage.setItem('la_bestia_cart', JSON.stringify(cart));
  updateCartUI();
}

// 4. Renderizar Catálogo de Productos
function renderProducts() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  const filtered = MENU_DATA.filter(item => item.category === currentCategory && item.disponible);
  container.innerHTML = '';

  filtered.forEach(product => {
    const card = document.createElement('article');
    card.className = 'group relative flex flex-col justify-between bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 hover:border-yellow-400/40 transition-all cursor-pointer shadow-md';
    card.onclick = () => openCustomizeModal(product.id);

    const badgeHtml = product.badge
      ? `<span class="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wide shadow-lg ${
          product.badge.toLowerCase().includes('más vendido') ? 'bg-yellow-400 text-stone-950' : 'bg-red-600 text-white'
        }"><i class="fa-solid fa-fire text-[10px]"></i> ${product.badge}</span>`
      : '';

    card.innerHTML = `
      <div class="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
        <img src="${product.image}" alt="${product.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-transparent to-transparent pointer-events-none"></div>
        ${badgeHtml}
        <div class="absolute bottom-2.5 left-2.5 z-10">
          <span class="inline-block bg-stone-950/95 text-yellow-400 font-black text-sm sm:text-base px-2.5 py-1 rounded-lg border border-yellow-400/30 tabular-nums shadow">
            ${formatPrice(product.price)}
          </span>
        </div>
      </div>
      <div class="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 class="font-bold text-base sm:text-lg text-white group-hover:text-yellow-400 transition-colors leading-snug font-brand">
            ${product.title}
          </h3>
          <p class="text-xs sm:text-sm text-stone-400 mt-1 line-clamp-2 leading-relaxed">
            ${product.description}
          </p>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-stone-800/60 mt-auto">
          <div className="text-[11px] text-stone-500">
            ${product.allowsWingSauce ? '🍗 Salsa · ' : ''}${product.allowsDrink ? '🥤 Bebida · ' : ''}${product.allowsCremas ? '🥫 Cremas' : ''}
          </div>
          <button type="button" class="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-stone-950 font-black text-xs sm:text-sm shadow-md transition-all active:scale-95">
            <i class="fa-solid fa-plus text-xs"></i>
            <span>Agregar</span>
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// 5. Configurar Botones de Categorías
function setupCategories() {
  const buttons = document.querySelectorAll('[data-category]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.getAttribute('data-category');
      buttons.forEach(b => {
        const isCurrent = b === btn;
        b.className = isCurrent
          ? 'flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap shrink-0 transition-all bg-gradient-to-r from-yellow-400 to-amber-500 text-stone-950 shadow-lg shadow-amber-500/20'
          : 'flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap shrink-0 transition-all bg-stone-900 text-stone-300 hover:text-white border border-stone-800';
      });
      renderProducts();
    });
  });
}

// 6. Modal de Personalización
function openCustomizeModal(productId) {
  const product = MENU_DATA.find(p => p.id === productId);
  if (!product) return;
  activeCustomizingProduct = product;

  // Reset del estado
  customizeState = {
    drink: COMBO_DRINKS_LIST[0],
    wingSauce: WING_SAUCES_LIST[0],
    cremas: ['Mayonesa de la casa', 'Ají pollero', 'Tártara criolla'],
    extras: [],
    quantity: 1,
    notes: ''
  };

  document.getElementById('modal-product-img').src = product.image;
  document.getElementById('modal-product-title').innerText = product.title;
  document.getElementById('modal-product-baseprice').innerText = `${formatPrice(product.price)} base`;

  // Renderizar Alitas (Selector de Sabor)
  const wingSec = document.getElementById('customize-wings-section');
  if (product.allowsWingSauce) {
    wingSec.classList.remove('hidden');
    renderWingSauceOptions();
  } else {
    wingSec.classList.add('hidden');
  }

  // Renderizar Bebida (Para Combos)
  const drinkSec = document.getElementById('customize-drink-section');
  if (product.allowsDrink) {
    drinkSec.classList.remove('hidden');
    renderDrinkOptions();
  } else {
    drinkSec.classList.add('hidden');
  }

  // Renderizar Cremas (Hamburguesas y Salchipapas)
  const cremasSec = document.getElementById('customize-cremas-section');
  if (product.allowsCremas) {
    cremasSec.classList.remove('hidden');
    renderCremasOptions();
  } else {
    cremasSec.classList.add('hidden');
  }

  // Renderizar Extras (+S/ 3.00, +S/ 4.00, +S/ 5.00, +S/ 2.00)
  const extraSec = document.getElementById('customize-extras-section');
  if (product.allowsExtras) {
    extraSec.classList.remove('hidden');
    renderExtrasOptions();
  } else {
    extraSec.classList.add('hidden');
  }

  document.getElementById('customize-notes').value = '';
  updateCustomizeTotal();

  const modal = document.getElementById('customize-modal');
  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  setTimeout(() => modal.classList.add('sheet-open'), 10);
}

function closeCustomizeModal() {
  const modal = document.getElementById('customize-modal');
  modal.classList.remove('sheet-open');
  document.body.classList.remove('overflow-hidden');
  setTimeout(() => modal.classList.add('hidden'), 250);
}

function renderWingSauceOptions() {
  const container = document.getElementById('wings-options-container');
  container.innerHTML = '';
  WING_SAUCES_LIST.forEach(sauce => {
    const isSelected = customizeState.wingSauce === sauce;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
      isSelected ? 'bg-yellow-500/15 border-yellow-400 text-white font-bold' : 'bg-stone-950/60 border-stone-800 text-stone-300'
    }`;
    btn.innerHTML = `
      <span class="text-xs">${sauce}</span>
      <div class="w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
        isSelected ? 'border-yellow-400 bg-yellow-400 text-stone-950' : 'border-stone-600'
      }">
        ${isSelected ? '<i class="fa-solid fa-check text-[9px] font-black"></i>' : ''}
      </div>
    `;
    btn.onclick = () => {
      customizeState.wingSauce = sauce;
      renderWingSauceOptions();
    };
    container.appendChild(btn);
  });
}

function renderDrinkOptions() {
  const container = document.getElementById('drink-options-container');
  container.innerHTML = '';
  COMBO_DRINKS_LIST.forEach(drink => {
    const isSelected = customizeState.drink === drink;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
      isSelected ? 'bg-yellow-500/15 border-yellow-400 text-white font-semibold' : 'bg-stone-950/60 border-stone-800 text-stone-300'
    }`;
    btn.innerHTML = `
      <span class="text-xs sm:text-sm">${drink}</span>
      <div class="w-4 h-4 rounded-full border flex items-center justify-center ${
        isSelected ? 'border-yellow-400 bg-yellow-400 text-stone-950' : 'border-stone-600'
      }">
        ${isSelected ? '<i class="fa-solid fa-check text-[9px] font-black"></i>' : ''}
      </div>
    `;
    btn.onclick = () => {
      customizeState.drink = drink;
      renderDrinkOptions();
    };
    container.appendChild(btn);
  });
}

function renderCremasOptions() {
  const container = document.getElementById('cremas-options-container');
  container.innerHTML = '';
  CREMAS_OPTIONS.forEach(crema => {
    const isChecked = customizeState.cremas.includes(crema);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `flex items-center gap-2 p-2 rounded-xl border text-left transition-all ${
      isChecked ? 'bg-stone-800 border-yellow-500/70 text-white font-medium' : 'bg-stone-950/60 border-stone-800 text-stone-400'
    }`;
    btn.innerHTML = `
      <div class="w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
        isChecked ? 'bg-yellow-400 border-yellow-400 text-stone-950' : 'border-stone-600'
      }">
        ${isChecked ? '<i class="fa-solid fa-check text-[9px] font-bold"></i>' : ''}
      </div>
      <span class="text-xs">${crema}</span>
    `;
    btn.onclick = () => {
      if (isChecked) {
        customizeState.cremas = customizeState.cremas.filter(c => c !== crema);
      } else {
        customizeState.cremas.push(crema);
      }
      renderCremasOptions();
    };
    container.appendChild(btn);
  });
}

function renderExtrasOptions() {
  const container = document.getElementById('extras-options-container');
  container.innerHTML = '';
  EXTRAS_OPTIONS.forEach(extra => {
    const isChecked = customizeState.extras.some(e => e.id === extra.id);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all ${
      isChecked ? 'bg-yellow-500/15 border-yellow-400 text-white font-bold' : 'bg-stone-950/60 border-stone-800 text-stone-300'
    }`;
    btn.innerHTML = `
      <div class="flex items-center gap-2.5">
        <div class="w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
          isChecked ? 'bg-yellow-400 border-yellow-400 text-stone-950' : 'border-stone-600'
        }">
          ${isChecked ? '<i class="fa-solid fa-check text-[9px] font-bold"></i>' : ''}
        </div>
        <span class="text-xs sm:text-sm">${extra.name}</span>
      </div>
      <span class="text-xs font-bold text-yellow-400 tabular-nums">+${formatPrice(extra.price)}</span>
    `;
    btn.onclick = () => {
      if (isChecked) {
        customizeState.extras = customizeState.extras.filter(e => e.id !== extra.id);
      } else {
        customizeState.extras.push(extra);
      }
      renderExtrasOptions();
      updateCustomizeTotal();
    };
    container.appendChild(btn);
  });
}

function updateCustomizeTotal() {
  if (!activeCustomizingProduct) return;
  const extrasSum = customizeState.extras.reduce((s, e) => s + e.price, 0);
  const unitPrice = activeCustomizingProduct.price + extrasSum;
  const total = unitPrice * customizeState.quantity;

  document.getElementById('modal-qty-display').innerText = customizeState.quantity;
  document.getElementById('modal-total-btn').innerText = formatPrice(total);
}

function setupCustomizeHandlers() {
  document.getElementById('modal-qty-minus').onclick = () => {
    if (customizeState.quantity > 1) {
      customizeState.quantity--;
      updateCustomizeTotal();
    }
  };
  document.getElementById('modal-qty-plus').onclick = () => {
    customizeState.quantity++;
    updateCustomizeTotal();
  };

  document.getElementById('add-to-cart-submit-btn').onclick = () => {
    if (!activeCustomizingProduct) return;
    const extrasSum = customizeState.extras.reduce((s, e) => s + e.price, 0);
    const unitPrice = activeCustomizingProduct.price + extrasSum;
    const notes = document.getElementById('customize-notes').value.trim();

    const cartItemId = `${activeCustomizingProduct.id}-${activeCustomizingProduct.allowsDrink ? customizeState.drink : ''}-${activeCustomizingProduct.allowsWingSauce ? customizeState.wingSauce : ''}-${customizeState.cremas.sort().join('|')}-${customizeState.extras.map(e => e.id).sort().join('|')}-${notes}`;

    const existingIndex = cart.findIndex(item => item.cartItemId === cartItemId);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += customizeState.quantity;
    } else {
      cart.push({
        cartItemId,
        productId: activeCustomizingProduct.id,
        title: activeCustomizingProduct.title,
        basePrice: activeCustomizingProduct.price,
        unitPrice,
        quantity: customizeState.quantity,
        image: activeCustomizingProduct.image,
        options: {
          drink: activeCustomizingProduct.allowsDrink ? customizeState.drink : null,
          wingSauce: activeCustomizingProduct.allowsWingSauce ? customizeState.wingSauce : null,
          cremas: activeCustomizingProduct.allowsCremas ? [...customizeState.cremas] : [],
          extras: activeCustomizingProduct.allowsExtras ? [...customizeState.extras] : [],
          notes
        }
      });
    }

    saveCart();
    closeCustomizeModal();
  };
}

// 7. Carrito Flotante y Drawer
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const isDelivery = document.querySelector('input[name="delivery-type"]:checked')?.value === 'delivery';
  const deliveryFee = isDelivery ? RESTAURANT_CONFIG.deliveryCost : 0;
  const total = subtotal + deliveryFee;

  // Floating sticky bottom bar
  const floatingBar = document.getElementById('floating-cart-bar');
  if (totalItems > 0) {
    floatingBar.classList.remove('hidden');
    document.getElementById('floating-items-count').innerText = `${totalItems} ${totalItems === 1 ? 'ítem' : 'ítems'}`;
    document.getElementById('floating-total-price').innerText = formatPrice(total);
  } else {
    floatingBar.classList.add('hidden');
  }

  // Drawer items render
  renderCartDrawerItems(subtotal, deliveryFee, total);
}

function renderCartDrawerItems(subtotal, deliveryFee, total) {
  const container = document.getElementById('drawer-items-list');
  const emptyState = document.getElementById('drawer-empty-state');
  const checkoutSection = document.getElementById('drawer-checkout-section');
  if (!container) return;

  if (cart.length === 0) {
    emptyState.classList.remove('hidden');
    container.classList.add('hidden');
    checkoutSection.classList.add('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  container.classList.remove('hidden');
  checkoutSection.classList.remove('hidden');

  container.innerHTML = '';
  cart.forEach(item => {
    const itemCard = document.createElement('div');
    itemCard.className = 'p-3 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2';

    let optionsHtml = '';
    if (item.options.wingSauce) optionsHtml += `<p class="text-yellow-300">🍗 Salsa: ${item.options.wingSauce}</p>`;
    if (item.options.drink) optionsHtml += `<p>🥤 Bebida: ${item.options.drink}</p>`;
    if (item.options.cremas?.length) optionsHtml += `<p>🥫 Cremas: ${item.options.cremas.join(', ')}</p>`;
    if (item.options.extras?.length) {
      optionsHtml += `<p>🥓 Extras: ${item.options.extras.map(e => `${e.name} (+${formatPrice(e.price)})`).join(', ')}</p>`;
    }
    if (item.options.notes) optionsHtml += `<p class="italic text-stone-500">📝 "${item.options.notes}"</p>`;

    itemCard.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div class="flex gap-2.5">
          <img src="${item.image}" alt="${item.title}" class="w-12 h-12 rounded-lg object-cover border border-stone-800 shrink-0" />
          <div>
            <h4 class="font-bold text-sm text-white font-brand">${item.title}</h4>
            <span class="text-xs text-yellow-400 font-bold">${formatPrice(item.unitPrice)} c/u</span>
          </div>
        </div>
        <button type="button" class="text-stone-500 hover:text-red-400 p-1 text-xs" onclick="removeCartItem('${item.cartItemId}')">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
      ${optionsHtml ? `<div class="text-[11px] text-stone-400 bg-stone-900/60 p-2 rounded-lg border border-stone-850 space-y-0.5">${optionsHtml}</div>` : ''}
      <div class="flex items-center justify-between pt-1">
        <div class="flex items-center bg-stone-900 border border-stone-800 rounded-lg p-0.5">
          <button type="button" class="w-7 h-7 rounded flex items-center justify-center text-stone-300 hover:text-white" onclick="changeQuantity('${item.cartItemId}', -1)">
            <i class="fa-solid fa-minus text-[10px]"></i>
          </button>
          <span class="w-7 text-center font-bold text-xs text-white tabular-nums">${item.quantity}</span>
          <button type="button" class="w-7 h-7 rounded flex items-center justify-center text-stone-300 hover:text-white" onclick="changeQuantity('${item.cartItemId}', 1)">
            <i class="fa-solid fa-plus text-[10px]"></i>
          </button>
        </div>
        <span class="font-black text-sm text-white tabular-nums">${formatPrice(item.unitPrice * item.quantity)}</span>
      </div>
    `;
    container.appendChild(itemCard);
  });

  // Totales
  document.getElementById('summary-subtotal').innerText = formatPrice(subtotal);
  document.getElementById('summary-delivery').innerText = deliveryFee > 0 ? formatPrice(deliveryFee) : 'Gratis / Recojo';
  document.getElementById('summary-total').innerText = formatPrice(total);
}

window.changeQuantity = function(cartItemId, delta) {
  const item = cart.find(i => i.cartItemId === cartItemId);
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.cartItemId !== cartItemId);
  }
  saveCart();
};

window.removeCartItem = function(cartItemId) {
  cart = cart.filter(i => i.cartItemId !== cartItemId);
  saveCart();
};

function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  drawer.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  setTimeout(() => drawer.classList.add('drawer-open'), 10);
  updateCartUI();
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  drawer.classList.remove('drawer-open');
  document.body.classList.remove('overflow-hidden');
  setTimeout(() => drawer.classList.add('hidden'), 300);
}

// 8. Envío por WhatsApp
function submitOrderViaWhatsApp() {
  if (cart.length === 0) return;

  const isDelivery = document.querySelector('input[name="delivery-type"]:checked').value === 'delivery';
  const nameInput = document.getElementById('customer-name');
  const phoneInput = document.getElementById('customer-phone');
  const addressInput = document.getElementById('customer-address');
  const referenceInput = document.getElementById('customer-reference');
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
  const generalNotes = document.getElementById('customer-notes').value.trim();

  // Validación
  if (!nameInput.value.trim()) {
    alert('Por favor ingresa tu nombre completo.');
    nameInput.focus();
    return;
  }
  if (isDelivery && !addressInput.value.trim()) {
    alert('Por favor ingresa tu dirección exacta para el delivery.');
    addressInput.focus();
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = isDelivery ? RESTAURANT_CONFIG.deliveryCost : 0;
  const total = subtotal + deliveryFee;

  let msg = `🔥 *NUEVO PEDIDO - ${RESTAURANT_CONFIG.name.toUpperCase()}* 🔥\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
  msg += `👤 *Cliente:* ${nameInput.value.trim()}\n`;
  if (phoneInput.value.trim()) msg += `📱 *Teléfono:* ${phoneInput.value.trim()}\n`;
  msg += `🛵 *Tipo de entrega:* ${isDelivery ? 'Delivery' : 'Recojo en local'}\n`;
  if (isDelivery) {
    msg += `📍 *Dirección:* ${addressInput.value.trim()}\n`;
    if (referenceInput.value.trim()) msg += `🔍 *Referencia:* ${referenceInput.value.trim()}\n`;
  } else {
    msg += `🏬 *Lugar de recojo:* ${RESTAURANT_CONFIG.pickupAddress}\n`;
  }

  const paymentLabels = { yape: 'Yape', plin: 'Plin', bcp: 'Transferencia BCP' };
  msg += `💳 *Método de pago:* ${paymentLabels[paymentMethod] || paymentMethod}\n`;

  msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📋 *DESGLOSE DEL PEDIDO:*\n\n`;

  cart.forEach((item, idx) => {
    msg += `${idx + 1}. *${item.quantity}x ${item.title}* (${formatPrice(item.unitPrice)} c/u)\n`;
    if (item.options.wingSauce) msg += `   🍗 *Sabor Alitas:* ${item.options.wingSauce}\n`;
    if (item.options.drink) msg += `   🥤 *Bebida:* ${item.options.drink}\n`;
    if (item.options.cremas?.length) msg += `   🥫 *Cremas:* ${item.options.cremas.join(', ')}\n`;
    if (item.options.extras?.length) {
      msg += `   🥓 *Agregados:* ${item.options.extras.map(e => `${e.name} (+${formatPrice(e.price)})`).join(', ')}\n`;
    }
    if (item.options.notes) msg += `   📝 *Nota:* ${item.options.notes}\n`;
    msg += `   👉 *Subtotal:* ${formatPrice(item.unitPrice * item.quantity)}\n\n`;
  });

  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `Subtotal productos: ${formatPrice(subtotal)}\n`;
  if (isDelivery) msg += `Costo de envío: ${formatPrice(deliveryFee)}\n`;
  msg += `💰 *TOTAL A PAGAR: ${formatPrice(total)}*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  if (generalNotes) msg += `💬 *Observaciones:*\n${generalNotes}\n\n`;

  if (paymentMethod === 'yape' || paymentMethod === 'plin') {
    msg += `📸 _*IMPORTANTE:* Adjunto la captura del comprobante de ${paymentMethod.toUpperCase()} a continuación antes de preparar mi pedido._ 🚀\n`;
  } else if (paymentMethod === 'bcp') {
    msg += `📸 _*IMPORTANTE:* Adjunto la constancia de transferencia BCP a continuación antes de preparar mi pedido._ 🚀\n`;
  }

  const waUrl = `https://wa.me/${RESTAURANT_CONFIG.phone}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

// Inicialización general
document.addEventListener('DOMContentLoaded', () => {
  setupCategories();
  renderProducts();
  setupCustomizeHandlers();
  updateCartUI();

  // Event Listeners
  document.getElementById('floating-cart-bar')?.addEventListener('click', openCartDrawer);
  document.getElementById('close-drawer-btn')?.addEventListener('click', closeCartDrawer);
  document.getElementById('close-modal-btn')?.addEventListener('click', closeCustomizeModal);
  document.getElementById('drawer-backdrop')?.addEventListener('click', closeCartDrawer);
  document.getElementById('modal-backdrop')?.addEventListener('click', closeCustomizeModal);
  document.getElementById('submit-order-whatsapp-btn')?.addEventListener('click', submitOrderViaWhatsApp);

  // Delivery toggle
  const deliveryRadios = document.querySelectorAll('input[name="delivery-type"]');
  deliveryRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const addressBox = document.getElementById('delivery-address-box');
      if (radio.value === 'delivery') {
        addressBox?.classList.remove('hidden');
      } else {
        addressBox?.classList.add('hidden');
      }
      updateCartUI();
    });
  });

  // Copiar números de pago
  document.getElementById('copy-yape-btn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(RESTAURANT_CONFIG.yapeNumber);
    alert(`¡Número ${RESTAURANT_CONFIG.yapeNumber} copiado!`);
  });
});
