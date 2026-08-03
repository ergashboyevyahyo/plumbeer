import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import content from './content.json'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import TrustBar from './components/TrustBar.jsx'
import Stats from './components/Stats.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Gallery from './components/Gallery.jsx'
import Partner from './components/Partner.jsx'
import Testimonials from './components/Testimonials.jsx'
import Faq from './components/Faq.jsx'
import ServiceArea from './components/ServiceArea.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Loader from './components/Loader.jsx'
import Cursor from './components/Cursor.jsx'
import StickyCallButton from './components/StickyCallButton.jsx'
import { initSmoothScroll, destroySmoothScroll } from './lib/smoothScroll.js'
import { buildLocalBusinessSchema } from './lib/schema.js'

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

    let script = document.querySelector('script[type="application/ld+json"]')
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(buildLocalBusinessSchema(content))

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
        <TrustBar />
        <Stats />
        <About />
        <Services />
        <Gallery />
        <Partner />
        <Testimonials />
        <Faq />
        <ServiceArea />
        <Contact />
      </main>
      <Footer />
      <StickyCallButton />
    </>
  )
}

export default App
