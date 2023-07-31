import React from 'react'

export default function Badge({ children }: { children: number }) {

    if (children >= 0) {
        return (
            <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full dark:border-gray-900 p-3 -top-[8px] -right-[10px]">
                {children > 0 ? children > 99 ? '99+' : children : children}
            </div>
        )
    }

    return null;
}
