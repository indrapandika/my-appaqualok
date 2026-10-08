import { useState, useEffect } from "react";

export default function ReviewSection({ productId }) {
  // Ambil ulasan awal dari LocalStorage atau buat ulasan dummy bawaan
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem(`aqualok_reviews_${productId}`);
    return savedReviews
      ? JSON.parse(savedReviews)
      : [
          {
            id: 1,
            name: "Rubby Aprilia",
            rating: 1,
            comment: "Ikannya jelek, warnanya sangat pudar. Gausah belanja disni ges!",
            date: "2026-10-01",
          },
          {
            id: 2,
            name: "Haruhiro Samsung",
            rating: 4,
            comment: "Kualitas bagus sesuai foto, respon penjual cepat.",
            date: "2026-10-04",
          },
        ];
  });

  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  // Simpan ulasan ke LocalStorage setiap ada ulasan baru
  useEffect(() => {
    localStorage.setItem(`aqualok_reviews_${productId}`, JSON.stringify(reviews));
  }, [reviews, productId]);

  // Hitung Rata-rata Rating
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) {
      alert("Harap isi nama dan ulasan Anda.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: userName,
      rating: Number(rating),
      comment: comment,
      date: new Date().toISOString().split("T")[0],
    };

    setReviews([newReview, ...reviews]);
    setUserName("");
    setComment("");
    setRating(5);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mt-8 space-y-8">
      {/* Header & Rata-rata Rating */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Ulasan & Penilaian</h3>
          <p className="text-slate-500 text-sm mt-1">
            Lihat pengalaman pembeli lain tentang produk ini
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200/60">
          <span className="text-3xl font-extrabold text-slate-800">{avgRating}</span>
          <div>
            <div className="flex text-amber-400 text-sm">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                  {star <= Math.round(avgRating) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{reviews.length} ulasan</p>
          </div>
        </div>
      </div>

      {/* Form Tambah Ulasan */}
      <form onSubmit={handleSubmitReview} className="bg-slate-50 p-5 rounded-xl border border-slate-200/70 space-y-4">
        <h4 className="font-semibold text-slate-800 text-sm">Tulis Ulasan Anda</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Nama Lengkap</label>
            <input
              type="text"
              placeholder="Masukkan nama Anda..."
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Bintang Rating</label>
            <div className="flex items-center gap-1 h-10">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-2xl text-amber-400 focus:outline-none transition-transform hover:scale-110"
                >
                  {star <= (hoverRating || rating) ? "★" : "☆"}
                </button>
              ))}
              <span className="ml-2 text-xs font-semibold text-slate-600">{rating} dari 5</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Komentar / Ulasan</label>
          <textarea
            rows="3"
            placeholder="Bagaimana kondisi produk saat diterima?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition shadow-md shadow-blue-500/20 active:scale-95"
        >
          Kirim Ulasan
        </button>
      </form>

      {/* Daftar Ulasan */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev.id} className="p-4 rounded-xl border border-slate-100 bg-white space-y-1.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800 text-sm">{rev.name}</span>
                <span className="text-xs text-slate-400">{rev.date}</span>
              </div>

              <div className="flex text-amber-400 text-xs">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>{star <= rev.rating ? "★" : "☆"}</span>
                ))}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed">{rev.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-slate-400 text-sm">Belum ada ulasan untuk produk ini.</p>
        )}
      </div>
    </div>
  );
}