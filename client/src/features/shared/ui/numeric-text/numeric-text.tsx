import { Text } from "../text";

interface NumericTextProps {
    number: string;
    description: string;
}

function NumericText({ number, description }: NumericTextProps) {
    return (
        <div className="col-span-1 gap-[1rem] flex flex-row items-center">
            <Text as="p" variant="h3" className="font-medium text-brown">{number}</Text>
            <Text as="p" variant="body-large" className="font-light text-dark">{description}</Text>
        </div>
    )
}

export default NumericText;