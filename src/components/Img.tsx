'use client'

import Link from 'next/link'
import { IImage } from '../interface/image'
import { CldImage } from 'next-cloudinary'

export const Img = ({ image }: { image: IImage }) => {
  return (
    <div key={image.public_id} className="p-6 border">
      <Link href={`/generar/${image.public_id}`}>
        <CldImage
          width={200}
          height={200}
          src={image.public_id}
          sizes="100vw"
          alt={image.public_id}
        />
      </Link>
      {/* <a href={`/photo?id=${image.public_id}`}>
        <CldImage
          width={200}
          height={200}
          src={image.public_id}
          sizes="100vw"
          alt={image.public_id}
        />
      </a> */}
    </div>
  )
}
