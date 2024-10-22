import { BgVid } from '@/components/BgVid'
import { List } from '../components/List'
import { Upload } from '@/components/Upload'
import { creepster } from '@/app/fonts/fonts'

export default async function Home() {
  return (
    <div className="flex flex-col items-center gap-16 min-h-screen font-[family-name:var(--font-geist-sans)] p-8  relative">
      <main className="flex flex-col gap-8 items-center justify-center w-full max-w-screen-lg">
        <section className="relative w-full h-auto my-8">
          <h1
            className={`${creepster.className} animate-shine bg-[linear-gradient(110deg,#f0f0f0,45%,#a4aebe,55%,#f0f0f0)] bg-[length:250%_100%] bg-clip-text text-transparent text-center text-3xl absolute top-0 right-0 left-0`}
          >
            Genera un Halloween
          </h1>
          <BgVid />
          <div className="absolute top-0 left-0 h-full w-full grid place-content-center">
            <Upload />
          </div>
        </section>
        <section className="lg:px-8 py-4 space-y-4">
          <h2
            className={`${creepster.className} text-center text-2xl pb-4 text-gray-300`}
          >
            Imágenes recientes
          </h2>
          <article className="flex flex-wrap gap-8 justify-center max-md:gap-4">
            <List />
          </article>
        </section>
        <section className="py-10 space-y-2">
          <h2
            className={`${creepster.className} text-center text-2xl pb-4 text-gray-300`}
          >
            Acerda de
          </h2>
          <p className="max-w-96 text-center text-sm text-gray-300">
            Modifica tus imagenes y genera un halloween para tus amigos. Este
            proyecto utiliza Cloudinary AI para generar imágenes de forma
            automática y personalizada.
          </p>
        </section>
      </main>
      <footer className="flex gap-3 flex-col items-center justify-center w-full max-w-screen-lg text-gray-300 text-sm">
        <a
          className="hover:underline hover:underline-offset-4 flex gap-1 items-center"
          href="https://github.com/joarieldev/generate-halloween-img"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
          </svg>
          Codigo en Github
        </a>
        <p>Creado por @joarieldev</p>
      </footer>
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_15%,rgba(255,255,255,0)_40%,rgba(120,119,198,0.3)_100%)]"></div>
    </div>
  )
}
