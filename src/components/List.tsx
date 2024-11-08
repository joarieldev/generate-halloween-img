'use client'

import { getImages } from '@/actions/get-images'
import { Img } from './Img'
import { IImage } from '@/interface/image'
import { useEffect, useState } from 'react'
import { deleteImage } from '@/actions/delete-image'
import { Loading } from './Loading'
import { ModalDelete } from './ModalDelete'
import { toast } from 'sonner'

export const List = () => {
  const [images, setImages] = useState<IImage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [modal, setModal] = useState<{ open: boolean; idImg: string }>({
    open: false,
    idImg: '',
  })

  const handleDelete = async (id: string) => {
    const res = await deleteImage(id)
    if (res.result === 'ok') {
      setImages(images.filter((image) => image.public_id !== id))
      toast.success('Imagen eliminada')
    }
  }
  
  const popupDelete = (confirm: boolean) => {
    if (!confirm) {
      setModal({ open: false, idImg: '' })
      return
    }
    handleDelete(modal.idImg)
    setModal({ open: false, idImg: '' })
  }

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true)
      const res = await getImages().finally(() => setIsLoading(false))
      setImages(res.resources as unknown as IImage[])
    }
    fetch()
  }, [])

  return (
    <>
      {isLoading && <Loading />}
      {images.map((image) => (
        <Img key={image.public_id} image={image} setModal={setModal} />
      ))}
      {modal.open && <ModalDelete popupDelete={popupDelete} />}
    </>
  )
}
