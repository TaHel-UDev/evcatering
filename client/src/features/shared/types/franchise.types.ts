export interface FMainScreen {
    id: number;
    title: string;
    description: string;
    background: { id: string; }
}

export interface FAboutBlockProps {
    id: number;
    text: string;
}

export interface FOurFranchiseBlockProps {
    id: number;
    title: string;
    subtitle: string;
    cta_button_text: string;
    image: { id: string; }
    f_our_franchise_block_points: [{
        id: number;
        item: {
            id: number;
            point: number;
            text: string;
        }
    }]
}

export interface WhatGetBlockProps {
    id: number;
    title: string;
    what_get_block_cards: [{
        id: number;
        item: {
            id: number;
            content: string;
            image: string;
            position: number;
            cta_text_button: string;
        }
    }]
}

export interface ConditionsBlockProps {
    id: number;
    title: string;
    conditions_block_cards: [{
        id: number;
        item: {
            id: number;
            title: string;
            description: string;
        }
    }]
}

export interface FInvestmentBlockProps {
    id: number;
    title: string;
    subtitle: string;
    cta_button_text: string;
    image: { id: string; }
    f_investment_block_points: [{
        id: number;
        item: {
            id: number;
            icon: string
            text: string;
            position: number;
        }
    }]
}

export interface FProspectsBlockProps {
    id: number;
    title: string;
    content: string;
    cta_button_text: string;
    f_prospects_block_points: [{
        id: number;
        item: {
            id: number;
            position: number;
            icon: string;
            text: string;
        }
    }]
}

export interface FBesidesBlockProps {
    id: number;
    title: string;
    cta_button_text: string;
    image: { id: string; }
    f_besides_block_points: [{
        id: number;
        item: {
            id: number;
            point: number;
            text: string;
        }
    }]
}

export interface FAbleToWorkBlockProps {
    id: number;
    title: string;
    cta_button_text: string;
    image: { id: string; }
    f_able_to_work_block_cards: [{
        id: number;
        item: {
            id: number;
            title: string;
            subtitle?: string;
        }
    }]
}

export interface WhoSuitableBlockProps {
    id: number;
    title: string;
    subtitle: string;
    cta_button_text: string;
    image: { id: string; }
    who_suitable_points: [{
        id: number;
        item: {
            id: number;
            point: number;
            text: string;
        }
    }]
}

export interface FBrandBlockProps {
    id: number;
    title: string;
    subtitle: string;
    cta_button_text: string;
    image_1: { id: string; }
    image_2: { id: string; }
}

export interface FValuesBlockProps {
    id: number;
    title: string;
    subtitle: string;
    f_values_cards: [{
        id: number;
        item: {
            id: number;
            title: string;
            subtitle: string;
            size: "3/12" | "4/12"
        }
    }]
}

export interface FAboutCateringBlockProps {
    id: number;
    title: string;
    subtitle: string;
}

export interface FPartnersBlockProps {
    id: number;
    title: string;
    f_partners_cards: [{
        id: number;
        item: {
            id: number;
            image: string;
            title: string;
            subtitle: string;
        }
    }]
}

export interface FFooterBlockProps {
    id: number;
    title: string;
    subtitle: string;
    cta_button_text: string;
    city?: string;
    phone: string;
    mail: string;
    time: string;
    adress?: string;
}