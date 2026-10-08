import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FishCard from "../../components/FishCard";
import { fishData } from "../../data/fishData";
import { feedData } from "../../data/feedData";
import { aquariumData } from "../../data/aquariumData";

const fetchProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...fishData, ...feedData, ...aquariumData]);
    }, 300);
  });
};

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");

  const { data: allProducts = [], isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "Semua Kategori" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="text-center py-12 text-slate-500 font-medium">
        Memuat data produk...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 text-red-500 font-medium">
        Gagal memuat data produk.
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky-600 via-cyan-500 to-blue-600 px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12 shadow-xl shadow-sky-200/70">
        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur-md border border-white/20">
              🐟 Koleksi Ikan Hias AquaLok
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Temukan Ikan Hias
              <br />
              Favoritmu 🐟
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-sky-50 sm:text-base">
              Koleksi ikan hias berkualitas untuk aquarium kamu. Temukan ikan,
              pakan, dan perlengkapan aquarium dalam satu tempat.
            </p>
            <a
              href="#products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-sky-600 shadow-lg shadow-sky-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
            >
              Lihat Produk <span>→</span>
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:justify-self-end">
            <div className="absolute inset-6 rounded-full bg-white/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/25 bg-white/10 p-3 shadow-2xl backdrop-blur-sm rotate-1 transition-transform duration-500 hover:rotate-0 hover:scale-[1.02]">
              <img
                src="/images/arwana.jpg"
                alt="Ikan hias AquaLok"
                className="h-56 w-full rounded-[1.5rem] object-cover object-center sm:h-64 lg:h-72"
              />
              <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-white/90 px-4 py-3 backdrop-blur-md shadow-lg">
                <p className="text-xs font-semibold text-slate-500">Pilihan favorit</p>
                <p className="mt-0.5 font-bold text-slate-800">Ikan Hias Premium</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm shadow-sky-100/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-xl">🐟</span>
          <div>
            <p className="font-bold text-slate-800">10+ Produk</p>
            <p className="text-sm text-slate-500">Pilihan ikan & kebutuhan aquarium</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm shadow-sky-100/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-xl">🚚</span>
          <div>
            <p className="font-bold text-slate-800">Pengiriman Aman</p>
            <p className="text-sm text-slate-500">Pesanan disiapkan dengan baik</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm shadow-sky-100/70 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-xl">💎</span>
          <div>
            <p className="font-bold text-slate-800">Produk Berkualitas</p>
            <p className="text-sm text-slate-500">Pilihan untuk aquarium kamu</p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="scroll-mt-28 space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-500">
              Koleksi AquaLok
            </p>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-800 sm:text-3xl">
              Semua Produk
            </h2>
          </div>
          <span className="text-sm font-medium text-slate-400">
            {filteredProducts.length} produk tersedia
          </span>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col gap-3 rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm shadow-sky-100/70 backdrop-blur-md md:flex-row">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Cari produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-11 py-3 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none transition-all duration-300 focus:border-sky-400 focus:ring-4 focus:ring-sky-100 md:w-56"
          >
            <option value="Semua Kategori">Semua Kategori</option>
            <option value="Ikan Hias">Ikan Hias</option>
            <option value="Pakan Ikan">Pakan Ikan</option>
            <option value="Aquarium">Aquarium</option>
          </select>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {filteredProducts.map((product) => (
              <FishCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/80 bg-white/70 py-12 text-center text-slate-500 shadow-sm">
            Produk tidak ditemukan.
          </div>
        )}
      </section>
    </div>
  );
}
