import { FAboutBlockProps } from "@/features/shared/types";
import BlockWrapper from "@/features/shared/ui/block-wrapper";
import { Text } from "@/features/shared/ui/text";
import { setAttr } from "@directus/visual-editing";

function FAboutBlock({
    FAboutData
}: {
    FAboutData: FAboutBlockProps
}) {
    return (
        <BlockWrapper>
            <div
                data-directus={setAttr({
                    collection: 'f_about_block',
                    item: FAboutData.id,
                    fields: 'text',
                    mode: 'drawer'
                })}
                className="bg-brown rounded-[0.75rem] p-[1.2rem] lg:p-[1.5rem] 2xl:p-[2rem]"
            >
                <Text as="p" variant="lead" className="text-white">
                    {FAboutData.text}
                </Text>
            </div>
        </BlockWrapper>
    )
}

export default FAboutBlock