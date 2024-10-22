'use client'

import { getCldImageUrl } from 'next-cloudinary'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TwoUp } from './TwoUp'
import { creepster } from '@/app/fonts/fonts'

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
  const [seed, setSeed] = useState(0)
  const [scale, setScale] = useState(false)
  const [remove, setRemove] = useState('')
  const [remplace, setRemplace] = useState('')
  const [aspect, setAspect] = useState<keyof typeof ASPECT>('custom')
  const [toVideo, setToVideo] = useState<keyof typeof TOVIDEO>('custom')

  const handleGenerar = () => {
    const newUrl = getCldImageUrl({
      src: id,
      replaceBackground:
        topic === 'custom'
          ? ''
          : { prompt: TOPICS[topic], seed: seed === 0 ? undefined : seed },
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
    if (e.target.name === 'topic') {
      setTopic(e.target.value as keyof typeof TOPICS)
      setSeed(0)
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

  useEffect(() => {
    if (imgPreview !== url) {
      handleGenerar()
    }
  }, [seed])

  return (
    <>
      <button
        className={`fixed top-6 left-6 ${creepster.className} py-2 px-4 border border-orange-600 active:border-orange-500 rounded-md z-10 bg-neutral-900 text-gray-300`}
        onClick={() => window.history.back()}
      >
        x
      </button>
      <TwoUp imgOriginal={url} imgPreview={imgPreview} />
      <aside
        className="
        fixed min-w-96 rounded-lg bg-zinc-900/95
        right-0 bottom-0 top:auto left-0 max-md:h-80
        md:right-0 md:bottom-0 md:left-auto
        lg:right-6 lg:bottom-6
        flex flex-col gap-8 max-md:gap-4"
      >
        <div className="h-full overflow-auto px-6 pt-6 pb-1 flex flex-col gap-6 relative">
          <img
            src="/araña.webp"
            alt="araña"
            className="absolute h-auto w-14 right-20 top-48 saturate-50"
            style={{
              transform: 'perspective(400px) rotateY(-135deg) rotateX(140deg)',
            }}
          />
          <img
            src="/araña2.webp"
            alt="araña2"
            className="absolute h-auto w-20 right-6 top-6"
          />
          <img
            src="/araña.webp"
            alt="araña"
            className="absolute h-auto w-20 right-6 top-[520px]"
            style={{
              transform: 'perspective(400px) rotateY(-35deg) rotateX(40deg)',
            }}
          />
          <header className="flex items-center gap-2 relative">
            <h1 className="text-base">Configuraciónes</h1>
            <div className="group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0M12 9h.01" />
                <path d="M11 12h1v4h1" />
              </svg>
              <div className="hidden bg-black/95 w-56 p-2 rounded-lg absolute right-0 top-8 group-hover:flex flex-col">
                <p>
                  <strong>Nota:</strong> Si eliges más de dos configuraciones,
                  obtendrás resultados diferentes a los de una sola.
                </p>
                <p>
                  Recuerda que la inteligencia artificial no es perfecta y los
                  resultados pueden variar de lo esperado.
                </p>
              </div>
            </div>
          </header>
          <section className="space-y-2">
            <h2 className="text-base">Personalizar fondo</h2>
            <article className="flex flex-wrap gap-4">
              <select
                name="topic"
                className="border border-gray-200 focus:border-orange-500 outline-none rounded-md bg-neutral-900 py-2 px-4"
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
                <option value="criaturas_del_bosque">
                  Criaturas del bosque
                </option>
              </select>
            </article>
          </section>
          <section className="space-y-2">
            <h2 className="text-base">Escala de grises</h2>
            <article className="flex flex-wrap gap-4">
              <input
                type="checkbox"
                className="rounded-md accent-orange-500 size-5"
                checked={scale}
                onChange={() => setScale(!scale)}
              />
            </article>
          </section>
          <section className="space-y-2">
            <h2 className="text-base">Borrar objeto</h2>
            <article className="flex flex-wrap gap-4">
              <input
                name="remove"
                type="text"
                className="border border-gray-200 focus:border-orange-500 outline-none rounded-md bg-neutral-900 py-2 px-4"
                placeholder="Ej: eliminar vaso..."
                onChange={handleChangeInput}
              />
            </article>
          </section>
          <section className="space-y-2">
            <h2 className="text-base">Remplazar objeto</h2>
            <article className="flex flex-wrap gap-4">
              <input
                name="remplace"
                type="text"
                className="border border-gray-200 focus:border-orange-500 outline-none rounded-md bg-neutral-900 py-2 px-4"
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
            <h2 className="text-base">Ajustar aspecto</h2>
            <article>
              <select
                name="aspect"
                className="border border-gray-200 focus:border-orange-500 outline-none rounded-md bg-neutral-900 py-2 px-4"
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
            <h2 className="text-base">Imagen a video</h2>
            <article>
              <select
                name="toVideo"
                className="border border-gray-200 focus:border-orange-500 outline-none rounded-md bg-neutral-900 py-2 px-4"
                onChange={handleChange}
              >
                <option value="custom">Ninguno</option>
                <option value="out">Zoom hacia fuera</option>
                <option value="in">Zoom hacia dentro</option>
              </select>
            </article>
          </section>
        </div>
        <div className="px-6 pb-6 flex justify-between items-center">
          <div className="flex gap-4">
            <button
              className={`py-2 px-4 border border-orange-600 active:border-orange-500 rounded-md flex gap-2 bg-neutral-900 ${creepster.className} text-gray-300`}
              onClick={handleGenerar}
            >
              Generar
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M16 18a2 2 0 0 1 2 2 2 2 0 0 1 2-2 2 2 0 0 1-2-2 2 2 0 0 1-2 2zm0-12a2 2 0 0 1 2 2 2 2 0 0 1 2-2 2 2 0 0 1-2-2 2 2 0 0 1-2 2zM9 18a6 6 0 0 1 6-6 6 6 0 0 1-6-6 6 6 0 0 1-6 6 6 6 0 0 1 6 6z" />
              </svg>
            </button>
            {imgPreview !== url && topic !== 'custom' && (
              <button
                onClick={() => {
                  setSeed((seed) => seed + 1)
                }}
                title="Otro fondo"
                className="text-gray-200 active:text-orange-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
                </svg>
              </button>
            )}
          </div>
          <button
            className={`py-2 px-4 border border-orange-600 active:border-orange-500 rounded-md flex gap-2 bg-neutral-900 ${creepster.className} text-gray-300`}
            onClick={() => downloadImage()}
          >
            Descargar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  )
}
