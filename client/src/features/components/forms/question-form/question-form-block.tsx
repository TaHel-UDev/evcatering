import BlockWrapper from "@/features/shared/ui/block-wrapper";
import QuestionForm from "./question-form";
import { Text } from "@/features/shared/ui/text";
import { MapElementData } from "@/features/shared/types";

function QuestionFormBlock({ mapData }: { mapData?: MapElementData | null }) {
    return (
        <BlockWrapper>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                <div className="col-span-1 p-[1.2rem] lg:p-[1.5rem] 2xl:p-[2rem] bg-soft-gray rounded-[0.75rem]">
                    <div className="flex flex-col gap-[0.625rem] mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]">
                        <Text as="p" variant="h3" className="text-dark font-medium">
                            Остались вопросы?
                        </Text>
                        <Text as="p" variant="body-large" className="text-dark">
                            Оставьте заявку - мы подготовим предложение за 1 час
                        </Text>
                    </div>

                    <QuestionForm />
                </div>

                {mapData?.yandex_src && (
                    <div className="col-span-1">
                        <iframe
                            src={mapData.yandex_src}
                            width="613"
                            height="720"
                            frameBorder="0"
                            className="w-full h-[300px] lg:h-full rounded-[0.75rem]"
                        />
                    </div>
                )}

            </div>
        </BlockWrapper>
    )
}

export default QuestionFormBlock;