import { FAbleToWorkBlockProps, WhatGetBlockProps } from "@/features/shared/types";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import Button from "@/features/shared/ui/button";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import { setAttr } from "@directus/visual-editing";
import Image from "next/image";
import FranchiseForm from "../forms/question-form/franchise-form";
import { Text } from "@/features/shared/ui/text";

function FAbleToWorkBlock({
    FAbleToWorkBlockData
}: {
    FAbleToWorkBlockData: FAbleToWorkBlockProps
}) {
    return (
        <BlockWrapper>
            <div
                data-directus={setAttr({
                    collection: 'f_able_to_work_block',
                    item: FAbleToWorkBlockData.id,
                    fields: 'title, cta_button_text, image, f_able_to_work_block_cards',
                    mode: 'drawer'
                })}
            >
                <BlockHeadline
                    title={FAbleToWorkBlockData.title}
                />

                <div
                    className="flex flex-col lg:flex-row gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]"
                >
                    <div className="w-full flex flex-col justify-between gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                        <div className="flex flex-col justify-between gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                            {FAbleToWorkBlockData.f_able_to_work_block_cards.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex flex-col gap-2"
                                >
                                    <Text as="p" variant="h4">
                                        {item.item.title}
                                    </Text>
                                    {item.item.subtitle &&
                                        <Text as="p" variant="lead" className="font-light">
                                            {item.item.subtitle}
                                        </Text>
                                    }
                                </div>
                            ))}
                        </div>
                        <Modal
                            trigger={<Button variant="primary" size="md">{FAbleToWorkBlockData.cta_button_text}</Button>}
                            title="Оформить заявку"
                            size="md"
                        >
                            <ModalBody>
                                <FranchiseForm />
                            </ModalBody>
                        </Modal>
                    </div>

                    <div className="w-full lg:w-[50%] h-fit">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${FAbleToWorkBlockData.image.id}`}
                            alt={FAbleToWorkBlockData.title}
                            width={491}
                            height={433}
                            className="w-full h-fit object-cover rounded-[0.75rem]"
                        />
                    </div>

                </div>
            </div>
        </BlockWrapper>
    )
}

export default FAbleToWorkBlock