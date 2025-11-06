import Button from "@/features/shared/ui/button";
import { Text } from "@/features/shared/ui/text";

function ServiceChooseFormatQuiz() {
    return (
        <div className="col-span-1 flex flex-col gap-[1.5rem] justify-between p-[1.2rem] lg:p-[1.5rem] 2xl:p-[2rem] bg-green rounded-[0.75rem]">
            <Text as="p" variant="lead" className="font-light text-white">
                Вы можете пройти наш небольшой тест, чтобы лучше понять, как это работает
            </Text>

            <Button variant="white" size="md">
                Пройти тест
            </Button>
        </div>
    )
}

export default ServiceChooseFormatQuiz