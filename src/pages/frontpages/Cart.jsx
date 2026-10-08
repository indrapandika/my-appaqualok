import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm text-center max-w-xl mx-auto my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Keranjang Belanja Kosong</h2>
        <p className="text-gray-500 text-sm mb-6">Anda belum menambahkan produk apa pun ke keranjang.</p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-md font-medium text-sm hover:bg-blue-700 transition"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Keranjang Belanja</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daftar Produk */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md bg-gray-100"
                />
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                  <p className="text-blue-600 font-semibold text-sm mt-1">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Kontrol Jumlah */}
                <div className="flex items-center border border-gray-200 rounded-md">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-semibold text-gray-800">{item.qty}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-2.5 py-1 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Tombol Hapus */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 text-xs font-medium"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Ringkasan Total */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 h-fit space-y-4">
          <h3 className="text-lg font-bold text-gray-800 border-b pb-3">Ringkasan Belanja</h3>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>Total Harga</span>
            <span className="font-bold text-blue-600 text-lg">
              Rp {totalPrice.toLocaleString("id-ID")}
            </span>
          </div>
          <Link
            to="/checkout"
            className="block text-center w-full bg-blue-600 text-white py-2.5 rounded-md font-medium text-sm hover:bg-blue-700 transition mt-4"
          >
            Lanjut ke Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}