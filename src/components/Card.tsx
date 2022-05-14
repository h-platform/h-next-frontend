import React, { useContext } from 'react'

export const Card = ({ children }: { children: any }) => {
    return (
        <>
            <div className="w-full card shadow-lg compact bg-base-100">
                <figure>
                    <img src="/header.jpg" />
                </figure>
                <div className="card-body m-4">
                    {children}
                </div>
            </div>
        </>
    )
}
