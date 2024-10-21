'use client'

import { getCldImageUrl } from 'next-cloudinary'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { TwoUp } from './TwoUp'

const TOPICS = {
  zombis: 'Agrega zombis al fondo de la imagen',
  fantasmas: 'Agrega fantasmas al fondo de la imagen',
  calabazas: 'Incluye calabazas talladas en el fondo',
  brujas: 'Añade brujas volando en escobas',
  murciélagos: 'Incorpora murciélagos volando por la noche',
  casas_encantadas: 'Crea un fondo con una casa encantada',
  monstruos: 'Agrega diferentes tipos de monstruos al fondo',
  telarañas: 'Incluye telarañas en las esquinas de la imagen',
  esqueletos: 'Añade esqueletos bailando o en poses divertidas',
  criaturas_del_bosque: 'Incorpora criaturas misteriosas del bosque',
  custom: '',
}

const ASPECT = {
  custom: '',
  standar: { fill: true, crop: 'pad', aspectRatio: '4:3', width: 2560 },
  widescreen: { fill: true, crop: 'pad', aspectRatio: '16:9', width: 3413 },
  square: { fill: true, crop: 'pad', aspectRatio: '1:1', width: 1280 },
}

const TOVIDEO = {
  custom: '',
  out: 'mode_ofc',
  in: 'mode_ztr',
}

export const Editar = () => {
  const pathName = usePathname()
  const id = pathName.split('/')[2]

  const url = getCldImageUrl({ src: id })
  const [imgPreview, setImgPreview] = useState(url)

  const [topic, setTopic] = useState<keyof typeof TOPICS>('custom')
  const [scale, setScale] = useState(false)
  const [remove, setRemove] = useState('')
  const [remplace, setRemplace] = useState('')
  const [aspect, setAspect] = useState<keyof typeof ASPECT>('custom')
  const [toVideo, setToVideo] = useState<keyof typeof TOVIDEO>('custom')

  const handleGenerar = () => {
    console.log('generar')
    const newUrl = getCldImageUrl({
      src: id,
      replaceBackground: topic === 'custom' ? '' : TOPICS[topic],
      grayscale: scale,
      remove: remove === '' ? '' : { prompt: remove, removeShadow: true },
      replace:
        remplace === ''
          ? undefined
          : { from: remplace.split(':')[0], to: remplace.split(':')[1] },
      fillBackground: aspect === 'custom' ? undefined : ASPECT[aspect].fill,
      crop:
        aspect === 'custom'
          ? undefined
          : (ASPECT[aspect].crop as 'pad' | 'mpad'),
      aspectRatio: aspect === 'custom' ? undefined : ASPECT[aspect].aspectRatio,
      width: aspect === 'custom' ? undefined : ASPECT[aspect].width,
      zoompan:
        toVideo === 'custom'
          ? undefined
          : { options: `${TOVIDEO[toVideo]};maxzoom_4.5;du_8` },
    })
    if (toVideo !== 'custom') {
      const auxUrl = newUrl.split('?')[0] + '.mp4?' + newUrl.split('?')[1]
      const uptUrl = auxUrl.replace('f_auto:animated/', '')
      setImgPreview(uptUrl)
    } else {
      setImgPreview(newUrl)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(scale)
    if (e.target.name === 'topic') {
      setTopic(e.target.value as keyof typeof TOPICS)
    }
    if (e.target.name === 'aspect') {
      setAspect(e.target.value as keyof typeof ASPECT)
    }
    if (e.target.name === 'toVideo') {
      setToVideo(e.target.value as keyof typeof TOVIDEO)
    }
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'remove') {
      setRemove(e.target.value)
    }
    if (e.target.name === 'remplace') {
      setRemplace(e.target.value)
      console.log(e.target.value.split(':')[0], e.target.value.split(':')[1])
    }
  }

  const downloadImage = async () => {
    const response = await fetch(imgPreview)
    const blob = await response.blob()

    const link = document.createElement('a')
    const url = window.URL.createObjectURL(blob)
    link.href = url

    if (imgPreview.includes('.mp4')) {
      link.setAttribute('download', 'imagen_transformada.mp4')
    } else {
      link.setAttribute('download', 'imagen_transformada.jpg')
    }

    document.body.appendChild(link)
    link.click()

    link.parentNode?.removeChild(link)
    window.URL.revokeObjectURL(url)
  }
  return (
    <>
      <TwoUp imgOriginal={url} imgPreview={imgPreview} />
      <aside
        className="
        fixed min-w-96 rounded-lg bg-neutral-900
        right-0 bottom-0 top:auto left-0 max-md:h-80
        md:right-0 md:bottom-0 md:left-auto
        lg:right-6 lg:bottom-6
        flex flex-col gap-8 max-md:gap-4"
      >
        <div className="h-full overflow-auto px-6 pt-6 pb-1 space-y-6">
          <header>
            <h1 className="text-xl">Configuraciónes</h1>
          </header>
          <section className="space-y-2">
            <h2 className="text-lg">Personalizar fondo</h2>
            <article className="flex flex-wrap gap-4">
              <select
                name="topic"
                className="border border-gray-200 rounded-md bg-black py-2 px-4"
                onChange={handleChange}
              >
                <option value="custom">Ninguno</option>
                <option value="zombis">Zombis</option>
                <option value="fantasmas">Fantasmas</option>
                <option value="calabazas">Calabazas</option>
                <option value="brujas">Brujas</option>
                <option value="murciélagos">Murciélagos</option>
                <option value="casas_encantadas">Casas encantadas</option>
                <option value="monstruos">Monstruos</option>
                <option value="telarañas">Telarañas</option>
                <option value="esqueletos">Esqueletos</option>
                <option value="criaturas_del_bosque">Criaturas del bosque</option>
              </select>
            </article>
          </section>
          <section className="space-y-2">
            <h2 className="text-lg">Escala de grises</h2>
            <article className="flex flex-wrap gap-4">
              <input
                type="checkbox"
                className="rounded-md accent-orange-600 size-5"
                checked={scale}
                onChange={() => setScale(!scale)}
              />
            </article>
          </section>
          <section className="space-y-2">
            <h2 className="text-lg">Borrar objeto</h2>
            <article className="flex flex-wrap gap-4">
              <input
                name="remove"
                type="text"
                className="border border-gray-200 rounded-md bg-black py-2 px-4"
                placeholder="Ej: eliminar vaso..."
                onChange={handleChangeInput}
              />
            </article>
          </section>
          <section className="space-y-2">
            <h2 className="text-lg">Remplazar objeto</h2>
            <article className="flex flex-wrap gap-4">
              <input
                name="remplace"
                type="text"
                className="border border-gray-200 rounded-md bg-black py-2 px-4"
                placeholder="Ej: oso:gato"
                onChange={handleChangeInput}
                list="remplace-list"
              />
              <datalist id="remplace-list">
                <option value="vela:calabaza"></option>
                <option value="escoba:bufanda"></option>
                <option value="libro:telaraña"></option>
                <option value="taza:fantasma"></option>
              </datalist>
            </article>
          </section>
          <section className="space-y-2">
            <h2 className="text-lg">Ajustar aspecto</h2>
            <article>
              <select
                name="aspect"
                className="border border-gray-200 rounded-md bg-black py-2 px-4"
                onChange={handleChange}
              >
                <option value="custom">Ninguno</option>
                <option value="standar">Standar (4:3)</option>
                <option value="widescreen">PantallaAncha (16:9)</option>
                <option value="square">Cuadrado(1:1)</option>
              </select>
            </article>
          </section>
          <section>
            <h2 className="text-lg">Imagen a video</h2>
            <article>
              <select
                name="toVideo"
                className="border border-gray-200 rounded-md bg-black py-2 px-4"
                onChange={handleChange}
              >
                <option value="custom">Ninguno</option>
                <option value="out">Zoom hacia fuera</option>
                <option value="in">Zoom hacia dentro</option>
              </select>
            </article>
          </section>
        </div>
        <div className="px-6 pb-6 flex justify-between">
          <button
            className="py-2 px-4 border border-gray-200 rounded-md"
            onClick={handleGenerar}
          >
            Generar
          </button>
          <button
            className="py-2 px-4 border border-gray-200 rounded-md"
            onClick={() => downloadImage()}
          >
            Descargar
          </button>
        </div>
      </aside>
    </>
  )
}
