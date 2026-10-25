import React, { useState } from 'react';
import { Star, CheckCircle, Plus } from 'lucide-react';

const initialReviews = [
  {
    id: 1,
    author: 'Marcus K.',
    verified: true,
    rating: 5,
    date: '2 weeks ago',
    title: 'The fabric density is unreal.',
    comment: 'Been looking for a genuine 450 GSM boxy cut for months. The shoulder drop and collar ribbing stay crisp even after 3 cold washes. Worth every penny.',
  },
  {
    id: 2,
    author: 'Stefan D.',
    verified: true,
    rating: 5,
    date: '1 month ago',
    title: 'Flawless streetwear fit.',
    comment: 'The drape is heavy and structured without feeling stiff. Sizing runs slightly oversized as described, which is exactly the streetwear fit I wanted.',
  },
  {
    id: 3,
    author: 'Julian V.',
    verified: true,
    rating: 4,
    date: '1 month ago',
    title: 'Premium build quality.',
    comment: 'Stitching and details are exceptional. Shipping arrived to Toronto in 4 days with DHL tracking.',
  }
];

export default function ReviewsSection({ productTitle }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', rating: 5, title: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const avgRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.comment) return;

    const newRev = {
      id: Date.now(),
      author: form.name,
      verified: true,
      rating: Number(form.rating),
      date: 'Just now',
      title: form.title || 'Verified Customer Review',
      comment: form.comment,
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);
    setForm({ name: '', rating: 5, title: '', comment: '' });
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 2500);
  };

  return (
    <section className="mt-20 pt-12 border-t border-neutral-200">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-neutral-200 gap-6">
        <div>
          <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-brandGold font-bold">
            Verified Customer Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-serif text-brandBlack mt-1">
            Ratings & Verified Reviews
          </h2>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex text-brandGold">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-brandBlack font-mono">{avgRating} / 5.0</span>
            <span className="text-xs text-brandGrey">({reviews.length} reviews)</span>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-brandBlack text-white text-xs font-bold uppercase tracking-widest hover:bg-brandSoftBlack flex items-center gap-2 self-start md:self-auto"
        >
          <Plus size={14} /> Write A Review
        </button>
      </div>

      {/* Review Submission Form Drawer/Modal */}
      {showForm && (
        <div className="mb-12 bg-brandWarmIvory border border-neutral-300 p-6 sm:p-8 animate-fadeIn max-w-2xl">
          <h3 className="text-sm font-bold uppercase tracking-widest text-brandBlack mb-4 font-serif">
            Submit Your Review for {productTitle}
          </h3>

          {submitted ? (
            <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <CheckCircle size={16} />
              <span>Thank you! Your verified review has been published.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1 text-brandBlack">Your Name</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. David L."
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white border border-neutral-300 p-2.5 focus:outline-none focus:border-brandBlack"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase tracking-wider block mb-1 text-brandBlack">Star Rating</label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: e.target.value })}
                    className="w-full bg-white border border-neutral-300 p-2.5 focus:outline-none focus:border-brandBlack"
                  >
                    <option value="5">★★★★★ (5 Stars - Exceptional)</option>
                    <option value="4">★★★★☆ (4 Stars - Very Good)</option>
                    <option value="3">★★★☆☆ (3 Stars - Average)</option>
                    <option value="2">★★☆☆☆ (2 Stars - Below Average)</option>
                    <option value="1">★☆☆☆☆ (1 Star - Poor)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1 text-brandBlack">Review Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Best heavyweight cut I own"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-white border border-neutral-300 p-2.5 focus:outline-none focus:border-brandBlack"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider block mb-1 text-brandBlack">Detailed Feedback</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Share details regarding fit, fabric weight, drape, and sizing..."
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  className="w-full bg-white border border-neutral-300 p-2.5 focus:outline-none focus:border-brandBlack"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-3 bg-brandBlack text-white text-xs font-bold uppercase tracking-widest hover:bg-brandSoftBlack"
                >
                  Publish Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border border-neutral-300 text-xs font-bold uppercase tracking-widest hover:bg-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div key={rev.id} className="p-6 border border-neutral-200 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-brandGold">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <span className="text-xs text-neutral-500">{rev.date}</span>
              </div>

              <h4 className="text-base font-bold uppercase tracking-wider text-brandBlack mb-2">
                {rev.title}
              </h4>
              <p className="text-base text-neutral-800 leading-relaxed font-normal">
                "{rev.comment}"
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-sm font-bold text-brandBlack uppercase">{rev.author}</span>
              {rev.verified && (
                <span className="flex items-center gap-1.5 text-xs sm:text-sm text-brandGold font-bold uppercase tracking-wider">
                  <CheckCircle size={15} /> Verified Buyer
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
