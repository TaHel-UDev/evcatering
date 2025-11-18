import clsx from "clsx";
import { Text } from "@/features/shared/ui/text";
import Button from "@/features/shared/ui/button";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import QuestionForm from "@/features/components/forms/question-form/question-form";
import { FirstScreenData } from "@/features/shared/types";
import { setAttr } from "../../../../lib/visual-editor";

function FirstMainScreen({ 
    firstScreenData 
}: { 
    firstScreenData: FirstScreenData 
}) {
    return (
        <div
            className=""
            style={{
                backgroundImage: `url('${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${firstScreenData.background_image.id}.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            data-directus={setAttr({
                collection: 'first_screen',
                item: firstScreenData.id,
                fields: 'background_image',
                mode: 'popover'
            })}
        >
            <section
                className={clsx(
                    "xl:max-w-[1440px] mx-auto",
                    "pt-[calc(42px+48px+56px)] lg:pt-[calc(42px+64px+56px)] xl:pt-[calc(42px+56px+64px)] pb-[48px] lg:pb-[64px] xl:pb-[42px] px-[24px] lg:px-[48px] 2xl:px-[80px]"
                )}
            >
                <div className="flex flex-col gap-[1.5rem] justify-between min-h-[500px]">
                    <div className="flex flex-col gap-[1.5rem]">
                        {/* Visual Editor: заголовок и подзаголовок */}
                        <div 
                            className="flex flex-col gap-[0.75rem]"
                            data-directus={setAttr({
                                collection: 'first_screen',
                                item: firstScreenData.id,
                                fields: ['title', 'subtitle'],
                                mode: 'popover'
                            })}
                        >
                            <Text as="h1" variant="h1" className="text-white">
                                {firstScreenData.title}
                            </Text>
                            <Text as="p" variant="h4" className="font-light text-white">
                                {firstScreenData.subtitle}
                            </Text>
                        </div>

                        {/* Visual Editor: список преимуществ */}
                        <div 
                            className="flex flex-col gap-[0.75rem]"
                            data-directus={setAttr({
                                collection: 'first_screen',
                                item: firstScreenData.id,
                                fields: 'advantages',
                                mode: 'drawer'
                            })}
                        >
                            {firstScreenData.advantages?.map((advantage) => (
                                <Text key={advantage.id} as="p" variant="body-large" className="font-light text-dark p-[1.25rem_2rem] bg-white/60 rounded-[0.75rem] w-fit">
                                    {`• ${advantage.item.text}`}
                                </Text>
                            ))}
                        </div>
                    </div>

                    {/* Visual Editor: текст кнопки */}
                    <div 
                        className="flex flex-col md:flex-row gap-[0.5rem]"
                        data-directus={setAttr({
                            collection: 'first_screen',
                            item: firstScreenData.id,
                            fields: 'button_text',
                            mode: 'popover'
                        })}
                    >
                        <Modal
                            trigger={<Button variant="primary" size="lg">{firstScreenData.button_text}</Button>}
                            title="Оформить заявку"
                            size="md"
                        >
                            <ModalBody>
                                <QuestionForm />
                            </ModalBody>
                        </Modal>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default FirstMainScreen;