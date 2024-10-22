export const Loading = () => {
  return (
    <div className="h-38 grid place-items-center">
    <span className="flex flex-col justify-center items-center">
      <img src="/velas.webp" alt="velas" className="h-auto w-24 animate-parpadeo pointer-events-none" />
      <p className="text-gray-300 text-xs">Cargando...</p>
    </span>
  </div>
  )
}