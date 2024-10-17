'use client'

import { useRouter } from 'next/navigation'

export const Upload2 = () => {
  const router = useRouter()

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append('file', file, file.name)

      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()
      // console.log(data)
      router.push(`/generar/${data.result.public_id}`)
    }
  }

  return (
    <>
      <input type="file" name="file" onChange={handleFileChange} required />
    </>
  )
}
