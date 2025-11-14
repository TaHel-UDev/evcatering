import { useState } from "react";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import { Text } from "@/features/shared/ui/text";
import DecideMenuForm from "./decide-menu-form";
import FoodCard from "@/features/shared/ui/food-card/food-card";
import { DecideMenuBlockData, FoodExampleBlockData } from "@/features/shared/types";
import { setAttr } from "../../../../lib/visual-editor";

function DecideMenuBlock({ decideMenuBlockData, foodExampleBlockData }: { decideMenuBlockData: DecideMenuBlockData, foodExampleBlockData: FoodExampleBlockData }) {
    const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

    const handleMouseEnter = (id: string) => {
        setHoveredCardId(id);
    };

    const handleMouseLeave = () => {
        setHoveredCardId(null);
    };

    return (
        <BlockWrapper id="decide-menu-block">
            <div data-directus={setAttr({
                collection: 'decide_menu_block',
                item: decideMenuBlockData.id,
                fields: 'title',
                mode: 'popover'
            })}>
                <BlockHeadline
                    title={decideMenuBlockData.title}
                />
            </div>

            <DecideMenuForm decideMenuBlockData={decideMenuBlockData} />

            <div data-directus={setAttr({
                collection: 'food_example_block',
                item: foodExampleBlockData.id,
                fields: 'title',
                mode: 'popover'
            })}>
                <Text as="h3" variant="h3" className="font-medium text-brown mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]">
                    Некоторые примеры наших блюд
                </Text>
            </div>

            <div data-directus={setAttr({
                collection: 'food_example_block',
                item: foodExampleBlockData.id,
                fields: 'food_example_cards',
                mode: 'drawer'
            })} className="flex flex-col gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                {/* Ряд 1: карточки 0-2 (col-span-3, col-span-3, col-span-6 - последняя больше) */}
                <div className="flex flex-col lg:flex-row gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                    {foodExampleBlockData.food_example_cards.slice(0, 3).map((card, index) => {
                        const sizes: ("col-span-3" | "col-span-6")[] = ["col-span-3", "col-span-3", "col-span-6"];
                        return (
                            <FoodCard
                                key={card.id}
                                id={`row1-card${index + 1}`}
                                title={card.item.name}
                                size={sizes[index]}
                                isHovered={hoveredCardId === `row1-card${index + 1}`}
                                hasAnyHovered={hoveredCardId !== null && hoveredCardId.startsWith("row1")}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            />
                        );
                    })}
                </div>

                {/* Ряд 2: карточки 3-5 (col-span-6, col-span-3, col-span-3 - первая больше) */}
                <div className="flex flex-col lg:flex-row gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                    {foodExampleBlockData.food_example_cards.slice(3, 6).map((card, index) => {
                        const sizes: ("col-span-3" | "col-span-6")[] = ["col-span-6", "col-span-3", "col-span-3"];
                        return (
                            <FoodCard
                                key={card.id}
                                id={`row2-card${index + 1}`}
                                title={card.item.name}
                                size={sizes[index]}
                                isHovered={hoveredCardId === `row2-card${index + 1}`}
                                hasAnyHovered={hoveredCardId !== null && hoveredCardId.startsWith("row2")}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            />
                        );
                    })}
                </div>

                {/* Ряд 3: карточки 6-8 (col-span-3, col-span-3, col-span-6) */}
                <div className="flex flex-col lg:flex-row gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                    {foodExampleBlockData.food_example_cards.slice(6, 9).map((card, index) => {
                        const sizes: ("col-span-3" | "col-span-6")[] = ["col-span-3", "col-span-3", "col-span-6"];
                        return (
                            <FoodCard
                                key={card.id}
                                id={`row3-card${index + 1}`}
                                title={card.item.name}
                                size={sizes[index]}
                                isHovered={hoveredCardId === `row3-card${index + 1}`}
                                hasAnyHovered={hoveredCardId !== null && hoveredCardId.startsWith("row3")}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            />
                        );
                    })}
                </div>

            </div>
        </BlockWrapper>
    )
}

export default DecideMenuBlock;