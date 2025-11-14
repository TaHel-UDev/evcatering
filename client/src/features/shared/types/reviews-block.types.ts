export interface ReviewsData {
  id: number;
  rating: number;
  yandex_link: string;
  review_cards: ReviewCard[];
}

export interface ReviewCard {
  id: number;
  item: {
    name: string;
    rating: number;
    text: string;
  }
}
