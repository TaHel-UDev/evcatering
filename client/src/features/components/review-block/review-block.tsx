import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import ReviewCard from "./review-card";
import ReviewRatingCard from "./review-rating-card";
import { ReviewsData } from "@/features/shared/types";

function ReviewBlock({ reviewsData }: { reviewsData: ReviewsData[] }) {
    // Проверяем, есть ли карточка с рейтингом
    const hasRatingCard = !!(reviewsData[0].rating && reviewsData[0].yandex_link);
    
    // Количество отзывов: 4 если есть рейтинг, 6 если нет
    const reviewsCount = hasRatingCard ? 4 : 6;
    
    return (
        <BlockWrapper id="review-block">
            <BlockHeadline
                title="Отзывы"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                <div className={`col-span-1 md:col-span-2 ${hasRatingCard ? 'lg:col-span-3 xl:col-span-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-2' : 'lg:col-span-3 xl:col-span-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} grid gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]`}>
                    {reviewsData[0].review_cards.slice(0, reviewsCount).map((review) => (
                        <ReviewCard
                            key={review.id}
                            name={review.item.name}
                            rating={review.item.rating}
                            description={review.item.text}
                        />
                    ))}
                </div>

                {hasRatingCard &&
                    <ReviewRatingCard
                        rating={reviewsData[0].rating}
                        description="Средняя оценка пользователей Яндекс"
                        link={reviewsData[0].yandex_link}
                    />
                }

            </div>
        </BlockWrapper>
    )
}

export default ReviewBlock;