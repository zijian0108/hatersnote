import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export const Hero = () => {
  const comp = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.from('.hero-text', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      })
      .from('.hero-sub', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.5')
      .from('.hero-btn', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }, '-=0.3')

    }, comp)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={comp} className="section hero-section" style={{ height: '100vh', textAlign: 'center' }}>
      <h1 className="hero-text" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', marginBottom: '1rem', background: 'linear-gradient(to right, #fff, #666)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
        HatersNote
      </h1>
      <p className="hero-sub" style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '600px' }}>
        记录每一个 dissenting voice，转化为前进的动力。
      </p>
      <button className="hero-btn" style={{
        padding: '1rem 2.5rem',
        fontSize: '1.1rem',
        background: 'var(--text-primary)',
        color: 'var(--bg-color)',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        fontWeight: 'bold'
      }}>
        开始探索
      </button>
    </section>
  )
}

