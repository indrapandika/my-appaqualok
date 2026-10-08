import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast"; // 1. Impor toast

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 2. Ganti alert() dengan toast.success()
    toast.success(`Pesanan atas nama ${formData.name} berhasil dibuat!`);

    clearCart(); // Kosongkan keranjang setelah berhasil
    navigate("/"); // Kembali ke Dashboard
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-xl mx-auto my-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Keranjang Anda Masih Kosong</h2>
        <p className="text-gray-500 text-sm mb-4">Pilih produk terlebih dahulu sebelum melakukan checkout.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition"
        >
          Lihat Produk
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">Formulir Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Masukkan nama lengkap Anda"
            className="w-full border border-gray-200 rounded-md p-2.5 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon / WhatsApp</label>
          <input
            type="text"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="08123456789"
            className="w-full border border-gray-200 rounded-md p-2.5 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Pengiriman</label>
          <textarea
            required
            rows="3"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Masukkan alamat pengiriman lengkap Anda"
            className="w-full border border-gray-200 rounded-md p-2.5 text-sm focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        {/* Ringkasan Item yang Dibeli */}
        <div className="bg-gray-50 p-4 rounded-md space-y-2 mt-4">
          <h4 className="font-bold text-sm text-gray-700 mb-2">Ringkasan Pesanan</h4>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-xs text-gray-600">
              <span>{item.name} ({item.qty}x)</span>
              <span>Rp {(item.price * item.qty).toLocaleString("id-ID")}</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2 flex justify-between font-bold text-sm text-gray-800">
            <span>Total Pembayaran</span>
            <span className="text-blue-600">Rp {totalPrice.toLocaleString("id-ID")}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition text-sm mt-4"
        >
          Buat Pesanan Sekarang
        </button>
      </form>
    </div>
  );
}