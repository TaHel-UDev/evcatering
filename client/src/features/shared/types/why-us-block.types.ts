export interface WhyUsBlockData {
  id: number;
  title: string;
  why_us_cards: WhyUsCard[];
}

export interface WhyUsCard {
  id: number;
  item: {
    id: number;
    title: string;
    subtitle: string;
    image: { id: string };
  }
}