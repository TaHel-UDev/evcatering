import { Text } from "@/features/shared/ui/text";

interface FoodCardProps {
    title: string;
    size: "col-span-3" | "col-span-4" | "col-span-6";
    id: string;
    isHovered: boolean;
    hasAnyHovered: boolean;
    onMouseEnter: (id: string) => void;
    onMouseLeave: () => void;
    image: string;
    onClick?: () => void;
}

function FoodCard({ title, size, id, isHovered, hasAnyHovered, onMouseEnter, onMouseLeave, image, onClick }: FoodCardProps) {
    // Определяем размер карточки в зависимости от состояния наведения (только для десктопа)
    const getDesktopFlexBasis = () => {
        if (hasAnyHovered) {
            return isHovered ? "calc(50% - 0.6rem)" : "calc(25% - 0.6rem)";
        }
        // Возвращаем дефолтные размеры с учетом gap-[1.2rem] на lg (для 3 элементов это 2 gap)
        if (size === "col-span-3") return "calc(25% - 0.8rem)"; // (1.2rem * 2) / 3 = 0.8rem
        if (size === "col-span-4") return "calc(33.333% - 0.8rem)"; // (1.2rem * 2) / 3 = 0.8rem
        if (size === "col-span-6") return "calc(50% - 0.8rem)"; // (1.2rem * 2) / 3 = 0.8rem
    };

    return (
        <div
            className="group relative w-full lg:w-auto flex flex-col justify-end min-h-[200px] lg:min-h-[262px] rounded-[0.75rem] p-[1.2rem] lg:p-[1.5rem] 2xl:p-[2rem] overflow-hidden cursor-pointer"
            style={{
                flexBasis: getDesktopFlexBasis(),
                flexShrink: 0,
                flexGrow: 0,
                transition: "flex-basis 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                backgroundImage: `url('${image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            onMouseEnter={() => onMouseEnter(id)}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            <Text as="p" variant="body-large" className="font-medium text-white lg:text-transparent z-[2] group-hover:text-white transition-all duration-300">
                {title}
            </Text>
            <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[200%] lg:group-hover:h-[20%] h-[20%] lg:h-0 transition-all duration-300 bg-black rounded-[0.75rem] blur-[40px]" />
        </div>
    )
}

export default FoodCard;