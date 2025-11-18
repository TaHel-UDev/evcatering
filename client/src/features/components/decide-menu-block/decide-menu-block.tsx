import { useState } from "react";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import { Text } from "@/features/shared/ui/text";
import DecideMenuForm from "./decide-menu-form";
import FoodCard from "@/features/shared/ui/food-card/food-card";
import { DecideMenuBlockData, FoodExampleBlockData } from "@/features/shared/types";
import { setAttr } from "../../../../lib/visual-editor";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/features/shared/ui/carousel/carousel";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import ServiceFormatCard from "../service-formats-block/service-format-card";
import Button from "@/features/shared/ui/button";

function DecideMenuBlock({ decideMenuBlockData, foodExampleBlockData }: { decideMenuBlockData: DecideMenuBlockData, foodExampleBlockData: FoodExampleBlockData }) {
    const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

    const handleMouseEnter = (id: string) => {
        setHoveredCardId(id);
    };

    const handleMouseLeave = () => {
        setHoveredCardId(null);
    };

    const openGallery = (startIndex: number = 0) => {
        // Открываем Fancybox галерею программно
        if (typeof window !== 'undefined') {
            import("@fancyapps/ui").then((module) => {
                const { Fancybox } = module;
                Fancybox.show(
                    foodExampleBlockData.food_example_cards.map((card) => ({
                        src: `${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${card.item.image}?quality=100&width=2000`,
                        caption: card.item.name,
                    })),
                    {
                        // Опции галереи для больших изображений
                        startIndex: startIndex,
                        Image: {
                            zoom: true,
                            click: "toggleZoom",
                            wheel: "zoom",
                        },
                        Toolbar: {
                            display: {
                                left: [],
                                middle: [],
                                right: ["zoom", "slideshow", "close"],
                            },
                        },
                    } as any
                );
            });
        }
    };

    const handleCardClick = (cardIndex: number) => {
        openGallery(cardIndex);
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
            })} className="hidden md:flex flex-col gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                {/* Ряд 1: карточки 0-2 (col-span-3, col-span-3, col-span-6 - последняя больше) */}
                <div className="flex flex-col lg:flex-row gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                    {foodExampleBlockData.food_example_cards.slice(0, 3).map((card, index) => {
                        const sizes: ("col-span-3" | "col-span-6")[] = ["col-span-3", "col-span-3", "col-span-6"];
                        return (
                            <FoodCard
                                key={card.id}
                                image={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${card.item.image}`}
                                id={`row1-card${index + 1}`}
                                title={card.item.name}
                                size={sizes[index]}
                                isHovered={hoveredCardId === `row1-card${index + 1}`}
                                hasAnyHovered={hoveredCardId !== null && hoveredCardId.startsWith("row1")}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleCardClick(index)}
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
                                image={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${card.item.image}`}
                                id={`row2-card${index + 1}`}
                                title={card.item.name}
                                size={sizes[index]}
                                isHovered={hoveredCardId === `row2-card${index + 1}`}
                                hasAnyHovered={hoveredCardId !== null && hoveredCardId.startsWith("row2")}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleCardClick(3 + index)}
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
                                image={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${card.item.image}`}
                                id={`row3-card${index + 1}`}
                                title={card.item.name}
                                size={sizes[index]}
                                isHovered={hoveredCardId === `row3-card${index + 1}`}
                                hasAnyHovered={hoveredCardId !== null && hoveredCardId.startsWith("row3")}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleCardClick(6 + index)}
                            />
                        );
                    })}
                </div>

            </div>

            <div className="flex md:hidden">
                <Carousel opts={{
                    align: "start",
                    loop: true,
                }}
                    className="w-full">
                    <CarouselContent>
                        {foodExampleBlockData.food_example_cards.map((card, index) => (
                            <CarouselItem key={card.id} className="basis-full">
                                <FoodCard
                                    key={card.id}
                                    image={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${card.item.image}`}
                                    id={`food-example-card${card.id}`}
                                    title={card.item.name}
                                    size="col-span-3"
                                    isHovered={hoveredCardId === `food-example-card${card.id}`}
                                    hasAnyHovered={hoveredCardId !== null && hoveredCardId.startsWith("food-example")}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleCardClick(index)}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious size="sm">
                        <ArrowLeftIcon className="size-4" />
                    </CarouselPrevious>
                    <CarouselNext size="sm">
                        <ArrowRightIcon className="size-4" />
                    </CarouselNext>
                </Carousel>
            </div>

            {/* Кнопка "Посмотреть больше" */}
            <div className="flex justify-center mt-[1.5rem] lg:mt-[1.8rem] 2xl:mt-[2rem] mb-[3rem] lg:mb-[1.8rem] 2xl:mb-[2rem]">
                <Button
                    variant="primary"
                    size="md"
                    onClick={() => openGallery()}
                >
                    Посмотреть больше
                </Button>
            </div>
        </BlockWrapper>
    )
}

export default DecideMenuBlock;