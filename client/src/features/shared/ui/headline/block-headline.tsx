import { Text } from "../text";

interface BlockHeadlineProps {
    title: string;
    description?: string;
}

function BlockHeadline({ title, description }: BlockHeadlineProps) {
    return (
        <div className="flex flex-col gap-[0.625rem] mb-[1.5rem] lg:mb-[1.8rem] 2xl:mb-[2rem]">
            <Text as="h2" variant="h2" className="font-medium text-brown">
                {title}
            </Text>
            {description && (
                <Text as="p" variant="h4" className="font-light text-brown">
                    {description}
                </Text>
            )}
        </div>
    )
}

export default BlockHeadline;