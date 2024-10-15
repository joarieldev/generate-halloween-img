import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getImages = async () => {
    const { resources } = await cloudinary.search
      .expression('folder:next-images')
      // .sort_by('public_id', 'desc')
      .max_results(10)
      .execute();

  return resources
}