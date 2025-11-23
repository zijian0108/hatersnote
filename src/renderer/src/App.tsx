import { Hero } from './components/Hero'
import { Features } from './components/Features'
import { Gallery } from './components/Gallery'
import { Footer } from './components/Footer'
import './assets/main.css'

function App(): JSX.Element {
  return (
    <div className="app-container">
      <Hero />
      <Features />
      <Gallery />
      <section className="section" style={{ height: '50vh' }}>
        <h2 style={{ fontSize: '2rem' }}>准备好开始了吗？</h2>
      </section>
      <Footer />
    </div>
  )
}

export default App
