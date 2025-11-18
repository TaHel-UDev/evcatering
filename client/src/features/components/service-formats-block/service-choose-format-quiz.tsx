import { ChooseFormatBlockData } from "@/features/shared/types";
import Button from "@/features/shared/ui/button";
import { Text } from "@/features/shared/ui/text";
import { setAttr } from "../../../../lib/visual-editor";
import Link from "next/link";

function ServiceChooseFormatQuiz({
    chooseFormatBlockData
}: {
    chooseFormatBlockData: ChooseFormatBlockData
}) {

    return (
        <div className="col-span-1 flex flex-col gap-[1.5rem] justify-between p-[1.2rem] lg:p-[1.5rem] 2xl:p-[2rem] bg-green rounded-[0.75rem]">
            <div
                data-directus={setAttr({
                    collection: 'choose_format_block',
                    item: chooseFormatBlockData.id,
                    fields: 'form_text',
                    mode: 'drawer'
                })}
            >
                <Text as="p" variant="lead" className="font-light text-white">
                    {chooseFormatBlockData.form_text}
                </Text>
            </div>

            <div
                data-directus={setAttr({
                    collection: 'choose_format_block',
                    item: chooseFormatBlockData.id,
                    fields: 'form_button_text, marquiz_link, image_button_text, quiz_image',
                    mode: 'drawer'
                })}
                className="flex flex-col lg:flex-row gap-4"
            >
                <a
                    href={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${chooseFormatBlockData.quiz_image.id}`}
                    data-fancybox="gallery"
                    data-caption="Выберите формат мероприятия правильно"
                    className="w-full"
                >
                    <Button variant="secondary" size="md" fullWidth>
                        {chooseFormatBlockData.image_button_text}
                    </Button>
                </a>
                <Link href={chooseFormatBlockData.marquiz_link} className="w-full">
                    <Button variant="white" size="md" fullWidth>
                        {chooseFormatBlockData.form_button_text}
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default ServiceChooseFormatQuiz