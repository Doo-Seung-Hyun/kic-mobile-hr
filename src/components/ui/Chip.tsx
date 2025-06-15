interface ChipProps {
    label : string;
    color? : 'primary' | 'secondary' | 'default'
    outline? : boolean
}

const Chip = ({
    label,
    color = 'default',
    outline = false
}: ChipProps) => {

    const baseClasses = 'rounded-full text-sm font-normal px-2';

    const backGroundColorClasses = outline ? '' :
        color === 'primary' ? 'bg-blue-100' :
            color === 'secondary' ? 'bg-orange-100' :
                'bg-gray-100';

    const outlineClasses = !outline ? '' :
        color === 'primary' ? 'border border-blue-300' :
            color === 'secondary' ? 'border border-orange-300' :
                'border-gray-500';

    const textColorClasses = color === 'primary' ? 'text-blue-700' :
        color === 'secondary' ? 'text-orange-700' :
            'text-gray-700';

    return (
        <span className={[
            baseClasses,
            backGroundColorClasses,
            outlineClasses,
            textColorClasses
        ].join(' ')}>
            {label}
        </span>
    );
};

export default Chip;