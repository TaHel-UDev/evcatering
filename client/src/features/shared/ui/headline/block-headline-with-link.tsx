import Button from "../button";
import { Text } from "../text";
import Link from "next/link";

interface BlockHeadlineWithLinkProps {
    title: string;
    description?: string;
    link: string;
}

function BlockHeadlineWithLink({ title, description, link }: BlockHeadlineWithLinkProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-[0.625rem] mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]">
            <div className="flex flex-col gap-[0.625rem]">
                <Text as="h2" variant="h2" className="font-medium text-brown">
                    {title}
                </Text>
                {description && (
                    <Text as="p" variant="h4" className="font-light text-brown">
                        {description}
                    </Text>
                )}
            </div>
            <Link href={link}>
                <Button variant="primary" size="md" className="w-full sm:w-auto">
                    Посмотреть все
                </Button>
            </Link>
        </div>
    )
}

export default BlockHeadlineWithLink;