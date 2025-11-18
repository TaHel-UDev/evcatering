export interface AddColorsBlockProps {
    id: number;
    title: string;
    subtitle: string;
    add_colors_cards: [{
        id: number;
        item: {
            id: number;
            image: string;
            title: string;
        }
    }]
}