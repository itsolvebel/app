import { Toaster } from 'react-hot-toast'

import SideWelcome from './SideWelcome'
import LoginForm from './LoginForm'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen bg-[#0D1623] p-4">
      <Toaster />
      <LoginForm />
      <SideWelcome />
    </div>
  );
}
