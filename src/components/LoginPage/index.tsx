import { Toaster } from 'react-hot-toast'

import SideWelcome from './SideWelcome'
import LoginForm from './LoginForm'
import { useIsAuthenticated } from '@/hooks/useAuthentication'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { isAuthenticated, loading } = useIsAuthenticated()
  const router = useRouter()

  if (!loading && !isAuthenticated) {
    router.push('/login')
  }

  return (
    <div className="flex h-screen w-screen bg-[#0D1623] p-4">
      <Toaster />
      <LoginForm />
      <SideWelcome />
    </div>
  );
}
