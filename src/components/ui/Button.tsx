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
                                           children,
                                           ...props
                                       }) => {
    const baseClasses = 'font-semiBold rounded-lg transition-colors focus:outline-none';

    const variantClasses = {
        primary: 'text-white hover:bg-blue-800 focus:ring-blue-500',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500',
        outline: 'border border-blue-700 text-blue-700 hover:bg-blue-50 focus:ring-blue-500',
        none : 'border-none text-gray-800'
    };

    const sizeClasses = {
        sm: 'py-1.5 text-sm',
        md: 'py-2 text-base',
        lg: 'py-3 text-lg'
    };

    const variantStyles = {
        primary: {
            backgroundColor: 'rgb(38, 86, 201)'
        },
        secondary: {

        },
        outline: {
            borderColor: 'rgb(38,86,201)'
        },
        none: {

        }
    }

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

    return (
        <button className={combinedClasses} style={variantStyles[variant]} {...props}>
            {children}
        </button>
    );
};

export default Button;

// 사용 예시:
// <Button>휴가 신청하기</Button>
// <Button variant="secondary">취소</Button>
// <Button variant="outline" size="lg">더보기</Button>
// <Button className="w-full">전체 너비</Button>