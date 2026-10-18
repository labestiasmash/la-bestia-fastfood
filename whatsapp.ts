import { CartItem, CustomerOrderData } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

export function formatPrice(amount: number): string {
  return `S/ ${amount.toFixed(2)}`;
}

export function generateWhatsAppMessage(
  items: CartItem[],
  customer: CustomerOrderData,
  deliveryCost: number
): string {
  const isDelivery = customer.deliveryType === 'delivery';
  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const total = isDelivery ? subtotal + deliveryCost : subtotal;

  let message = `🔥 *NUEVO PEDIDO - ${RESTAURANT_INFO.name.toUpperCase()}* 🔥\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  // Datos del Cliente
  message += `👤 *Cliente:* ${customer.fullName.trim() || 'No especificado'}\n`;
  if (customer.phone.trim()) {
    message += `📱 *Teléfono:* ${customer.phone.trim()}\n`;
  }
  message += `🛵 *Tipo de entrega:* ${isDelivery ? 'Delivery' : 'Recojo en local'}\n`;

  if (isDelivery) {
    message += `📍 *Dirección:* ${customer.address.trim() || 'Por confirmar en el chat'}\n`;
    if (customer.reference.trim()) {
      message += `🔍 *Referencia:* ${customer.reference.trim()}\n`;
    }
  } else {
    message += `🏬 *Lugar de recojo:* ${RESTAURANT_INFO.pickupAddress}\n`;
  }

  // Método de pago
  const paymentLabels: Record<string, string> = {
    yape: 'Yape',
    plin: 'Plin',
    bcp: 'Transferencia BCP',
    efectivo: 'Efectivo contra entrega'
  };
  message += `💳 *Método de pago:* ${paymentLabels[customer.paymentMethod] || customer.paymentMethod}\n`;
  if (customer.paymentMethod === 'efectivo' && customer.cashAmount?.trim()) {
    message += `💵 *Cancela con:* S/ ${customer.cashAmount.trim()}\n`;
  }

  message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📋 *DESGLOSE DEL PEDIDO:*\n\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. *${item.quantity}x ${item.title}* (${formatPrice(item.unitPrice)} c/u)\n`;
    
    // Alitas flavor
    if (item.options.wingSauce) {
      message += `   🍗 *Sabor Alitas:* ${item.options.wingSauce}\n`;
    }

    // Bebida de combo
    if (item.options.drink) {
      message += `   🥤 *Bebida:* ${item.options.drink}\n`;
    }

    // Cremas
    if (item.options.cremas && item.options.cremas.length > 0) {
      message += `   🥫 *Cremas:* ${item.options.cremas.join(', ')}\n`;
    }

    // Extras
    if (item.options.extras && item.options.extras.length > 0) {
      const extrasStr = item.options.extras
        .map(e => `${e.name} (+${formatPrice(e.price)})`)
        .join(', ');
      message += `   🥓 *Agregados:* ${extrasStr}\n`;
    }

    // Nota
    if (item.options.notes && item.options.notes.trim()) {
      message += `   📝 *Nota:* ${item.options.notes.trim()}\n`;
    }
    
    const itemSubtotal = item.unitPrice * item.quantity;
    message += `   👉 *Subtotal:* ${formatPrice(itemSubtotal)}\n\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Subtotal productos: ${formatPrice(subtotal)}\n`;
  if (isDelivery) {
    message += `Costo de envío: ${formatPrice(deliveryCost)}\n`;
  }
  message += `💰 *TOTAL A PAGAR: ${formatPrice(total)}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  if (customer.notes.trim()) {
    message += `💬 *Observaciones generales:*\n${customer.notes.trim()}\n\n`;
  }

  if (customer.paymentMethod === 'yape' || customer.paymentMethod === 'plin') {
    message += `📸 _*IMPORTANTE:* Adjunto la captura del comprobante de ${customer.paymentMethod.toUpperCase()} a continuación antes de preparar mi pedido._ 🚀\n`;
  } else if (customer.paymentMethod === 'bcp') {
    message += `📸 _*IMPORTANTE:* Adjunto la constancia de transferencia BCP a continuación antes de preparar mi pedido._ 🚀\n`;
  } else {
    message += `¡Muchas gracias! Quedo a la espera de la confirmación de mi orden. 👍\n`;
  }

  return message;
}

export function buildWhatsAppUrl(
  items: CartItem[],
  customer: CustomerOrderData,
  deliveryCost: number,
  phoneNumber: string = RESTAURANT_INFO.phone
): string {
  const text = generateWhatsAppMessage(items, customer, deliveryCost);
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
