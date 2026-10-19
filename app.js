/**
 * ==========================================================================
 * LA BESTIA SMASH - Fast Food (app.js Corregido y Optimizado)
 * ==========================================================================
 * - Sincronización en vivo con Google Sheets (GVIZ instantáneo sin retraso)
 * - Corrección de decimales y precios en soles (interpreta 2,5 a 2.50 y S/ 20)
 * - Enlace directo de fotos de Google Drive
 * - Adjunta la foto en el pedido de WhatsApp para evitar confusiones
 * - Solo las 3 cremas exactas de tu hoja (sin salsas inventadas)
 */

// 1. Configuración del Local
const RESTAURANT_CONFIG = {
  name: 'LA BESTIA SMASH',
  complement: 'Fast Food',
  phone: '51968495402',
  displayPhone: '968 495 402',
  schedule: 'Lun - Dom: 6:00 PM - 11:30 PM',
  deliveryCost: 5.00,
  pickupAddress: 'Av. Las Palmeras 830, Los Olivos - Lima',
  yapeNumber: '968 495 402',
  plinNumber: '968 495 402',
  bcpAccount: '194-98765432-0-88',
  sheetCsvUrl: localStorage.getItem('la_bestia_sheet_csv') || 'https://docs.google.com/spreadsheets/d/e/2PACX-1vStAjBLrvpS8y2I8QAgzOOl1slg75KEpx23h2hxtb1tkmqZwHKQ9dkR4nfF5gryLeVjxgaiA0rCFBhU/pub?gid=0&single=true&output=csv'
};

// 2. Conversor inteligente de fotos de Google Drive
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

// 3. Normalizador de Google Sheets con anti-caché en vivo
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

// 4. Limpiador de precios robusto (acepta 2.50, 2,50, S/ 20)
function cleanPrice(val) {
  if (!val) return 0;
  const str = String(val).replace(/[sS]\/?\.?/g, '').replace(/\$/g, '').replace(/\s+/g, '').replace(',', '.');
  const num = parseFloat(str);
  return isNaN(num) ? 0 : num;
}

// 5. Catálogo Base con los precios reales de tu Google Sheet
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

// Opciones estrictas de tu Sheet (Row 14-22)
let WING_SAUCES_LIST = ['Acevichada Especial', 'BBQ Ahumada', 'Pasion Maracuya'];
let CREMAS_OPTIONS = ['Mayonesa de la casa', 'Ají Pollero Bestial', 'Tartara criolla'];
let EXTRAS_OPTIONS = [
  { id: 'extra_10', name: 'Extra Queso Cheddar', price: 2.00 },
  { id: 'extra_11', name: 'Huevo frito', price: 1.00 },
  { id: 'extra_12', name: 'Tocino crocante', price: 2.00 },
  { id: 'extra_13', name: 'Papas fritas chicas', price: 2.50 }
];
let COMBO_DRINKS_LIST = ['Inka Cola 500ml', 'Coca Cola 500ml', 'Chicha Morada 500ml'];

// 6. Estado Global
let currentCategory = 'combos';
let cart = JSON.parse(localStorage.getItem('la_bestia_cart') || '[]');
let activeCustomizingProduct = null;
let customizeState = {
  drink: COMBO_DRINKS_LIST[0],
  wingSauce: WING_SAUCES_LIST[0],
  cremas: [], // Inicia vacío: solo se agregan las cremas que el cliente marque
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

// 7. Carga Dinámica desde Google Sheets
async function loadProductsFromGoogleSheets() {
  const sheetUrl = normalizeSheetCsvUrl(RESTAURANT_CONFIG.sheetCsvUrl);
  if (!sheetUrl) return;

  try {
    const response = await fetch(sheetUrl);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const text = await response.text();

    if (text.includes('<!DOCTYPE') || text.includes('Sorry, the file you have requested')) {
      throw new Error('Google Sheets requiere permiso público: Compartir > Cualquier persona con el enlace: Lector');
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

      // Extras / Agregados
      if (c === 'extra' || c === 'extras' || c === 'agregado' || c === 'agregados' || c === 'adicional' || c.startsWith('extra ')) {
        if (isDisponible) parsedExtras.push({ id: 'extra_' + id, name: title, price });
        continue;
      }

      // Salsas de Alitas
      if (c === 'salsa' || c === 'salsas' || c.includes('alita') && (c.includes('salsa') || c.includes('sabor'))) {
        if (isDisponible && !parsedWingSauces.includes(title)) parsedWingSauces.push(title);
        continue;
      }

      // Cremas
      if (c === 'crema' || c === 'cremas') {
        if (isDisponible && !parsedCremas.includes(title)) parsedCremas.push(title);
        continue;
      }

      // Bebidas Combo
      if (c === 'bebida combo' || c === 'bebidas combo' || c === 'opcion bebida' || c === 'gaseosa combo') {
        if (isDisponible && !parsedComboDrinks.includes(title)) parsedComboDrinks.push(title);
        continue;
      }

      // Platillos principales
      let category = 'hamburguesas';
      if (c.includes('combo')) category = 'combos';
      else if (c.includes('alita') || c.includes('antojo')) category = 'alitas';
      else if (c.includes('salchi')) category = 'salchipapas';
      else if (c.includes('bebida') || c.includes('refresco') || c.includes('chicha')) category = 'bebidas';

      parsedProducts.push({
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

    if (parsedProducts.length > 0) MENU_DATA = parsedProducts;
    if (parsedExtras.length > 0) EXTRAS_OPTIONS = parsedExtras;
    if (parsedWingSauces.length > 0) WING_SAUCES_LIST = parsedWingSauces;
    if (parsedCremas.length > 0) CREMAS_OPTIONS = parsedCremas;
    if (parsedComboDrinks.length > 0) COMBO_DRINKS_LIST = parsedComboDrinks;

    renderProducts();
    console.log('✅ Catálogo sincronizado en tiempo real desde Google Sheets.');
  } catch (err) {
    console.warn('Aviso: usando catálogo base:', err);
  }
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

// 8. Renderizado del Menú
function renderProducts() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  const filtered = MENU_DATA.filter(item => item.category === currentCategory && item.disponible);
  container.innerHTML = '';

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-stone-400 bg-stone-900/40 rounded-2xl border border-stone-800 p-6">
        <i class="fa-solid fa-utensils text-3xl text-stone-600 mb-2"></i>
        <p class="font-bold text-white text-sm">No hay productos en esta categoría</p>
      </div>
    `;
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement('article');
    card.className = 'group relative flex flex-col justify-between bg-stone-900/90 rounded-2xl overflow-hidden border border-stone-800 hover:border-amber-400/50 transition-all cursor-pointer shadow-lg hover:shadow-amber-500/10';
    card.onclick = () => openCustomizeModal(product.id);

    const isTop = product.badge && (product.badge.toLowerCase().includes('top') || product.badge.toLowerCase().includes('más vendido') || product.badge.toLowerCase().includes('promo'));
    const badgeHtml = product.badge
      ? `<span class="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-lg ${
          isTop ? 'bg-amber-400 text-stone-950 shadow-amber-500/30 font-black' : 'bg-red-600 text-white shadow-red-600/30'
        }"><i class="fa-solid fa-fire text-[10px]"></i> ${product.badge}</span>`
      : '';

    card.innerHTML = `
      <div class="relative aspect-[4/3] w-full overflow-hidden bg-stone-950">
        <img 
          src="${resolveImageUrl(product.image)}" 
          alt="${product.title}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          loading="lazy" 
          onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80';"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent pointer-events-none"></div>
        ${badgeHtml}
        <div class="absolute bottom-2.5 left-2.5 z-10">
          <span class="inline-block bg-stone-950/95 text-amber-400 font-black text-sm sm:text-base px-2.5 py-1 rounded-xl border border-amber-400/30 tabular-nums shadow">
            ${formatPrice(product.price)}
          </span>
        </div>
      </div>
      <div class="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3 class="font-bold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors leading-snug font-brand">
            ${product.title}
          </h3>
          <p class="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
            ${product.description}
          </p>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-stone-800/80 mt-auto">
          <div class="text-[11px] text-stone-500">
            ${product.allowsWingSauce ? '🍗 Salsa · ' : ''}${product.allowsDrink ? '🥤 Bebida · ' : ''}${product.allowsCremas ? '🥫 Cremas · ' : ''}${product.allowsExtras ? '🥓 Extras' : ''}
          </div>
          <button type="button" class="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black text-xs shadow-md transition-all active:scale-95">
            <i class="fa-solid fa-plus text-xs"></i>
            <span>Pedir</span>
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// 9. Categorías
function setupCategories() {
  const buttons = document.querySelectorAll('[data-category]');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentCategory = btn.getAttribute('data-category');
      buttons.forEach(b => {
        const isCurrent = b === btn;
        b.className = isCurrent
          ? 'flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap shrink-0 transition-all bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-lg shadow-amber-500/20'
          : 'flex items-center gap-2 px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm whitespace-nowrap shrink-0 transition-all bg-stone-900 text-stone-300 hover:text-white border border-stone-800';
      });
      renderProducts();
    });
  });
}

// 10. Modal de Personalización
function openCustomizeModal(productId) {
  const product = MENU_DATA.find(p => p.id === productId);
  if (!product) return;
  activeCustomizingProduct = product;

  // Inicia sin cremas marcadas (para agregar solo lo que el cliente pida)
  customizeState = {
    drink: COMBO_DRINKS_LIST[0],
    wingSauce: WING_SAUCES_LIST[0],
    cremas: [],
    extras: [],
    quantity: 1,
    notes: ''
  };

  document.getElementById('modal-product-img').src = resolveImageUrl(product.image);
  document.getElementById('modal-product-title').innerText = product.title;
  document.getElementById('modal-product-baseprice').innerText = `${formatPrice(product.price)} base`;

  const wingSec = document.getElementById('customize-wings-section');
  if (product.allowsWingSauce && WING_SAUCES_LIST.length > 0) {
    wingSec.classList.remove('hidden');
    renderWingSauceOptions();
  } else {
    wingSec.classList.add('hidden');
  }

  const drinkSec = document.getElementById('customize-drink-section');
  if (product.allowsDrink && COMBO_DRINKS_LIST.length > 0) {
    drinkSec.classList.remove('hidden');
    renderDrinkOptions();
  } else {
    drinkSec.classList.add('hidden');
  }

  const cremasSec = document.getElementById('customize-cremas-section');
  if (product.allowsCremas && CREMAS_OPTIONS.length > 0) {
    cremasSec.classList.remove('hidden');
    renderCremasOptions();
  } else {
    cremasSec.classList.add('hidden');
  }

  const extraSec = document.getElementById('customize-extras-section');
  if (product.allowsExtras && EXTRAS_OPTIONS.length > 0) {
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
      isSelected ? 'bg-amber-500/15 border-amber-400 text-white font-bold' : 'bg-stone-950/70 border-stone-800 text-stone-300'
    }`;
    btn.innerHTML = `
      <span class="text-xs truncate">${sauce}</span>
      <div class="w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
        isSelected ? 'border-amber-400 bg-amber-400 text-stone-950' : 'border-stone-600'
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
      isSelected ? 'bg-amber-500/15 border-amber-400 text-white font-semibold' : 'bg-stone-950/70 border-stone-800 text-stone-300'
    }`;
    btn.innerHTML = `
      <span class="text-xs sm:text-sm truncate">${drink}</span>
      <div class="w-4 h-4 rounded-full border flex items-center justify-center ${
        isSelected ? 'border-amber-400 bg-amber-400 text-stone-950' : 'border-stone-600'
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
    btn.className = `flex items-center gap-2 p-2.5 rounded-xl border text-left transition-all ${
      isChecked ? 'bg-stone-800 border-amber-500/70 text-white font-medium' : 'bg-stone-950/60 border-stone-800 text-stone-400'
    }`;
    btn.innerHTML = `
      <div class="w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
        isChecked ? 'bg-amber-400 border-amber-400 text-stone-950' : 'border-stone-600'
      }">
        ${isChecked ? '<i class="fa-solid fa-check text-[9px] font-bold"></i>' : ''}
      </div>
      <span class="text-xs truncate">${crema}</span>
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
      isChecked ? 'bg-amber-500/15 border-amber-400 text-white font-bold' : 'bg-stone-950/60 border-stone-800 text-stone-300'
    }`;
    btn.innerHTML = `
      <div class="flex items-center gap-2.5">
        <div class="w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
          isChecked ? 'bg-amber-400 border-amber-400 text-stone-950' : 'border-stone-600'
        }">
          ${isChecked ? '<i class="fa-solid fa-check text-[9px] font-bold"></i>' : ''}
        </div>
        <span class="text-xs sm:text-sm font-medium">${extra.name}</span>
      </div>
      <span class="text-xs font-bold text-amber-400 tabular-nums">+${formatPrice(extra.price)}</span>
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

// 11. Carrito Flotante y Drawer
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const isDelivery = document.querySelector('input[name="delivery-type"]:checked')?.value === 'delivery';
  const deliveryFee = isDelivery ? RESTAURANT_CONFIG.deliveryCost : 0;
  const total = subtotal + deliveryFee;

  // Actualiza contador en header
  const headerCount = document.getElementById('header-cart-count');
  if (headerCount) headerCount.innerText = totalItems;

  // Barra flotante inferior
  const floatingBar = document.getElementById('floating-cart-bar');
  if (totalItems > 0) {
    floatingBar.classList.remove('hidden');
    document.getElementById('floating-items-count').innerText = `${totalItems} ${totalItems === 1 ? 'ítem' : 'ítems'}`;
    document.getElementById('floating-total-price').innerText = formatPrice(total);
  } else {
    floatingBar.classList.add('hidden');
  }

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
    if (item.options.wingSauce) optionsHtml += `<p class="text-amber-300">🍗 Salsa: ${item.options.wingSauce}</p>`;
    if (item.options.drink) optionsHtml += `<p>🥤 Bebida: ${item.options.drink}</p>`;
    if (item.options.cremas?.length) optionsHtml += `<p>🥫 Cremas: ${item.options.cremas.join(', ')}</p>`;
    if (item.options.extras?.length) {
      optionsHtml += `<p class="text-amber-200">🥓 Extras: ${item.options.extras.map(e => `${e.name} (+${formatPrice(e.price)})`).join(', ')}</p>`;
    }
    if (item.options.notes) optionsHtml += `<p class="italic text-stone-500">📝 "${item.options.notes}"</p>`;

    itemCard.innerHTML = `
      <div class="flex items-start justify-between gap-3">
        <div class="flex gap-2.5">
          <img 
            src="${resolveImageUrl(item.image)}" 
            alt="${item.title}" 
            class="w-12 h-12 rounded-lg object-cover border border-stone-800 shrink-0" 
            onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80';"
          />
          <div>
            <h4 class="font-bold text-sm text-white font-brand">${item.title}</h4>
            <span class="text-xs text-amber-400 font-bold">${formatPrice(item.unitPrice)} c/u</span>
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

// 12. Envío por WhatsApp con Foto de Drive de cada Producto
function submitOrderViaWhatsApp() {
  if (cart.length === 0) return;

  const isDelivery = document.querySelector('input[name="delivery-type"]:checked').value === 'delivery';
  const nameInput = document.getElementById('customer-name');
  const phoneInput = document.getElementById('customer-phone');
  const addressInput = document.getElementById('customer-address');
  const referenceInput = document.getElementById('customer-reference');
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
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

  const sep = '----------------------------------------';

  let lines = [
    `🔥 *NUEVO PEDIDO - ${RESTAURANT_CONFIG.name} (${RESTAURANT_CONFIG.complement})* 🔥`,
    sep,
    `👤 *Cliente:* ${nameInput.value.trim()}`
  ];

  if (phoneInput.value.trim()) {
    lines.push(`📱 *Teléfono:* ${phoneInput.value.trim()}`);
  }

  lines.push(`🛵 *Tipo de entrega:* ${isDelivery ? 'Delivery a Domicilio' : 'Recojo en Local'}`);

  if (isDelivery) {
    lines.push(`📍 *Dirección:* ${addressInput.value.trim()}`);
    if (referenceInput.value.trim()) {
      lines.push(`🔍 *Referencia:* ${referenceInput.value.trim()}`);
    }
  } else {
    lines.push(`🏪 *Lugar de recojo:* ${RESTAURANT_CONFIG.pickupAddress}`);
  }

  const paymentLabels = { yape: 'Yape', plin: 'Plin', bcp: 'Transferencia BCP' };
  lines.push(`💳 *Método de pago:* ${paymentLabels[paymentMethod] || paymentMethod}`);
  lines.push(sep);
  lines.push(`📋 *DESGLOSE DEL PEDIDO:*`);
  lines.push('');

  cart.forEach((item, idx) => {
    lines.push(`${idx + 1}. *${item.quantity}x ${item.title}* (${formatPrice(item.unitPrice)} c/u)`);
    // Enlace de foto directo de Drive
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
    lines.push(`   👉 *Subtotal:* ${formatPrice(item.unitPrice * item.quantity)}`);
    lines.push('');
  });

  lines.push(sep);
  lines.push(`Subtotal productos: ${formatPrice(subtotal)}`);
  if (isDelivery) lines.push(`Costo de envío: ${formatPrice(deliveryFee)}`);
  lines.push(`💰 *TOTAL A PAGAR: ${formatPrice(total)}*`);
  lines.push(sep);

  if (generalNotes) {
    lines.push('');
    lines.push(`💬 *Observaciones:* ${generalNotes}`);
  }

  lines.push('');
  lines.push(`📸 _*IMPORTANTE:* Adjunto la captura del comprobante antes de preparar mi pedido._ 🚀`);

  const msg = lines.join('\n');
  const cleanPhone = String(RESTAURANT_CONFIG.phone).replace(/\D/g, '');
  const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

// 13. Sincronizador de Google Sheets (Acceso oculto para el dueño)
function setupGoogleSheetsManager() {
  const syncBtn = document.getElementById('open-sheets-config-btn');
  if (!syncBtn) return;

  syncBtn.addEventListener('click', () => {
    const currentUrl = RESTAURANT_CONFIG.sheetCsvUrl || '';
    const newUrl = prompt(
      '📊 Conexión con Google Sheets:\n\nPega aquí el enlace de tu Google Sheet:\n(Compartir > Cualquier persona con el enlace: Lector)',
      currentUrl
    );

    if (newUrl !== null) {
      const cleanUrl = newUrl.trim();
      RESTAURANT_CONFIG.sheetCsvUrl = cleanUrl;
      localStorage.setItem('la_bestia_sheet_csv', cleanUrl);

      if (cleanUrl) {
        alert('🔄 Sincronizando productos desde tu Google Sheet...');
        loadProductsFromGoogleSheets();
      }
    }
  });
}

// 14. Inicialización
document.addEventListener('DOMContentLoaded', () => {
  setupCategories();
  renderProducts();
  setupCustomizeHandlers();
  updateCartUI();
  setupGoogleSheetsManager();

  if (RESTAURANT_CONFIG.sheetCsvUrl) {
    loadProductsFromGoogleSheets();
  }

  document.getElementById('floating-cart-bar')?.addEventListener('click', openCartDrawer);
  document.getElementById('open-cart-btn')?.addEventListener('click', openCartDrawer);
  document.getElementById('close-drawer-btn')?.addEventListener('click', closeCartDrawer);
  document.getElementById('close-modal-btn')?.addEventListener('click', closeCustomizeModal);
  document.getElementById('drawer-backdrop')?.addEventListener('click', closeCartDrawer);
  document.getElementById('modal-backdrop')?.addEventListener('click', closeCustomizeModal);
  document.getElementById('submit-order-whatsapp-btn')?.addEventListener('click', submitOrderViaWhatsApp);

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

  document.getElementById('copy-yape-btn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(RESTAURANT_CONFIG.yapeNumber);
    alert(`¡Número ${RESTAURANT_CONFIG.yapeNumber} copiado para Yape / Plin!`);
  });
});
