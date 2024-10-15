'use client'

import { CldUploadWidget } from 'next-cloudinary'

export const Upload = () => {
  return (
    <CldUploadWidget
      uploadPreset="upload-img"
      options={{
        sources: ['local'],
        multiple: false,
        maxFiles: 1,
        language: 'es',
        text: {
          es: {
            or: 'o',
            menu: {
              files: 'Subir desde tu dispositivo',
            },
            local: {
              dd_title_single: 'Arrastra tu imagen aquí',
              browse: 'Seleccionar',
            },
          },
        },
      }}
    >
      {({ open }) => (
        <button
          type="button"
          className="py-2 px-4 border border-gray-200 rounded-md"
          onClick={() => open()}
        >
          Upload
        </button>
      )}
    </CldUploadWidget>
  )
}
