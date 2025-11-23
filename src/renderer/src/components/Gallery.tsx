import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const images = [
  '#ff5f5f', '#5fafff', '#5fff9f', '#ffff5f', '#ff5fff'
]

export const Gallery = () => {
  const comp = useRef<HTMLDivElement>(null)
  const slider = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.panel')
      
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => '+=' + slider.current!.offsetWidth
        }
      })

    }, comp)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={comp} style={{ overflow: 'hidden' }}>
      <div ref={slider} style={{ width: '500%', height: '100vh', display: 'flex', flexWrap: 'nowrap' }}>
        {images.map((color, i) => (
          <div key={i} className="panel" style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color,
            fontSize: '4rem',
            color: '#000',
            fontWeight: 'bold'
          }}>
            Showcase {i + 1}
          </div>
        ))}
      </div>
    </section>
  )
}

