import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const images = [
  { color: '#ff5f5f', title: 'Inspiration' },
  { color: '#5fafff', title: 'Creation' },
  { color: '#5fff9f', title: 'Iteration' },
  { color: '#ffff5f', title: 'Polishing' },
  { color: '#ff5fff', title: 'Launch' }
]

export const Gallery = () => {
  const comp = useRef<HTMLDivElement>(null)
  const slider = useRef<HTMLDivElement>(null)
  const indicatorContainerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.panel')
      const indicators = gsap.utils.toArray<HTMLElement>('.gallery-indicator')
      
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => '+=' + slider.current!.offsetWidth,
          onUpdate: (self) => {
            // Calculate current index based on scroll progress
            const progress = self.progress
            // Map 0-1 to 0-(length-1)
            const index = Math.round(progress * (panels.length - 1))
            
            indicators.forEach((dot, i) => {
              if (i === index) {
                gsap.to(dot, { scale: 1.5, backgroundColor: '#fff', opacity: 1, duration: 0.2 })
                gsap.to(dot.querySelector('.label'), { opacity: 1, x: -10, duration: 0.2 })
              } else {
                gsap.to(dot, { scale: 1, backgroundColor: '#666', opacity: 0.5, duration: 0.2 })
                gsap.to(dot.querySelector('.label'), { opacity: 0, x: 0, duration: 0.2 })
              }
            })
          },
          onToggle: (self) => {
             gsap.to(indicatorContainerRef.current, {
               opacity: self.isActive ? 1 : 0,
               x: self.isActive ? 0 : 50,
               duration: 0.4
             })
          }
        }
      })

    }, comp)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={comp} style={{ overflow: 'hidden' }}>
      <div ref={slider} style={{ width: '500%', height: '100vh', display: 'flex', flexWrap: 'nowrap', position: 'relative' }}>
        
        {images.map((item, i) => (
          <div key={i} className="panel" style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: item.color,
            fontSize: '4rem',
            color: '#000',
            fontWeight: 'bold'
          }}>
            {item.title}
          </div>
        ))}
      </div>

      {/* Step Indicator - Moved outside slider to avoid width issues and ensure fixed positioning */}
      <div ref={indicatorContainerRef} style={{
          position: 'fixed',
          right: '30px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          zIndex: 1000,
          opacity: 0, // Initially hidden
          pointerEvents: 'none'
        }}>
          {images.map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', position: 'relative' }}>
               {/* Label */}
               <div className="label" style={{ 
                 position: 'absolute', 
                 right: '25px', 
                 color: '#fff', 
                 fontSize: '14px', 
                 fontWeight: 'bold',
                 opacity: 0,
                 whiteSpace: 'nowrap',
                 textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                 background: 'rgba(0,0,0,0.5)',
                 padding: '4px 8px',
                 borderRadius: '4px'
               }}>
                 {item.title}
               </div>
               {/* Dot */}
               <div className="gallery-indicator" style={{
                 width: '10px',
                 height: '10px',
                 borderRadius: '50%',
                 backgroundColor: '#666',
                 transition: 'background-color 0.3s',
                 boxShadow: '0 0 10px rgba(0,0,0,0.3)'
               }}></div>
            </div>
          ))}
        </div>
    </section>
  )
}
