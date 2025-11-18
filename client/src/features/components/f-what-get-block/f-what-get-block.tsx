import { WhatGetBlockProps } from "@/features/shared/types";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import Button from "@/features/shared/ui/button";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import NumericText from "@/features/shared/ui/numeric-text/numeric-text";
import { Text } from "@/features/shared/ui/text";
import { setAttr } from "@directus/visual-editing";
import Image from "next/image";
import FranchiseForm from "../forms/question-form/franchise-form";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/features/shared/ui/carousel/carousel";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

function WhatGetBlock({
    WhatGetBlockData
}: {
    WhatGetBlockData: WhatGetBlockProps
}) {
    return (
        <BlockWrapper>
            <div
                data-directus={setAttr({
                    collection: 'what_get_block',
                    item: WhatGetBlockData.id,
                    fields: 'title, what_get_block_cards',
                    mode: 'drawer'
                })}
            >
                <BlockHeadline
                    title={WhatGetBlockData.title}
                />

                <div>
                    <Carousel opts={{
                        align: "start",
                        loop: true,
                    }}
                        className="w-full">
                        <CarouselContent>
                            {WhatGetBlockData.what_get_block_cards.sort((a, b) => a.item.position - b.item.position).map((item) => (
                                <CarouselItem key={item.id} className="basis-full">
                                    <div className="h-full grid grid-cols-12 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem] bg-soft-gray rounded-[0.75rem] p-[1.2rem] lg:p-[1.5rem] 2xl:p-[2rem]">
                                        <div className="col-span-12 lg:col-span-7 flex flex-col justify-between gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem] order-2 lg:order-1">
                                            <div
                                                className="advice_content"
                                                dangerouslySetInnerHTML={{ __html: item.item.content }}
                                            />
                                            <Modal
                                                trigger={<Button variant="primary" size="md" fullWidth>{item.item.cta_text_button}</Button>}
                                                title="Оформить заявку"
                                                size="md"
                                            >
                                                <ModalBody>
                                                    <FranchiseForm />
                                                </ModalBody>
                                            </Modal>
                                        </div>
                                        <div className="col-span-12 lg:col-span-5 h-full order-1 lg:order-2">
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${item.item.image}`}
                                                alt={item.item.image}
                                                width={491}
                                                height={433}
                                                className="w-full object-cover rounded-[0.75rem]"
                                            />
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious size="sm" className="">
                            <ArrowLeftIcon className="size-4" />
                        </CarouselPrevious>
                        <CarouselNext size="sm" className="">
                            <ArrowRightIcon className="size-4" />
                        </CarouselNext>
                    </Carousel>
                </div>
            </div>
        </BlockWrapper>
    )
}

export default WhatGetBlock