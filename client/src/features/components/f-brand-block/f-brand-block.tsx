import { FBrandBlockProps } from "@/features/shared/types";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import Button from "@/features/shared/ui/button";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import { setAttr } from "@directus/visual-editing";
import Image from "next/image";
import FranchiseForm from "../forms/question-form/franchise-form";
import { Text } from "@/features/shared/ui/text";

function FBrandBlock({
    FBrandBlockData
}: {
    FBrandBlockData: FBrandBlockProps
}) {
    return (
        <BlockWrapper>
            <div
                data-directus={setAttr({
                    collection: 'f_brand_block',
                    item: FBrandBlockData.id,
                    fields: 'title, subtitle, cta_button_text, image_1, image_2',
                    mode: 'drawer'
                })}
            >
                <BlockHeadline
                    title={FBrandBlockData.title}
                />


                <div className="flex flex-col gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                    <Text as="p" variant="h4">
                        {FBrandBlockData.subtitle}
                    </Text>
                    <div className="w-full flex flex-col lg:flex-row gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                        <div className="w-full">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${FBrandBlockData.image_1.id}`}
                                alt={FBrandBlockData.image_1.id}
                                width={491}
                                height={433}
                                className="w-full rounded-[0.75rem]"
                            />
                        </div>
                        <div className="w-full">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${FBrandBlockData.image_2.id}`}
                                alt={FBrandBlockData.image_2.id}
                                width={491}
                                height={433}
                                className="w-full rounded-[0.75rem]"
                            />
                        </div>
                    </div>
                    <Modal
                        trigger={<Button variant="primary" size="md" fullWidth>{FBrandBlockData.cta_button_text}</Button>}
                        title="Оформить заявку"
                        size="md"
                    >
                        <ModalBody>
                            <FranchiseForm />
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        </BlockWrapper>
    )
}

export default FBrandBlock