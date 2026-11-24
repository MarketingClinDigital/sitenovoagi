import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

const asset = (name) => '/assets/' + name + '.webp'
const email = 'mailto:contato@lampo.com.br?subject=Marcar%20reuni%C3%A3o%20agora'
const clamp = (n) => Math.max(0, Math.min(1, n))
const interval = (n, start, end) => clamp((n - start) / (end - start))
const ease = (n) => n * n * (3 - 2 * n)
const mix = (a, b, n) => a + (b - a) * n
const total = 12.65
const sections = [
  ['Soluções', 'solucoes', 1.13],
  ['Cases', 'cases', 8.18],
  ['Conteúdo', 'conteudo', 10.15],
  ['Sobre', 'sobre', 6.4],
  ['Contato', 'contato', 12.65],
]
const starPath = 'M 0 48 C 25 42 41 25 46 0 C 53 28 72 43 100 46 C 71 54 55 72 51 100 C 43 72 27 55 0 48 Z'

function Star({ className = '' }) {
  return <img aria-hidden="true" className={'star ' + className} src="/assets/agi-symbol.png" alt="" />
}

function Logo() {
  return <span className="logo"><Star /></span>
}

function Action({ children = 'Marcar reunião agora', tone = 'light', href = email }) {
  return <a className={'action ' + tone} href={href}>{children}</a>
}

function Nav({ progress }) {
  const navVisible = progress > 1.08
  const navDark = progress > 5.3 && progress < 12.2
  return <>
    <nav className={'nav' + (navDark ? ' is-dark' : '') + (navVisible ? '' : ' is-hidden')} aria-label="Navegação principal" aria-hidden={!navVisible} inert={!navVisible}>
      <a className="brand-link" href="#inicio" aria-label="Agisales, início">
        <img className="nav-logo" src={navDark ? '/assets/logo-claro.png' : '/assets/logo.png'} alt="Agisales" />
      </a>
      <div className="nav-links">
        {sections.map(([label, id]) => <a key={id} href={'#' + id}>{label}</a>)}
      </div>
      <Action tone="dark">Marcar reunião agora</Action>
    </nav>
    <span aria-hidden="true" className={'progress ' + ((progress > 5.3 && progress < 12.2) ? 'on-dark' : '')}
      style={{ top: 4 + 91 * clamp(progress / (total + .34)) + '%' }} />
  </>
}

function Hero({ progress }) {
  const exit = ease(interval(progress, .12, 1.04))
  const spin = Math.sin(exit * Math.PI) * 32 + exit * 83
  return <section className="hero layer" aria-labelledby="hero-title" inert={progress > .67}
    style={{ opacity: 1 - interval(progress, .78, 1.08), transform: `translate3d(0,${-9 * exit}%,0) rotate(${spin}deg) scale(${mix(1, .40, exit)})` }}>
    <video className="hero-video" src="/assets/bgsite.mp4" autoPlay loop muted playsInline />
    <a className="hero-brand" href="#inicio" aria-label="Agisales, início"><img src="/assets/agi-branco.png" alt="Agi" /></a>
    <h1 id="hero-title">
      <span className="hero-title-left">Agilidade e inteligência</span>
      <span className="hero-title-right">em soluções sob medida.</span>
    </h1>
    <div className="hero-bottom">
      <div className="hero-sub">
        <p>Sua empresa cresce quando as pessoas crescem.<br />Nossos benefícios fazem isso acontecer com zero</p>
        <div className="hero-sub-row">
          <span>burocracia e máxima eficiência.</span>
          <i className="hero-line" aria-hidden="true" />
        </div>
      </div>
      <a className="hero-cta" href="#solucoes">Ver soluções</a>
    </div>
  </section>
}

const cards = [
  { key: 'intro', name: '' },
  { key: 'support', tag: '', name: '' },
  { key: 'sales', tag: '', name: '' },
  { key: 'process', tag: '', name: '' },
  { key: 'perfume', tag: '', name: '' },
  { key: 'custom', tag: '', name: '', emphasis: '' },
]
const marquee = [
  'Pessoas.',
  'Um ecossistema que simplifica o trabalho do RH.',
  'Decisão baseada em dados, não em achismos.',
  'Decisão baseada em dados, não em achismos.',
  'Processos que não travam.',
]

function AgentCard({ card, index, unfold }) {
  const { key } = card
  return <article className={'agent-card ' + key} style={{ '--face-angle': index * 60 + 'deg', opacity: index === 0 ? 1 : unfold }}>
    {index < 5 ? <img className="agent-info-image" src={`/assets/novas/cardsinfos copiar${index + 1}.png`} alt={index === 0 ? 'Pessoas. Cuidamos do que mais importa.' : ''} /> : <Star className="custom-logo" />}
  </article>
}

function Agents({ progress, id }) {
  const entry = ease(interval(progress, .58, 1.16))
  const rotation = interval(progress, 1.2, 4.78) * -300
  const visibility = entry > 0 && progress < 5.43
  return <section className="agents layer" id={id} aria-label="Soluções" inert={!visibility} style={{ visibility: visibility ? 'visible' : 'hidden' }}>
      <div className="marquee" aria-hidden="true" style={{ opacity: interval(progress, .72, 1), transform: `translate3d(${-90 - 83 * progress}vw,-50%,0)` }}>
      {[...marquee, ...marquee, ...marquee].map((label, i) => <React.Fragment key={i}>{label}<Star /></React.Fragment>)}
    </div>
    <div className="agent-scene">
      <div className="agent-entry" style={{ opacity: entry, transform: `rotate(${mix(-27, 0, entry)}deg) scale(${mix(1.29, 1, entry)})` }}>
        <div className="agent-rotor" style={{ transform: `translateZ(calc(-1 * var(--depth))) rotateY(${rotation}deg)` }}>
          {cards.map((card, index) => <AgentCard key={card.key} card={card} index={index} unfold={interval(progress, 1.12, 1.4)} />)}
        </div>
      </div>
    </div>
  </section>
}

const particles = []
let seed = 2447
function random() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
  return seed / 4294967296
}
for (let i = 0; i < 3200; i++) {
  const angle = random() * 2 * Math.PI
  const vertical = 2 * random() - 1
  const radius = Math.sqrt(1 - vertical * vertical)
  const j = (random() - .5) * 14
  const c = random() < .55 ? '0,177,223' : random() < .5 ? '77,132,170' : '255,255,255'
  const r = random() * 1.3 + .4
  const o = random() * 6
  particles.push([angle, vertical, radius, j, c, r, o])
}

function ParticleField({ progress }) {
  const canvas = useRef(null)
  const progressRef = useRef(progress)
  progressRef.current = progress

  useEffect(() => {
    let frameId = 0
    function render(tm) {
      const surface = canvas.current
      if (!surface) return
      const width = surface.clientWidth
      const height = surface.clientHeight
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      const pixelWidth = Math.round(width * ratio)
      const pixelHeight = Math.round(height * ratio)
      if (surface.width !== pixelWidth || surface.height !== pixelHeight) {
        surface.width = pixelWidth
        surface.height = pixelHeight
      }
      const ctx = surface.getContext('2d')
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const p = progressRef.current
      const e = ease(interval(p, 5.65, 6.35))
      const base = Math.min(width, height)
      const ball = base * .27
      const aInf = Math.min(width * .36, height * .7)
      const w = (1 - e) * 8 + 1.5

      for (let i = 0; i < particles.length; i++) {
        const [angle, vertical, radius, j, c, r, o] = particles[i]
        const a = angle + p * .48
        const sx = width / 2 + Math.cos(a) * radius * ball
        const sy = height / 2 + vertical * ball

        const s = 1 + Math.sin(angle) * Math.sin(angle)
        const ix = (aInf * Math.cos(angle)) / s
        const iy = (aInf * Math.sin(angle) * Math.cos(angle)) / s
        const tx = width / 2 + ix + j
        const ty = height / 2 + iy * 1.15 + j

        const px = mix(sx, tx, e) + Math.sin(tm / 900 + o) * w
        const py = mix(sy, ty, e) + Math.cos(tm / 1100 + o) * w
        if (px < 0 || py < 0 || px > width || py > height) continue
        ctx.fillStyle = `rgba(${c},${.35 + .5 * e})`
        ctx.fillRect(px, py, r * 1.6, r * 1.6)
      }
      frameId = requestAnimationFrame(render)
    }
    frameId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(frameId)
  }, [])
  return <canvas ref={canvas} aria-hidden="true" />
}

function ParticleScene({ progress, id }) {
  const [activeBrand, setActiveBrand] = useState(-1)
  const [viewport, setViewport] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }))
  useEffect(() => {
    const resize = () => setViewport({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])
  const visible = progress >= 4.86 && progress < 8.14
  const wipe = interval(progress, 4.86, 5.51)
  const size = mix(10, 380, ease(wipe))
  const sw = mix(106, 640, ease(interval(wipe, .32, .96)))
  const rise = ease(interval(progress, 7.49, 8.12))
  const brands = interval(progress, 5.9, 6.18) * (1 - interval(progress, 7.47, 7.85))
  const { width: viewWidth, height: viewHeight } = viewport
  const mobile = viewWidth <= 700
  const orbitRadius = Math.min(viewWidth * .36, viewHeight * .7)
  const brandCenters = mobile
    ? [[14, 50], [33, 46], [33, 54], [67, 46], [67, 54], [86, 50]]
    : [[10, 50], [33, 35], [33, 65], [67, 35], [67, 65], [90, 50]]
  const brandDiameter = mobile ? Math.min(72, Math.max(50, viewWidth * .13)) : Math.min(126, Math.max(68, viewWidth * .09))
  const connectorAngles = [Math.PI, Math.PI * .75, Math.PI * 1.25, Math.PI * 1.75, Math.PI * .25, 0]
  const connectors = connectorAngles.map((angle, i) => {
    const s = 1 + Math.sin(angle) ** 2
    const sourceX = viewWidth / 2 + orbitRadius * Math.cos(angle) / s
    const sourceY = viewHeight / 2 + orbitRadius * Math.sin(angle) * Math.cos(angle) / s * 1.15
    const [centerX, centerY] = brandCenters[i]
    const dx = sourceX - viewWidth * centerX / 100
    const dy = sourceY - viewHeight * centerY / 100
    const distance = Math.hypot(dx, dy) || 1
    const endX = viewWidth * centerX / 100 + dx / distance * brandDiameter / 2
    const endY = viewHeight * centerY / 100 + dy / distance * brandDiameter / 2
    return { sourceX, sourceY, endX, endY }
  })
  return <section className="particle-scene layer" id={id} aria-label="Sobre a Agisales" inert={!visible} style={{ visibility: visible ? 'visible' : 'hidden', background: wipe >= 1 ? '#06141F' : 'transparent', transform: `translateY(${-100 * rise}%)` }}>
    {visible && <>
      {wipe < 1 && <svg className="wipe" viewBox="30 180 930 720" aria-hidden="true" style={{ width: size + 'vmax', height: 'auto', transform: 'translate(-50%,-50%)' }}>
        <path fill="none" stroke="#06141F" strokeWidth={sw} strokeLinecap="round" d="M432 740 C432 790 510 835 590 835 C690 835 755 770 755 650 V470 C755 370 690 294 595 294 C520 294 470 330 440 365" />
        <path fill="none" stroke="#06141F" strokeWidth={sw} strokeLinecap="round" d="M327 627 H245 C160 627 98 550 98 460 C98 370 170 294 262 294 C360 294 426 370 426 465 C426 560 510 627 600 627 H655" />
        <path fill="#06141F" stroke="#06141F" strokeWidth={sw - 106} strokeLinejoin="round" d="M843 680 V364 a49 49 0 0 1 98 0 V680 Z" />
        <circle fill="#06141F" cx="892" cy="242" r={51 + (sw - 106) * .5} />
      </svg>}
      {progress >= 5.18 && progress <= 8.12 && <div className="particle-field" style={{ opacity: interval(progress, 5.18, 5.52) }}><ParticleField progress={progress} /></div>}
      <Star className="particle-star" />
      <div className="brand-orbit-scene" style={{ opacity: brands }} aria-label="Marcas parceiras Agisales" inert={brands < .25}>
        <h2>Trabalhamos com grandes marcas,<br /><span>que são referência<br />em qualidade.</span></h2>
        <svg className="orbit-connectors" viewBox={`0 0 ${viewWidth} ${viewHeight}`} preserveAspectRatio="none" aria-hidden="true">
          <g>{connectors.map(({ sourceX, sourceY, endX, endY }, i) => <g key={i}>
            <line x1={sourceX} y1={sourceY} x2={endX} y2={endY} />
            <circle cx={sourceX} cy={sourceY} r="2.3" />
          </g>)}</g>
        </svg>
        {[4, 2, 1, 5, 6, 3].map((brand, i) => <div className={`orbit-brand orbit-brand-${i + 1}`} key={brand} tabIndex="0" aria-label={`Ver vídeo da marca ${brand}`} onMouseEnter={() => setActiveBrand(i)} onMouseLeave={() => setActiveBrand(-1)} onFocus={() => setActiveBrand(i)} onBlur={() => setActiveBrand(-1)}>
          <img src={`/assets/novas/brand${brand}.png`} alt={`Marca parceira ${brand}`} />
          <div className="orbit-preview" aria-hidden="true">
            {activeBrand === i && <video src="/assets/novas/vidfoot.mp4" autoPlay muted loop playsInline preload="none" />}
          </div>
        </div>)}
        <span className="orbit-caption">Nosso portfólio de parceiros</span>
      </div>
    </>}
  </section>
}

const cases = [
  '/assets/novas/time1.png',
  '/assets/novas/time2.png',
  '/assets/novas/time3.png',
  '/assets/novas/time4.png',
]
function Stories({ progress, reduced }) {
  const caseEntry = ease(interval(progress, 8.14, 8.64))
  const slide = interval(progress, 8.64, 10.13)
  const galleryEntry = interval(progress, 9.16, 10.16)
  const gallerySlide = ease(interval(progress, 10.17, 11.67))
  const zoom = ease(interval(progress, 11.64, 12.37))
  const reveal = interval(progress, 12.21, 12.65)
  const caseVisible = progress >= 7.96 && progress < 10.26
  const caseIntro = interval(progress, 7.96, 8.06) * (1 - interval(progress, 8.43, 8.64))
  const galleryVisible = progress >= 9.12 && progress < 12.28
  const panelVisible = progress >= 10.35
  return <>
    <div className="dark-base layer" aria-hidden="true" style={{ opacity: interval(progress, 5.38, 5.55) * (1 - zoom) }} />
    <section className="cases layer" id={reduced ? "cases" : undefined} aria-label="Cases" inert={!caseVisible} style={{ visibility: caseVisible ? 'visible' : 'hidden' }}>
      <div className="case-intro" style={{ opacity: reduced ? 1 : caseIntro }}>
        <h2>Nada de atalhos. Só entrega real.</h2>
        <p>Nosso método é pensado para empresas que querem escala, consistência e impacto imediato no clima organizacional.</p>
      </div>
      <div className="case-track" style={{ transform: `translate3d(${-slide * 111}vw,${(1 - caseEntry) * 80}svh,0) scale(${mix(1, .68, ease(interval(progress, 9.46, 10.13)))})` }}>
        {cases.map((image) => <article className="case" key={image} style={{ backgroundImage: `url(${image})` }} />)}
      </div>
    </section>
    <section className="gallery layer" id={reduced ? "conteudo" : undefined} aria-labelledby="gallery-title" inert={!galleryVisible} style={{ visibility: galleryVisible ? 'visible' : 'hidden', opacity: 1 - zoom }}>
      <h2 id="gallery-title" style={{ opacity: reduced ? 1 : ease(interval(progress, 9.73, 10.15)) }}>Somos a operação que equilibra<br /><span>performance com propósito.</span></h2>
      <div className="tile-track" style={{ transform: `translate3d(${mix(89, 0, galleryEntry) - 58.5 * gallerySlide}%,0,0)` }}>
        {[
          ['shoe', 'Campanha · Calçados', 23.1, 12.6, 10.6, 1.48],
          ['model', 'Editorial · Moda', 49, 11.1, 7.8, 1.47],
          ['bag', 'Produto · Varejo', 68.2, 9, 9.6, 1.52],
          ['bottle', 'Produto · Perfumaria', 34.2, 43.5, 9, 1.5],
          ['glasses', 'Campanha · Óculos', 75, 40.2, 9.5, 1.5],
          ['lipstick', 'Campanha · Beleza', 38.6, 71.3, 7.2, 1.52],
          ['jewels', 'Campanha · Joias', 58.8, 69.8, 7.7, 1.5],
          ['fashion', 'Editorial · Moda', 96, 60.5, 14, 1.48],
        ].map(([image, label, x, y, w, ratio]) => <figure key={image} style={{ left: `${x}%`, top: `${y}%`, width: `${w}vw`, aspectRatio: 1 / ratio }}>
          <img src={asset(image)} alt={label} />
        </figure>)}
      </div>
    </section>
    <section className="final-panel" aria-labelledby="contact-title" inert={reveal < .4}
      style={{ visibility: panelVisible ? 'visible' : 'hidden', left: mix(142 - 98 * gallerySlide, 1.25, zoom) + '%', top: mix(26, 2, zoom) + '%', width: mix(49, 97.5, zoom) + '%', height: mix(48, 96, zoom) + '%' }}>
      <video className="final-video" src="/assets/novas/vidfoot.mp4" autoPlay loop muted playsInline />
      <div className="final-copy" style={{ opacity: reveal, transform: `translateY(${10 * (1 - reveal)}px)` }}>
        <h2 id="contact-title">Precisão com velocidade<br /><span>e consultoria com impacto real.</span></h2>
        <Action>Marcar reunião agora</Action>
      </div>
    </section>
  </>
}

function Footer() {
  return <footer className="footer">
    <div className="footer-links">
      <small>AgiSales © 2025</small>
      <div><a href="https://www.instagram.com/agi.sales/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/profile.php?id=61584832191948" target="_blank" rel="noreferrer">Facebook</a><a href="https://www.linkedin.com/company/agisales/" target="_blank" rel="noreferrer">LinkedIn</a></div>
    </div>
  </footer>
}

function Intro() {
  return <div className="intro" aria-hidden="true">
    <div className="intro-glow" />
    <svg className="intro-svg" viewBox="30 180 930 720">
      <path className="intro-stroke intro-g" pathLength="1" d="M432 740 C432 790 510 835 590 835 C690 835 755 770 755 650 V470 C755 370 690 294 595 294 C520 294 470 330 440 365" />
      <path className="intro-stroke intro-a" pathLength="1" d="M327 627 H245 C160 627 98 550 98 460 C98 370 170 294 262 294 C360 294 426 370 426 465 C426 560 510 627 600 627 H655" />
      <path className="intro-stem" d="M843 680 V364 a49 49 0 0 1 98 0 V680 Z" />
      <circle className="intro-dot" cx="892" cy="242" r="51" />
    </svg>
  </div>
}

function App() {
  const timeline = useRef(null)
  const [progress, setProgress] = useState(0)
  const [intro, setIntro] = useState(!window.location.hash)
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])
  useEffect(() => {
    let scheduled = 0
    function measure() {
      scheduled = 0
      const bounds = timeline.current.getBoundingClientRect()
      const viewport = timeline.current.firstElementChild.getBoundingClientRect().height
      setProgress(Math.max(0, -bounds.top / viewport))
    }
    function schedule() {
      if (!scheduled) scheduled = requestAnimationFrame(measure)
    }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()
    return () => {
      cancelAnimationFrame(scheduled)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
  useEffect(() => {
    if (!intro || reduced) return
    const timeout = setTimeout(() => setIntro(false), 3000)
    const skip = () => setIntro(false)
    window.addEventListener('wheel', skip, { passive: true, once: true })
    window.addEventListener('touchstart', skip, { passive: true, once: true })
    window.addEventListener('keydown', skip, { once: true })
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('touchstart', skip)
      window.removeEventListener('keydown', skip)
    }
  }, [intro, reduced])
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id && window.scrollY === 0) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
    }
  }, [])
  const scene = reduced ? 0 : Math.min(total, progress)
  return <>
    <Nav progress={progress} />
    <main id="inicio">
      <div className="timeline" ref={timeline} style={{ '--timeline-length': total + 1 }}>
        <div className="stage">
          <Hero progress={scene} />
          <Agents progress={reduced ? 2 : scene} id={reduced ? "solucoes" : undefined} />
          <Stories progress={reduced ? 10 : scene} reduced={reduced} />
          <ParticleScene progress={reduced ? 6.3 : scene} id={reduced ? "sobre" : undefined} />
          {reduced && <section id="contato" className="reduced-contact"><h2>Precisão com velocidade<br />e consultoria com impacto real.</h2><Action>Marcar reunião agora</Action></section>}
        </div>
        {!reduced && sections.map(([, id, at]) => <span key={id} className="anchor" id={id} style={{ top: at * 100 + 'svh' }} />)}
      </div>
    </main>
    <Footer />
    {intro && !reduced && <Intro />}
  </>
}

createRoot(document.getElementById('root')).render(<App />)
