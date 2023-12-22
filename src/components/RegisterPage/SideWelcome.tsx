import Image from 'next/image'

export function SideWelcome() {
  return (
    <div className='hidden h-full flex-col justify-center gap-8 rounded-2xl bg-white p-16 xl:flex xl:w-full '>
      <Image src='/assets/logoGray.png' width={100} height={100} alt='Logo' />
      <h1 className='text-5xl font-bold leading-relaxed text-black/75'>
        <span className='bg-gradient-to-r from-[#01A0C4] to-[#5bd9f5] bg-clip-text text-transparent'>
          No more waiting
        </span>
        , get your project done on your own timeline.
      </h1>
      <p className='text-lg text-[#00000070]'>
        The only platform you need for all your service needs
      </p>
    </div>
  )
}
