import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import ReviewCard from "./review-card";
import ReviewRatingCard from "./review-rating-card";
import { ReviewsData } from "@/features/shared/types";

function ReviewBlock({ reviewsData }: { reviewsData: ReviewsData[] }) {
    return (
        <BlockWrapper>
            <BlockHeadline
                title="Отзывы"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">
                    {reviewsData[0].review_cards.slice(0, 4).map((review) => (
                        <ReviewCard
                            key={review.id}
                            name={review.item.name}
                            rating={review.item.rating}
                            description={review.item.text}
                        />
                    ))}
                </div>

                <ReviewRatingCard
                    rating={reviewsData[0].rating}
                    description="Средняя оценка пользователей Яндекс"
                    link={reviewsData[0].yandex_link}
                />

            </div>
        </BlockWrapper>
    )
}

export default ReviewBlock;