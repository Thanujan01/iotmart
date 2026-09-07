# IoTMart

A frontend-only React storefront for Arduino, ESP32 and electronics
components. Cart is saved in the browser, and checkout sends the full order
(product IDs, names, costs, shipping fee, total) to WhatsApp — no backend
required.

## Getting started

```bash
npm install
npm run dev       # local development, http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Before you launch — edit `src/config.js`

| Constant        | What it does                                                      |
| --------------- | ------------------------------------------------------------------ |
| `WHATSAPP_NUMBER`| **Replace with your real number** (international format, digits only, no `+`, no leading `0`). Every "Buy via WhatsApp" and contact-form message is sent here. |
| `SHIPPING_FEE`   | Flat shipping fee added to every order.                           |
| `CURRENCY`       | Currency label shown across the site.                             |
| `ADMIN_NAME` / `ADMIN_MOBILE` | The Name + Mobile combination on the Contact page that opens `/admin` (defaults to `Thanujan` / `20010705`, as requested). |

Your product catalogue lives in `src/data/products.js` and categories in
`src/data/categories.js` — both are plain arrays, easy to edit or extend.
Product IDs follow the `IM1000`, `IM1001`, `IM1002`… sequence.

## How the WhatsApp checkout works

Adding items to the cart saves them to `localStorage`, so the cart survives
a page refresh. "Buy via WhatsApp" builds a `wa.me` link containing every
line item's ID, name, quantity, and cost, plus the shipping fee and grand
total, and opens it in a new tab pre-filled — the shopper just taps send.

## The admin dashboard, and an important caveat

Typing the exact Name `Thanujan` and Mobile `20010705` into the Contact page
form opens `/admin` instead of sending a message. The admin page lists every
product's ID, name and quantity, tags each as **Low** (<5), **Moderate**
(5–10) or **Normal** (>10) stock, and can be searched by product ID.

**This is a convenience gate, not real security.** The whole site is static
frontend code with no server, so the "Thanujan" / "20010705" check — like
all of this site's JavaScript — is visible to anyone who opens their
browser's dev tools. It's enough to keep casual visitors out of the admin
view, but don't use it to protect anything sensitive. If you need real
authentication, you'd need an actual backend/login service behind it.

## SEO

The site ships with on-page SEO basics: per-page titles/descriptions
(`src/components/SEO.jsx`), Open Graph and Twitter tags, an
`Organization` structured-data block, `robots.txt` and `sitemap.xml`
(both in `public/`, using a placeholder `iotmart.lk` domain — update the
URLs once you have a real domain).

Worth knowing: **on-page SEO can't guarantee a #1 ranking for "IoTMart."**
Ranking well also depends on things outside the code — a live domain,
submitting the sitemap to Google Search Console, real backlinks, page
speed on your actual hosting, and time for Google to crawl and index the
site. Treat this as a solid foundation, not a guarantee.

## Notes

- All product data, prices and stock counts are **placeholder sample
  data** — replace them with your real catalogue before going live.
- This is a client-side-only app (no database). Cart data is per-browser;
  the admin page is read-only reporting on `products.js`, since there's
  nowhere to persist edits without a backend.
