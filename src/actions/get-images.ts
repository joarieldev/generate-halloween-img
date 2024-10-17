'use server'

import cloudinary from './shared';

export const getImages = async () => {
  return await cloudinary.api.resources_by_asset_folder( 'next-images',{max_results: 10})
}
