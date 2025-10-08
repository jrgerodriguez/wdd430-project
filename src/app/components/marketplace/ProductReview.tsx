"use client";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface Rating {
  id: string;
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
    <section className="text-white font-sans mt-10">
      {/* Reviews Division */}
      <h2 className="text-1xl md:text-xl font-light mb-6 border-b border-white/20 pb-2 text-white/70">
        Reviews
      </h2>

      {/* Reviews List */}
      <div className="space-y-6 mb-6">
        {reviews.length === 0 && <p className="text-white/40">No reviews yet.</p>}
        {reviews.map(r => (
          <div key={r.id} className="bg-white/5 p-5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all">
            <div className="flex items-center gap-1 mb-3">
              {[1,2,3,4,5].map(star => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= r.rating ? "text-white/80 fill-white/80" : "text-white/40"
                  }`}
                />
              ))}
            </div>
            <p className="text-white text-[0.94rem]">{r.comment}</p>
          </div>
        ))}
      </div>

      {/* Rate this product */}
      <div className="text-[0.94rem]">
        <h2 className="text-1xl md:text-xl font-light mb-6 border-b border-white/20 pb-2 text-white/70">
          Rate this product
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          {/* Stars */}
          <div className="flex gap-2 mb-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className={`text-2xl transition-colors ${
                  star <= (hover || rating) ? "text-yellow-400" : "text-white/40"
                }`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="p-2 bg-white/5 text-white resize-none w-full border border-white/10 focus:border-white/30 focus:outline-none transition-all"
          ></textarea>

          <button
            type="submit"
            className="cursor-pointer px-5 py-2 border border-white/30 text-white/70 font-semibold text-sm hover:text-white hover:border-white/50 hover:backdrop-blur-sm transition-all w-max"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
