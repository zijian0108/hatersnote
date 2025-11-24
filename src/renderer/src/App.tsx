import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Gallery } from './components/Gallery'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { ProductShowcase } from './components/ProductShowcase'
import { Testimonials } from './components/Testimonials'
import './assets/main.css'
import { createContext, useState } from 'react'


const AppContext = createContext({
  isDarkMode: false,
})

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode] = useState(false)
  return (
    <AppContext.Provider value={{ isDarkMode }}>
      {children}
    </AppContext.Provider>
  )
}

function App() {
  return (
    <AppProvider>
    <div className="app-container">
      <Navbar />
      <Hero />
      <ProductShowcase />
      <Features />
      <Gallery />
      <Testimonials />
      <section className="section" style={{ height: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '2rem', background: 'linear-gradient(to bottom, #fff, #999)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            Ready to Join?
          </h2>
          <button style={{
            padding: '1rem 3rem',
            fontSize: '1.2rem',
            background: '#fff',
            color: '#000',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 0 30px rgba(255,255,255,0.2)'
          }}>
            立即下载 Mac 版
          </button>
        </div>
      </section>
      <Footer />
    </div>
    </AppProvider>
  )
}

export default App
