import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import ServiceFormatCard from "./service-format-card";
import ServiceChooseFormatBlock from "./service-choose-format-block";
import { ChooseFormatBlockData, ServiceFormatsBlockData } from "@/features/shared/types";
import { setAttr } from "../../../../lib/visual-editor";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/features/shared/ui/carousel/carousel";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { DirectusQuiz } from "@/lib/directus-quiz-transformer";

function ServiceFormatsBlock({
    serviceFormatsBlockData,
    chooseFormatBlockData,
    QuizData
}: {
    serviceFormatsBlockData: ServiceFormatsBlockData,
    chooseFormatBlockData: ChooseFormatBlockData
    QuizData: DirectusQuiz
}) {
    return (
        <BlockWrapper id="service-formats-block">
            {/* Visual Editor: заголовок блока форматов сервиса */}
            <div
                data-directus={setAttr({
                    collection: 'service_formats_block',
                    item: serviceFormatsBlockData.id,
                    fields: 'title',
                    mode: 'popover'
                })}
            >
                <BlockHeadline
                    title={serviceFormatsBlockData.title}
                />
            </div>

            {/* Visual Editor: редактирование всей коллекции форматов (добавление/удаление) */}
            <div
                data-directus={setAttr({
                    collection: 'service_formats_block',
                    item: serviceFormatsBlockData.id,
                    fields: 'formats',
                    mode: 'drawer'
                })}
                className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[2rem] lg:gap-[2rem] 2xl:gap-[1.5rem] mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]"
            >
                {serviceFormatsBlockData.formats.map((format) => (
                    <ServiceFormatCard
                        key={format.id}
                        serviceFormat={format}
                    />
                ))}
            </div>

            <div className="flex md:hidden mb-[3rem] lg:mb-[1.8rem] 2xl:mb-[2rem]">
                <Carousel opts={{
                    align: "start",
                    loop: true,
                }}
                    className="w-full">
                    <CarouselContent>
                        {serviceFormatsBlockData.formats.map((format) => (
                            <CarouselItem key={format.id} className="basis-full">
                                <ServiceFormatCard
                                    serviceFormat={format}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious size="sm" className="translate-y-[-200%]">
                        <ArrowLeftIcon className="size-4" />
                    </CarouselPrevious>
                    <CarouselNext size="sm" className="translate-y-[-200%]">
                        <ArrowRightIcon className="size-4"/>
                    </CarouselNext>
                </Carousel>
            </div>

            <ServiceChooseFormatBlock
                chooseFormatBlockData={chooseFormatBlockData}
                QuizData={QuizData}
            />
        </BlockWrapper>
    )
}

export default ServiceFormatsBlock;