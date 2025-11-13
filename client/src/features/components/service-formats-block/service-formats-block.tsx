import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import ServiceFormatCard from "./service-format-card";
import ServiceChooseFormatBlock from "./service-choose-format-block";
import { ServiceFormatsBlockData } from "@/features/shared/types";
import { setAttr } from "@/features/shared/utils/visual-editing";

function ServiceFormatsBlock({ serviceFormatsBlockData }: { serviceFormatsBlockData: ServiceFormatsBlockData }) {
    const titleAttr = setAttr({
        collection: 'service_formats_block',
        item: serviceFormatsBlockData.id,
        fields: 'title',
        mode: 'popover'
    });

    return (
        <BlockWrapper>
            {/* Visual Editor: заголовок блока форматов сервиса */}
            <div
                {...(titleAttr && { 'data-directus': titleAttr })}
            >
                <BlockHeadline
                    title={serviceFormatsBlockData.title}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem] mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]">
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