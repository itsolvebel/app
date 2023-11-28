import { Toaster } from 'react-hot-toast'

import SideWelcome from './SideWelcome'
import RegisterForm from './RegisterForm'
import { useRouter } from 'next/navigation'
import { useIsAuthenticated } from '@/hooks/useAuthentication'

export default function RegisterPage() {
  const { isAuthenticated, loading } = useIsAuthenticated()
  const router = useRouter()

  if (!loading && !isAuthenticated) {
    router.push('/login')
  }

  return (
    <div className='flex h-screen w-screen bg-[#0D1623] p-4'>
      <Toaster />
      <SideWelcome />
      <RegisterForm />
    </div>
  )
}
