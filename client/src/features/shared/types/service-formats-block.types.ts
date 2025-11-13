export interface ServiceFormatsBlockData {
  id: number;
  title: string;
  formats: ServiceFormat[];
}

export interface ServiceFormat {
  id: number;
  item: {
    id: number;
    image: string;
    name: string;
    description: string;
    cta_button_text: string;
    advice_button_text: string;
    advice_content: string;
  }
}
