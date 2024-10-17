'use server'

import cloudinary from './shared'

export const deleteImage = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId)
}
