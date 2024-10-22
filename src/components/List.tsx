'use client'

import { getImages } from '@/actions/get-images'
import { Img } from './Img'
import { IImage } from '@/interface/image'
import { useEffect, useState } from 'react'
import { deleteImage } from '@/actions/delete-image'
import { Loading } from './Loading'

export const List = () => {
  const [images, setImages] = useState<IImage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async (id: string) => {
    const res = await deleteImage(id)
    if (res.result === 'ok') {
      setImages(images.filter((image) => image.public_id !== id))
    }
  }

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true)
      const res = await getImages().finally(() => setIsLoading(false))
      setImages(res.resources)
    }
    fetch()
  }, [])

  return (
    <>
      {isLoading && <Loading />}
      {images.map((image) => (
        <Img key={image.public_id} image={image} handleDelete={handleDelete} />
      ))}
    </>
  )
}
