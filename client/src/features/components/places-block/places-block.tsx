import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadlineWithLink from "@/features/shared/ui/headline/block-headline-with-link";
import ItemCard from "@/features/shared/ui/item-card/item-card";
import { PlacesData } from "@/features/shared/types";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";

function PlacesBlock({ placesData, withLink = true, limit = 3 }: { placesData: PlacesData[], withLink?: boolean, limit?: number }) {
    return (
        <BlockWrapper>
            {withLink ? (
                <BlockHeadlineWithLink
                    title="Площадки"
                    link="/places"
                />
            ) : (
                <BlockHeadline title="Площадки" />
            )}


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                {(limit ? placesData.slice(0, limit) : placesData).map((place) => (
                    <ItemCard
                        key={place.id}
                        image={place.preview.id}
                        title={place.name}
                        description={place.description}
                        link={`/places/${place.id}/`}
                        firstBadge={place.area.toString() + " м²"}
                        secondBadge={place.capacity.toString() + " гостей"}
                    />
                ))}
            </div>
        </BlockWrapper>
    )
}

export default PlacesBlock;