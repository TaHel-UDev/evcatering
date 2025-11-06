import { Text } from "@/features/shared/ui/text";
import ServiceChooseFormatQuiz from "./service-choose-format-quiz";
import ServiceChooseFormatContent from "./service-choose-format-content";

function ServiceChooseFormatBlock() {
    return (
        <>
            <Text as="h3" variant="h3" className="font-medium text-brown mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]">
                Выберем формат правильно
            </Text>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                <ServiceChooseFormatContent />

                <ServiceChooseFormatQuiz />

            </div>
        </>
    )
}

export default ServiceChooseFormatBlock;