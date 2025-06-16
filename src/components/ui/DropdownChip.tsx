import React, {useState} from 'react';
import Chip from "./Chip.tsx";

interface DropdownItem {
    label : string;
    value : string;
}

interface DropdownOption {
    id : string;
    items : DropdownItem[];
    defaultValue : string;
}

interface DropdownChipProps {
    dropdownGroup : DropdownOption[];
    onChange? : (selectedValues : string[]) => void;
}

const arrowDownSvg = <span><svg
    width="8"
    viewBox="0 0 10 6"
    fill="none"
    className={`ml-1 inline`}
>
      <path
          d="M1 1L5 5L9 1"
          stroke="#323234"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
      />
</svg></span>;

const initializeSelectedValues = (dropdownGroup : DropdownOption[]) => {
    const initialState:Record<string, {label:string, value:string}> = {};
    dropdownGroup.forEach(dropdownOption=> {
        const {id, defaultValue,items} = dropdownOption;
        const foundItem = items.find(dropdownItem =>
            dropdownItem.value===defaultValue);

        initialState[id] = foundItem ?
            {...foundItem} : {label:'', value:''};
    })
    return initialState;
}

const DropdownChip = ({
    dropdownGroup,
    onChange
}: DropdownChipProps) => {
    const [menusOpen, setMenusOpen] = useState<boolean[]>(dropdownGroup.map(()=>false));
    const [selectedValues, setSelectedValues] = useState<Record<string, {label:string, value:string}>>(
        initializeSelectedValues(dropdownGroup)
    );

    const showDivider = dropdownGroup.length>1;
    return (
        <Chip outline={true}
              classNames={"px-3 py-1"}>
            {dropdownGroup.map((dropdownOption, idx) =>
                <div className={showDivider ?
                    "pr-1.5 border-r border-r-gray-400 inline-block relative" :
                    "relative"}>
                    <button onClick={()=>setMenusOpen(prev => {
                        const newState = [...prev];
                        newState[idx] = true;
                        return newState;
                    })}>
                        {selectedValues[dropdownOption.id].label}{arrowDownSvg}
                    </button>
                    {menusOpen[idx] && <div className={"absolute top-full mt-2 p-2 -left-2" +
                        " border rounded-md bg-white shadow-lg" +
                        " text-base min-w-16"}>
                        <ul className={"flex flex-col gap-2"}>
                            {dropdownOption.items.map(dropdownItem=> <li>
                                <button onClick={()=>setMenusOpen(prev=>prev.map(_=>false))}>
                                    {dropdownItem.label}
                                </button>
                            </li>)}
                        </ul>
                    </div>}
                </div>
            )}
        </Chip>
    );
};

export default DropdownChip;