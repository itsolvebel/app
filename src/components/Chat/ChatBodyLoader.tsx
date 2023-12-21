export default function ChatBodyLoader() {
  return (
    <div className='flex h-full w-full items-end overflow-hidden'>
      <div className='flex h-full w-full flex-col gap-4 px-12 py-10'>
        <div className='flex'>
          <div>
            <div>
              <div className='flex h-12 w-12 animate-pulse justify-center rounded-full bg-gray-200' />
            </div>
          </div>
          <div className='ml-4'>
            <div className='flex animate-pulse flex-col rounded-r-xl rounded-bl-xl bg-gray-200 px-4 py-3'>
              <div className='h-12 w-96 animate-pulse bg-gray-200 text-sm' />
            </div>
          </div>
        </div>

        <div className='flex items-center'>
          <div>
            <div>
              <div className='flex h-12 w-12 animate-pulse justify-center rounded-full bg-gray-200' />
            </div>
          </div>
          <div className='ml-4'>
            <div className='flex animate-pulse flex-col rounded-r-xl rounded-bl-xl bg-gray-200 px-4 py-3'>
              <div className='h-4 w-56 animate-pulse bg-gray-200 text-sm' />
            </div>
          </div>
        </div>

        <div className='flex w-full flex-row-reverse items-center'>
          <div>
            <div>
              <div className='flex h-12 w-12 animate-pulse justify-center rounded-full bg-gray-200' />
            </div>
          </div>
          <div className='mr-4'>
            <div className='flex animate-pulse flex-col rounded-l-xl rounded-br-xl bg-gray-200 px-4 py-3'>
              <div className='h-4 w-56 animate-pulse bg-gray-200 text-sm' />
            </div>
          </div>
        </div>

        <div className='flex w-full flex-row-reverse'>
          <div>
            <div>
              <div className='flex h-12 w-12 animate-pulse justify-center rounded-full bg-gray-200' />
            </div>
          </div>
          <div className='mr-4'>
            <div className='flex animate-pulse flex-col rounded-l-xl rounded-br-xl bg-gray-200 px-4 py-3'>
              <div className='h-24 w-96 animate-pulse bg-gray-200 text-sm' />
            </div>
          </div>
        </div>

        <div className='flex w-full flex-row-reverse items-center'>
          <div>
            <div>
              <div className='flex h-12 w-12 animate-pulse justify-center rounded-full bg-gray-200' />
            </div>
          </div>
          <div className='mr-4'>
            <div className='flex animate-pulse flex-col rounded-l-xl rounded-br-xl bg-gray-200 px-4 py-3'>
              <div className='h-4 w-96 animate-pulse bg-gray-200 text-sm' />
            </div>
          </div>
        </div>

        <div className='flex'>
          <div>
            <div>
              <div className='flex h-12 w-12 animate-pulse justify-center rounded-full bg-gray-200' />
            </div>
          </div>
          <div className='ml-4'>
            <div className='flex animate-pulse flex-col rounded-r-xl rounded-bl-xl bg-gray-200 px-4 py-3'>
              <div className='h-48 w-96 animate-pulse bg-gray-200 text-sm' />
            </div>
          </div>
        </div>

        <div className='flex w-full flex-row-reverse items-center'>
          <div>
            <div>
              <div className='flex h-12 w-12 animate-pulse justify-center rounded-full bg-gray-200' />
            </div>
          </div>
          <div className='mr-4'>
            <div className='flex animate-pulse flex-col rounded-l-xl rounded-br-xl bg-gray-200 px-4 py-3'>
              <div className='h-4 w-96 animate-pulse bg-gray-200 text-sm' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
