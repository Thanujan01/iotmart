import { CURRENCY, WHATSAPP_NUMBER } from "../config";

function money(n) {
  return `${CURRENCY} ${n.toLocaleString("en-LK")}`;
}

// Builds a wa.me link pre-filled with a plain-text order summary:
// product id, name, unit cost and line total for every cart item, plus
// shipping fee and the grand total.
export function buildWhatsAppOrderLink({ items, shipping, total }) {
  const lines = [
    "New order from IoTMart",
    "",
    ...items.map(
      (i) =>
        `• ${i.id} — ${i.name}\n  Qty: ${i.qty} × ${money(i.price)} = ${money(
          i.price * i.qty
        )}`
    ),
    "",
    `Shipping fee: ${money(shipping)}`,
    `Total: ${money(total)}`,
  ];
  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
