export interface FoodExampleBlockData {
  id: number;
  title: string;
  food_example_cards: FoodExampleCard[];
}

export interface FoodExampleCard {
  id: number;
  item: {
    id: number;
    name: string;
    image: { id: string };
  }
}
