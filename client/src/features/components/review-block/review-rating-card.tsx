import Button from "@/features/shared/ui/button";
import { Text } from "@/features/shared/ui/text";
import Link from "next/link";

interface ReviewRatingCardProps {
    rating: number;
    description: string;
    link: string;
}

function ReviewRatingCard({ rating, description, link }: ReviewRatingCardProps) {
    return (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-1 flex flex-col justify-between gap-[2rem] p-[1.2rem] lg:p-[1.5rem] 2xl:p-[2rem] bg-soft-gray rounded-[0.75rem]">
            <div className="flex flex-col gap-[1rem]">
                <Text as="p" variant="h2" className="font-medium text-dark">
                    {rating}/5
                </Text>
                <Text as="p" variant="h5" className="font-light text-dark">
                    {description}
                </Text>
            </div>
            <Link href={link}>
                <Button variant="primary" size="md" className="w-full">
                    Посмотреть все
                </Button>
            </Link>
        </div>
    )
}

export default ReviewRatingCard;