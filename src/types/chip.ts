
export interface ChipProps {
    color? : 'primary' | 'secondary' | 'default'
    outline? : boolean;
    children : React.ReactNode;
    classNames? : string;
    onClick?: ()=>void;
    isSelected? : boolean;
}