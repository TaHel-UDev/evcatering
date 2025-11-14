import Button from "@/features/shared/ui/button";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import PracticeAdviceModal from "@/features/shared/ui/practice-advice-modal/practice-advice-modal";
import { Text } from "@/features/shared/ui/text";
import Image from "next/image";
import QuestionForm from "../forms/question-form/question-form";
import { DecideMenuBlockData } from "@/features/shared/types";
import { setAttr } from "../../../../lib/visual-editor";

function DecideMenuForm({ decideMenuBlockData }: { decideMenuBlockData: DecideMenuBlockData }) {
    return (
        <div className="flex flex-col xl:flex-row gap-[1rem] lg:gap-0 2xl:gap-0 mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]">
            <div className="w-full flex flex-col justify-between gap-[1rem] lg:gap-[1.2rem] xl:gap-[1.5rem] p-[1.2rem] lg:p-[1.5rem] 2xl:p-[2rem] bg-brown rounded-[0.75rem] xl:rounded-l-[0.75rem] xl:rounded-r-none">
                <div data-directus={setAttr({
                    collection: 'decide_menu_block',
                    item: decideMenuBlockData.id,
                    fields: 'subtitle',
                    mode: 'popover'
                })}>
                    <Text as="p" variant="body-large" className="font-light text-white">
                        {decideMenuBlockData.subtitle}
                    </Text>
                </div>

                <div data-directus={setAttr({
                    collection: 'decide_menu_block',
                    item: decideMenuBlockData.id,
                    fields: 'cta_button_text',
                    mode: 'popover'
                })}
                    className="w-full flex flex-col md:flex-row xl:flex-col gap-[0.5rem]"
                >
                    <Modal
                        trigger={<Button variant="primary" size="md" fullWidth>{decideMenuBlockData.cta_button_text}</Button>}
                        title={decideMenuBlockData.cta_button_text}
                        size="md"
                    >
                        <ModalBody>
                            <QuestionForm />
                        </ModalBody>
                    </Modal>
                    <div data-directus={setAttr({
                        collection: 'decide_menu_block',
                        item: decideMenuBlockData.id,
                        fields: 'advice_button_text, advice_content',
                        mode: 'popover'
                    })}
                        className="w-full"
                    >
                        <PracticeAdviceModal
                            trigger={<Button variant="white" size="md" fullWidth>{decideMenuBlockData.advice_button_text}</Button>}
                            content={
                                <div
                                    className="advice_content"
                                    dangerouslySetInnerHTML={{ __html: decideMenuBlockData.advice_content }}
                                />
                            }
                        />
                    </div>

                </div>
            </div>
            <div data-directus={setAttr({
                collection: 'decide_menu_block',
                item: decideMenuBlockData.id,
                fields: 'image',
                mode: 'popover'
            })} className="w-full h-full hidden xl:flex items-center justify-center">
                <Image
                    src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${decideMenuBlockData.image.id}`}
                    alt={decideMenuBlockData.title}
                    width={704}
                    height={333}
                    quality={100}
                    className="w-full object-cover min-h-[333px] rounded-r-[0.75rem]"
                />
            </div>
        </div>
    )
}

export default DecideMenuForm;