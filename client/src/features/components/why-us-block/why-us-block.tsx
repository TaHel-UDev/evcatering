"use client";

import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import { useState } from "react";
import { whyUsData } from "./why-us-data";
import WhyUsAnimatedImage from "./why-us-animated-image";
import WhyUsCard from "./why-us-card";

function WhyUsBlock() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <BlockWrapper>
            <BlockHeadline
                title="Почему мы?"
            />

            <div className="flex flex-col md:flex-row gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                <WhyUsAnimatedImage
                    image={whyUsData[activeIndex].image}
                    alt={whyUsData[activeIndex].title}
                    activeIndex={activeIndex}
                />

                <div className="w-full md:w-[40%] flex flex-col gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                    {whyUsData.map((item, index) => (
                        <WhyUsCard
                            key={item.id}
                            title={item.title}
                            description={item.description}
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