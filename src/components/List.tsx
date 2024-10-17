'use client'

import { getImages } from '@/actions/get-images'
import { Img } from './Img'
import { IImage } from '@/interface/image'
import { useEffect, useState } from 'react'
import { deleteImage } from '@/actions/delete-image'

export const List = () => {
  const [images, setImages] = useState<IImage[]>([])

  const handleDelete = async (id: string) => {
    const res = await deleteImage(id)
    if (res.result === 'ok') {
      setImages(images.filter((image) => image.public_id !== id))
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const res = await getImages()
      setImages(res.resources)
      // console.log(res.resources)
    }
    fetch()
  }, [])

  return (
    <>
      {images.map((image) => (
        <Img key={image.public_id} image={image} handleDelete={handleDelete} />
      ))}
    </>
  )
}
