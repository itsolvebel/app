import { LucideIcon } from 'lucide-react'


type Props = {
  title: string
  value: number
  color: string
  Icon: LucideIcon
}

export function Chart({ title, value, color, Icon }: Props) {
  return (
    <div
      className='flex w-80 gap-4 overflow-hidden rounded-lg p-4 shadow-md hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out'>
      <div
        className='flex items-center justify-center rounded-full p-6'
        style={{ backgroundColor: color + '33' }}
      >
        <Icon size={25} color={color} />
      </div>
      <div className='flex flex-col justify-center'>
        <span className='text-2xl font-bold'>{value}</span>
        <span className='text-sm font-medium text-gray-500'>{title}</span>
      </div>
    </div>
  )
}
