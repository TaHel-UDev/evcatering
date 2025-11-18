export interface ChooseFormatBlockData {
  id: number;
  title: string;
  subtitle: string;
  form_text: string;
  form_button_text: string;
  marquiz_link: string;
  choose_format_block_points: ChooseFormatBlockPoint[];
  image_button_text: string;
  quiz_image: { id: string; };
}

export interface ChooseFormatBlockPoint {
  id: number;
  item: {
    point: number;
    text: string;
  }
}
