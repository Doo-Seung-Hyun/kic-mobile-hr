import React from "react";

function Card({children}:{children: React.ReactNode}):React.ReactNode {
    return (
        <div className="flex flex-col gap-3 bg-white font-semibold rounded-lg drop-shadow-sm p-4">
            {children}
        </div>
    );
}

function CardHeader({children}:{children: React.ReactNode}){
    return (
        <div className="text-sm font-semibold text-gray-500">
            {children}
        </div>
    )
}

function CardContent({children}:{children: React.ReactNode}){
    return (
        <div>{children}</div>
    )
}

Card.Header = CardHeader;
Card.Content = CardContent;

export default Card;