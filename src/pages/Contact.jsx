import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send } from "lucide-react";
import SEO from "../components/SEO.jsx";
import { ADMIN_MOBILE, ADMIN_NAME, SITE_NAME, WHATSAPP_NUMBER } from "../config";

export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", mobile: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Admin gate: matching name + mobile opens the admin dashboard instead
    // of sending a message. This is a client-side check only — see the
    // note in src/config.js.
    if (form.name === ADMIN_NAME && form.mobile === ADMIN_MOBILE) {
      sessionStorage.setItem("iotmart_admin", "true");
      navigate("/admin");
      return;
    }

    const text = encodeURIComponent(
      `New contact message from ${SITE_NAME} website\n\nName: ${form.name}\nMobile: ${form.mobile}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank", "noopener,noreferrer");
    setSent(true);
    setForm({ name: "", mobile: "", message: "" });
  }

  return (
    <>
      <SEO
        title={`Contact — ${SITE_NAME}`}
        description="Questions about a part or an order? Send IoTMart a message."
      />
      <section className="mx-auto max-w-lg px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="font-display text-2xl font-semibold text-circuit-950 sm:text-3xl">
          Get in touch
        </h1>
        <p className="mt-2 text-sm text-circuit-600">
          Send us a message and it'll go straight to our WhatsApp.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-circuit-800">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full rounded-xl border border-circuit-200 px-4 py-2.5 text-sm focus:border-circuit-500 focus:outline-none focus:ring-2 focus:ring-circuit-500/20"
            />
          </div>

          <div>
            <label htmlFor="mobile" className="mb-1.5 block text-sm font-medium text-circuit-800">
              Mobile number
            </label>
            <input
              id="mobile"
              type="text"
              required
              value={form.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              className="w-full rounded-xl border border-circuit-200 px-4 py-2.5 text-sm focus:border-circuit-500 focus:outline-none focus:ring-2 focus:ring-circuit-500/20"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-circuit-800">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              required
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="w-full rounded-xl border border-circuit-200 px-4 py-2.5 text-sm focus:border-circuit-500 focus:outline-none focus:ring-2 focus:ring-circuit-500/20"
            />
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-circuit-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-circuit-700"
          >
            <Send className="h-4 w-4" /> Send message
          </button>

          {sent && (
            <p className="text-center text-sm text-led-600">
              WhatsApp opened in a new tab — send the message to reach us.
            </p>
          )}
        </form>
      </section>
    </>
  );
}
