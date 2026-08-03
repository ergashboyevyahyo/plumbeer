import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import content from './content.json'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Stats from './components/Stats.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Partner from './components/Partner.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/Loader.jsx'
import Cursor from './components/Cursor.jsx'
import { initSmoothScroll, destroySmoothScroll } from './lib/smoothScroll.js'

function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = content.meta.siteTitle
    setMeta('description', content.meta.description)
    setMeta('og:title', content.meta.siteTitle, 'property')
    setMeta('og:description', content.meta.description, 'property')
    setMeta('og:image', content.meta.ogImage, 'property')
    setMeta('twitter:card', 'summary_large_image')

    initSmoothScroll()
    return () => destroySmoothScroll()
  }, [])

  useEffect(() => {
    if (!loading) ScrollTrigger.refresh()
  }, [loading])

  return (
    <>
      <div className="grain" />
      <Cursor />
      <Loader onDone={() => setLoading(false)} />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Partner />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
