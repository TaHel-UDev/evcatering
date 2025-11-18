import { ConditionsBlockProps } from "@/features/shared/types";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import Button from "@/features/shared/ui/button";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import { setAttr } from "@directus/visual-editing";
import Image from "next/image";
import FranchiseForm from "../forms/question-form/franchise-form";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/features/shared/ui/carousel/carousel";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Text } from "@/features/shared/ui/text";

function FConditionsBlock({
    ConditionsBlockData
}: {
    ConditionsBlockData: ConditionsBlockProps
}) {
    return (
        <BlockWrapper>
            <div
                id="conditions"
                data-directus={setAttr({
                    collection: 'conditions_block',
                    item: ConditionsBlockData.id,
                    fields: 'title, conditions_block_cards',
                    mode: 'drawer'
                })}
            >
                <BlockHeadline
                    title={ConditionsBlockData.title}
                />

                <div className="flex flex-col gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                    {ConditionsBlockData.conditions_block_cards.map((item) => (
                        <div
                            key={item.id}
                            className="grid grid-cols-12 border border-brown rounded-[0.75rem] items-center"
                        >
                            <div className="flex flex-col justify-center h-full col-span-12 lg:col-span-5 bg-brown p-[1.2rem] lg:p-[1.5rem] 2xl:p-[2rem] rounded-[0.75rem_0.75rem_0_0] lg:rounded-[0.75rem_0_0_0.75rem]">
                                <Text as="p" variant="lead" className="text-white">
                                    {item.item.title}
                                </Text>
                            </div>

                            <div className="flex flex-col justify-center h-full col-span-12 lg:col-span-7 p-[1.2rem] lg:p-[1.5rem] 2xl:p-[2rem]">
                                <div
                                    className="advice_content"
                                    dangerouslySetInnerHTML={{ __html: item.item.description }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </BlockWrapper>
    )
}

export default FConditionsBlock