import React from "react";

interface DimmedBackgroundProps {
    onBackgroundClick : React.MouseEventHandler<HTMLDivElement>;
    children : React.ReactNode;
    type : 'bottomSheet' | 'modal';
    zIndex? : number;
}

const DimmedBackground = ({
    type,
    onBackgroundClick,
    children,
    zIndex = 50,
} : DimmedBackgroundProps) => {

    const baseClasses = `flex bg-black bg-opacity-70 fixed inset-0 text-gray-800 z-${zIndex}`;

    const layoutClasses = {
        bottomSheet: 'flex flex-col-reverse',
        modal: 'flex items-center justify-center p-4'
    }

    return (
        <div className={`${baseClasses} ${layoutClasses[type]}`}
             onClick={onBackgroundClick}
        >
            {children}
        </div>
    );
};

export default DimmedBackground;