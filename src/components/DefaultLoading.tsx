import { Loader2 } from 'lucide-react'

export function DefaultLoading() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Loader2 className='animate-spin' color='#0D1623' />
    </div>
  )
}
