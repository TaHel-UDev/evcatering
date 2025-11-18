"use client";

import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import { useState } from "react";
import { WhyUsBlockData } from "@/features/shared/types";
import { setAttr } from "../../../../lib/visual-editor";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/features/shared/ui/carousel/carousel";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Text } from "@/features/shared/ui/text";
import Image from "next/image";

function WhyUsBlock({ whyUsBlockData }: { whyUsBlockData: WhyUsBlockData }) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <BlockWrapper>
            <div data-directus={setAttr({
                collection: 'why_us_block',
                item: whyUsBlockData.id,
                fields: 'title',
                mode: 'popover'
            })}>
                <BlockHeadline
                    title={whyUsBlockData.title}
                />
            </div>

            <div
                data-directus={setAttr({
                    collection: 'why_us_block',
                    item: whyUsBlockData.id,
                    fields: 'why_us_cards',
                    mode: 'drawer'
                })}
                className="grid grid-cols-1 lg:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                {whyUsBlockData.why_us_cards.map((item) => {
                    console.log('Why Us Card:', item);
                    console.log('Images:', item.item?.images);

                    return (
                        <div key={item.id} className="flex flex-col gap-4">
                            <Text as="p" variant="h5" className="font-medium text-dark">
                                {item.item.title}
                            </Text>
                            {item.item.images && item.item.images.length > 0 ? (
                                <Carousel opts={{
                                    align: "start",
                                    loop: true,
                                }}
                                >
                                    <CarouselContent>
                                        {item.item.images.map((image) => (
                                            <CarouselItem key={image.id} className="basis-full">
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${image.directus_files_id}`}
                                                    alt={item.item.title || 'Image'}
                                                    width={638}
                                                    height={495}
                                                    className="w-full h-auto rounded-[0.75rem]"
                                                />
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                    <CarouselPrevious size="sm" className="translate-x-[100%]">
                                        <ArrowLeftIcon className="size-4" />
                                    </CarouselPrevious>
                                    <CarouselNext size="sm" className="-translate-x-[100%]">
                                        <ArrowRightIcon className="size-4" />
                                    </CarouselNext>
                                </Carousel>
                            ) : (
                                <p className="text-red-500">No images found</p>
                            )}
                        </div>
                    );
                })}
            </div>

        </BlockWrapper >
    )
}

export default WhyUsBlock;