'use client'

export const BgVid = () => {
  return (
    <div className="-z-10 aspect-video">
      <video
        id="video-player"
        autoPlay
        muted
        loop
        className="aspect-video size-full overflow-hidden object-cover opacity-0 transition-opacity duration-500"
        style={{
          maskImage: `
            linear-gradient(to bottom, rgba(0,0,0,1) 80%, transparent),
            linear-gradient(to top, rgba(0,0,0,1) 80%, transparent),
            linear-gradient(to right, rgba(0,0,0,1) 80%, transparent),
            linear-gradient(to left, rgba(0,0,0,1) 80%, transparent)
          `,
          maskComposite: 'intersect'
        }}
        onCanPlay={(e) => e.currentTarget.classList.add('opacity-70')}
        playsInline
        src="/bg_vid.mp4"
      >
        <source type="video/mp4" src="/bg_vid.mp4" />
      </video>
    </div>
  )
}
