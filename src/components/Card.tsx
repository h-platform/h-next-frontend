import React, { useContext } from 'react'

export const Card = ({ children }: { children: any }) => {
    return (
        <>
            <div className="w-full card shadow-lg compact bg-base-100">
                <figure>
                    <img src="/header.jpg" />
                </figure>
                <h1 className='text-center text-gray-700'>NHMedico</h1>
                <hr className='color-gray-700' />
                <div className="card-body m-4">
                    {children}
                </div>
                <hr />
                <p className='text-center text-xs text-gray-400'>All Rights Reserver @2022 - NHMedico, Khartoum, Sudan</p>
            </div>
        </>
    )
}
