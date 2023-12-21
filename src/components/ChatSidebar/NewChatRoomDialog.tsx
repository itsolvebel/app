import { ReactNode, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Loader2 } from 'lucide-react'
import { fetcher } from '@/lib/fetcher'
import { NewChatRoom } from '@/typings/chat_room'

type NewChatRoomDialogProps = {
  children: ReactNode | ReactNode[],
  updateChats: () => void,
  title: string | null
}


export default function NewChatRoomDialog({ children, updateChats, title }: NewChatRoomDialogProps) {
  const [inputs, setInputs] = useState<NewChatRoom>({
    name: '',
    description: '',
  })
  const [isOpened, setIsOpened] = useState(!!title)
  const [error, setError] = useState('')
  const [button, setButton] = useState(1)

  function handleCreate() {
    setButton(2)

    fetcher.post('/chat_rooms', inputs).then(res => {
      if (res.status >= 400) {
        setButton(3)
        setError(res.error)
      } else {
        setButton(1)
        setIsOpened(false)
        setInputs({
          name: '',
          description: '',
        })
        setError('')
        updateChats()
      }
    })
  }

  return (
    <Dialog.Root open={isOpened} onOpenChange={setIsOpened}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className='DialogOverlay z-1 fixed inset-0 flex h-full w-full bg-black/50 duration-500 animate-in fade-in' />
        <Dialog.Content
          className={`DialogContent z-1 fixed left-2/4 top-2/4 -ml-[165px] -mt-[330px] h-min w-[300px] max-w-xl overflow-hidden rounded-xl bg-white px-8 pb-6 pt-6 outline-none duration-500 animate-in fade-in slide-in-from-bottom-10 focus:outline-none max-[350px]:-ml-[125px] max-[350px]:w-[220px] sm:-ml-[265px] sm:w-[500px]`}
        >
          <Dialog.Title className='font-monument-extended mb-3 text-2xl font-black text-[#5A8ED1]'>
            New Chat Room
          </Dialog.Title>
          <fieldset className='mb-3 flex flex-col gap-2'>
            <label htmlFor='username'>
              Chat Name <span className='text-red-800'>*</span>
            </label>
            <input
              id='title'
              placeholder='Global Chat'
              type='text'
              value={inputs.name || ''}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              className='w-full rounded-md bg-[#E7F1FF] px-4 py-2 font-light text-black placeholder-[#ABABAD] placeholder-opacity-50 outline-none transition duration-300 ease-in-out hover:border-[#c1c2ce] focus:border-[#c1c2ce] focus:outline-none'
            />
          </fieldset>

          <fieldset className='mb-3 flex flex-col gap-2'>
            <label htmlFor='username'>
              Description <span className='text-red-800'>*</span>
            </label>
            <input
              id='description'
              placeholder='A chat room for everyone'
              type='text'
              value={inputs.description || ''}
              onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
              className='w-full rounded-md bg-[#E7F1FF] px-4 py-2 font-light text-black placeholder-[#ABABAD] placeholder-opacity-50 outline-none transition duration-300 ease-in-out hover:border-[#c1c2ce] focus:border-[#c1c2ce] focus:outline-none'
            />
          </fieldset>

          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            <button
              className={`${
                button === 1
                  ? 'bg-[#5A8ED1] text-[#F2F2F2]' // send
                  : button === 2
                    ? 'pointer-events-none flex justify-center bg-[#E7F1FF]' // loading
                    : 'bg-[#E7F1FF] text-red-600' // error
              } w-full rounded-lg px-5 py-2 transition-colors duration-300 ease-in-out`}
              onClick={() => handleCreate()}
            >
              {
                button === 1 ? (
                  'Create' // send
                ) : button === 2 ? (
                  <Loader2 className='animate-spin' color='#5A8ED1' /> // loading
                ) : (
                  'Error, please try again'
                ) // error
              }
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
