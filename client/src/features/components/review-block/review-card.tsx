import { Star } from "lucide-react";
import { Text } from "@/features/shared/ui/text";

interface ReviewCardProps {
    name: string;
    rating: number;
    description: string;
}

function ReviewCard({ name, rating, description }: ReviewCardProps) {
    return (
        <div className="col-span-1 flex flex-col gap-[1rem] p-[1.2rem] lg:p-[1.5rem] 2xl:p-[2rem] bg-soft-gray rounded-[0.75rem]">
            <div className="flex flex-row gap-[0.5rem] items-center justify-between">
                <Text as="p" variant="h4" className="font-light text-dark">
                    {name}
                </Text>
                <div className="flex flex-row gap-[0.25rem]">
                    {Array.from({ length: rating }).map((_, index) => (
                        <Star key={index} fill="#FFB700" className="text-[#FFB700]" size={24} />
                    ))}
                </div>
            </div>
            <Text as="p" variant="body-large" className="font-light text-dark">
                {description}
            </Text>
        </div>
    )
}

export default ReviewCard;