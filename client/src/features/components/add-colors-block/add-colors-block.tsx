import { AddColorsBlockProps } from "@/features/shared/types";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import Button from "@/features/shared/ui/button";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import { setAttr } from "@directus/visual-editing";
import Image from "next/image";
import FranchiseForm from "../forms/question-form/franchise-form";
import { Text } from "@/features/shared/ui/text";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/features/shared/ui/carousel/carousel";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

function AddColorsBlock({
    AddColorsBlockData
}: {
    AddColorsBlockData: AddColorsBlockProps
}) {
    return (
        <BlockWrapper>
            <div
                data-directus={setAttr({
                    collection: 'add_colors_block',
                    item: AddColorsBlockData.id,
                    fields: 'title, subtitle, add_colors_cards',
                    mode: 'drawer'
                })}
            >
                <BlockHeadline
                    title={AddColorsBlockData.title}
                />


                <div className="flex flex-col gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                    <Text as="p" variant="h5" className="text-dark">
                        {AddColorsBlockData.subtitle}
                    </Text>
                    <Carousel opts={{
                        align: "start",
                        loop: true,
                    }}
                        className="w-full">
                        <CarouselContent>
                            {AddColorsBlockData.add_colors_cards.map((card) => (
                                <CarouselItem key={card.id} className="basis-full lg:basis-1/3 xl:basis-1/4">
                                    <div
                                        className="group relative w-full lg:w-auto flex flex-col justify-end min-h-[200px] lg:min-h-[262px] rounded-[0.75rem] p-[1.2rem] lg:p-[1.5rem] 2xl:p-[2rem] overflow-hidden cursor-pointer"
                                        style={{
                                            backgroundImage: `url('${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${card.item.image}')`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                        }}
                                    >
                                        <Text as="p" variant="body-large" className="font-medium text-white z-[2] transition-all duration-300">
                                            {card.item.title}
                                        </Text>
                                        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[200%] h-[20%] transition-all duration-300 bg-black rounded-[0.75rem] blur-[40px]" />
                                    </div>
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
            </div>
        </BlockWrapper>
    )
}

export default AddColorsBlock