import Image from "next/image";
import { Text } from "@/features/shared/ui/text";
import Button from "@/features/shared/ui/button";
import Modal from "@/features/shared/ui/modal";
import PracticeAdviceModal from "@/features/shared/ui/practice-advice-modal/practice-advice-modal";
import { ModalBody } from "@/features/shared/ui/modal";
import QuestionForm from "../forms/question-form/question-form";
import { ServiceFormat } from "@/features/shared/types";
import { setAttr } from "../../../../lib/visual-editor";

function ServiceFormatCard({ serviceFormat }: { serviceFormat: ServiceFormat }) {
    return (
        <div 
            className="col-span-1 flex flex-col gap-[1.5rem]"
            data-directus={setAttr({
                collection: 'service_formats',
                item: serviceFormat.item.id,
                fields: ['name', 'description', 'image', 'cta_button_text', 'advice_button_text', 'advice_content'],
                mode: 'drawer'
            })}
        >
            <Image
                src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${serviceFormat.item.image}.png`}
                alt={serviceFormat.item.name}
                width={628}
                height={230}
                quality={100}
                className="w-full object-cover max-h-[230px] rounded-[0.75rem]"
                unoptimized={true}
            />

            <div className="h-full flex flex-col justify-between gap-[1.5rem]">
                <div className="flex flex-col gap-[0.75rem]">
                    <Text as="p" variant="h4" className="font-medium text-dark">{serviceFormat.item.name}</Text>
                    <Text as="p" variant="body-large" className="font-light text-dark">{serviceFormat.item.description}</Text>
                </div>

                <div className="flex flex-col md:flex-row gap-[0.5rem]">
                    {serviceFormat.item.cta_button_text &&
                        <Modal
                            trigger={<Button variant="primary" size="md" fullWidth>{serviceFormat.item.cta_button_text}</Button>}
                            title={serviceFormat.item.cta_button_text}
                            size="md"
                        >
                            <ModalBody>
                                <QuestionForm />
                            </ModalBody>
                        </Modal>
                    }
                    {serviceFormat.item.advice_button_text &&
                        <PracticeAdviceModal
                            trigger={<Button variant="secondary" size="md" fullWidth>{serviceFormat.item.advice_button_text}</Button>}
                            size="lg"
                            content={
                                <div 
                                    className="advice_content"
                                    dangerouslySetInnerHTML={{ __html: serviceFormat.item.advice_content }}
                                />
                            }
                        />
                    }
                </div>

            </div>
        </div>
    )
}

export default ServiceFormatCard;