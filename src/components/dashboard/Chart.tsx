import { LucideIcon } from 'lucide-react'


type Props = {
  title: string
  value: string
  color: string
  Icon: LucideIcon
}

export default function Chart({ title, value, color, Icon }: Props) {
  return (
    <div className='flex w-full items-center gap-4 overflow-hidden rounded-lg bg-white p-4 shadow-md'>
      <div
        className={`flex items-center justify-center rounded-full p-6`}
        style={{ backgroundColor: color + '33' }}
      >
        {/*add the icon*/}

        <Icon size={25} color={color} />
      </div>
      <div className='flex flex-col justify-center'>
        <span className='text-2xl font-bold'>{value}</span>
        <span className='text-sm font-medium text-gray-500'>{title}</span>
      </div>
    </div>
  )
}
