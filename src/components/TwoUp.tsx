import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import 'two-up-element'
import { useMediaQuery } from 'react-responsive';

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
  const [initialPinchDistance, setInitialPinchDistance] = useState(0)
  const [lastScale, setLastScale] = useState(1)
  const [isMyTwoup, setIsMyTwoup] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const isMobile: boolean = useMediaQuery({ query: '(max-width: 768px)' })

  useEffect(() => {
    const container = containerRef.current

    const myTwoup = container?.querySelector('.styles_two-up-handle__2kVsP')
    const handleMyTwoupTouchStart = () => {
      setIsMyTwoup(false)
    }
    const handleMyTwoupTouchEnd = () => {
      setIsMyTwoup(true)
    }

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
        updateTransform()
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
      updateTransform();
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (isMyTwoup) {
        if (e.touches.length === 1) {
          const touch = e.touches[0]
          setIsDragging(true)
          setStartX(touch.clientX - imgX)
          setStartY(touch.clientY - imgY)
        } else if (e.touches.length === 2) {
          setInitialPinchDistance(getPinchDistance(e.touches))
          setLastScale(scale)
        }
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isMyTwoup) {
        if (isDragging && e.touches.length === 1) {
          const touch = e.touches[0]
          setImgX(touch.clientX - startX)
          setImgY(touch.clientY - startY)
          updateTransform()
        } else if (e.touches.length === 2) {
          const currentPinchDistance = getPinchDistance(e.touches)
          setScale(Math.max(0.1, lastScale * (currentPinchDistance / initialPinchDistance)))
          updateTransform()
          e.preventDefault()
        }
      }
    }

    const handleTouchEnd = () => {
      setIsDragging(false)
    }

    const getPinchDistance = (touches: TouchList) => {
      const [touch1, touch2] = [touches[0], touches[1]]
      const dx = touch1.clientX - touch2.clientX
      const dy = touch1.clientY - touch2.clientY
      return Math.sqrt(dx * dx + dy * dy)
    }

    const updateTransform = () => {
      const div1 = document.getElementById('div1')
      const div2 = document.getElementById('div2')
      if (div1 && div2) {
        div1.style.transform = `translate(${imgX}px, ${imgY}px) scale(${scale})`
        div2.style.transform = `translate(${imgX}px, ${imgY}px) scale(${scale})`
      }
    }

    container?.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    container?.addEventListener('wheel', handleWheel)
    myTwoup?.addEventListener('touchstart', handleMyTwoupTouchStart)
    myTwoup?.addEventListener('touchend', handleMyTwoupTouchEnd)
    container?.addEventListener('touchstart', handleTouchStart)
    container?.addEventListener('touchmove', handleTouchMove)
    container?.addEventListener('touchend', handleTouchEnd)

    return () => {
      container?.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      container?.removeEventListener('wheel', handleWheel)
      myTwoup?.removeEventListener('touchstart', handleMyTwoupTouchStart)
      myTwoup?.removeEventListener('touchend', handleMyTwoupTouchEnd)
      container?.removeEventListener('touchstart', handleTouchStart)
      container?.removeEventListener('touchmove', handleTouchMove)
      container?.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, startX, startY, imgX, imgY, scale, initialPinchDistance ,lastScale, isMyTwoup])

  const videoRef = useRef<HTMLVideoElement | null>(null)
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
