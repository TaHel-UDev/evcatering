import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadlineWithLink from "@/features/shared/ui/headline/block-headline-with-link";
import ItemCard from "@/features/shared/ui/item-card/item-card";
import { CaseData } from "@/features/shared/types";

function CasesBlock({ casesData, limit }: { casesData: CaseData[], limit?: number }) {
    return (
        <BlockWrapper>
            <BlockHeadlineWithLink
                title="Кейсы"
                link="/cases"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                {(limit ? casesData.slice(0, limit) : casesData).map((caseData) => (
                    <ItemCard
                        key={caseData.id}
                        image={caseData.preview.id}
                        title={caseData.name}
                        description={caseData.description}
                        link={`/cases/${caseData.id}/`}
                        firstBadge={caseData.guests.toString()}
                        secondBadge={caseData.format}
                        thirdBadge={caseData.date}
                    />
                ))}
            </div>
        </BlockWrapper>
    )
}

export default CasesBlock;