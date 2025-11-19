import { FPartnersBlockProps } from "@/features/shared/types";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import Button from "@/features/shared/ui/button";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import { setAttr } from "@directus/visual-editing";
import Image from "next/image";
import FranchiseForm from "../forms/question-form/franchise-form";
import { Text } from "@/features/shared/ui/text";

function FPartnersBlock({
    FPartnersBlockData
}: {
    FPartnersBlockData: FPartnersBlockProps
}) {
    return (
        <BlockWrapper>
            <div
                id="partners"
                data-directus={setAttr({
                    collection: 'f_partners_block',
                    item: FPartnersBlockData.id,
                    fields: 'title, f_partners_cards',
                    mode: 'drawer'
                })}
            >
                <BlockHeadline
                    title={FPartnersBlockData.title}
                />

                <div className="grid grid-cols-12 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                    {FPartnersBlockData.f_partners_cards.map((item) => (
                        <div key={item.id} className="col-span-12 lg:col-span-4 flex flex-col gap-[1.5rem] lg:gap-[1.5rem] 2xl:gap-[1.5rem]">
                            <div className="min-h-[272px] flex items-center justify-center">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${item.item.image}`}
                                    alt={item.item.image}
                                    width={491}
                                    height={433}
                                    className="w-full  rounded-[0.75rem]"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Text as="p" variant="h4" className="text-center">
                                    {item.item.title}
                                </Text>
                                <Text as="p" variant="body-large" className="text-center">
                                    {item.item.subtitle}
                                </Text>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </BlockWrapper>
    )
}

export default FPartnersBlock