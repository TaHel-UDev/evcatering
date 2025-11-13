import Image from "next/image";
import { Text } from "../text";
import Link from "next/link";
import ItemCardBadge from "./item-card-badge";

interface ItemCardProps {
    image: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonTextSecondary?: string;
    firstBadge?: string;
    secondBadge?: string;
    thirdBadge?: string;
    link: string;
}

function ItemCard({ image, title, description, buttonText, buttonTextSecondary, firstBadge, secondBadge, thirdBadge, link }: ItemCardProps) {
    return (
        <Link href={link} className="col-span-1 flex flex-col gap-[0.75rem]">
            <div className="flex flex-col gap-[0.5rem]">
                <Image
                    src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${image}.png`}
                    alt="Кейс"
                    width={405}
                    height={251}
                    quality={100}
                    className="w-full object-cover rounded-[0.75rem] min-h-[251px]"
                />

                <div className="flex flex-row gap-[0.5rem]">
                    {firstBadge && <ItemCardBadge title={`${firstBadge} гостей`} />}
                    {secondBadge && <ItemCardBadge title={secondBadge} />}
                    {thirdBadge && <ItemCardBadge title={`${new Date(thirdBadge).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}`} />}
                </div>
            </div>

            <div className="h-full flex flex-col justify-between gap-[1.5rem]">
                <div className="flex flex-col gap-[0.2rem]">
                    <Text as="p" variant="h4" className="font-medium text-dark">{title}</Text>
                    <Text as="p" variant="body-large" className="font-light text-dark">{description}</Text>
                </div>
            </div>
        </Link>
    )
}

export default ItemCard;