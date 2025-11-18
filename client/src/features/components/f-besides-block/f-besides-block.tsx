import { FBesidesBlockProps } from "@/features/shared/types";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import Button from "@/features/shared/ui/button";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import { setAttr } from "@directus/visual-editing";
import Image from "next/image";
import FranchiseForm from "../forms/question-form/franchise-form";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/features/shared/ui/carousel/carousel";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import NumericText from "@/features/shared/ui/numeric-text/numeric-text";

function FBesidesBlock({
    FBesidesBlockData
}: {
    FBesidesBlockData: FBesidesBlockProps
}) {
    return (
        <BlockWrapper>
            <div
                data-directus={setAttr({
                    collection: 'f_besides_block',
                    item: FBesidesBlockData.id,
                    fields: 'title, cta_button_text, image, f_besides_block_points',
                    mode: 'drawer'
                })}
            >
                <BlockHeadline
                    title={FBesidesBlockData.title}
                />

                <div
                    className="grid grid-cols-12 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]"
                >
                    <div className="col-span-12 lg:col-span-6">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${FBesidesBlockData.image.id}`}
                            alt={FBesidesBlockData.title}
                            width={491}
                            height={433}
                            className="w-full object-cover rounded-[0.75rem]"
                        />
                    </div>
                    <div className="col-span-12 lg:col-span-6 flex flex-col justify-between gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                        <div>
                            {FBesidesBlockData.f_besides_block_points.sort((a, b) => a.item.point - b.item.point).map((item) => (
                                <NumericText
                                    key={item.item.id}
                                    number={item.item.point}
                                    description={item.item.text}
                                />
                            ))}
                        </div>
                        <Modal
                            trigger={<Button variant="primary" size="md">{FBesidesBlockData.cta_button_text}</Button>}
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

export default FBesidesBlock


