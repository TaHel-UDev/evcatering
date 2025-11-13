import { ChooseFormatBlockData } from "@/features/shared/types"
import NumericText from "@/features/shared/ui/numeric-text/numeric-text"
import { Text } from "@/features/shared/ui/text"
import { setAttr } from "../../../../lib/visual-editor"

function ServiceChooseFormatContent({
    chooseFormatBlockData
}: {
    chooseFormatBlockData: ChooseFormatBlockData
}) {
    return (
        <div className="col-span-1 flex flex-col justify-between gap-[1.5rem]">

            <div
                data-directus={setAttr({
                    collection: 'choose_format_block',
                    item: chooseFormatBlockData.id,
                    fields: 'subtitle',
                    mode: 'popover'
                })}
            >
                <Text as="p" variant="body-large" className="font-light text-dark">
                    {chooseFormatBlockData.subtitle}
                </Text>
            </div>

            <div
                data-directus={setAttr({
                    collection: 'choose_format_block',
                    item: chooseFormatBlockData.id,
                    fields: 'choose_format_block_points',
                    mode: 'drawer'
                })}
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]"
            >
                {chooseFormatBlockData.choose_format_block_points.sort((a, b) => a.item.point - b.item.point).map((point) => (
                    <NumericText
                        key={point.id}
                        number={point.item.point}
                        description={point.item.text}
                    />
                ))}
            </div>

        </div>
    )
}

export default ServiceChooseFormatContent