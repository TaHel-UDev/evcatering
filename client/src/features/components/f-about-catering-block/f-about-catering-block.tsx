import { FAboutCateringBlockProps, FValuesBlockProps } from "@/features/shared/types";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import Button from "@/features/shared/ui/button";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import { setAttr } from "@directus/visual-editing";
import { Text } from "@/features/shared/ui/text";
import Image from "next/image";
import FranchiseForm from "../forms/question-form/franchise-form";
import clsx from "clsx";

function FAboutCateringBlock({
    FAboutCateringBlockData
}: {
    FAboutCateringBlockData: FAboutCateringBlockProps
}) {
    return (
        <BlockWrapper>
            <div
                data-directus={setAttr({
                    collection: 'f_about_catering_block',
                    item: FAboutCateringBlockData.id,
                    fields: 'title, subtitle',
                    mode: 'drawer'
                })}
            >
                <BlockHeadline
                    title={FAboutCateringBlockData.title}
                />

                <div className="flex flex-col gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                    <Text as="p" variant="h4">
                        {FAboutCateringBlockData.subtitle}
                    </Text>
                </div>
            </div>
        </BlockWrapper>
    )
}

export default FAboutCateringBlock
