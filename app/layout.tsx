import NavBar from '@/components/NavBar'
import './globals.css'
import Footer from '@/components/Footer'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={` mt-28 ${inter.className}`}>
        {/* <h1>{process.env.NEXT_PUBLIC_SITE_URL}</h1> */}
        <NavBar />
        {/* <div className='mx-4 sm:mx-6 lg:mx-8'> */}
          {children}
        {/* </div> */}
        <Footer />
      </body>
    </html>
  )
}
