import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`),
  title: "ItSolve | Register",
  description:
      "At itsolve safety is our top priority, delivering services with utmost quality. Our commitment shines through, day and night. Ensuring a better & reliable system, leaving competitors out of sight.",
  openGraph: {
    title: "ItSolve | Register",
    description:
        "At itsolve safety is our top priority, delivering services with utmost quality. Our commitment shines through, day and night. Ensuring a better & reliable system, leaving competitors out of sight.",
    type: "website",
    url: new URL('/login', process.env.NEXT_PUBLIC_URL || `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`).href,
    images: `${
        process.env.NEXT_PUBLIC_VERCEL_URL
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
            : process.env.NEXT_PUBLIC_URL
    }/assets/notxt.png`,
  },
};

export default function Register() {
  return <RegisterPage />;
}
