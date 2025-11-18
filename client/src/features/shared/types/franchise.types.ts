export interface FMainScreen {
    id: number;
    title: string;
    description: string;
    background: { id: string; }
}

export interface FAboutBlock {
    id: number;
    text: string;
}

export interface FOurFranchiseBlock {
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

export interface WhatGetBlock {
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

export interface ConditionsBlock {
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

export interface FInvestmentBlock {
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

export interface FProspectsBlock {
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

export interface FBesidesBlock {
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

export interface FAbleToWorkBlock {
    id: number;
    title: string;
    cta_button_text: string;
    image: { id: string; }
    f_able_to_work_block_cards: [{
        id: number;
        item: {
            id: number;
            title: string;
            subtitle: string;
        }
    }]
}

export interface WhoSuitableBlock {
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

export interface FBrandBlock {
    id: number;
    title: string;
    subtitle: string;
    cta_button_text: string;
    image_1: { id: string; }
    image_2: { id: string; }
}

export interface FValuesBlock {
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

export interface FAboutCateringBlock {
    id: number;
    title: string;
    subtitle: string;
}

export interface FPartnersBlock {
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