import clsx from "clsx";
import { Text } from "@/features/shared/ui/text";
import Button from "@/features/shared/ui/button";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import QuestionForm from "@/features/components/forms/question-form/question-form";
import { FFooterBlockProps, FMainScreen } from "@/features/shared/types";
import { setAttr } from "../../../../lib/visual-editor";import FranchiseForm from "../forms/question-form/franchise-form";
;

function FFirstScreen({
    FMainScreenData,
    FFooterBlockData
}: {
    FMainScreenData: FMainScreen,
    FFooterBlockData: FFooterBlockProps
}) {
    return (
        <div
            className="min-h-[600px] flex flex-col justify-center"
            style={{
                backgroundImage: `url('${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${FMainScreenData.background.id}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            data-directus={setAttr({
                collection: 'f_main_screen',
                item: FMainScreenData.id,
                fields: 'background',
                mode: 'drawer'
            })}
        >
            <section
                data-directus={setAttr({
                    collection: 'f_main_screen',
                    item: FMainScreenData.id,
                    fields: 'title, description, cta_button_text',
                    mode: 'drawer'
                })}
                className={clsx(
                    "xl:max-w-[1440px] mx-auto flex flex-col w-full",
                    "pt-[calc(42px+48px+56px)] lg:pt-[calc(42px+64px+56px)] xl:pt-[calc(42px+56px+64px)] pb-[48px] lg:pb-[64px] xl:pb-[42px] px-[24px] lg:px-[48px] 2xl:px-[80px]"
                )}
            >
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-4 w-full">
                        <Text as="h1" variant="h1" className="text-white font-bold">
                            {FMainScreenData.title}
                        </Text>
                        <Text as="p" variant="h4" className="font-light text-white max-w-[680px]">
                            {FMainScreenData.description}
                        </Text>
                    </div>
                    <Modal
                        trigger={<Button variant="primary" size="lg" className="w-fit">{FMainScreenData.cta_button_text}</Button>}
                        title="Получить финансовую модель"
                        size="md"
                    >
                        <ModalBody>
                            <FranchiseForm email={FFooterBlockData.mail}/>
                        </ModalBody>
                    </Modal>
                </div>
            </section >
        </div >
    )
}

export default FFirstScreen;