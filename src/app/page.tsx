import { Upload } from '@/components/Upload'
import { List } from '../components/List';
import { Upload2 } from '@/components/Upload2';

export default async function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header>
        <h1 className="">Genera un Halloween</h1>
      </header>
      <main className="flex flex-col gap-8 items-center justify-center">
        <section>
          <Upload2 />
        </section>
        <section className="grid grid-cols-3 gap-12">
          <List/>
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>
          Creado por @
          <a
            className="hover:underline hover:underline-offset-4"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            joarieldev
          </a>
        </p>
      </footer>
    </div>
  )
}
