"use client";
import { useState, useEffect } from "react";

interface Rating {
  id: string;
  name: string;
  rating: number;
  comment?: string;
  user_id: string;
}

export default function ProductReview({ productId, userId }: { productId: string; userId: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState<Rating[]>([]);


 useEffect(() => {
  const fetchReviews = async () => {
    const res = await fetch(`/api/rating?productId=${productId}`);
    const data = await res.json();
    
    if (Array.isArray(data)) {
      setReviews(data);
    } else {
      setReviews([]); 
    }
  };
  fetchReviews();
}, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/rating", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, userId, rating, comment }),
    });

    setComment("");
    setRating(0);
    const updated = await fetch(`/api/rating?productId=${productId}`).then(res => res.json());
    setReviews(Array.isArray(updated) ? updated : []);
  };

  return (
    <div className="mt-8 border-t pt-4">
      <h3 className="text-lg font-semibold mb-2">Rate this product</h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className="text-2xl text-yellow-400"
            >
              {star <= (hover || rating) ? "★" : "☆"}
            </button>
          ))}
        </div>

        <textarea
          className="border rounded p-2 w-full"
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 w-fit hover:bg-blue-700">
          Submit
        </button>
      </form>

      <div className="mt-6">
        <h4 className="font-semibold mb-2">User Reviews:</h4>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map(r => (
          <div key={r.id} className="border-b py-2">
            <p className="text-yellow-500">{`★`.repeat(r.rating)}{`☆`.repeat(5 - r.rating)}</p>
            <p className="text-sm">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
