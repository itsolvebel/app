import { ReactNode, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as SelectPrimitive from '@radix-ui/react-select'
import { DatePicker } from '@medusajs/ui'
import { Check, ChevronDown, ChevronUp, Loader2, X } from 'lucide-react'
import { categories as allCategories, Category } from '@/typings/category'
import { fetcher } from '@/lib/fetcher'

type NewTicketDialogProps = {
  children: ReactNode | ReactNode[],
  updateTickets: () => void,
  title: string | null
}


type NewTicketDialogForm = {
  title: string | null,
  description: string,
  categoriesSelected: Category[],
  deadline: Date,
  budget: number
}

export function NewTicketDialog({ children, updateTickets, title }: NewTicketDialogProps) {
  const [inputs, setInputs] = useState<NewTicketDialogForm>({
    title: title || '',
    description: '',
    categoriesSelected: [],
    // deadlineSelected: false,
    deadline: new Date(),
    // budgetSelected: false,
    budget: 0,
  })
  const [isOpened, setIsOpened] = useState(!!title)
  const [error, setError] = useState('')
  const [button, setButton] = useState(1) // 1 = create, 2 = loading, 3 = error
  const [categories, setCategories] = useState<Category[]>(allCategories)

  function handleCreate() {
    setButton(2)

    fetcher.post('/tickets', {
      title: inputs.title,
      description: inputs.description,
      categories: inputs.categoriesSelected,
      deadline: inputs.deadline,
      budget: inputs.budget,
    }).then(res => {
      if (res.status >= 400) {
        setButton(3)
        setError(res.error)
      } else {
        setButton(1)
        setIsOpened(false)
        setInputs({
          title: '',
          description: '',
          categoriesSelected: [],
          deadline: new Date(),
          budget: 0,
        })
        setError('')
        updateTickets()
      }
    })
  }

  function handleAddCategory(c: Category) {
    setInputs({
      ...inputs,
      categoriesSelected: [...inputs.categoriesSelected, c],
    })
    setCategories(categories.filter((category) => category !== c))
  }

  function handleDeleteCategory(c: Category) {
    setInputs({
      ...inputs,
      categoriesSelected: inputs.categoriesSelected.filter(
        (category) => category !== c,
      ),
    })
    setCategories([...categories, c])
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
            New Ticket
          </Dialog.Title>
          <fieldset className='mb-3 flex flex-col gap-2'>
            <label htmlFor='username'>
              Ticket Name <span className='text-red-800'>*</span>
            </label>
            <input
              id='title'
              placeholder='Website for restaurant business'
              type='text'
              value={inputs.title || ''}
              onChange={(e) => setInputs({ ...inputs, title: e.target.value })}
              className='w-full rounded-md bg-[#E7F1FF] px-4 py-2 font-light text-black placeholder-[#ABABAD] placeholder-opacity-50 outline-none transition duration-300 ease-in-out hover:border-[#c1c2ce] focus:border-[#c1c2ce] focus:outline-none'
            />
          </fieldset>

          <fieldset className='mb-3 flex flex-col gap-2'>
            <label htmlFor='message'>
              Description <span className='text-red-800'>*</span>
            </label>
            <textarea
              name=''
              id=''
              cols={30}
              rows={5}
              placeholder='I need a website for my restaurant business. I want to have a website where I can show my menu, my location, and my contact information...'
              value={inputs.description}
              onChange={(e) =>
                setInputs({ ...inputs, description: e.target.value })
              }
              className='w-full resize-none rounded-md bg-[#E7F1FF] px-4 py-2 font-light text-black placeholder-[#ABABAD] placeholder-opacity-50 outline-none transition duration-300 ease-in-out hover:border-[#c1c2ce] focus:border-[#c1c2ce] focus:outline-none'
            ></textarea>
            {error.length > 1 && <span className='text-red-800'>{error}</span>}
          </fieldset>

          <fieldset className='mb-3 flex flex-col gap-2'>
            <label htmlFor='username'>
              Categories <span className='text-red-800'>*</span>
            </label>
            <SelectPrimitive.Root
              defaultValue={'Select'}
              value='Select'
              onValueChange={(v) => {
                handleAddCategory(v)
              }}
            >
              <SelectPrimitive.Trigger asChild>
                <button
                  className='flex w-full items-center rounded-md bg-[#E7F1FF] px-4 py-2 font-medium text-black placeholder-opacity-50 outline-none transition duration-300 ease-in-out focus:outline-none'>
                  <SelectPrimitive.Value />
                  <SelectPrimitive.Icon className='ml-2'>
                    <ChevronDown size={14} strokeWidth={3} />
                  </SelectPrimitive.Icon>
                </button>
              </SelectPrimitive.Trigger>
              <SelectPrimitive.Content>
                <SelectPrimitive.ScrollUpButton className='flex items-center justify-center text-black'>
                  <ChevronUp />
                </SelectPrimitive.ScrollUpButton>
                <SelectPrimitive.Viewport className='w-full rounded-lg bg-[#E7F1FF] p-2 shadow-lg'>
                  <SelectPrimitive.Group>
                    <SelectPrimitive.Item
                      value={'Select'}
                      className='radix-disabled:opacity-50 relative flex select-none items-center rounded-md px-8 py-2 text-sm font-medium text-black transition-colors duration-300 hover:bg-[#5A8ED1] hover:text-[#E7F1FF] focus:outline-none'
                      disabled
                    >
                      <SelectPrimitive.ItemText>
                        Select a category
                      </SelectPrimitive.ItemText>
                      <SelectPrimitive.ItemIndicator className='absolute left-2 inline-flex items-center'>
                        <Check size={14} strokeWidth={3} />
                      </SelectPrimitive.ItemIndicator>
                    </SelectPrimitive.Item>
                    {categories.map((f, i) => (
                      <SelectPrimitive.Item
                        key={`${f}-${i}`}
                        value={f}
                        className='radix-disabled:opacity-50 relative flex select-none items-center rounded-md px-8 py-2 text-sm font-medium text-black transition-colors duration-300 hover:bg-[#5A8ED1] hover:text-[#E7F1FF] focus:outline-none'
                      >
                        <SelectPrimitive.ItemText>{f}</SelectPrimitive.ItemText>
                        <SelectPrimitive.ItemIndicator className='absolute left-2 inline-flex items-center'>
                          <Check size={14} strokeWidth={3} />
                        </SelectPrimitive.ItemIndicator>
                      </SelectPrimitive.Item>
                    ))}
                  </SelectPrimitive.Group>
                </SelectPrimitive.Viewport>
                <SelectPrimitive.ScrollDownButton className='flex items-center justify-center text-black'>
                  <ChevronDown size={14} strokeWidth={3} />
                </SelectPrimitive.ScrollDownButton>
              </SelectPrimitive.Content>
            </SelectPrimitive.Root>
            <div className='flex flex-row flex-wrap gap-2'>
              {inputs.categoriesSelected.map((category, index) => (
                <span
                  key={index}
                  className='flex flex-row items-center gap-2 rounded-lg bg-[#E7F1FF] px-3 py-1 text-[#636369]'
                >
                  {category}
                  <X
                    size={14}
                    color='#636369'
                    className='cursor-pointer'
                    onClick={() => {
                      handleDeleteCategory(category)
                    }}
                  />
                </span>
              ))}
            </div>
          </fieldset>

          <fieldset className='mb-3 flex flex-col gap-2'>
            <label htmlFor='message'>
              Deadline <span className='text-red-800'>*</span>
            </label>
            <DatePicker
              value={inputs.deadline}
              required={true}
              onChange={(date) => setInputs({ ...inputs, deadline: date || new Date() })}
              className='rounded-md bg-[#E7F1FF] px-4 py-2 font-light font-medium text-black placeholder-opacity-50 shadow-none outline-none transition duration-300 ease-in-out hover:bg-[#E7F1FF] focus:border-[#c1c2ce] focus:outline-none'
            />
            {error.length > 1 && <span className='text-red-800'>{error}</span>}
          </fieldset>

          <fieldset className='mb-3 flex flex-col gap-2'>
            <label htmlFor='username'>
              Budget <span className='text-red-800'>*</span>
            </label>
            <input
              id='budget'
              placeholder="Leave empty if you don't have a budget"
              type='number'
              value={inputs.budget}
              onChange={(e) => setInputs({ ...inputs, budget: e.target.valueAsNumber })}
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
