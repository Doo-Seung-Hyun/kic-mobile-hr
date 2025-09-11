import {Children, cloneElement, type ReactElement, useState} from "react";

interface TabProps {
    onChange?: (activeIndex:number) => void;
    defaultActiveIndex?: number;
    children: ReactElement<TabItemProps> | ReactElement<TabItemProps>[];
    className?: string;
}

interface TabItemProps{
    children: React.ReactNode;
}

interface InternalTabItemProps extends TabItemProps{
    onClick?: (tabIndex:number)=>void;
    tabIndex?:number;
    isActive?: boolean;
}

const TabItem = ({
                     onClick: handleClick,
                     tabIndex,
                     isActive = false,
                     children,
                 }:InternalTabItemProps) => {
    return (
        <button onClick={()=>handleClick?.(tabIndex!)}
                className={[
                    'z-[2]',
                    'flex-1 p-2 rounded-lg',
                    !isActive && 'text-gray-600',
                    // isActive && 'bg-white',
                ].filter(Boolean).join(' ')}
        >
            {children}
        </button>
    )
}

const Tab = ({
    onChange: onChangeHandler,
    defaultActiveIndex=0,
    className,
    children
}:TabProps)=> {

    const [activeIndex, setActiveIndex] = useState<number>(defaultActiveIndex);
    const handleTabClick = (newIndex:number) => {
        setActiveIndex(newIndex);
        if(onChangeHandler)
            onChangeHandler(newIndex);
    }

    const tabItemCount = Children.count(children);

    return <div className={[
        'border border-gray-200 p-1 rounded-xl flex text-sm font-semibold relative',
        className
    ].filter(Boolean).join(' ')}>

        {/*인디케이터*/}
        <div className={`absolute top-1 left-0 bottom-1 rounded-lg p-1 bg-white z-[1] transition-transform transform`}
             style={{
                 width: `calc(${100/tabItemCount}% - 0.5rem)`,
                 transform: `translateX(calc(${activeIndex*100}% + ${activeIndex*0.5}rem + 0.25rem))`,
             }}
        />
        {/*탭아이템 출력*/}
        {Children.map(children, (child, index)=>
            cloneElement<InternalTabItemProps>(child, {
                onClick: handleTabClick,
                tabIndex: index,
                isActive: index===activeIndex
            })
        )}
    </div>;
}

Tab.Item = TabItem as React.FC<TabItemProps>;

export default Tab;