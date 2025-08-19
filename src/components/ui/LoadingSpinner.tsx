import {useEffect, useState} from "react";

interface LoadingSpinnerProps {
    size?: number;
    color?: string;
    strokeWidth?: number;
    className?: string;
}


export const LoadingSpinner = ({
    size = 140,
    color = "#0078D4",
    strokeWidth = 6,
    className='' }:LoadingSpinnerProps) => {

    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        const id = requestAnimationFrame(()=>setAnimationClass('animate-spin'));

        return ()=>cancelAnimationFrame(id);
    },[])
    
    return <svg width={size} height={size} viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"
                className={`${className} ${animationClass}`.trim()}
    >
        <circle
            cx="70"
            cy="70"
            r="60"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray="126 251"
            strokeDashoffset="0"
            transform="rotate(-90 70 70)"
            // filter="drop-shadow(0 0 12px rgba(0, 120, 212, 0.6))"
        >
        </circle>
    </svg>;
}