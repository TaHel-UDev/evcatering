import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import MissionCard from "./mission-card";
import NumericText from "@/features/shared/ui/numeric-text/numeric-text";
import { MissionBlockData, WorkBlockData } from "@/features/shared/types";
import { setAttr } from "../../../../lib/visual-editor";

function MissionBlock({ missionBlockData, workBlockData }: { missionBlockData: MissionBlockData, workBlockData: WorkBlockData }) {
    return (
        <BlockWrapper>
            <div
                data-directus={setAttr({
                    collection: 'mission_block',
                    item: missionBlockData.id,
                    fields: 'title, subtitle',
                    mode: 'popover'
                })}
            >
                <BlockHeadline
                    title={missionBlockData.title}
                />
            </div>

            <div
                data-directus={setAttr({
                    collection: 'mission_block',
                    item: missionBlockData.id,
                    fields: 'mission_block_cards',
                    mode: 'drawer'
                })}
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem] mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]"
            >
                {missionBlockData.mission_block_cards.map((card) => (
                    <MissionCard
                        key={card.id}
                        description={card.item.text}
                    />
                ))}
            </div>

            <div
                data-directus={setAttr({
                    collection: 'work_block',
                    item: workBlockData.id,
                    fields: 'title',
                    mode: 'popover'
                })}
            >
                <BlockHeadline
                    title={workBlockData.title}
                />
            </div>

            <div className="flex flex-col gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                <div
                    data-directus={setAttr({
                        collection: 'work_block',
                        item: workBlockData.id,
                        fields: 'work_points',
                        mode: 'drawer'
                    })}
                    className="grid lg:grid-cols-1 xl:grid-cols-3 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]"
                >
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