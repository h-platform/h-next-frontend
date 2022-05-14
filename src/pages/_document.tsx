import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default function _document() {
    return (
        <Html data-theme="cupcake">
            <Head />
            <body dir='rtl'>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
