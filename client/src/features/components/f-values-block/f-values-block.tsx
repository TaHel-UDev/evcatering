import { FValuesBlockProps } from "@/features/shared/types";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import Button from "@/features/shared/ui/button";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import { setAttr } from "@directus/visual-editing";
import { Text } from "@/features/shared/ui/text";
import Image from "next/image";
import FranchiseForm from "../forms/question-form/franchise-form";
import clsx from "clsx";

function FValuesBlock({
    FValuesBlockData
}: {
    FValuesBlockData: FValuesBlockProps
}) {
    return (
        <BlockWrapper>
            <div
                data-directus={setAttr({
                    collection: 'f_values_block',
                    item: FValuesBlockData.id,
                    fields: 'title, subtitle, f_values_cards',
                    mode: 'drawer'
                })}
            >
                <BlockHeadline
                    title={FValuesBlockData.title}
                />

                <div className="flex flex-col gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                    <Text as="p" variant="h4">
                        {FValuesBlockData.subtitle}
                    </Text>

                    <div className="grid grid-cols-12 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                        {FValuesBlockData.f_values_cards.map((item) => (
                            <div key={item.id} className={clsx(
                                "flex flex-col gap-2 bg-brown rounded-[0.75rem] p-[1.2rem] lg:p-[1.5rem] 2xl:p-[2rem]",
                                {
                                    "col-span-12 lg:col-span-3": item.item.size === "3/12",
                                    "col-span-12 lg:col-span-4": item.item.size !== "3/12"
                                }
                            )}>
                                <Text as="p" variant="h5" className="text-white">
                                    {item.item.title}
                                </Text>
                                <Text as="p" variant="body-large" className="text-white">
                                    {item.item.subtitle}
                                </Text>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </BlockWrapper>
    )
}

export default FValuesBlock
