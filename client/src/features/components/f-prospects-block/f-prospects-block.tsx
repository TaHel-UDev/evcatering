import { FProspectsBlockProps } from "@/features/shared/types";
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

function FProspectsBlock({
    FProspectsBlockData
}: {
    FProspectsBlockData: FProspectsBlockProps
}) {
    return (
        <BlockWrapper>
            <div
                data-directus={setAttr({
                    collection: 'f_prospects_block',
                    item: FProspectsBlockData.id,
                    fields: 'title, content, cta_button_text, f_prospects_block_points',
                    mode: 'drawer'
                })}
            >
                <BlockHeadline
                    title={FProspectsBlockData.title}
                />

                <div
                    className="grid grid-cols-12 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]"
                >
                    <div className="col-span-12 flex flex-col justify-between gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                        <div className="flex flex-col gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                            <div
                                className="2xl:text-[2.25rem] leading-[1] lg:text-[1.75rem] md:text-[1.375rem] sm:text-[1.5rem] max-sm:text-[1.375rem]"
                                dangerouslySetInnerHTML={{ __html: FProspectsBlockData?.content }}
                            />
                            <div className="flex flex-col gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                                {FProspectsBlockData.f_prospects_block_points.sort((a, b) => a.item.position - b.item.position).map((item) => (
                                    <div key={item.id} className="flex flex-row items-center gap-3">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${item.item.icon}`}
                                            alt={FProspectsBlockData.title}
                                            width={50}
                                            height={50}
                                            className="w-[36px] h-[36px] lg:w-[50px] lg:h-[50px] object-cover rounded-[0.75rem]"
                                        />
                                        <Text as="p" variant="body-large">
                                            {item.item.text}
                                        </Text>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Modal
                            trigger={<Button variant="primary" size="md" fullWidth>{FProspectsBlockData.cta_button_text}</Button>}
                            title="Оформить заявку"
                            size="md"
                        >
                            <ModalBody>
                                <FranchiseForm />
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            </div>
        </BlockWrapper>
    )
}

export default FProspectsBlock