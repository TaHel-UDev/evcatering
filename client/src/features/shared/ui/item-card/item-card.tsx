import Image from "next/image";
import { Text } from "../text";
import Link from "next/link";
import ItemCardBadge from "./item-card-badge";
import { CaseData } from "../../types";

function ItemCard({ caseData }: { caseData: CaseData }) {
    return (
        <Link href={`/cases/${caseData.id}/`} className="col-span-1 flex flex-col gap-[0.75rem]">
            <div className="flex flex-col gap-[0.5rem]">
                <Image
                    src={`${process.env.NEXT_PUBLIC_DIRECTUS}/assets/${caseData.preview.id}.png`}
                    alt="Кейс"
                    width={405}
                    height={251}
                    quality={100}
                    className="w-full object-cover rounded-[0.75rem]"
                />

                <div className="flex flex-row gap-[0.5rem]">
                    {caseData.guests && <ItemCardBadge title={`${caseData.guests} гостей`} />}
                    {caseData.format && <ItemCardBadge title={caseData.format} />}
                    {caseData.date && <ItemCardBadge title={`${caseData.date} ${new Date(caseData.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}`} />}
                </div>
            </div>

            <div className="h-full flex flex-col justify-between gap-[1.5rem]">
                <div className="flex flex-col gap-[0.2rem]">
                    <Text as="p" variant="h4" className="font-medium text-dark">{caseData.name}</Text>
                    <Text as="p" variant="body-large" className="font-light text-dark">{caseData.description}</Text>
                </div>
            </div>
        </Link>
    )
}

export default ItemCard;