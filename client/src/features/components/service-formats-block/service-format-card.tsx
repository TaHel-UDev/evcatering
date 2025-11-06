import Image from "next/image";
import { Text } from "@/features/shared/ui/text";
import Button from "@/features/shared/ui/button";
import Modal from "@/features/shared/ui/modal";
import PracticeAdviceModal from "@/features/shared/ui/practice-advice-modal/practice-advice-modal";
import { ModalBody } from "@/features/shared/ui/modal";
import QuestionForm from "../forms/question-form/question-form";

interface ServiceFormatCardProps {
    image: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonTextSecondary?: string;
}

function ServiceFormatCard({ image, title, description, buttonText = "Оставить заявку", buttonTextSecondary = "Практические советы" }: ServiceFormatCardProps) {
    return (
        <div className="col-span-1 flex flex-col gap-[1.5rem]">
            <Image
                src={image}
                alt="Формат обслуживания"
                width={628}
                height={230}
                quality={100}
                className="w-full object-cover rounded-[0.75rem]"
            />

            <div className="h-full flex flex-col justify-between gap-[1.5rem]">
                <div className="flex flex-col gap-[0.75rem]">
                    <Text as="p" variant="h4" className="font-medium text-dark">{title}</Text>
                    <Text as="p" variant="body-large" className="font-light text-dark">{description}</Text>
                </div>

                <div className="flex flex-col md:flex-row gap-[0.5rem]">
                    {buttonText &&
                        <Modal
                            trigger={<Button variant="primary" size="md" fullWidth>{buttonText}</Button>}
                            title={buttonText}
                            size="md"
                        >
                            <ModalBody>
                                <QuestionForm />
                            </ModalBody>
                        </Modal>
                    }
                    {buttonTextSecondary &&
                        <PracticeAdviceModal
                            trigger={<Button variant="secondary" size="md" fullWidth>{buttonTextSecondary}</Button>}
                            content={
                                <div>
                                    Контент практического совета
                                </div>
                            }
                        />
                    }
                </div>

            </div>
        </div>
    )
}

export default ServiceFormatCard;