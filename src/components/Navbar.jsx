import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ease-out ${
      isActive(path)
        ? "bg-sky-500 text-white shadow-md shadow-sky-500/20"
        : "text-slate-600 hover:bg-sky-50 hover:text-sky-600 hover:-translate-y-0.5"
    }`;

  return (
    <nav className="sticky top-0 z-50 px-3 py-3 sm:px-5">
      <div className="max-w-7xl mx-auto rounded-2xl border border-white/80 bg-white/80 backdrop-blur-xl shadow-lg shadow-sky-100/60">
        <div className="h-16 px-4 sm:px-6 lg:px-7 flex items-center justify-between">
          <Link
            to="/"
            className="group flex items-center gap-2.5 transition-transform duration-300 hover:-translate-y-0.5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-cyan-500 shadow-md shadow-sky-500/20 text-lg transition-all duration-300 group-hover:scale-105 group-hover:rotate-2">
              🐟
            </span>
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-800">
              Aqua<span className="text-sky-500">Lok</span> Store
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/" className={linkClass("/")}>Beranda</Link>

            <a
              href="#products"
              className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 transition-all duration-300 ease-out hover:bg-sky-50 hover:text-sky-600 hover:-translate-y-0.5"
            >
              Produk
            </a>

            <Link to="/cart" className={linkClass("/cart")}>
              <span className="text-base leading-none transition-transform duration-300 group-hover:scale-110">
                🛒
              </span>
              <span className="hidden sm:inline">Keranjang</span>
              {totalItems > 0 && (
                <span className="bg-sky-100 text-sky-700 font-bold text-[11px] px-2 py-0.5 rounded-full min-w-[20px] text-center transition-transform duration-300 group-hover:scale-105">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
