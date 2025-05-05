import React from 'react';

export default function Select({ id, value, onChange, error, children, className = '' }) {
    return (
        <div className="mb-4">
            <select
                id={id}
                value={value}
                onChange={onChange}
                className={`w-full mt-1 block border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
            >
                {children}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}
