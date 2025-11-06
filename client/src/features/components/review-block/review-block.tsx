import BlockWrapper from "@/features/shared/ui/block-wrapper";
import BlockHeadline from "@/features/shared/ui/headline/block-headline";
import ReviewCard from "./review-card";
import ReviewRatingCard from "./review-rating-card";

function ReviewBlock() {
    return (
        <BlockWrapper>
            <BlockHeadline
                title="Отзывы"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[1rem] lg:gap-[1.2rem] 2xl:gap-[1.5rem]">

                    <ReviewCard
                        name="Мария"
                        rating={5}
                        description="Хороший сервис, приятный персонал, ребята молодцы"
                    />

                    <ReviewCard
                        name="Мария"
                        rating={5}
                        description="Хороший сервис, приятный персонал, ребята молодцы"
                    />

                    <ReviewCard
                        name="Мария"
                        rating={5}
                        description="Хороший сервис, приятный персонал, ребята молодцы"
                    />

                    <ReviewCard
                        name="Мария"
                        rating={5}
                        description="Хороший сервис, приятный персонал, ребята молодцы"
                    />

                </div>

                <ReviewRatingCard
                    rating={4.9}
                    description="Средняя оценка пользователей Яндекс"
                    link="/"
                />

            </div>
        </BlockWrapper>
    )
}

export default ReviewBlock;