import React, {cloneElement, useEffect, useState} from 'react';
import Chip from "./Chip.tsx";

interface DropdownItem {
    label : string;
    value : unknown;
}

interface BaseDropdownOption {
    items : DropdownItem[];
    defaultIndex : number;
}

interface InternalDropdownOption extends BaseDropdownOption{
    isMenuOpen? : boolean;
    openMenuHandler : (event: React.MouseEvent<HTMLButtonElement>)=>void;
    selectedItem : DropdownItem | null;
    hasPreviousMenu : boolean;
    isLastMenu : boolean;
    isDropdownSelected : boolean
    onClickDropdownMenuItem : (dropdownItem:DropdownItem, event: React.MouseEvent<HTMLButtonElement>)=>void;
}

interface DropdownChipProps {
    children? : React.ReactElement<BaseDropdownOption>[] | React.ReactElement<BaseDropdownOption>;
    isSelected? : boolean;
    onChange?: (selectedItems:DropdownItem[])=>void;
}

const getArrowDownSvg = (arrowColor:string) => <span><svg
    width="8"
    viewBox="0 0 10 6"
    fill="none"
    className={`ml-1 inline`}
>
      <path
          d="M1 1L5 5L9 1"
          stroke={arrowColor}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
      />
</svg></span>;

const DropdownMenu = ({
    items,
    isMenuOpen = false,
    openMenuHandler,
    selectedItem,
    hasPreviousMenu,
    isLastMenu,
    isDropdownSelected,
    onClickDropdownMenuItem,
}:InternalDropdownOption)=> {
    return (
        <div className={[
            "inline-block relative",
            hasPreviousMenu ? 'border-l border-gray-400 pl-2':'',
            !isLastMenu ? 'pr-2':''
        ].join(" ")}>
            <button onClick={openMenuHandler}>
                {selectedItem && selectedItem.label}
                {getArrowDownSvg(isDropdownSelected?"#ffffff":"#323234")}
            </button>

            {isMenuOpen && <div className={"absolute z-10 top-full mt-2 p-2" +
                " border rounded-md bg-white text-gray-700 shadow-lg" +
                " min-w-16 max-h-40 overflow-auto"    +
                (hasPreviousMenu ? " -left-2" : " -left-0")}>
                <ul className={"flex flex-col gap-2"}>
                    {items.map(dropdownItem=>
                        <li key={String(dropdownItem.value)}>
                            <button className={"w-full text-left"}
                                    onClick={event=>onClickDropdownMenuItem(dropdownItem,event)}>
                                {dropdownItem.label}
                            </button>
                        </li>
                    )}
                </ul>
            </div>}

        </div>
    )
}

const DropdownChip = ({
    children,
    isSelected = false,
    onChange: handleToChange
}: DropdownChipProps) => {
    const dropdownMenus = !children ? [] :
        Array.isArray(children) ? children :
            [children];

    const [openedMenuIndex, setOpenedMenuIndex] = useState<number>(-1);
    const [selectedItems, setSelectedItems] = useState<DropdownItem[] | null>(
        dropdownMenus.map(menu => {
            const {items, defaultIndex} = menu.props;
            return items[defaultIndex];
        })
    );

    useEffect(() => {
        const onBackgroundClickHandler = ()=>setOpenedMenuIndex(-1);

        if(openedMenuIndex>-1){
            document.addEventListener('click', onBackgroundClickHandler);
        }
        return ()=>document.removeEventListener('click',onBackgroundClickHandler);
    }, [openedMenuIndex]);

    const enhancedChildren = dropdownMenus.map((menu,index)=> {
        const injectedProps:InternalDropdownOption = {
            ...menu.props,
            isMenuOpen: index === openedMenuIndex,
            openMenuHandler: event => {
                event.stopPropagation();
                setOpenedMenuIndex(index);
            },
            selectedItem: selectedItems ? selectedItems[index] : null,
            hasPreviousMenu: index > 0,
            isLastMenu: index == dropdownMenus.length - 1,
            isDropdownSelected: isSelected,
            onClickDropdownMenuItem: (selectedItem,event) => {

                event.stopPropagation();

                const newSelectedItems = selectedItems? [...selectedItems] : [];
                newSelectedItems[index] = selectedItem;

                //드롭다운 선택옵션 상태값 갱신
                setSelectedItems(newSelectedItems);

                //열린 드롭다운 메뉴 닫힘처리
                setOpenedMenuIndex(-1);

                //드롭다운 선택옵션 변경시 콜백함수 처리
                if(handleToChange)
                    handleToChange(newSelectedItems);
            }
        };
        return cloneElement(menu,
            {key: index, ...injectedProps}
        );
    });

    return (
        <Chip outline={true}
              classNames={"px-3 py-1"}
              isSelected={isSelected}
        >
            {enhancedChildren}
        </Chip>
    )
};

DropdownChip.DropdownMenu = DropdownMenu as React.FC<BaseDropdownOption>;

export default DropdownChip;