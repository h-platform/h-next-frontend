import React from 'react'
import { Nav } from './Nav'

export const Layout = ({ children }: { children: any }) => {
    return (
        <div className="container mx-auto px-4 flex flex justify-center">
            {/* <Nav /> */}
            <main className="my-5 w-full md:w-[32rem]">{children}</main>
        </div>
    )
}
