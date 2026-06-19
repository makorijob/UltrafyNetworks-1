"use client";

import { useState, useEffect } from 'react';
import { Loader2, Check, X, Trash2 } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  area: string;
  quote: string;
  rating: number;
  status: string;
  created_at: string;
}

export default function ReviewAdmin() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/reviews');
      const data = await response.json();
      if (data.success) {
        setReviews(data.data);
      } else {
        setError('Failed to load reviews');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (response.ok) {
        fetchReviews();
      }
    } catch (err) {
      alert('Failed to update review');
    }
  };

  const deleteReview = async (id: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const response = await fetch(`/api/admin/reviews?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchReviews();
      }
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-950 mb-8">Review Management</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left px-4 py-3 text-slate-600 font-semibold text-sm">Name</th>
                  <th className="text-left px-4 py-3 text-slate-600 font-semibold text-sm hidden sm:table-cell">Area</th>
                  <th className="text-left px-4 py-3 text-slate-600 font-semibold text-sm hidden md:table-cell">Review</th>
                  <th className="text-left px-4 py-3 text-slate-600 font-semibold text-sm">Rating</th>
                  <th className="text-left px-4 py-3 text-slate-600 font-semibold text-sm">Status</th>
                  <th className="text-left px-4 py-3 text-slate-600 font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-slate-500">
                      No reviews found
                    </td>
                  </tr>
                ) : (
                  reviews.map((review) => (
                    <tr key={review.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 text-slate-800 font-medium">{review.name}</td>
                      <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">{review.area}</td>
                      <td className="px-4 py-3 text-slate-600 text-sm hidden md:table-cell max-w-xs truncate">
                        {review.quote}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex text-yellow-400">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          review.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                          review.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {review.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {review.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateStatus(review.id, 'approved')}
                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                title="Approve"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => updateStatus(review.id, 'rejected')}
                                className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Reject"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => deleteReview(review.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
