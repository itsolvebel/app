import { Poppins } from 'next/font/google'
import '@styles/globals.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import { PrimeReactProvider } from 'primereact/api'

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata = {
  title: 'ItSolve',
}

export default function RootLayout({ children, }: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' className={`${poppins.variable}`}>
    <body className='bg-white'>
    <PrimeReactProvider>
      {children}
    </PrimeReactProvider>
    </body>
    </html>
  )
}
