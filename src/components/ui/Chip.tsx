import React from "react";
import type {ChipProps} from "../../types/chip.ts";

const Chip = ({
    color = 'default',
    outline = false,
    children,
    classNames = '',
    onClick,
    isSelected
}: ChipProps) => {

    const baseClasses = 'rounded-full text-sm font-normal px-2 inline-block text-center';
    const selectedClasses = 'bg-blue-600 text-white border border-blue-600';

    let finalClasses:string[] = [];
    if(isSelected){
        finalClasses = [
            baseClasses,
            selectedClasses,
            classNames
        ]
    }else {
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

        finalClasses = [
            baseClasses,
            backGroundColorClasses,
            outlineClasses,
            textColorClasses,
            classNames
        ];
    }

    return (
        <span className={finalClasses.join(' ')}
              onClick={onClick}
        >
            {children}
        </span>
    );
};

export default Chip;