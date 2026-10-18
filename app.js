/**
 * ==========================================================================
 * LA BESTIA FAST FOOD - Lógica Frontend Vanilla JavaScript
 * ==========================================================================
 * Desarrollado para GitHub Pages (100% estático, con soporte para Google Sheets y Drive)
 */

// 1. Configuración del Local / Restaurante
const RESTAURANT_CONFIG = {
  name: 'La Bestia Fast Food',
  // Número oficial para WhatsApp (solo dígitos con código de país 51 de Perú, SIN ESPACIOS)
  phone: '51968495402',
  displayPhone: '968 495 402',
  schedule: 'Lun - Dom: 6:00 PM - 11:30 PM',
  deliveryCost: 5.00,
  pickupAddress: 'Av. Las Palmeras 830, Los Olivos - Lima',
  yapeNumber: '968 495 402',
  plinNumber: '968 495 402',
  bcpAccount: '194-98765432-0-88',
  
  /**
   * 📊 ENLACE DE TU GOOGLE SHEET PUBLICADO EN CSV:
   * Para conectar tu hoja de cálculo:
   * 1. En Google Sheets ve a: Archivo > Compartir > Publicar en la web.
   * 2. Elige "Hoja 1" y formato "Valores separados por comas (.csv)".
   * 3. Pega aquí el enlace resultante (o déjalo vacío para usar el menú local).
   */
  sheetCsvUrl: localStorage.getItem('la_bestia_sheet_csv') || 'https://docs.google.com/spreadsheets/d/e/2PACX-1vStAjBLrvpS8y2I8QAgzOOl1slg75KEpx23h2hxtb1tkmqZwHKQ9dkR4nfF5gryLeVjxgaiA0rCFBhU/pub?gid=0&single=true&output=csv'
};

// 2. Función Inteligente para Convertir Enlaces de Google Drive a Imágenes Directas
function resolveImageUrl(url, category = 'hamburguesas') {
  if (!url || typeof url !== 'string' || url.trim() === '' || url.includes('...') || !url.startsWith('http')) {
    if (category === 'bebidas') return 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80';
    if (category === 'alitas') return 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=700&q=80';
    if (category === 'salchipapas') return 'https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=700&q=80';
    return 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80';
  }

  const clean = url.trim();

  // Detectar enlaces de Google Drive en cualquier formato:
  const driveFileMatch = clean.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const driveIdMatch = clean.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const driveLh3Match = clean.match(/googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/);
  const fileId = (driveFileMatch && driveFileMatch[1]) || (driveIdMatch && driveIdMatch[1]) || (driveLh3Match && driveLh3Match[1]);

  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}=w1000`;
  }

  return clean;
}

// Conversor de enlaces para Google Sheets (acepta tanto 'Publicar en la web' como el enlace directo 'Compartir')
function normalizeSheetCsvUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const clean = url.trim();
  if (clean.includes('/pub') && clean.includes('output=csv')) {
    return clean;
  }
  const match = clean.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://docs.google.com/spreadsheets/d/${match[1]}/gviz/tq?tqx=out:csv`;
  }
  return clean;
}

// 3. Catálogo inicial (con fotos reales sincronizadas de Google Drive)
let MENU_DATA = [
  // 🔥 COMBOS BESTIALES
  {
    id: '1',
    category: 'combos',
    itemType: 'combo',
    title: 'Combo Dúo Bestia',
    description: '2 Hamburguesas Clásicas + 1 Salchipapa Personal + 2 Bebidas',
    price: 35.90,
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
    price: 10.00,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=700&q=80',
    badge: '',
    disponible: true,
    allowsDrink: false,
    allowsCremas: false,
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

// 4. Estado Global de la App
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

function formatPrice(amount) {
  return `S/ ${Number(amount).toFixed(2)}`;
}

function saveCart() {
  localStorage.setItem('la_bestia_cart', JSON.stringify(cart));
  updateCartUI();
}

// 5. Carga Dinámica desde Google Sheets
async function loadProductsFromGoogleSheets() {
  const sheetUrl = normalizeSheetCsvUrl(RESTAURANT_CONFIG.sheetCsvUrl);
  if (!sheetUrl) return;

  try {
    const response = await fetch(sheetUrl);
    if (!response.ok) throw new Error('No se pudo acceder al Google Sheet');
    const text = await response.text();

    if (text.includes('<!DOCTYPE') || text.includes('Sorry, the file you have requested')) {
      throw new Error('Google devolvió error 404: La hoja aún no está publicada o requiere permiso de lectura público.');
    }

    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) return;

    // Detectar encabezados
    const headers = parseCsvLine(lines[0]).map(h => h.toLowerCase().trim().replace(/[\s_]/g, ''));
    const parsed = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = parseCsvLine(lines[i]);
      const row = {};
      headers.forEach((h, idx) => {
        row[h] = (cols[idx] || '').trim();
      });

      // Extraer campos según la hoja:
      // ID | Categoria | Titulo | Descripcion | Precio | Foto_URL | Badge | Disponible
      const id = row['id'] || String(i);
      const rawCategory = row['categoria'] || row['category'] || '';
      const title = row['titulo'] || row['title'] || '';
      const description = row['descripcion'] || row['description'] || '';
      const price = parseFloat(row['precio'] || row['price'] || '0') || 0;
      const rawFoto = row['fotourl'] || row['foto'] || row['image'] || row['img'] || '';
      const badge = row['badge'] || '';
      const rawDisp = (row['disponible'] || 'SI').toUpperCase();
      const isDisponible = rawDisp === 'SI' || rawDisp === 'TRUE' || rawDisp === '1' || rawDisp === 'DISPONIBLE';

      if (!title) continue;

      // Normalizar categoría
      let category = 'hamburguesas';
      const c = rawCategory.toLowerCase();
      if (c.includes('combo')) category = 'combos';
      else if (c.includes('alita') || c.includes('antojo')) category = 'alitas';
      else if (c.includes('salchi')) category = 'salchipapas';
      else if (c.includes('bebida') || c.includes('salsa')) category = 'bebidas';
      else if (c.includes('hamburguesa') || c.includes('burger')) category = 'hamburguesas';

      parsed.push({
        id,
        category,
        itemType: category === 'alitas' ? 'alitas' : category === 'combos' ? 'combo' : category === 'salchipapas' ? 'salchipapa' : category === 'bebidas' ? 'bebida' : 'hamburguesa',
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

    if (parsed.length > 0) {
      MENU_DATA = parsed;
      console.log(`✅ Menú sincronizado desde Google Sheets (${parsed.length} productos).`);
      renderProducts();
    }
  } catch (err) {
    console.warn('Aviso: Usando catálogo por defecto (No se pudo conectar a Google Sheets):', err);
  }
}

// Parser simple para líneas CSV respetando comillas
function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// 6. Renderizar Catálogo de Productos
function renderProducts() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  const filtered = MENU_DATA.filter(item => item.category === currentCategory && item.disponible);
  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-stone-400 bg-stone-900/40 rounded-2xl border border-stone-800 p-6">
        <i class="fa-solid fa-utensils text-3xl text-stone-600 mb-2"></i>
        <p class="font-bold text-white text-sm">No hay productos disponibles en esta categoría</p>
      </div>
    `;
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement('article');
    card.className = 'group relative flex flex-col justify-between bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 hover:border-yellow-400/40 transition-all cursor-pointer shadow-md';
    card.onclick = () => openCustomizeModal(product.id);

    const badgeHtml = product.badge
      ? `<span class="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wide shadow-lg ${
          product.badge.toLowerCase().includes('más vendido') || product.badge.toLowerCase().includes('top')
            ? 'bg-yellow-400 text-stone-950 shadow-yellow-500/20'
            : 'bg-red-600 text-white shadow-red-600/30'
        }"><i class="fa-solid fa-fire text-[10px]"></i> ${product.badge}</span>`
      : '';

    card.innerHTML = `
      <div class="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
        <img 
          src="${resolveImageUrl(product.image)}" 
          alt="${product.title}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          loading="lazy" 
          onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80';"
        />
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
          <div class="text-[11px] text-stone-500">
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

// 7. Configurar Botones de Categorías
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

// 8. Modal de Personalización
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

  document.getElementById('modal-product-img').src = resolveImageUrl(product.image);
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

// 9. Carrito Flotante y Drawer
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
          <img 
            src="${resolveImageUrl(item.image)}" 
            alt="${item.title}" 
            class="w-12 h-12 rounded-lg object-cover border border-stone-800 shrink-0" 
            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80';"
          />
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

// 10. Envío por WhatsApp (CORREGIDO PARA EVITAR ERROR 404)
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

  const fire = '\u{1F525}';
  const user = '\u{1F464}';
  const phone = '\u{1F4F1}';
  const moto = '\u{1F6F5}';
  const pin = '\u{1F4CD}';
  const search = '\u{1F50D}';
  const store = '\u{1F3EA}';
  const cardIcon = '\u{1F4B3}';
  const clip = '\u{1F4CB}';
  const link = '\u{1F517}';
  const wing = '\u{1F357}';
  const cup = '\u{1F964}';
  const sauce = '\u{1F96B}';
  const bacon = '\u{1F953}';
  const note = '\u{1F4DD}';
  const arrow = '\u{1F449}';
  const money = '\u{1F4B0}';
  const chat = '\u{1F4AC}';
  const cam = '\u{1F4F8}';
  const rocket = '\u{1F680}';
  const globe = '\u{1F310}';

  const sep = '----------------------------------------';

  let lines = [
    `${fire} *NUEVO PEDIDO - ${RESTAURANT_CONFIG.name.toUpperCase()}* ${fire}`,
    sep,
    `${globe} *Menú Web:* https://labestiasmash.github.io/la-bestia-fastfood/`,
    sep,
    `${user} *Cliente:* ${nameInput.value.trim()}`
  ];

  if (phoneInput.value.trim()) {
    lines.push(`${phone} *Teléfono:* ${phoneInput.value.trim()}`);
  }

  lines.push(`${moto} *Tipo de entrega:* ${isDelivery ? 'Delivery a Domicilio' : 'Recojo en Local'}`);

  if (isDelivery) {
    lines.push(`${pin} *Dirección:* ${addressInput.value.trim()}`);
    if (referenceInput.value.trim()) {
      lines.push(`${search} *Referencia:* ${referenceInput.value.trim()}`);
    }
  } else {
    lines.push(`${store} *Lugar de recojo:* ${RESTAURANT_CONFIG.pickupAddress}`);
  }

  const paymentLabels = { yape: 'Yape', plin: 'Plin', bcp: 'Transferencia BCP' };
  lines.push(`${cardIcon} *Método de pago:* ${paymentLabels[paymentMethod] || paymentMethod}`);
  lines.push(sep);
  lines.push(`${clip} *DESGLOSE DEL PEDIDO:*`);
  lines.push('');

  cart.forEach((item, idx) => {
    lines.push(`${idx + 1}. *${item.quantity}x ${item.title}* (${formatPrice(item.unitPrice)} c/u)`);
    if (item.image && typeof item.image === 'string' && item.image.startsWith('http')) {
      lines.push(`   ${link} *Foto:* ${item.image}`);
    }
    if (item.options.wingSauce) lines.push(`   ${wing} *Sabor Alitas:* ${item.options.wingSauce}`);
    if (item.options.drink) lines.push(`   ${cup} *Bebida:* ${item.options.drink}`);
    if (item.options.cremas?.length) lines.push(`   ${sauce} *Cremas:* ${item.options.cremas.join(', ')}`);
    if (item.options.extras?.length) {
      lines.push(`   ${bacon} *Agregados:* ${item.options.extras.map(e => `${e.name} (+${formatPrice(e.price)})`).join(', ')}`);
    }
    if (item.options.notes) lines.push(`   ${note} *Nota:* ${item.options.notes}`);
    lines.push(`   ${arrow} *Subtotal:* ${formatPrice(item.unitPrice * item.quantity)}`);
    lines.push('');
  });

  lines.push(sep);
  lines.push(`Subtotal productos: ${formatPrice(subtotal)}`);
  if (isDelivery) lines.push(`Costo de envío: ${formatPrice(deliveryFee)}`);
  lines.push(`${money} *TOTAL A PAGAR: ${formatPrice(total)}*`);
  lines.push(sep);

  if (generalNotes) {
    lines.push('');
    lines.push(`${chat} *Observaciones:*`);
    lines.push(generalNotes);
  }

  lines.push('');
  if (paymentMethod === 'yape' || paymentMethod === 'plin') {
    lines.push(`${cam} _*IMPORTANTE:* Adjunto la captura del comprobante de ${paymentMethod.toUpperCase()} a continuación antes de preparar mi pedido._ ${rocket}`);
  } else if (paymentMethod === 'bcp') {
    lines.push(`${cam} _*IMPORTANTE:* Adjunto la constancia de transferencia BCP a continuación antes de preparar mi pedido._ ${rocket}`);
  } else {
    lines.push(`¡Muchas gracias! Quedo a la espera de la confirmación de mi orden.`);
  }

  const msg = lines.join('\n');
  const cleanPhone = String(RESTAURANT_CONFIG.phone).replace(/\D/g, '');
  const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

// 11. Modal para Administrar Enlace de Google Sheets en Vivo
function setupGoogleSheetsManager() {
  const syncBtn = document.getElementById('open-sheets-config-btn');
  if (!syncBtn) return;

  syncBtn.addEventListener('click', () => {
    const currentUrl = RESTAURANT_CONFIG.sheetCsvUrl || '';
    const newUrl = prompt(
      '📊 Conexión con Google Sheets:\n\nPega aquí el enlace de tu Google Sheet publicado como CSV:\n(Archivo > Compartir > Publicar en la web > Formato CSV)',
      currentUrl
    );

    if (newUrl !== null) {
      const cleanUrl = newUrl.trim();
      RESTAURANT_CONFIG.sheetCsvUrl = cleanUrl;
      localStorage.setItem('la_bestia_sheet_csv', cleanUrl);

      if (cleanUrl) {
        alert('🔄 Sincronizando productos desde tu Google Sheet...');
        loadProductsFromGoogleSheets();
      } else {
        alert('Se restableció el menú por defecto.');
        location.reload();
      }
    }
  });
}

// 12. Inicialización general
document.addEventListener('DOMContentLoaded', () => {
  setupCategories();
  renderProducts();
  setupCustomizeHandlers();
  updateCartUI();
  setupGoogleSheetsManager();

  // Cargar Google Sheets si hay URL configurada
  if (RESTAURANT_CONFIG.sheetCsvUrl) {
    loadProductsFromGoogleSheets();
  }

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
    alert(`¡Número ${RESTAURANT_CONFIG.yapeNumber} copiado para Yape / Plin!`);
  });
});
