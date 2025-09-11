import type {ChipProps} from "../../types/chip.ts";

const baseClasses = 'rounded-full text-sm font-semibold p-1.5 min-w-12 inline-block text-center';

const chipColors: Record<'primary'|'secondary'|'default', {
    default: string;
    selected: string;
    outline: string;
}> = {
    primary: {
        default : 'bg-blue-100 border border-blue-300 text-blue-700',
        selected : 'bg-blue-600 text-white border border-blue-600',
        outline : 'border border-blue-300 text-blue-700'
    },
    secondary: {
        default : 'bg-orange-50 border border-orange-200 text-orange-700',
        selected : 'bg-orange-500 text-white border border-orange-500',
        outline : 'border border-orange-200 text-orange-700'
    },
    default: {
        default : 'bg-gray-100 border border-gray-300 text-gray-700',
        selected : 'bg-blue-600 text-white border border-blue-600',
        outline : 'border border-gray-300 text-gray-700'
    }
}

const Chip = ({
    color = 'default',
    outline = false,
    children,
    classNames = '',
    onClick,
    isSelected
}: ChipProps) => {

    const finalClasses:string[] = [
        baseClasses,
        chipColors[color][isSelected ? 'selected' : outline ? 'outline' : 'default'],
        classNames
    ];

    return (
        <span className={finalClasses.join(' ')}
              onClick={onClick}
        >
            {children}
        </span>
    );
};

export default Chip;