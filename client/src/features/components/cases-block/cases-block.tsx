import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadlineWithLink from "@/features/shared/ui/headline/block-headline-with-link";
import ItemCard from "@/features/shared/ui/item-card/item-card";
import { CaseData } from "@/features/shared/types";

function CasesBlock({ casesData }: { casesData: CaseData[] }) {
    return (
        <BlockWrapper>
            <BlockHeadlineWithLink
                title="Кейсы"
                link="/cases"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                {casesData.map((caseData) => (
                    <ItemCard
                        key={caseData.id}
                        caseData={caseData}
                    />
                ))}
            </div>
        </BlockWrapper>
    )
}

export default CasesBlock;