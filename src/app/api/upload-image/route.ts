/* eslint-disable @typescript-eslint/no-explicit-any */
import cloudinary from '@/actions/shared'
import { NextRequest, NextResponse } from 'next/server'
import streamifier from 'streamifier'

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData()
    const file = data.get('file')

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ success: false })
    }

    const uploadStream = (fileBuffer: Buffer): Promise<any> => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            upload_preset: 'upload-img',
            display_name: file.name.split('.')[0],
          },
          (error, result) => {
            if (error) {
              reject(error)
            } else {
              resolve(result)
            }
          }
        )
        streamifier.createReadStream(fileBuffer).pipe(stream)
      })
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer())

    const result = await uploadStream(fileBuffer)

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('Error saving image:', error)
    return NextResponse.json({ success: false, message: 'Error saving image' })
  }
}
