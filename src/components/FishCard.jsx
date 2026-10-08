import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast"; // 1. Impor toast

export default function FishCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // 2. Tampilkan notifikasi toast
    toast.success(`${quantity} ${product.name} berhasil ditambahkan ke keranjang!`);
  };

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/90 bg-white/90 p-3.5 shadow-sm shadow-slate-200/70 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-sky-100/80 sm:p-4">
      <div>
        {/* Gambar Produk dengan Efek Zoom */}
        <div className="relative mb-3.5 aspect-[4/3] overflow-hidden rounded-xl bg-slate-50">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <span className="absolute top-2.5 left-2.5 text-[11px] bg-white/90 backdrop-blur-md text-slate-700 px-2.5 py-1 rounded-full font-medium shadow-sm border border-white/70">
            {product.category}
          </span>
        </div>

        {/* Informasi Produk */}
        <h3 className="font-semibold text-slate-800 text-base group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="text-lg font-bold text-blue-600">
            Rp {product.price?.toLocaleString("id-ID")}
          </p>
          <span className="text-xs font-semibold text-amber-500">★ Pilihan</span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {/* Kontrol Jumlah Barang */}
        {product.stock > 0 && (
          <div className="flex items-center justify-between bg-slate-50/90 border border-slate-200/70 rounded-xl p-1.5">
            <button
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold shadow-sm hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            >
              -
            </button>

            <span className="font-semibold text-slate-800 text-sm px-3">
              {quantity}
            </span>

            <button
              onClick={handleIncrease}
              disabled={quantity >= product.stock}
              className="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold shadow-sm hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            >
              +
            </button>
          </div>
        )}

        {/* Tombol Detail & Tambah ke Keranjang */}
        <div className="flex gap-2">
          <Link
            to={`/product/${product.id}`}
            className="w-1/2 py-2.5 border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-sky-200 hover:text-sky-600 font-semibold rounded-xl text-xs transition-all duration-300 text-center flex items-center justify-center active:scale-[0.98]"
          >
            Detail
          </Link>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-1/2 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-0.5 text-white font-semibold rounded-xl text-xs transition-all duration-300 shadow-md shadow-blue-500/20 active:scale-[0.98] disabled:from-slate-300 disabled:to-slate-300 disabled:shadow-none disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {product.stock > 0 ? `+ Keranjang` : "Stok Habis"}
          </button>
        </div>
      </div>
    </div>
  );
}