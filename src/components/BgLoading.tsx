import { Loading } from './Loading'

export const BgLoading = () => {
  return (
    <div className="fixed top-0 left-0 w-full min-h-screen bg-black/70 z-20 grid place-items-center">
      <Loading />
    </div>
  )
}
