import { WhoSuitableBlockProps } from "@/features/shared/types";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import Button from "@/features/shared/ui/button";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import { setAttr } from "@directus/visual-editing";
import Image from "next/image";
import FranchiseForm from "../forms/question-form/franchise-form";
import NumericText from "@/features/shared/ui/numeric-text/numeric-text";

function FWhoSuitableBlock({
    WhoSuitableBlockData
}: {
    WhoSuitableBlockData: WhoSuitableBlockProps
}) {
    return (
        <BlockWrapper>
            <div
                data-directus={setAttr({
                    collection: 'who_suitable_block',
                    item: WhoSuitableBlockData.id,
                    fields: 'title, subtitle, cta_button_text, image, who_suitable_points',
                    mode: 'drawer'
                })}
            >
                <BlockHeadline
                    title={WhoSuitableBlockData.title}
                    description={WhoSuitableBlockData.subtitle}
                />

                <div
                    className="grid grid-cols-12 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]"
                >
                    <div className="col-span-12 lg:col-span-6">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${WhoSuitableBlockData.image.id}`}
                            alt={WhoSuitableBlockData.title}
                            width={491}
                            height={433}
                            className="w-full object-cover rounded-[0.75rem]"
                        />
                    </div>
                    <div className="col-span-12 lg:col-span-6 flex flex-col justify-between gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                        <div>
                            {WhoSuitableBlockData.who_suitable_points.sort((a, b) => a.item.point - b.item.point).map((item) => (
                                <NumericText
                                    key={item.item.id}
                                    number={item.item.point}
                                    description={item.item.text}
                                />
                            ))}
                        </div>
                        <Modal
                            trigger={<Button variant="primary" size="md">{WhoSuitableBlockData.cta_button_text}</Button>}
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

export default FWhoSuitableBlock