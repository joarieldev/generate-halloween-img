/* eslint-disable @next/next/no-img-element */
'use client'

import { usePathname } from 'next/navigation'
import { getCldImageUrl } from 'next-cloudinary'
import { useState } from 'react'
import 'two-up-element'

const TOPICS = {
  zombis: 'Agrega zombis al fondo de la imagen',
  fantasmas: 'Agrega fantasmas al fondo de la imagen',
  demonios: 'Agrega demonios al fondo de la imagen',
  custom: '',
}

export const Generar = () => {
  const pathName = usePathname()
  const id = pathName.split('/')[2]

  const url = getCldImageUrl({ src: id })

  const [imgPreview, setImgPreview] = useState(url)

  const handleClick = (topic: keyof typeof TOPICS) => {
    const newUrl = getCldImageUrl({
      src: id,
      replaceBackground: TOPICS[topic],
    })

    setImgPreview(newUrl)
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header>
        <h1 className="">Generar nueva imagen</h1>
      </header>
      <main className="flex flex-col gap-8 items-center justify-center">
        <section className="flex flex-wrap gap-4">
          <button
            className="py-2 px-4 border border-gray-200 rounded-md"
            onClick={() => handleClick('zombis')}
          >
            Zombis
          </button>
          <button
            className="py-2 px-4 border border-gray-200 rounded-md"
            onClick={() => handleClick('fantasmas')}
          >
            Fantasmas
          </button>
          <button
            className="py-2 px-4 border border-gray-200 rounded-md"
            onClick={() => handleClick('demonios')}
          >
            Demonios
          </button>
        </section>
        <section className="py-4">
          <two-up>
            <img
              id="original"
              src={url}
              alt={`img ${id}`}
              className="rounded"
            />
            <img
              id="preview"
              src={imgPreview}
              alt={`img preview`}
              className="rounded"
            />
          </two-up>
        </section>
      </main>
    </div>
  )
}
