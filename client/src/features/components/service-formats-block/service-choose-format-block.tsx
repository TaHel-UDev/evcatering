import { Text } from "@/features/shared/ui/text";
import ServiceChooseFormatQuiz from "./service-choose-format-quiz";
import ServiceChooseFormatContent from "./service-choose-format-content";
import { ChooseFormatBlockData } from "@/features/shared/types";
import { setAttr } from "../../../../lib/visual-editor";
import { DirectusQuiz } from "@/lib/directus-quiz-transformer";

function ServiceChooseFormatBlock({
    chooseFormatBlockData,
    QuizData
}: {
    chooseFormatBlockData: ChooseFormatBlockData,
    QuizData: DirectusQuiz
}) {
    return (
        <>
            <div
                data-directus={setAttr({
                    collection: 'choose_format_block',
                    item: chooseFormatBlockData.id,
                    fields: 'title, form_text, form_button_text, marquiz_link',
                    mode: 'popover'
                })}
            >
                <Text as="h3" variant="h3" className="font-medium text-brown mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]">
                    {chooseFormatBlockData.title}
                </Text>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                <ServiceChooseFormatContent
                    chooseFormatBlockData={chooseFormatBlockData}
                />

                <ServiceChooseFormatQuiz
                    chooseFormatBlockData={chooseFormatBlockData}
                    QuizData={QuizData}
                />

            </div>
        </>
    )
}

export default ServiceChooseFormatBlock;