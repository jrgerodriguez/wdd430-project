"use client";
import { useState, useEffect } from "react";

interface Rating {
  id: string;
  name: string;
  rating: number;
  comment?: string;
  user_id: string;
}

export default function ProductReview({ productId }: { productId: string }) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Rating[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(`/api/rating?productId=${productId}`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    };
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/rating", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment, productId: Number(productId), rating }),
    });
    setComment("");
    setRating(0);

    const updated = await fetch(`/api/rating?productId=${productId}`).then(res => res.json());
    setReviews(Array.isArray(updated) ? updated : []);
  };

  return (
    <div className="mt-8 border-t border-white/20 pt-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Rate this product</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Stars */}
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`text-2xl transition-colors ${star <= (hover || rating) ? "text-yellow-400" : "text-white/40"}`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Comment Box */}
        <textarea
          className="border border-white/20 rounded p-3 w-full bg-white/5 text-white placeholder-white focus:outline-none focus:bg-white/10 transition"
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-white/10 text-white rounded px-6 py-2 w-fit hover:bg-white/20 transition"
        >
          Submit
        </button>
      </form>

      {/* Reviews List */}
      <div className="mt-8">
        <h4 className="font-semibold mb-4 text-white text-lg">User Reviews:</h4>
        {reviews.length === 0 && <p className="text-white/40">No reviews yet.</p>}
        {reviews.map(r => (
          <div key={r.id} className="border-b border-white/20 py-3">
            <p className="text-yellow-400 mb-1">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</p>
            <p className="text-white/70 text-sm">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
