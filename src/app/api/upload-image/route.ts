import cloudinary from '@/actions/shared'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData()
    const file = data.get('file')

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ success: false })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          upload_preset: 'upload-img',
          display_name: file.name.split('.')[0],
        },
        (error, result) => {
          if (error) {
            reject(error)
          } 

          resolve(result)
        }
      ).end(buffer)
    })

    return NextResponse.json({ success: true, result })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error saving image' })
  }
}
