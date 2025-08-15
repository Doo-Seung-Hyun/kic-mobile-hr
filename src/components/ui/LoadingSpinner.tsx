export const LoadingSpinner = ({
    size = 140,
    color = "#0078D4",
    strokeWidth = 6,
    className='' }) => (
    <svg width={size} height={size} viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"
         className={className}
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

            <animateTransform
                attributeName="transform"
                type="rotate"
                values="-90 70 70; 270 70 70"
                dur="2s"
                repeatCount="indefinite"
            />
        </circle>
    </svg>
);