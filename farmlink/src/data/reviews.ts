export interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  productId: number;
}

export const REVIEWS: Review[] = [
  { id: 1, user: "Ananya S.", rating: 5, comment: "Excellent quality tomatoes! Very fresh and organic.", date: "2026-03-01", verified: true, productId: 1 },
  { id: 2, user: "Rohit M.", rating: 4, comment: "Good produce, delivery was on time. Highly recommend.", date: "2026-02-28", verified: true, productId: 1 },
  { id: 3, user: "Meera K.", rating: 5, comment: "Best mangoes I've had in years! Will order again.", date: "2026-03-02", verified: true, productId: 3 },
];
