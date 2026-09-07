import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-semibold text-circuit-950">Page not found</h1>
      <p className="mt-2 text-sm text-circuit-600">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-xl bg-circuit-900 px-6 py-3 text-sm font-semibold text-white hover:bg-circuit-700"
      >
        Back to shop
      </Link>
    </section>
  );
}
