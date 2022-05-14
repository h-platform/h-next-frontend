import Link from 'next/link'
import React from 'react'

export const Nav = () => {
    return (
        <nav>
            <div className="flex justify-between h-16 px-10 shadow items-center">
                <div className="flex items-center space-x-8">
                <h1 className="text-sm lg:text-2xl font-bold cursor-pointer">الادارة العامة للجوازات والهجرة</h1>
                <div className="hidden md:flex justify-around space-x-4">
                    <a href="#" className="hover:text-indigo-600 text-gray-700">Home</a>
                    <a href="#" className="hover:text-indigo-600 text-gray-700">About</a>
                    <a href="#" className="hover:text-indigo-600 text-gray-700">Service</a>
                    <a href="#" className="hover:text-indigo-600 text-gray-700">Contact</a>
                </div>
                </div>
                <div className="flex space-x-4 items-center">
                <a href="/login" className="bg-indigo-600 px-4 py-2 rounded text-white hover:bg-indigo-500 text-sm">تسجيل دخول</a>
                </div>
            </div>
        </nav>
    )
}
