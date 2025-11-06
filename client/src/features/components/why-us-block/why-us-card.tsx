import { Text } from "@/features/shared/ui/text";

interface WhyUsCardProps {
    title: string;
    description: string;
    isActive: boolean;
    onClick: () => void;
}

function WhyUsCard({ title, description, isActive, onClick }: WhyUsCardProps) {
    return (
        <div
            onClick={onClick}
            className="group flex flex-col gap-[0.5rem] cursor-pointer transition-all duration-300"
        >
            <Text
                as="p"
                variant="h2"
                className={`font-medium transition-colors duration-300 ${isActive ? 'text-dark' : 'text-dark/20'}`}
            >
                {title}
            </Text>
            <Text
                as="p"
                variant="body-large"
                className={`font-light transition-colors duration-300 ${isActive ? 'text-dark' : 'text-dark/20'}`}
            >
                {description}
            </Text>
        </div>
    );
}

export default WhyUsCard;

