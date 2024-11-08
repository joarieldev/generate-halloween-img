'use client'

import { useRouter } from 'next/navigation'
import { FileDrop } from 'react-file-drop'
import { useRef, useState } from 'react'
import { BgLoading } from './BgLoading'
import { BgDrag } from './BgDrag'
import { toast } from 'sonner'

export const Upload = () => {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [frameDrag, setFrameDrag] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleFileChange = async () => {
    const file = fileInputRef.current?.files?.[0]

    if (file && file.type.startsWith('image')) {
      const formData = new FormData()
      formData.append('file', file)

      setLoading(true)
      const body = document.body
      body.style.overflow = 'hidden'

      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      router.push(`/edit/${data.result.public_id}`)

      setLoading(false)
      body.style.overflow = ''

    } else {
      toast.warning('No se pudo cargar la imagen')
    }
  }

  const onTargetClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <FileDrop
          onFrameDragEnter={() => {
            setFrameDrag(true)
          }}
          onFrameDragLeave={() => {
            setFrameDrag(false)
          }}
          onFrameDrop={(event) => {
            const file = event.dataTransfer?.items[0].getAsFile()
            if (file && fileInputRef.current) {
              const dataTransfer = new DataTransfer()
              dataTransfer.items.add(file)
              fileInputRef.current.files = dataTransfer.files
            }
            setFrameDrag(false)
            handleFileChange()
          }}
          onTargetClick={onTargetClick}
          className="cursor-pointer mb-4"
        >
          <svg
            className="size-9 max-md:size-8 text-gray-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
        </FileDrop>
        <p className="mb-2 text-sm text-gray-300">
          <span className="font-semibold">Haga clic para cargar</span> o
          arrastre y suelte
        </p>
        <input
          onChange={handleFileChange}
          ref={fileInputRef}
          type="file"
          className="hidden"
          name="file"
          accept="image/*"
        />
      </div>
      {frameDrag && <BgDrag />}
      {loading && <BgLoading />}
    </>
  )
}
