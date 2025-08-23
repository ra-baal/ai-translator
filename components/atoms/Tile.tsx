import React from 'react';
import Link from 'next/link';

interface TileProps {
    title: string;
    description?: string;
    href?: string;
    icon?: React.ReactNode;
    variant?: 'default' | 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Tile: React.FC<TileProps> = ({
    title,
    description,
    href,
    icon,
    variant = 'default',
    size = 'md',
    className = '',
}) => {
    const baseClasses = 'group relative overflow-hidden rounded-xl border transition-all duration-300 ease-in-out'
    const variantClasses = {
        default: 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600',
        primary: 'border-blue-200 bg-blue-50 hover:border-blue-300 hover:shadow-lg dark:border-blue-800 dark:bg-blue-900/20 dark:hover:border-blue-700',
        secondary: 'border-purple-200 bg-purple-50 hover:border-purple-300 hover:shadow-lg dark:border-purple-800 dark:bg-purple-900/20 dark:hover:border-purple-700',
    };

    const sizeClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
    };

    const content = (
        <div className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
            {icon && (
                <div className="mb-4 text-2xl text-gray-600 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
            )}

            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                {title}
            </h3>

            {description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {description}
                </p>
            )}

        </div>
    );

    if (href) {
        return (
            <Link href={href} className="block">
                {content}
            </Link>
        );
    }

    return content;
};

export default Tile;
