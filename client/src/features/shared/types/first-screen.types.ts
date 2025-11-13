export interface FirstScreenData {
  id: number;
  title: string;
  subtitle: string;
  button_text: string;
  background_image: {
    id: string;
  };
  advantages: FirstScreenAdvantage[];
}

export interface FirstScreenAdvantage {
  id: number;
  item: {
    id: number;
    text: string;
  }
}
