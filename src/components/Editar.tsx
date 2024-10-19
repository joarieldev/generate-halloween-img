'use client'

import { getCldImageUrl } from 'next-cloudinary'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { TwoUp } from './TwoUp'

const TOPICS = {
  zombis: 'Agrega zombis al fondo de la imagen',
  fantasmas: 'Agrega fantasmas al fondo de la imagen',
  demonios: 'Agrega demonios al fondo de la imagen',
  custom: '',
}

export const Editar = () => {
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
    <>
      <TwoUp imgOriginal={url} imgPreview={imgPreview} />
      <aside className="
        fixed min-w-96 rounded-lg bg-neutral-900
        right-0 bottom-0 top:auto left-0 max-md:h-80
        md:right-0 md:bottom-0 md:top-0 md:left-auto
        lg:right-6 lg:bottom-6 lg:top-6"
      >
        <div className="h-full overflow-auto p-6 space-y-4">
          <header>
            <h1 className="text-lg">Configuraciónes</h1>
          </header>
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
        </div>
      </aside>
    </>
  )
}
