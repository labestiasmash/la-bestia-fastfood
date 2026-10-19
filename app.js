/**
 * ==========================================================================
 * LA BESTIA SMASH - Fast Food (app.js Móvil Optimizado)
 * Pago Exclusivo con PLIN: 968 495 402
 * ==========================================================================
 */

const RESTAURANT_CONFIG = {
  name: 'LA BESTIA SMASH',
  complement: 'Fast Food',
  phone: '51968495402',
  displayPhone: '968 495 402',
  plinNumber: '968 495 402',
  schedule: 'Lun - Dom: 6:00 PM - 11:30 PM',
  deliveryCost: 5.00,
  pickupAddress: 'Av. Las Palmeras 830, Los Olivos - Lima',
  sheetCsvUrl: localStorage.getItem('la_bestia_sheet_csv') || 'https://docs.google.com/spreadsheets/d/e/2PACX-1vStAjBLrvpS8y2l8QAgzO0I1slg75KEpx23h2hxtb1tkmqZwHKQ9dkR4nfF5gryLeVjxgaiA0rCFBhU/pub?gid=0&single=true&output=csv'
};

function resolveImageUrl(url, category = 'hamburguesas') {
  if (!url || typeof url !== 'string' || url.trim() === '' || url.includes('...')) {
    if (category === 'bebidas') return 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80';
    if (category === 'alitas') return 'https://lh3.googleusercontent.com/d/12JmafB9K4mLf-90s-ZOdaMnopDEhLazB=w1000';
    if (category === 'salchipapas') return 'https://lh3.googleusercontent.com/d/1Tw0yyO9cYRLntnVYnsXh7Ajg_BKwOry3=w1000';
    return 'https://lh3.googleusercontent.com/d/1N7SnkQyEr0WgRr7s12Nte_qiMjMVHFaC=w1000';
  }

  const clean = url.trim();
  const driveFileMatch = clean.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const driveIdMatch = clean.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const driveLh3Match = clean.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
  const fileId = (driveFileMatch && driveFileMatch[1]) || (driveIdMatch && driveIdMatch[1]) || (driveLh3Match && driveLh3Match[1]);

  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}=w1000`;
  }
  if (/^[a-zA-Z0-9_-]{20,}$/.test(clean)) {
    return `https://lh3.googleusercontent.com/d/${clean}=w1000`;
  }
  return clean;
}

function normalizeSheetCsvUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const clean = url.trim();
  const match = clean.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    const gidMatch = clean.match(/[#&?]gid=([0-9]+)/);
    const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';
    return `https://docs.google.com/spreadsheets/d/${match[1]}/gviz/tq?tqx=out:csv${gidParam}&_nocache=${Date.now()}`;
  }
  if (clean.includes('/pub') && clean.includes('output=csv')) {
    const sep = clean.includes('?') ? '&' : '?';
    return `${clean}${sep}_nocache=${Date.now()}`;
  }
  return clean;
}

function cleanPrice(val) {
  if (!val) return 0;
  const str = String(val).replace(/[sS]\/?\.?/g, '').replace(/\$/g, '').replace(/\s+/g, '').replace(',', '.');
  const num = parseFloat(str);
  return isNaN(num) ? 0 : num;
}

let MENU_DATA = [
  {
    id: '1',
    category: 'combos',
    itemType: 'combo',
    title: 'Combo Dúo Bestia',
    description: '2 Hamburguesas Clásicas + 1 Salchipapa Personal + 2 Bebidas',
    price: 20.00,
    image: 'https://lh3.googleusercontent.com/d/1N7SnkQyEr0WgRr7s12Nte_qiMjMVHFaC=w1000',
    badge: 'PROMO',
    disponible: true,
    allowsDrink: true,
    allowsCremas: true,
    allowsExtras: true
  },
  {
    id: '2',
    category: 'hamburguesas',
    itemType: 'hamburguesa',
    title: 'La Bestia Royal',
    description: 'Carne artesanal 150g, huevo, queso, tocino, lechuga, tomate y papas',
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80',
    badge: 'MÁS VENDIDO',
    disponible: true,
    allowsCremas: true,
    allowsExtras: true
  },
  {
    id: '3',
    category: 'alitas',
    itemType: 'alitas',
    title: 'Alitas x12 Piezas',
    description: '12 crocantes alitas bañadas en hasta 2 salsas a elección + papas',
    price: 32.00,
    image: 'https://lh3.googleusercontent.com/d/12JmafB9K4mLf-90s-ZOdaMnopDEhLazB=w1000',
    badge: 'TOP',
    disponible: true,
    allowsWingSauce: true,
    allowsCremas: true,
    allowsExtras: true
  },
  {
    id: '4',
    category: 'salchipapas',
    itemType: 'salchipapa',
    title: 'Salchipapa Bestial',
    description: 'Papas amarillas, salchicha frankfurter, chorizo, queso derretido y tocino',
    price: 24.00,
    image: 'https://lh3.googleusercontent.com/d/1Tw0yyO9cYRLntnVYnsXh7Ajg_BKwOry3=w1000',
    badge: 'NUEVO',
    disponible: true,
    allowsCremas: true,
    allowsExtras: true
  },
  {
    id: '5',
    category: 'bebidas',
    itemType: 'bebida',
    title: 'Chicha Morada 1L',
    description: 'Chicha natural de la casa helada',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    badge: '',
    disponible: true,
    allowsDrink: false,
    allowsCremas: false,
    allowsExtras: false
  }
];

let WING_SAUCES_LIST = ['Acevichada Especial', 'BBQ Ahumada', 'Pasion Maracuya'];
let CREMAS_OPTIONS = ['Mayonesa de la casa', 'Ají Pollero Bestial', 'Tartara criolla'];
let EXTRAS_OPTIONS = [
  { id: 'extra_10', name: 'Extra Queso Cheddar', price: 2.00 },
  { id: 'extra_11', name: 'Huevo frito', price: 1.00 },
  { id: 'extra_12', name: 'Tocino crocante', price: 2.00 },
  { id: 'extra_13', name: 'Papas fritas chicas', price: 2.50 }
];
let COMBO_DRINKS_LIST = ['Inka Cola 500ml', 'Coca Cola 500ml', 'Chicha Morada 500ml'];

let currentCategory = 'all';
let cart = JSON.parse(localStorage.getItem('la_bestia_cart') || '[]');
let activeCustomizingProduct = null;
let customizeState = {
  drink: '',
  wingSauce: '',
  cremas: [],
  extras: [],
  quantity: 1,
  notes: ''
};

function formatPrice(amount) {
  return `S/ ${Number(amount).toFixed(2)}`;
}

function saveCart() {
  localStorage.setItem('la_bestia_cart', JSON.stringify(cart));
  updateCartUI();
}

function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') inQuotes = !inQuotes;
    else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else current += char;
  }
  result.push(current.trim());
  return result;
}

async function loadProductsFromGoogleSheets() {
  const sheetUrl = normalizeSheetCsvUrl(RESTAURANT_CONFIG.sheetCsvUrl);
  if (!sheetUrl) return;

  try {
    const response = await fetch(sheetUrl);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const text = await response.text();

    if (text.includes('<!DOCTYPE') || text.includes('Sorry, the file you have requested')) {
      throw new Error('Configura tu Google Sheet en "Cualquier persona con el enlace: Lector"');
    }

    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) return;

    const headers = parseCsvLine(lines[0]).map(h => h.toLowerCase().trim().replace(/[\s_]/g, ''));
    const parsedProducts = [];
    const parsedExtras = [];
    const parsedWingSauces = [];
    const parsedCremas = [];
    const parsedComboDrinks = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = parseCsvLine(lines[i]);
      if (cols.length === 0 || cols.every(c => c === '')) continue;

      const row = {};
      headers.forEach((h, idx) => {
        row[h] = (cols[idx] || '').trim();
      });

      const id = row['id'] || String(i);
      const rawCategory = (row['categoria'] || row['category'] || '').trim();
      const title = (row['titulo'] || row['title'] || '').trim();
      const description = row['descripcion'] || row['description'] || '';
      const price = cleanPrice(row['precio'] || row['price'] || '0');
      const rawFoto = row['fotourl'] || row['foto'] || row['image'] || row['img'] || '';
      const badge = row['badge'] || '';
      const rawDisp = (row['disponible'] || 'SI').toUpperCase();
      const isDisponible = rawDisp === 'SI' || rawDisp === 'TRUE' || rawDisp === '1' || rawDisp === 'DISPONIBLE' || rawDisp === '';

      if (!title) continue;
      const c = rawCategory.toLowerCase();

      if (c === 'extra' || c === 'extras' || c === 'agregado' || c === 'agregados' || c.startsWith('extra ')) {
        if (isDisponible) parsedExtras.push({ id: 'extra_' + id, name: title, price });
        continue;
      }

      if (c === 'salsa' || c === 'salsas' || (c.includes('alita') && c.includes('salsa'))) {
        if (isDisponible && !parsedWingSauces.includes(title)) parsedWingSauces.push(title);
        continue;
      }

      if (c === 'crema' || c === 'cremas') {
        if (isDisponible && !parsedCremas.includes(title)) parsedCremas.push(title);
        continue;
      }

      if (c === 'bebida combo' || c === 'bebidas combo' || c === 'opcion bebida') {
        if (isDisponible && !parsedComboDrinks.includes(title)) parsedComboDrinks.push(title);
        continue;
      }

      let category = 'hamburguesas';
      if (c.includes('combo')) category = 'combos';
      else if (c.includes('alita') || c.includes('antojo')) category = 'alitas';
      else if (c.includes('salchi')) category = 'salchipapas';
      else if (c.includes('bebida') || c.includes('refresco') || c.includes('chicha')) category = 'bebidas';

      parsedProducts.push({
        id,
        category,
        itemType: category,
        title,
        description,
        price,
        image: resolveImageUrl(rawFoto, category),
        badge,
        disponible: isDisponible,
        allowsDrink: category === 'combos',
        allowsWingSauce: category === 'alitas' || title.toLowerCase().includes('alita'),
        allowsCremas: category === 'hamburguesas' || category === 'salchipapas' || category === 'combos',
        allowsExtras: category !== 'bebidas'
      });
    }

    if (parsedProducts.length > 0) MENU_DATA = parsedProducts;
    if (parsedExtras.length > 0) EXTRAS_OPTIONS = parsedExtras;
    if (parsedWingSauces.length > 0) WING_SAUCES_LIST = parsedWingSauces;
    if (parsedCremas.length > 0) CREMAS_OPTIONS = parsedCremas;
    if (parsedComboDrinks.length > 0) COMBO_DRINKS_LIST = parsedComboDrinks;

    renderProducts();
  } catch (err) {
    console.warn('Aviso: usando catálogo base:', err);
    renderProducts();
  }
}

function renderProducts() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  const filtered = currentCategory === 'all'
    ? MENU_DATA.filter(p => p.disponible)
    : MENU_DATA.filter(p => p.disponible && p.category === currentCategory);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-stone-400">
        <p class="text-sm">No hay productos disponibles en esta categoría.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => `
    <article class="group relative flex flex-col justify-between bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-amber-400 transition-all duration-300 cursor-pointer shadow-xl" onclick="openCustomizeModal('${item.id}')">
      <div class="relative aspect-[4/3] w-full overflow-hidden bg-black">
        <img 
          src="${item.image}" 
          alt="${item.title}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80'"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
        ${item.badge ? `
          <span class="absolute top-3 left-3 z-10 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider bg-amber-400 text-black shadow-lg">
            🔥 ${item.badge}
          </span>
        ` : ''}
        <div class="absolute bottom-3 left-3 z-10">
          <span class="bg-black/95 text-amber-400 font-black text-base px-3.5 py-1 rounded-2xl border border-amber-400/40">
            ${formatPrice(item.price)}
          </span>
        </div>
      </div>
      <div class="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 class="font-extrabold text-lg text-white group-hover:text-amber-400 transition-colors font-brand">
            ${item.title}
          </h3>
          <p class="text-xs sm:text-sm text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            ${item.description}
          </p>
        </div>
        <div class="flex items-center justify-between pt-3 border-t border-zinc-800 mt-auto">
          <span class="text-xs text-zinc-400 uppercase tracking-wider font-bold">
            ${item.category}
          </span>
          <button type="button" class="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-xs uppercase tracking-wider shadow-md transition-all">
            + Pedir
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// Modal de Personalización
window.openCustomizeModal = function(productId) {
  const product = MENU_DATA.find(p => p.id === productId);
  if (!product) return;

  activeCustomizingProduct = product;
  customizeState = {
    drink: COMBO_DRINKS_LIST[0] || '',
    wingSauce: WING_SAUCES_LIST[0] || '',
    cremas: [],
    extras: [],
    quantity: 1,
    notes: ''
  };

  const modal = document.getElementById('customize-modal');
  if (!modal) return;

  document.getElementById('modal-product-title').innerText = product.title;
  document.getElementById('modal-product-desc').innerText = product.description;
  document.getElementById('modal-product-price').innerText = formatPrice(product.price);
  document.getElementById('modal-product-img').src = product.image;

  // Bebidas
  const drinkSection = document.getElementById('modal-drink-section');
  if (product.allowsDrink && COMBO_DRINKS_LIST.length > 0) {
    drinkSection.classList.remove('hidden');
    document.getElementById('modal-drink-options').innerHTML = COMBO_DRINKS_LIST.map((drink, idx) => `
      <label class="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 cursor-pointer text-sm text-white">
        <span>${drink}</span>
        <input type="radio" name="modal-drink" value="${drink}" ${idx === 0 ? 'checked' : ''} onchange="customizeState.drink = this.value" class="w-4 h-4 text-amber-400" />
      </label>
    `).join('');
  } else {
    drinkSection.classList.add('hidden');
  }

  // Salsas alitas
  const wingSection = document.getElementById('modal-wing-section');
  if (product.allowsWingSauce && WING_SAUCES_LIST.length > 0) {
    wingSection.classList.remove('hidden');
    document.getElementById('modal-wing-options').innerHTML = WING_SAUCES_LIST.map((sauce, idx) => `
      <label class="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 cursor-pointer text-sm text-white">
        <span>${sauce}</span>
        <input type="radio" name="modal-wing-sauce" value="${sauce}" ${idx === 0 ? 'checked' : ''} onchange="customizeState.wingSauce = this.value" class="w-4 h-4 text-amber-400" />
      </label>
    `).join('');
  } else {
    wingSection.classList.add('hidden');
  }

  // Cremas (Solo las de tu hoja)
  const cremasSection = document.getElementById('modal-cremas-section');
  if (product.allowsCremas && CREMAS_OPTIONS.length > 0) {
    cremasSection.classList.remove('hidden');
    document.getElementById('modal-cremas-options').innerHTML = CREMAS_OPTIONS.map(crema => `
      <label class="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 cursor-pointer text-sm text-white">
        <span>${crema}</span>
        <input type="checkbox" value="${crema}" onchange="toggleCremaSelection('${crema}', this.checked)" class="w-4 h-4 rounded text-amber-400" />
      </label>
    `).join('');
  } else {
    cremasSection.classList.add('hidden');
  }

  // Extras
  const extrasSection = document.getElementById('modal-extras-section');
  if (product.allowsExtras && EXTRAS_OPTIONS.length > 0) {
    extrasSection.classList.remove('hidden');
    document.getElementById('modal-extras-options').innerHTML = EXTRAS_OPTIONS.map(extra => `
      <label class="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 cursor-pointer text-sm text-white">
        <span>${extra.name}</span>
        <div class="flex items-center gap-2">
          <span class="text-sm text-amber-400 font-bold">+${formatPrice(extra.price)}</span>
          <input type="checkbox" value="${extra.id}" onchange="toggleExtraSelection('${extra.id}', this.checked)" class="w-4 h-4 rounded text-amber-400" />
        </div>
      </label>
    `).join('');
  } else {
    extrasSection.classList.add('hidden');
  }

  document.getElementById('modal-qty').innerText = '1';
  document.getElementById('modal-notes').value = '';
  updateModalTotal();

  modal.classList.remove('hidden');
};

window.toggleCremaSelection = function(crema, isChecked) {
  if (isChecked) {
    if (!customizeState.cremas.includes(crema)) customizeState.cremas.push(crema);
  } else {
    customizeState.cremas = customizeState.cremas.filter(c => c !== crema);
  }
};

window.toggleExtraSelection = function(extraId, isChecked) {
  const extra = EXTRAS_OPTIONS.find(e => e.id === extraId);
  if (!extra) return;
  if (isChecked) {
    customizeState.extras.push(extra);
  } else {
    customizeState.extras = customizeState.extras.filter(e => e.id !== extraId);
  }
  updateModalTotal();
};

window.changeModalQty = function(delta) {
  customizeState.quantity = Math.max(1, customizeState.quantity + delta);
  document.getElementById('modal-qty').innerText = customizeState.quantity;
  updateModalTotal();
};

function updateModalTotal() {
  if (!activeCustomizingProduct) return;
  const extrasTotal = customizeState.extras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = activeCustomizingProduct.price + extrasTotal;
  const total = unitPrice * customizeState.quantity;
  document.getElementById('modal-total-btn-price').innerText = formatPrice(total);
}

window.addCustomizedItemToCart = function() {
  if (!activeCustomizingProduct) return;

  const extrasTotal = customizeState.extras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = activeCustomizingProduct.price + extrasTotal;
  customizeState.notes = document.getElementById('modal-notes').value.trim();

  const cartItemId = `${activeCustomizingProduct.id}_${Date.now()}`;

  cart.push({
    cartItemId,
    productId: activeCustomizingProduct.id,
    title: activeCustomizingProduct.title,
    basePrice: activeCustomizingProduct.price,
    unitPrice: unitPrice,
    quantity: customizeState.quantity,
    image: activeCustomizingProduct.image,
    options: {
      drink: activeCustomizingProduct.allowsDrink ? customizeState.drink : null,
      wingSauce: activeCustomizingProduct.allowsWingSauce ? customizeState.wingSauce : null,
      cremas: [...customizeState.cremas],
      extras: [...customizeState.extras],
      notes: customizeState.notes
    }
  });

  saveCart();
  closeCustomizeModal();
  openCartDrawer();
};

window.closeCustomizeModal = function() {
  const modal = document.getElementById('customize-modal');
  if (modal) modal.classList.add('hidden');
};

// UI del Carrito en Móviles con Letras Grandes
function updateCartUI() {
  const countBadge = document.getElementById('header-cart-count');
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  if (countBadge) countBadge.innerText = totalCount;

  const itemsContainer = document.getElementById('cart-items-container');
  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="py-16 text-center text-zinc-400 space-y-2">
        <i class="fa-solid fa-bag-shopping text-4xl text-zinc-600"></i>
        <p class="text-base font-bold text-white">Tu carrito está vacío</p>
        <p class="text-xs text-zinc-400">Agrega tus smash burgers favoritas</p>
      </div>
    `;
    document.getElementById('cart-subtotal').innerText = 'S/ 0.00';
    document.getElementById('cart-total').innerText = 'S/ 0.00';
    return;
  }

  itemsContainer.innerHTML = cart.map(item => `
    <div class="p-4 rounded-2xl bg-zinc-900 border-2 border-zinc-800 space-y-3">
      <div class="flex items-start justify-between gap-2">
        <span class="font-black text-white text-base sm:text-lg font-brand">${item.title}</span>
        <button onclick="removeCartItem('${item.cartItemId}')" class="text-red-400 hover:text-red-300 p-1">
          <i class="fa-solid fa-trash-can text-base"></i>
        </button>
      </div>
      <div class="text-xs sm:text-sm text-zinc-300 space-y-1">
        ${item.options.wingSauce ? `<div>🍗 <strong>Salsa:</strong> ${item.options.wingSauce}</div>` : ''}
        ${item.options.drink ? `<div>🥤 <strong>Bebida:</strong> ${item.options.drink}</div>` : ''}
        ${item.options.cremas && item.options.cremas.length > 0 ? `<div>🥫 <strong>Cremas:</strong> ${item.options.cremas.join(', ')}</div>` : ''}
        ${item.options.extras && item.options.extras.length > 0 ? `<div>🥓 <strong>Extras:</strong> ${item.options.extras.map(e => e.name).join(', ')}</div>` : ''}
        ${item.options.notes ? `<div class="italic text-amber-300">📝 "${item.options.notes}"</div>` : ''}
      </div>
      <div class="flex items-center justify-between pt-2.5 border-t border-zinc-800">
        <div class="flex items-center gap-3 bg-black px-3 py-1.5 rounded-xl border border-zinc-700">
          <button onclick="updateCartItemQty('${item.cartItemId}', -1)" class="text-zinc-300 font-black text-base px-1">-</button>
          <span class="text-sm font-black text-white px-2">${item.quantity}</span>
          <button onclick="updateCartItemQty('${item.cartItemId}', 1)" class="text-zinc-300 font-black text-base px-1">+</button>
        </div>
        <span class="text-base font-black text-amber-400 font-brand">${formatPrice(item.unitPrice * item.quantity)}</span>
      </div>
    </div>
  `).join('');

  const deliveryRadios = document.getElementsByName('delivery-type');
  const isDelivery = Array.from(deliveryRadios).find(r => r.checked)?.value === 'delivery';
  const deliveryFee = isDelivery ? RESTAURANT_CONFIG.deliveryCost : 0;
  const total = subtotal + deliveryFee;

  document.getElementById('cart-subtotal').innerText = formatPrice(subtotal);
  document.getElementById('delivery-cost').innerText = formatPrice(deliveryFee);
  document.getElementById('cart-total').innerText = formatPrice(total);
}

window.updateCartItemQty = function(cartItemId, delta) {
  cart = cart.map(item => {
    if (item.cartItemId === cartItemId) {
      const q = item.quantity + delta;
      return q > 0 ? { ...item, quantity: q } : null;
    }
    return item;
  }).filter(Boolean);
  saveCart();
};

window.removeCartItem = function(cartItemId) {
  cart = cart.filter(i => i.cartItemId !== cartItemId);
  saveCart();
};

window.openCartDrawer = function() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.remove('hidden');
};

window.closeCartDrawer = function() {
  const drawer = document.getElementById('cart-drawer');
  if (drawer) drawer.classList.add('hidden');
};

window.copyPlinNumber = function() {
  navigator.clipboard.writeText('968495402');
  const copyBtnText = document.getElementById('copy-plin-btn-text');
  if (copyBtnText) {
    copyBtnText.innerText = '¡Copiado!';
    setTimeout(() => { copyBtnText.innerText = 'Copiar'; }, 2500);
  }
};

// Envío a WhatsApp con PLIN y Foto de Drive
window.submitOrderViaWhatsApp = function() {
  if (cart.length === 0) return;

  const isDelivery = document.querySelector('input[name="delivery-type"]:checked').value === 'delivery';
  const nameInput = document.getElementById('customer-name');
  const phoneInput = document.getElementById('customer-phone');
  const addressInput = document.getElementById('customer-address');
  const referenceInput = document.getElementById('customer-reference');
  const generalNotes = document.getElementById('customer-notes').value.trim();

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

  let lines = [
    `🔥 *NUEVO PEDIDO - ${RESTAURANT_CONFIG.name.toUpperCase()} (${RESTAURANT_CONFIG.complement})* 🔥`,
    '----------------------------------------',
    `👤 *Cliente:* ${nameInput.value.trim()}`
  ];

  if (phoneInput.value.trim()) lines.push(`📱 *Teléfono:* ${phoneInput.value.trim()}`);
  lines.push(`🛵 *Tipo de entrega:* ${isDelivery ? 'Delivery a Domicilio' : 'Recojo en Local'}`);

  if (isDelivery) {
    lines.push(`📍 *Dirección:* ${addressInput.value.trim()}`);
    if (referenceInput.value.trim()) lines.push(`🔍 *Referencia:* ${referenceInput.value.trim()}`);
  } else {
    lines.push(`🏪 *Lugar de recojo:* ${RESTAURANT_CONFIG.pickupAddress}`);
  }

  lines.push(`💳 *Método de pago:* PLIN (968 495 402)`);
  lines.push('----------------------------------------');
  lines.push(`📋 *DESGLOSE DEL PEDIDO:*\n`);

  cart.forEach((item, idx) => {
    lines.push(`${idx + 1}. *${item.quantity}x ${item.title}* (${formatPrice(item.unitPrice)} c/u)`);
    if (item.image && typeof item.image === 'string' && item.image.trim()) {
      lines.push(`   🖼️ *Foto:* ${item.image}`);
    }
    if (item.options.wingSauce) lines.push(`   🍗 *Salsa:* ${item.options.wingSauce}`);
    if (item.options.drink) lines.push(`   🥤 *Bebida:* ${item.options.drink}`);
    if (item.options.cremas && item.options.cremas.length > 0) {
      lines.push(`   🥫 *Cremas:* ${item.options.cremas.join(', ')}`);
    }
    if (item.options.extras && item.options.extras.length > 0) {
      lines.push(`   🥓 *Agregados:* ${item.options.extras.map(e => `${e.name} (+${formatPrice(e.price)})`).join(', ')}`);
    }
    if (item.options.notes) lines.push(`   📝 *Nota:* ${item.options.notes}`);
    lines.push(`   👉 *Subtotal:* ${formatPrice(item.unitPrice * item.quantity)}\n`);
  });

  lines.push('----------------------------------------');
  lines.push(`Subtotal productos: ${formatPrice(subtotal)}`);
  if (isDelivery) lines.push(`Costo de envío: ${formatPrice(deliveryFee)}`);
  lines.push(`💰 *TOTAL A PAGAR: ${formatPrice(total)}*`);
  lines.push('----------------------------------------');

  if (generalNotes) {
    lines.push(`\n💬 *Observaciones:* ${generalNotes}`);
  }

  lines.push(`\n📸 _*Adjunto comprobante de PLIN al 968 495 402 a continuación para preparar mi pedido.*_ 🚀`);

  const msg = lines.join('\n');
  const cleanPhone = String(RESTAURANT_CONFIG.phone).replace(/\D/g, '');
  const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
};

document.addEventListener('DOMContentLoaded', () => {
  const categoryBtns = document.querySelectorAll('[data-category]');
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => {
        b.classList.remove('bg-gradient-to-r', 'from-amber-400', 'to-amber-500', 'text-black', 'shadow-lg');
        b.classList.add('bg-zinc-900', 'text-zinc-300', 'border', 'border-zinc-800');
      });
      btn.classList.remove('bg-zinc-900', 'text-zinc-300', 'border', 'border-zinc-800');
      btn.classList.add('bg-gradient-to-r', 'from-amber-400', 'to-amber-500', 'text-black', 'shadow-lg');

      currentCategory = btn.getAttribute('data-category');
      renderProducts();
    });
  });

  const openCartBtn = document.getElementById('open-cart-btn');
  if (openCartBtn) openCartBtn.addEventListener('click', openCartDrawer);

  const closeCartBtn = document.getElementById('close-cart-btn');
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);

  const deliveryRadios = document.getElementsByName('delivery-type');
  deliveryRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const addressBox = document.getElementById('delivery-address-fields');
      if (addressBox) {
        if (radio.value === 'delivery') addressBox.classList.remove('hidden');
        else addressBox.classList.add('hidden');
      }
      updateCartUI();
    });
  });

  loadProductsFromGoogleSheets();
  updateCartUI();
});
