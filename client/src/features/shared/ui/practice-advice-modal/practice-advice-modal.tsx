import QuestionForm from "@/features/components/forms/question-form/question-form";
import Modal, { ModalBody } from "../modal";
import Button from "../button";
import { Text } from "../text";

interface PracticeAdviceModalProps {
    trigger: React.ReactNode;
    title?: string;
    size?: "sm" | "md" | "lg";
    content: React.ReactNode;
}


function PracticeAdviceModal({ trigger, title = "Практический совет", size = "lg", content }: PracticeAdviceModalProps) {
    return (
        <Modal
            trigger={trigger}
            title={title}
            size={size}
        >
            <ModalBody>
                {content}
            </ModalBody>
        </Modal>
    )
}

export default PracticeAdviceModal;