import { Text } from "../text";

interface ItemCardBadgeProps {
    title?: string;
}

function ItemCardBadge({ title }: ItemCardBadgeProps) {
    return (
    <div className="w-full py-[0.5rem] px-[1rem] bg-brown rounded-[0.75rem] text-center flex items-center justify-center">
        <Text as="p" variant="body" className="font-light text-white text-center">
            {title}
        </Text>
    </div>
)
}

export default ItemCardBadge;