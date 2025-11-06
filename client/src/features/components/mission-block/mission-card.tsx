import { Text } from "@/features/shared/ui/text";

interface MissionCardProps {
    description: string;
}

function MissionCard({ description }: MissionCardProps) {
    return (
        <div className="col-span-1 p-[1.2rem] lg:p-[1.5rem] 2xl:p-[2rem] bg-brown rounded-[0.75rem] flex items-center justify-center">
            <Text as="p" variant="lead" className="font-light text-white">
                {description}
            </Text>
        </div>
    )
}

export default MissionCard;