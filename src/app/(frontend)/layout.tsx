import React from 'react'
import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <header>
          <nav className="fixed top-5 left-0 right-0 m-auto py-2 max-w-3xs border-2 border-white rounded-xl z-50">
            <ul className="flex gap-5 text-white justify-center items-center">
              <li>
                <a href="/" className="hover:bg-black/50 rounded-md px-2 py-1">
                  Home
                </a>
              </li>
              <li>
                <a href="/portfolio">Portfolio</a>
              </li>
              <li>
                <a href="/contact-me">Contact Me</a>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
