import Button from "@/features/shared/ui/button";
import Modal, { ModalBody } from "@/features/shared/ui/modal";
import PracticeAdviceModal from "@/features/shared/ui/practice-advice-modal/practice-advice-modal";
import { Text } from "@/features/shared/ui/text";
import Image from "next/image";
import QuestionForm from "../forms/question-form/question-form";

function DecideMenuForm() {
    return (
        <div className="flex flex-col xl:flex-row gap-[1rem] lg:gap-0 2xl:gap-0 mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]">
            <div className="w-full flex flex-col justify-between gap-[1rem] lg:gap-[1.2rem] xl:gap-[1.5rem] p-[1.2rem] lg:p-[1.5rem] 2xl:p-[2rem] bg-brown rounded-[0.75rem] xl:rounded-l-[0.75rem] xl:rounded-r-none">
                <Text as="p" variant="body-large" className="font-light text-white">
                    В хорошем меню важен правильный ассортимент блюд. А их объем должен быть достаточным, но не чрезмерным. <br />
                    Ну и здесь, конечно же, никаких компромиссов, только великолепный вкус и неизменная эстетика!
                </Text>

                <div className="flex flex-col md:flex-row xl:flex-col gap-[0.5rem]">
                    <Modal
                        trigger={<Button variant="primary" size="md">Получить подборку меню под мероприятие</Button>}
                        title="Получить подборку меню под мероприятие"
                        size="md"
                    >
                        <ModalBody>
                            <QuestionForm />
                        </ModalBody>
                    </Modal>
                    <PracticeAdviceModal
                        trigger={<Button variant="white" size="md" fullWidth>Практические советы</Button>}
                        content={
                            <div>
                                Контент практического совета
                            </div>
                        }
                    />
                </div>
            </div>
            <div className="w-full h-full hidden xl:flex items-center justify-center">
                <Image
                    src="https://placehold.co/704x333.png"
                    alt="Decide Menu Block"
                    width={704}
                    height={333}
                    quality={100}
                    className="w-full object-cover rounded-r-[0.75rem]"
                />
            </div>
        </div>
    )
}

export default DecideMenuForm;