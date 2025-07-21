import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick? : (event: React.MouseEvent<HTMLDivElement>) => void;
}

function Card({
    children,
    className = '',
    onClick:handleClick
}:CardProps):React.ReactNode {
    return (
        <div className={'flex flex-col gap-3 bg-white font-semibold text-gray-800 p-4 ' +
            'rounded-xl shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05),_0_4px_6px_0_rgb(0_0_0_/_0.03)] '
            +` ${className}`}
             onClick={event => {
                 if(handleClick)
                    handleClick(event)
             }}
        >
            {children}
        </div>
    );
}

function CardHeader ({children}:{children: React.ReactNode}){
    return (
        <div className="text-sm font-semibold text-gray-500">
            {children}
        </div>
    )
}

function CardContent({
    children,
    className = ''
}:CardProps){
    return (
        <div className={className}>{children}</div>
    )
}

Card.Header = CardHeader;
Card.Content = CardContent;

export default Card;