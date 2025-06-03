import React, {useEffect, useRef, useState} from "react";
import Card from "./Card.tsx";

interface ExpandableCardProps<T> {
    title: string;
    items: T[];
    itemRenderFunc: (item: T) => React.ReactNode;
    listItemClassName?: string
    visibleCount?: number;
    expandText?: string;
    collapseText?: string;
}

export default function ExpandableCard<T>({
    title,
    items,
    itemRenderFunc,
    listItemClassName = '',
    visibleCount = 1,
    expandText = '더보기',
    collapseText = '접기'
}: ExpandableCardProps<T>){
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const [hiddenHeight, setHiddenHeight] = useState<number>(0);

    const expandableRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if(expandableRef.current) {
            const hiddenHeight: number = expandableRef.current.scrollHeight;
            setHiddenHeight(hiddenHeight);
        }
    }, [items]);

    const toggleExpandingLeaveList = ():void =>{
        setIsExpanded(prev=>!prev);
    }

    return <Card>
        <Card.Header>{title}</Card.Header>
        <Card.Content>
            <ul>
                {items.slice(0,visibleCount).map(item =>
                    <li className={`flex flex-row justify-between p-2.5 ${listItemClassName}`}>
                        {itemRenderFunc(item)}
                    </li>
                )}
            </ul>
            {items.length > visibleCount &&
                <>
                    <ul className={'overflow-hidden transition-[height] duration-300 ease-in-out'}
                        style={{height: isExpanded? `${hiddenHeight}px` : '0px'}}
                        ref={expandableRef}>
                        {items.slice(visibleCount, items.length).map(item =>
                            <li className={`flex flex-row justify-between p-2.5 ${listItemClassName}`}>
                                {itemRenderFunc(item)}
                            </li>
                        )}
                    </ul>
                    <button
                        className="block font-normal w-full bg-gray-100 rounded-md border-gray-400 p-2 mt-2"
                        onClick={toggleExpandingLeaveList}>
                        <span>{isExpanded ? collapseText : expandText}</span>
                        <span><svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            className={`ml-1 inline ${isExpanded? 'rotate-180':''}`}
                        >
                              <path
                                  d="M1 1L5 5L9 1"
                                  stroke="#929294"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                              />
                            </svg></span>
                    </button>
                </>
            }
        </Card.Content>
    </Card>;
}