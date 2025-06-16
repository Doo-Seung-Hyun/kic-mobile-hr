import React from "react";

interface ChipProps {
    color? : 'primary' | 'secondary' | 'default'
    outline? : boolean;
    children : React.ReactNode;
    classNames? : string;
}

const Chip = ({
    color = 'default',
    outline = false,
    children,
    classNames = ''
}: ChipProps) => {

    const baseClasses = 'rounded-full text-sm font-normal px-2 inline-block text-center';

    const backGroundColorClasses = outline ? '' :
        color === 'primary' ? 'bg-blue-100' :
            color === 'secondary' ? 'bg-orange-100' :
                'bg-gray-100';

    const outlineClasses = !outline ? '' :
        color === 'primary' ? 'border border-blue-300' :
            color === 'secondary' ? 'border border-orange-300' :
                'border border-gray-400';

    const textColorClasses = color === 'primary' ? 'text-blue-700' :
        color === 'secondary' ? 'text-orange-700' :
            'text-gray-700';

    return (
        <span className={[
            baseClasses,
            backGroundColorClasses,
            outlineClasses,
            textColorClasses,
            classNames
        ].join(' ')}>
            {children}
        </span>
    );
};

export default Chip;