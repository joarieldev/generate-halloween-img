import Link from 'next/link'
import { IImage } from '../interface/image'
import { CldImage } from 'next-cloudinary'

interface Props {
  image: IImage
  handleDelete: (id: string) => void
}

export const Img = ({ image, handleDelete }: Props) => {
  return (
    <div className="border border-gray-300 relative rounded-lg size-40 max-md:size-32 group overflow-hidden">
      <button
        className="px-2 absolute rounded-lg top-0 right-0 bg-red-700 hover:bg-red-600 z-10"
        title="eliminar"
        onClick={() => handleDelete(image.public_id)}
      >
        ×
      </button>
      <Link href={`/edit/${image.public_id}`}>
        <CldImage
          width={200}
          height={200}
          className="object-cover h-full w-full"
          src={image.public_id}
          alt={image.public_id}
          priority
        />
      </Link>
      <div className="hidden group-hover:flex absolute top-0 left-0 h-full w-full bg-black/60 bg-[url('/sonrisa.webp')] bg-center bg-[length:200px_auto] bg-no-repeat pointer-events-none transition duration-700"></div>
    </div>
  )
}
