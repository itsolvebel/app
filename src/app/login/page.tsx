import { Metadata } from 'next'
import LoginPage from '@components/LoginPage'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`),
  title: 'ItSolve | Login',
  description:
    'At itsolve safety is our top priority, delivering services with utmost quality. Our commitment shines through, day and night. Ensuring a better & reliable system, leaving competitors out of sight.',
  openGraph: {
    title: 'ItSolve | Login',
    description:
      'At itsolve safety is our top priority, delivering services with utmost quality. Our commitment shines through, day and night. Ensuring a better & reliable system, leaving competitors out of sight.',
    type: 'website',
    images: `${
      process.env.NEXT_PUBLIC_VERCEL_URL
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : process.env.NEXT_PUBLIC_URL
    }/assets/notxt.png`,
    url: new URL('/login', process.env.NEXT_PUBLIC_URL || `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`).href,
  },
}

export default function Login() {
  return <LoginPage />
}
