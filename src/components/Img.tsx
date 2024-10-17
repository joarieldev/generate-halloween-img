import Link from 'next/link'
import { IImage } from '../interface/image'
import { CldImage } from 'next-cloudinary'

interface Props {
  image: IImage
  handleDelete: (id: string) => void
}

export const Img = ({ image, handleDelete }: Props) => {
  return (
    <div key={image.public_id} className="p-6 border relative">
      <button
        className="py-1 px-2 absolute top-0 right-0 bg-red-700 hover:bg-red-600"
        onClick={() => handleDelete(image.public_id)}
      >
        x
      </button>
      <Link href={`/generar/${image.public_id}`}>
        <CldImage
          width={200}
          height={200}
          className='size-auto'
          src={image.public_id}
          alt={image.public_id}
          priority
        />
      </Link>
    </div>
  )
}
