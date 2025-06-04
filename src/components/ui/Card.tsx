import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

function Card({
    children,
    className = ''
}:CardProps):React.ReactNode {
    return (
        <div className={`flex flex-col gap-3 bg-white font-semibold rounded-lg drop-shadow-sm p-4 ${className}`}>
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