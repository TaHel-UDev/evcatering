export interface WhyUsItem {
    id: number;
    title: string;
    description: string;
    image: string;
}

export const whyUsData: WhyUsItem[] = [
    {
        id: 0,
        title: "Опыт",
        description: "Делаем давно и хорошо, прям очень хорошо",
        image: "https://placehold.co/736x495.png?text=Опыт"
    },
    {
        id: 1,
        title: "Качество",
        description: "Делаем качественно-новый год-новое качество",
        image: "https://placehold.co/736x495.png?text=Качество"
    },
    {
        id: 2,
        title: "Технологии",
        description: "Готовим быстро, молекулярная кухня и все такое",
        image: "https://placehold.co/736x495.png?text=Технологии"
    },
    {
        id: 3,
        title: "Отзывы",
        description: "Один человек чет там нехорошее сказал-больше он не говорит, оч вкусной едой накормили, до сих пор жует",
        image: "https://placehold.co/736x495.png?text=Отзывы"
    }
];

