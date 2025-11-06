import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadlineWithLink from "@/features/shared/ui/headline/block-headline-with-link";
import ItemCard from "@/features/shared/ui/item-card/item-card";

function CasesBlock() {
    return (
        <BlockWrapper>
            <BlockHeadlineWithLink
                title="Кейсы"
                link="/cases"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                <ItemCard
                    image="https://placehold.co/405x251.png"
                    title="Кейс 1"
                    description="Описание кейса 1"
                    link="/cases/1/"
                    firstBadge="700 гостей"
                    secondBadge="Фуршет"
                    thirdBadge="12.03.2025"
                />
                <ItemCard
                    image="https://placehold.co/405x251.png"
                    title="Кейс 2"
                    description="Описание кейса 2"
                    link="/cases/2/"
                    firstBadge="700 гостей"
                    secondBadge="Фуршет"
                    thirdBadge="12.03.2025"
                />
                <ItemCard
                    image="https://placehold.co/405x251.png"
                    title="Кейс 3"
                    description="Описание кейса 3"
                    link="/cases/3/"
                    firstBadge="700 гостей"
                    secondBadge="Фуршет"
                    thirdBadge="12.03.2025"
                />
            </div>
        </BlockWrapper>
    )
}

export default CasesBlock;