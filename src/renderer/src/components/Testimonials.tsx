import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const reviews = [
  "这真的是我用过最棒的笔记应用！ 🚀",
  "设计感太强了，完全是艺术品。",
  "极简主义者的福音。",
  "流畅度令人难以置信。 ⚡️",
  "HatersNote 改变了我的工作流。",
  "不仅仅是记录，更是思考。 🤔",
  "暗黑模式太赞了！ 🌑",
  "这就是我一直在寻找的。",
  "生产力工具的新标杆。",
  "细节打磨得非常到位。",
  "爱不释手，强烈推荐！ ❤️",
  "以前只用 Notion，现在只用这个。",
  "写作时的沉浸感无与伦比。",
  "开发者很有品味。",
  "简直是强迫症的治愈良药。",
]

interface MarqueeRowProps {
  items: string[]
  duration?: number
  direction?: 'left' | 'right'
  style?: React.CSSProperties
}

const MarqueeRow = ({ items, duration = 20, direction = 'left', style }: MarqueeRowProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const partRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (partRef.current && containerRef.current) {
         const width = partRef.current.offsetWidth
         
         if (direction === 'left') {
           gsap.set(containerRef.current, { x: 0 })
           gsap.to(containerRef.current, {
             x: -width,
             duration: duration,
             ease: "none",
             repeat: -1
           })
         } else {
           // For right direction, we start at -width and move to 0
           gsap.set(containerRef.current, { x: -width })
           gsap.to(containerRef.current, {
             x: 0,
             duration: duration,
             ease: "none",
             repeat: -1
           })
         }
      }
    }, containerRef)
    return () => ctx.revert()
  }, [duration, direction, items])

  const RowItem = ({ refProp }: { refProp?: React.RefObject<HTMLDivElement> }) => (
    <div ref={refProp} style={{ display: 'flex', gap: '2rem', paddingRight: '2rem', flexShrink: 0 }}>
      {items.map((text, i) => (
        <div key={i} style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(5px)',
          padding: '0.8rem 2rem',
          borderRadius: '50px', // Pill shape for Danmaku
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontSize: '1rem',
          color: '#eee',
          whiteSpace: 'nowrap',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          cursor: 'default',
          transition: 'transform 0.3s, background 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
          e.currentTarget.style.transform = 'scale(1.05)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'
          e.currentTarget.style.transform = 'scale(1)'
        }}
        >
          {text}
        </div>
      ))}
    </div>
  )

  return (
    <div className="marquee-wrapper" style={{ 
      width: '100%', 
      overflow: 'hidden', 
      position: 'relative',
      display: 'flex',
      marginBottom: '2rem', // Gap between rows
      maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
      ...style
    }}>
      <div ref={containerRef} style={{ display: 'flex', whiteSpace: 'nowrap' }}>
         <RowItem refProp={partRef} />
         <RowItem />
         <RowItem />
      </div>
    </div>
  )
}

export const Testimonials = () => {
  // Split reviews into 3 rows for variety
  const row1 = reviews.slice(0, 5)
  const row2 = reviews.slice(5, 10)
  const row3 = reviews.slice(10, 15)

  return (
    <section className="section" style={{ height: 'auto', padding: '6rem 0', overflow: 'hidden', flexDirection: 'column' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '2.5rem' }}>大家都在说</h2>
      
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Row 1: Fast, Left */}
        <MarqueeRow items={row1} duration={25} direction="left" />
        
        {/* Row 2: Slower, Right (Reverse) */}
        <MarqueeRow items={row2} duration={35} direction="right" style={{ opacity: 0.8 }} />
        
        {/* Row 3: Medium, Left */}
        <MarqueeRow items={row3} duration={30} direction="left" style={{ opacity: 0.6 }} />
      </div>
    </section>
  )
}
