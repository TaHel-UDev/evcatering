import { FInvestmentBlockProps } from "@/features/shared/types";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import Button from "@/features/shared/ui/button";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import { setAttr } from "@directus/visual-editing";
import Image from "next/image";
import FranchiseForm from "../forms/question-form/franchise-form";
import { Text } from "@/features/shared/ui/text";

function FInvestmentBlock({
    FInvestmentBlockData
}: {
    FInvestmentBlockData: FInvestmentBlockProps
}) {
    return (
        <BlockWrapper>
            <div
                data-directus={setAttr({
                    collection: 'f_investment_block',
                    item: FInvestmentBlockData.id,
                    fields: 'title, subtitle, cta_button_text, image, f_investment_block_points',
                    mode: 'drawer'
                })}
            >
                <BlockHeadline
                    title={FInvestmentBlockData.title}
                />

                <div
                    className="grid grid-cols-12 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]"
                >
                    <div className="col-span-12 lg:col-span-6 flex flex-col justify-between gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                        <div className="flex flex-col gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                            <Text as="p" variant="h3">
                                {FInvestmentBlockData.subtitle}
                            </Text>
                            <div className="flex flex-col gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                                {FInvestmentBlockData.f_investment_block_points.sort((a, b) => a.item.position - b.item.position).map((item) => (
                                    <div key={item.id} className="flex flex-row items-center gap-3">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${item.item.icon}`}
                                            alt={FInvestmentBlockData.title}
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
                            trigger={<Button variant="primary" size="md" fullWidth>{FInvestmentBlockData.cta_button_text}</Button>}
                            title="Оформить заявку"
                            size="md"
                        >
                            <ModalBody>
                                <FranchiseForm />
                            </ModalBody>
                        </Modal>
                    </div>

                    <div className="col-span-12 lg:col-span-6">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${FInvestmentBlockData.image.id}`}
                            alt={FInvestmentBlockData.title}
                            width={491}
                            height={433}
                            className="w-full h-full object-cover rounded-[0.75rem]"
                        />
                    </div>
                </div>
            </div>
        </BlockWrapper>
    )
}

export default FInvestmentBlock