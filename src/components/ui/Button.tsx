import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'none';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
                                           variant = 'primary',
                                           size = 'md',
                                           className = '',
                                           disabled = false,
                                           children,
                                           style,
                                           ...props
                                       }) => {
    const baseClasses = 'font-semiBold rounded-lg transition-colors focus:outline-none';

    const variantClasses = {
        primary: disabled
            ? 'text-gray-400 bg-gray-200 cursor-not-allowed'
            : 'text-white hover:bg-blue-800 focus:ring-blue-500 cursor-pointer',
        secondary: disabled
            ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
            : 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500 cursor-pointer',
        outline: disabled
            ? 'border border-gray-300 text-gray-400 cursor-not-allowed'
            : 'border border-blue-700 text-blue-700 hover:bg-blue-50 focus:ring-blue-500 cursor-pointer',
        none: disabled
            ? 'border-none text-gray-400 cursor-not-allowed'
            : 'border-none text-gray-800 cursor-pointer'
    };

    const sizeClasses = {
        sm: 'py-1.5 text-sm',
        md: 'py-3 text-base',
        lg: 'py-5 text-lg'
    };

    const variantStyles = {
        primary: disabled
            ? { backgroundColor: 'rgb(229, 231, 235)' } // gray-200
            : { backgroundColor: 'rgb(38, 86, 201)' },
        secondary: disabled
            ? { backgroundColor: 'rgb(209, 213, 219)' } // gray-300
            : {},
        outline: disabled
            ? { borderColor: 'rgb(209, 213, 219)' } // gray-300
            : { borderColor: 'rgb(38,86,201)' },
        none: {}
    }

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
    return (
        <button
            className={combinedClasses}
            style={{...style, ...variantStyles[variant]}}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;