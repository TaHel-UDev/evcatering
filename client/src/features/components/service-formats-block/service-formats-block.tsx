import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import ServiceFormatCard from "./service-format-card";
import ServiceChooseFormatBlock from "./service-choose-format-block";
import { ServiceFormatsBlockData } from "@/features/shared/types";
import { setAttr } from "../../../../lib/visual-editor";

function ServiceFormatsBlock({ 
    serviceFormatsBlockData 
}: { 
    serviceFormatsBlockData: ServiceFormatsBlockData 
}) {
    const canEdit = true; // Visual Editor всегда включен, доступ контролирует Directus
    // Проверка на корректность данных
    if (!serviceFormatsBlockData || !serviceFormatsBlockData.formats) {
        console.error('❌ ServiceFormatsBlock: некорректные данные', serviceFormatsBlockData);
        return null;
    }

    return (
        <BlockWrapper>
            {/* Visual Editor: заголовок блока форматов сервиса */}
            <div
                {...(canEdit && {
                    'data-directus': setAttr({
                        collection: 'service_formats_block',
                        item: serviceFormatsBlockData.id,
                        fields: 'title',
                        mode: 'popover'
                    })
                })}
            >
                <BlockHeadline
                    title={serviceFormatsBlockData.title}
                />
            </div>

            {/* Visual Editor: редактирование всей коллекции форматов (добавление/удаление) */}
            <div
                {...(canEdit && {
                    'data-directus': setAttr({
                        collection: 'service_formats_block',
                        item: serviceFormatsBlockData.id,
                        fields: 'formats',
                        mode: 'drawer'
                    })
                })}
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem] mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]"
            >
                {serviceFormatsBlockData.formats.map((format) => (
                    <ServiceFormatCard
                        key={format.id}
                        serviceFormat={format}
                    />
                ))}
            </div>

            <ServiceChooseFormatBlock />
        </BlockWrapper>
    )
}

export default ServiceFormatsBlock;