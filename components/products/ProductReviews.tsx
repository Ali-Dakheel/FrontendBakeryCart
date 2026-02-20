"use client";

import { useState } from "react";
import { Star, ThumbsUp, ShieldCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductReviews, useCreateReview, useDeleteReview, useMarkHelpful } from "@/lib/hooks/useReviews";
import { useUser } from "@/lib/hooks/useAuth";
import { useTranslations } from "next-intl";
import { formatDate } from "@/lib/utils/formatters";

interface ProductReviewsProps {
  productId: number;
}

function StarRating({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange?.(star)}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          className={onChange ? "cursor-pointer" : "cursor-default"}
          aria-label={`${star} stars`}
        >
          <Star
            className={`h-5 w-5 transition-colors ${
              star <= (hovered || value) ? "fill-amber-400 text-amber-400" : "text-navy/20"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const t = useTranslations();
  const { data: user } = useUser();
  const isLoggedIn = !!user;

  const { data, isPending } = useProductReviews(productId);
  const createReview = useCreateReview(productId);
  const deleteReview = useDeleteReview(productId);
  const markHelpful = useMarkHelpful(productId);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);

  const reviews = data?.data ?? [];
  const stats = data?.stats;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    createReview.mutate(
      { rating, comment: comment.trim() || undefined },
      {
        onSuccess: () => {
          setRating(0);
          setComment("");
          setShowForm(false);
        },
      }
    );
  };

  if (isPending) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl font-bold text-navy">
            {t("reviews.title")}
          </h3>
          {stats && stats.reviews_count > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <StarRating value={Math.round(stats.average_rating)} />
              <span className="text-sm text-navy/60">
                {stats.average_rating.toFixed(1)} · {stats.reviews_count} {t("reviews.reviewsCount")}
              </span>
            </div>
          )}
        </div>
        {isLoggedIn && !showForm && (
          <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
            {t("reviews.writeReview")}
          </Button>
        )}
      </div>

      {/* Write Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-4 bg-cream rounded-lg space-y-4 border border-sky/20">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-navy">{t("reviews.yourRating")}</label>
            <StarRating value={rating} onChange={setRating} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-navy">{t("reviews.yourComment")}</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t("reviews.commentPlaceholder")}
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={rating === 0 || createReview.isPending}
              className="bg-navy hover:bg-navy-light"
            >
              {createReview.isPending ? t("common.loading") : t("reviews.submit")}
            </Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              {t("common.cancel")}
            </Button>
          </div>
        </form>
      )}

      {!isLoggedIn && reviews.length === 0 && (
        <p className="text-navy/60 text-sm">{t("reviews.loginToReview")}</p>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <p className="text-navy/60 text-sm py-4">{t("reviews.noReviews")}</p>
      ) : (
        <div className="space-y-5">
          {reviews.map((review, i) => (
            <div key={review.id}>
              {i > 0 && <Separator className="mb-5" />}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <StarRating value={review.rating} />
                      {review.is_verified_purchase && (
                        <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          {t("reviews.verified")}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-navy/50">
                      <span className="font-medium text-navy/70">{review.user?.name ?? t("reviews.anonymous")}</span>
                      <span>·</span>
                      <span>{formatDate(review.created_at)}</span>
                    </div>
                  </div>

                  {user?.id === review.user?.id && (
                    <button
                      onClick={() => deleteReview.mutate(review.id)}
                      className="text-navy/30 hover:text-destructive transition-colors"
                      aria-label={t("reviews.delete")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {review.comment && (
                  <p className="text-sm text-navy/80 leading-relaxed">{review.comment}</p>
                )}

                {review.admin_response && (
                  <div className="mt-2 pl-3 border-l-2 border-sky text-sm text-navy/70 italic">
                    <span className="font-semibold not-italic text-sky">{t("reviews.adminResponse")}: </span>
                    {review.admin_response}
                  </div>
                )}

                <button
                  onClick={() => markHelpful.mutate(review.id)}
                  className="flex items-center gap-1 text-xs text-navy/50 hover:text-sky transition-colors mt-1"
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                  {t("reviews.helpful")} ({review.helpful_count})
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
