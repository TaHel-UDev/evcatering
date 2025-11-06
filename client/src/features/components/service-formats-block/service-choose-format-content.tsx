import NumericText from "@/features/shared/ui/numeric-text/numeric-text"
import { Text } from "@/features/shared/ui/text"

function ServiceChooseFormatContent() {
    return (
        <div className="col-span-1 flex flex-col justify-between gap-[1.5rem]">

            <Text as="p" variant="body-large" className="font-light text-dark">
                Ассортимент меню, количество блюд и напитков полностью зависят от того, в каком формате мы будем обслуживать Ваших гостей. Всего несколько критериев помогут точно определить оптимальный формат обслуживания Вашего мероприятия:
            </Text>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                <NumericText
                    number="1"
                    description="цели и задачи мероприятия"
                />
                <NumericText
                    number="2"
                    description="продолжительность мероприятия"
                />
                <NumericText
                    number="3"
                    description="площадка мероприятия"
                />
                <NumericText
                    number="4"
                    description="бюджет"
                />
            </div>

        </div>
    )
}

export default ServiceChooseFormatContent