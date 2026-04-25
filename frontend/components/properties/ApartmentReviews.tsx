"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Star, Filter, ArrowUpDown, CheckCircle2, AlertCircle, Loader2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { mockReviews, type Review } from "@/lib/mockData/reviews";
import { cn } from "@/lib/utils";

interface ApartmentReviewsProps {
  propertyId: string;
}

export function ApartmentReviews({ propertyId }: ApartmentReviewsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL State
  const ratingFilter = searchParams.get("rating") || "all";
  const sortBy = searchParams.get("sort") || "newest";
  const verifiedOnly = searchParams.get("verified") === "true";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        const filtered = mockReviews.filter(r => r.propertyId === Number(propertyId));
        setReviews(filtered);
        setLoading(false);
      } catch (err) {
        setError("Failed to load reviews. Please try again.");
        setLoading(false);
      }
    }, 800);
  }, [propertyId]);

  const filteredAndSortedReviews = useMemo(() => {
    let result = [...reviews];

    // Filter by rating
    if (ratingFilter !== "all") {
      result = result.filter(r => r.rating === Number(ratingFilter));
    }

    // Filter by verified
    if (verifiedOnly) {
      result = result.filter(r => r.verifiedStay);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "highest") return b.rating - a.rating;
      if (sortBy === "lowest") return a.rating - b.rating;
      return 0;
    });

    return result;
  }, [reviews, ratingFilter, sortBy, verifiedOnly]);

  const updateFilters = (key: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all" || value === false || value === "") {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground font-mono">Loading feedback...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-3 border-destructive bg-destructive/10 p-6 text-center shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h3 className="font-bold text-destructive mb-2">Error Loading Reviews</h3>
        <p className="text-sm text-destructive/80 mb-4">{error}</p>
        <Button 
          variant="outline" 
          className="border-2 border-destructive text-destructive hover:bg-destructive/20"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-3 border-foreground bg-card p-4 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h2 className="font-mono text-lg font-bold">Filters</h2>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Label htmlFor="rating-filter" className="text-sm font-bold">Rating:</Label>
            <Select value={ratingFilter} onValueChange={(v) => updateFilters("rating", v)}>
              <SelectTrigger id="rating-filter" className="w-[120px] border-2 border-foreground">
                <SelectValue placeholder="All Stars" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stars</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Label htmlFor="sort-order" className="text-sm font-bold">Sort:</Label>
            <Select value={sortBy} onValueChange={(v) => updateFilters("sort", v)}>
              <SelectTrigger id="sort-order" className="w-[150px] border-2 border-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="highest">Highest Rated</SelectItem>
                <SelectItem value="lowest">Lowest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 border-2 border-foreground px-3 py-1.5 bg-background">
            <Checkbox 
              id="verified-only" 
              checked={verifiedOnly} 
              onCheckedChange={(v) => updateFilters("verified", !!v)}
              className="border-2 border-foreground"
            />
            <Label htmlFor="verified-only" className="text-sm font-bold cursor-pointer">Verified Stay</Label>
          </div>
        </div>
      </div>

      {filteredAndSortedReviews.length === 0 ? (
        <div className="border-3 border-foreground border-dashed p-12 text-center bg-muted/30">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4 opacity-50" />
          <p className="font-mono text-lg font-bold">No reviews found</p>
          <p className="text-muted-foreground mt-2">Try adjusting your filters to see more results.</p>
          {(ratingFilter !== "all" || verifiedOnly) && (
            <Button 
              variant="link" 
              className="mt-2 text-primary font-bold"
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.delete("rating");
                params.delete("verified");
                router.replace(`${pathname}?${params.toString()}`, { scroll: false });
              }}
            >
              Clear all filters
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredAndSortedReviews.map((review) => (
            <Card key={review.id} className="border-3 border-foreground shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 border-2 border-foreground bg-secondary flex items-center justify-center font-bold">
                      {review.userName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold">{review.userName}</p>
                      <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString("en-NG", { dateStyle: 'medium' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-primary/10 border-2 border-primary px-2 py-0.5">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    <span className="text-xs font-black">{review.rating}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {review.verifiedStay && (
                    <div className="inline-flex items-center gap-1 bg-secondary/20 text-secondary border border-secondary px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified Stay
                    </div>
                  )}
                  <p className="text-sm leading-relaxed text-foreground">
                    {review.comment}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-4 border-t-2 border-dashed border-foreground/10 pt-4">
                  <button className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                    Helpful ({review.helpfulCount})
                  </button>
                  <button className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
                    Report
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
