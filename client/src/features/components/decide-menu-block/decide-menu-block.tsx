import { useState } from "react";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import { Text } from "@/features/shared/ui/text";
import DecideMenuForm from "./decide-menu-form";
import FoodCard from "@/features/shared/ui/food-card/food-card";

function DecideMenuBlock() {
    const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

    const handleMouseEnter = (id: string) => {
        setHoveredCardId(id);
    };

    const handleMouseLeave = () => {
        setHoveredCardId(null);
    };

    return (
        <BlockWrapper>
            <BlockHeadline
                title="Определимся с меню"
            />

            <DecideMenuForm />

            <Text as="h3" variant="h3" className="font-medium text-brown mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]">
                Некоторые примеры наших блюд
            </Text>

            <div className="flex flex-col gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                <div className="flex flex-col lg:flex-row gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                    <FoodCard
                        id="row1-card1"
                        title="Блюдо"
                        size="col-span-3"
                        isHovered={hoveredCardId === "row1-card1"}
                        hasAnyHovered={hoveredCardId !== null && hoveredCardId.startsWith("row1")}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                    <FoodCard
                        id="row1-card2"
                        title="Блюдо"
                        size="col-span-3"
                        isHovered={hoveredCardId === "row1-card2"}
                        hasAnyHovered={hoveredCardId !== null && hoveredCardId.startsWith("row1")}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                    <FoodCard
                        id="row1-card3"
                        title="Блюдо"
                        size="col-span-6"
                        isHovered={hoveredCardId === "row1-card3"}
                        hasAnyHovered={hoveredCardId !== null && hoveredCardId.startsWith("row1")}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />

                </div>

                <div className="flex flex-col lg:flex-row gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                    <FoodCard
                        id="row2-card1"
                        title="Блюдо"
                        size="col-span-4"
                        isHovered={hoveredCardId === "row2-card1"}
                        hasAnyHovered={hoveredCardId !== null && hoveredCardId.startsWith("row2")}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                    <FoodCard
                        id="row2-card2"
                        title="Блюдо"
                        size="col-span-4"
                        isHovered={hoveredCardId === "row2-card2"}
                        hasAnyHovered={hoveredCardId !== null && hoveredCardId.startsWith("row2")}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                    <FoodCard
                        id="row2-card3"
                        title="Блюдо"
                        size="col-span-4"
                        isHovered={hoveredCardId === "row2-card3"}
                        hasAnyHovered={hoveredCardId !== null && hoveredCardId.startsWith("row2")}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />

                </div>

                <div className="flex flex-col lg:flex-row gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                    <FoodCard
                        id="row3-card1"
                        title="Блюдо"
                        size="col-span-3"
                        isHovered={hoveredCardId === "row3-card1"}
                        hasAnyHovered={hoveredCardId !== null && hoveredCardId.startsWith("row3")}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                    <FoodCard
                        id="row3-card2"
                        title="Блюдо"
                        size="col-span-3"
                        isHovered={hoveredCardId === "row3-card2"}
                        hasAnyHovered={hoveredCardId !== null && hoveredCardId.startsWith("row3")}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                    <FoodCard
                        id="row3-card3"
                        title="Блюдо"
                        size="col-span-6"
                        isHovered={hoveredCardId === "row3-card3"}
                        hasAnyHovered={hoveredCardId !== null && hoveredCardId.startsWith("row3")}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />

                </div>

            </div>
        </BlockWrapper>
    )
}

export default DecideMenuBlock;