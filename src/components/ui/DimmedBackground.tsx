import React from "react";

interface DimmedBackgroundProps {
    onBackgroundClick : React.MouseEventHandler<HTMLDivElement>;
    children : React.ReactNode;
    type : 'bottomSheet' | 'alertDialog';
    zIndex? : number;
}

const DimmedBackground = ({
    type,
    onBackgroundClick,
    children,
    zIndex = 50,
} : DimmedBackgroundProps) => {

    const baseClasses = `flex bg-black bg-opacity-70 fixed inset-0 text-gray-800`;

    const layoutClasses = {
        bottomSheet: 'flex flex-col-reverse',
        alertDialog: 'flex items-center justify-center p-6'
    }

    return (
        <div className={`${baseClasses} ${layoutClasses[type]}`}
             onClick={onBackgroundClick}
             style={{zIndex: zIndex}}
        >
            {children}
        </div>
    );
};

export default DimmedBackground;