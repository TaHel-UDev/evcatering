import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadlineWithLink from "@/features/shared/ui/headline/block-headline-with-link";
import ItemCard from "@/features/shared/ui/item-card/item-card";

function PlacesBlock() {
    return (
        <BlockWrapper>
            <BlockHeadlineWithLink
                title="Площадки"
                link="/places"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                <ItemCard
                    image="https://placehold.co/405x251.png"
                    title="Зал большой"
                    description="Описание зала большой"
                    link="/places/1/"
                    firstBadge="120 м²"
                    secondBadge="200 персон"
                />
                <ItemCard
                    image="https://placehold.co/405x251.png"
                    title="Зал средний"
                    description="Описание зала средний"
                    link="/places/2/"
                    firstBadge="80 м²"
                    secondBadge="100 персон"
                />
                <ItemCard
                    image="https://placehold.co/405x251.png"
                    title="Зал маленький"
                    description="Описание зала маленький"
                    link="/places/3/"
                    firstBadge="50 м²"
                    secondBadge="50 персон"
                />
            </div>
        </BlockWrapper>
    )
}

export default PlacesBlock;