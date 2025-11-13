import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import MissionCard from "./mission-card";
import NumericText from "@/features/shared/ui/numeric-text/numeric-text";
import { MissionBlockData, WorkBlockData } from "@/features/shared/types";

function MissionBlock({ missionBlockData, workBlockData }: { missionBlockData: MissionBlockData, workBlockData: WorkBlockData }) {
    return (
        <BlockWrapper>
            <BlockHeadline
                title={missionBlockData.title}
                description={missionBlockData.subtitle}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem] mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]">
                {missionBlockData.mission_block_cards.map((card) => (
                    <MissionCard
                        key={card.id}
                        description={card.item.text}
                    />
                ))}
            </div>

            <BlockHeadline
                title={workBlockData.title}
            />

            <div className="flex flex-col gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                <div className="grid lg:grid-cols-1 xl:grid-cols-3 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                    {workBlockData.work_points
                    .sort((a, b) => a.item.point - b.item.point)
                    .map((point) => (
                        <NumericText
                            key={point.id}
                            number={point.item.point}
                            description={point.item.text}
                        />
                    ))}
                </div>
            </div>
        </BlockWrapper>
    )
}

export default MissionBlock;