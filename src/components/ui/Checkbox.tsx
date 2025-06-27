import {useState} from "react";

interface CheckboxProps {
    checked?: boolean;
    className? : string;
    children : string;
}

export const Checkbox = ({
    checked = false,
    className,
    children
}:CheckboxProps) => {
    const [isChecked, setIsChecked] = useState(checked)

    return (<label className={[
        "relative pl-10",
        className
    ].filter(Boolean).join(" ")}>
        <input type={"checkbox"}
               className={"opacity-0 w-0 h-0"}
               checked={isChecked}
               onChange={event=>setIsChecked(event.target.checked)}
        />
        <span className={[
            "absolute w-4 h-4 border rounded-[4px] left-0 top-1/2 transform -translate-y-1/2",
            "flex items-center justify-center",
            isChecked ? "border-blue-600":"border-gray-400",
            isChecked && "bg-blue-600",
            "after:content-[''] after:absolute",
            "after:w-2/5 after:h-5/6 after:bottom-0.5",
            "after:border-white after:border-r-[2px] after:border-b-[2px] after:rounded-br-[2px]",
            "after:transform after:rotate-45",
            isChecked ? "after:block" : "after:hidden"
        ].filter(Boolean).join(" ")}
        />
        {children}
    </label>);
}