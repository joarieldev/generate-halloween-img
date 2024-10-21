import { useEffect, useRef, useState } from 'react'
import { toast, Toaster } from 'sonner'
import 'two-up-element'

interface Props {
  imgOriginal: string
  imgPreview: string
}

export const TwoUp = ({ imgOriginal, imgPreview }: Props) => {
  const imgRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [imgX, setImgX] = useState(0)
  const [imgY, setImgY] = useState(0)
  const [scale, setScale] = useState(2)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    const handleMediaChange = (e: MediaQueryListEvent) => setIsMobile(e.matches)

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true)
      setStartX(e.clientX - imgX)
      setStartY(e.clientY - imgY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setImgX(e.clientX - startX)
        setImgY(e.clientY - startY)
        document.body.classList.add('no-select')
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.body.classList.remove('no-select')
    }

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const zoomFactor = 0.8
      if (e.deltaY < 0) {
        setScale((prevScale) => prevScale + zoomFactor)
      } else {
        setScale((prevScale) => Math.max(1, prevScale - zoomFactor))
      }
    }

    container?.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    container?.addEventListener('wheel', handleWheel)
    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      container?.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      container?.removeEventListener('wheel', handleWheel)
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [isDragging, startX, startY, imgX, imgY])

  const videoRef = useRef(null)
  const [isVideo, setIsVideo] = useState(false)
  useEffect(() => {
    if (imgPreview.includes('.mp4')) {
      setIsVideo(true)
      videoRef.current?.load()
    } else {
      setIsVideo(false)
    }
    if (imgPreview !== imgOriginal) setIsLoading(true)
  }, [imgPreview])

  return (
    <>
      <Toaster position="top-right" richColors />
      <section ref={containerRef} className="min-h-screen overflow-hidden">
        <two-up orientation={isMobile ? 'vertical' : 'horizontal'}>
          <div className="min-h-screen w-screen grid place-items-center">
            <div
              ref={imgRef}
              className="h-auto w-80"
              style={{
                transform: `translate(${imgX}px, ${imgY}px) scale(${scale})`,
                transition: 'transform 0.05s',
              }}
            >
              <img
                id="original"
                src={imgOriginal}
                alt="img original"
                className="rounded pointer-events-none"
              />
            </div>
          </div>
          <div className="min-h-screen w-screen grid place-items-center">
            <div
              ref={imgRef}
              className="h-auto w-80"
              style={{
                transform: `translate(${imgX}px, ${imgY}px) scale(${scale})`,
                transition: 'transform 0.05s',
              }}
            >
              {isLoading && (
                <div className="grid place-items-center h-full w-full absolute bg-black/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeLinecap="round" className="animate-spin" strokeLinejoin="round" strokeWidth="2"  viewBox="0 0 24 24"><path stroke="none" d="M0 0h24v24H0z"/><path d="M12 3a9 9 0 1 0 9 9"/></svg>
                </div>
              )}
              <img
                id="preview"
                src={imgPreview}
                alt="img preview"
                className={`rounded pointer-events-none ${
                  isVideo ? 'hidden' : ''
                }`}
                onLoad={() => {
                  if(imgPreview !== imgOriginal){
                    setIsLoading(false)
                  }
                }}
                onError={() => {
                  if(imgPreview !== imgOriginal){
                    toast.error('Error, intenta otra vez Generar')
                    setIsLoading(false)
                  }
                }}
              />
              <video
                ref={videoRef}
                autoPlay
                controls
                loop
                className={`rounded ${isVideo ? '' : 'hidden'}`}
                onLoad={() => {
                  if(imgPreview !== imgOriginal){
                    setIsLoading(false)
                  }
                }}
                onError={() => {
                  if(imgPreview !== imgOriginal){
                    toast.error('Error, intenta otra vez Generar')
                    setIsLoading(false)
                  }
                }}              
              >
                <source src={imgPreview} type="video/mp4" />
              </video>
            </div>
          </div>
        </two-up>
      </section>
    </>
  )
}
