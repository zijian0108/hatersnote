import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const ProductShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(imgRef.current, 
        {
          scale: 0.8,
          opacity: 0,
          rotateX: 10
        },
        {
          scale: 1,
          opacity: 1,
          rotateX: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'bottom 80%',
            scrub: 1,
          }
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="section" style={{ perspective: '1000px', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>沉浸式写作体验</h2>
        <p style={{ color: 'var(--text-secondary)' }}>排除一切干扰，只专注于你的思想。</p>
      </div>
      
      <div ref={imgRef} style={{
        width: '100%',
        maxWidth: '1000px',
        height: '600px',
        background: 'linear-gradient(135deg, #1e1e1e, #2a2a2a)',
        borderRadius: '20px',
        border: '1px solid #333',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Mock Interface */}
        <div style={{ 
          padding: '0.8rem 1.5rem', 
          borderBottom: '1px solid #333',
          display: 'flex',
          gap: '0.5rem',
          background: '#252526'
        }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
        </div>
        
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
           {/* Sidebar */}
           <div style={{ 
             width: '200px', 
             background: '#1e1e1e', 
             borderRight: '1px solid #2d2d2d',
             padding: '1.5rem 1rem',
             display: 'flex',
             flexDirection: 'column',
             gap: '0.5rem'
           }}>
             <div style={{ fontSize: '0.7rem', color: '#666', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>EXPLORER</div>
             {['src', 'components', 'Hero.tsx', 'Features.tsx', 'Gallery.tsx', 'styles.css'].map((file, i) => (
               <div key={i} style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '0.5rem', 
                 color: file.includes('.') ? '#ccc' : '#aaa',
                 fontSize: '0.85rem',
                 paddingLeft: file.includes('.') ? '1rem' : '0',
                 cursor: 'default'
                }}>
                 <span style={{ opacity: 0.7, fontSize: '1rem' }}>{file.includes('.') ? '📄' : '📁'}</span>
                 {file}
               </div>
             ))}
           </div>

           {/* Code Area */}
           <div style={{ 
             flex: 1, 
             background: '#1e1e1e', 
             padding: '2rem',
             fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
             fontSize: '14px',
             lineHeight: '1.6',
             overflow: 'hidden',
             color: '#d4d4d4'
           }}>
             <div style={{ color: '#6a9955', marginBottom: '1rem' }}>// Welcome to HatersNote.tsx</div>
             <div><span style={{ color: '#c586c0' }}>import</span> <span style={{ color: '#9cdcfe' }}>{'{ useState }'}</span> <span style={{ color: '#c586c0' }}>from</span> <span style={{ color: '#ce9178' }}>'react'</span>;</div>
             <br/>
             <div><span style={{ color: '#569cd6' }}>export const</span> <span style={{ color: '#dcdcaa' }}>Thought</span> = () <span style={{ color: '#569cd6' }}>=&gt;</span> {'{'}</div>
             <div style={{ paddingLeft: '1.5rem' }}>
               <div><span style={{ color: '#569cd6' }}>const</span> [noise, setNoise] = <span style={{ color: '#dcdcaa' }}>useState</span>(<span style={{ color: '#ce9178' }}>"haters"</span>);</div>
               <div><span style={{ color: '#569cd6' }}>const</span> motivation = <span style={{ color: '#dcdcaa' }}>convert</span>(noise);</div>
               <br/>
               <div style={{ color: '#6a9955' }}>// Capture the dissenting voice</div>
               <div><span style={{ color: '#c586c0' }}>return</span> (</div>
               <div style={{ paddingLeft: '1.5rem' }}>
                 <div>&lt;<span style={{ color: '#4ec9b0' }}>Container</span> className=<span style={{ color: '#ce9178' }}>"focus-mode"</span>&gt;</div>
                 <div style={{ paddingLeft: '1.5rem' }}>
                    <div>&lt;<span style={{ color: '#4ec9b0' }}>Title</span>&gt;{'{'}motivation{'}'}&lt;/<span style={{ color: '#4ec9b0' }}>Title</span>&gt;</div>
                    <div>&lt;<span style={{ color: '#4ec9b0' }}>Editor</span> autoFocus /&gt;</div>
                 </div>
                 <div>&lt;/<span style={{ color: '#4ec9b0' }}>Container</span>&gt;</div>
               </div>
               <div>);</div>
             </div>
             <div>{'}'}</div>
           </div>
        </div>
      </div>
    </section>
  )
}

