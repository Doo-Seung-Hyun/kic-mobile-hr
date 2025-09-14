import {CircleAlert, X} from "lucide-react";

interface AlertProps {
    type: string;
    className?: string;
    children?: React.ReactNode;
}
export const Alert = ({
    type,
    className,
    children,
}:AlertProps) => {
    return <div className={`${className} bg-red-50 text-gray-600`
                            +' border border-red-500 text-sm font-medium rounded-lg'
                            +' p-2 flex items-start gap-2'}>
        <CircleAlert size={24} color={'#F04438'}/>
        <div className={'text-left'}>{children}</div>
        <button>
            <X size={20} />
        </button>
    </div>
}