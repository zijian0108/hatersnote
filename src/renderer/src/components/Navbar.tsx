import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const Navbar = () => {
  const navRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top top',
        end: 99999,
        onUpdate: (self) => {
          setIsScrolled(self.scroll() > 50)
        }
      })
    }, navRef)
    return () => ctx.revert()
  }, [])

  return (
    <nav ref={navRef} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: '1.5rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      transition: 'background 0.3s, backdrop-filter 0.3s, padding 0.3s',
      background: isScrolled ? 'rgba(10, 10, 10, 0.8)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(10px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '-1px' }}>
        HN.
      </div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        {['功能', '展示', '评价', '下载'].map((item, i) => (
          <a key={i} href="#" style={{
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontSize: '0.9rem',
            fontWeight: 500,
            opacity: 0.8,
            transition: 'opacity 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  )
}

