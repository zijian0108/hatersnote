import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { title: '极致流畅', desc: '原生级的性能体验，如丝般顺滑。' },
  { title: '极简设计', desc: '不仅是工具，更是艺术品。' },
  { title: '数据安全', desc: '本地加密存储，您的隐私属于您自己。' },
  { title: '跨端同步', desc: '随时随地，灵感不断连。' }
]

export const Features = () => {
  const comp = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.feature-item')

      items.forEach((item) => {
        gsap.fromTo(item,
          {
            opacity: 0,
            y: 100,
            rotateX: -45
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

    }, comp)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={comp} className="section features-section" style={{ alignItems: 'flex-start', perspective: '1000px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}>核心特性</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {features.map((f, i) => (
            <div key={i} className="feature-item" style={{
              background: '#1a1a1a',
              padding: '2rem',
              borderRadius: '16px',
              border: '1px solid #333',
              transformStyle: 'preserve-3d'
            }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff' }}>{f.title}</h3>
              <p style={{ color: '#999', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

