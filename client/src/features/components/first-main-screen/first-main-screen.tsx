import clsx from "clsx";
import { Text } from "@/features/shared/ui/text";
import Button from "@/features/shared/ui/button";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import QuestionForm from "@/features/components/forms/question-form/question-form";

function FirstMainScreen() {
    return (
        <div
            className=""
            style={{
                backgroundImage: "url('/static/main-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <section
                className={clsx(
                    "xl:max-w-[1440px] mx-auto",
                    "pt-[calc(42px+48px+56px)] lg:pt-[calc(42px+64px+56px)] xl:pt-[calc(42px+56px+64px)] pb-[48px] lg:pb-[64px] xl:pb-[42px] px-[24px] lg:px-[48px] 2xl:px-[80px]"
                )}
            >
                <div className="flex flex-col gap-[1.5rem] justify-between min-h-[500px]">
                    <div className="flex flex-col gap-[1.5rem]">
                        <div className="flex flex-col gap-[0.75rem]">
                            <Text as="h1" variant="h1" className="text-white">
                                Эстетика Вкуса
                            </Text>
                            <Text as="p" variant="h4" className="font-light text-white">
                                Великолепный вкус и неизменная эстетика
                            </Text>
                        </div>

                        <div className="flex flex-col gap-[0.75rem]">
                            <Text as="p" variant="body-large" className="font-light text-dark p-[1.25rem_2rem] bg-white/60 rounded-[0.75rem] w-fit">
                                • 100+ готовых сетов и индивидуальные решения
                            </Text>

                            <Text as="p" variant="body-large" className="font-light text-dark p-[1.25rem_2rem] bg-white/60 rounded-[0.75rem] w-fit">
                                • Подготовим предложение за 1 час
                            </Text>

                            <Text as="p" variant="body-large" className="font-light text-dark p-[1.25rem_2rem] bg-white/60 rounded-[0.75rem] w-fit">
                                • Делаем то, что обещаем
                            </Text>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-[0.5rem]">
                        <Modal
                            trigger={<Button variant="primary" size="lg">Оформить заявку</Button>}
                            title="Оформить заявку"
                            size="md"
                        >
                            <ModalBody>
                                <QuestionForm />
                            </ModalBody>
                        </Modal>
                        <Button variant="white" size="lg">
                            Получить расчёт
                        </Button>
                    </div>
                </div>



            </section>
        </div>
    )
}

export default FirstMainScreen;