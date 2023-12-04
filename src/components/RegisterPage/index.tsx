import { Toaster } from 'react-hot-toast'

import SideWelcome from './SideWelcome'
import RegisterForm from './RegisterForm'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  return (
    <div className='flex h-screen w-screen bg-[#0D1623] p-4'>
      <Toaster />
      <SideWelcome />
      <RegisterForm />
    </div>
  )
}
