"use client";

import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import { useState } from "react";
import WhyUsAnimatedImage from "./why-us-animated-image";
import WhyUsCard from "./why-us-card";
import { WhyUsBlockData } from "@/features/shared/types";
import { setAttr } from "../../../../lib/visual-editor";

function WhyUsBlock( { whyUsBlockData }: { whyUsBlockData: WhyUsBlockData } ) {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <BlockWrapper id="why-us-block">
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
                className="flex flex-col md:flex-row gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                <WhyUsAnimatedImage
                    image={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${whyUsBlockData.why_us_cards[activeIndex].item.image.id}`}
                    alt={whyUsBlockData.why_us_cards[activeIndex].item.title}
                    activeIndex={activeIndex}
                />

                <div className="w-full md:w-[40%] flex flex-col gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                    {whyUsBlockData.why_us_cards.map((item, index) => (
                        <WhyUsCard
                            key={item.id}
                            title={item.item.title}
                            description={item.item.subtitle}
                            isActive={activeIndex === index}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </div>

            </div>
        </BlockWrapper>
    )
}

export default WhyUsBlock;