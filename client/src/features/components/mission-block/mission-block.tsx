import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import MissionCard from "./mission-card";
import NumericText from "@/features/shared/ui/numeric-text/numeric-text";

function MissionBlock() {
    return (
        <BlockWrapper>
            <BlockHeadline
                title="Наша миссия и ценности"
                description="выводить кейтеринг на новый уровень эстетики и вкуса"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem] mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]">
                <MissionCard
                    description="Мы содействуем достижению целей и задач каждого заказчика, опираяся на ответственность и профессионализм нашей команды и получаем удовольствие от креативных решений!"
                />
                <MissionCard
                    description="Эти ценности направляют нашу работу и помогают нам достигать поставленных целей, создавая незабываемые впечатления для наших клиентов"
                />
            </div>

            <BlockHeadline
                title="Как мы работаем?"
            />

            <div className="flex flex-col gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                <div className="grid lg:grid-cols-1 xl:grid-cols-3 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                    <NumericText
                        number="1"
                        description="Возможно, вы уже определились с датой мероприятия и количеством гостей? С этого можно начать)"
                    />
                    <NumericText
                        number="2"
                        description="Если уже выбрали место проведения мероприятия – отлично, а если нет – мы поможем выбрать оптимальную площадку для вашего случая!"
                    />
                    <NumericText
                        number="3"
                        description="Далее определим формат обслуживания (спойлер, с нами Вы будете уверены в своем выборе) и уточним время обслуживания гостей едой и напитками."
                    />
                </div>
                <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                    <NumericText
                        number="4"
                        description="Предложим Вам лучший вариант меню, сформированный специально для вашей аудитории, и согласуем с Вами детали."
                    />
                    <NumericText
                        number="5"
                        description="Финально утвердим все окончательные детали за несколько дней до мероприятия, чтобы в день Х Вы могли отдыхать со своими гостями, доверив все хлопоты нам."
                    />
                </div>
            </div>
        </BlockWrapper>
    )
}

export default MissionBlock;