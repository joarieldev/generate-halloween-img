import { getImages } from '@/actions/get-images'
import { Img } from './Img'
import { IImage } from '@/interface/image'

export const List = async () => {
  const res = await getImages()

  return (
    <>
      {res.map((image: IImage) => (
        <Img key={image.public_id} image={image} />
      ))}
    </>
  )
}
