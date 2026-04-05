'use client'
import { useState } from 'react'
import Loader from '@/components/Loader/Loader'
import Nav from '@/components/Nav/Nav'
import Hero from '@/components/Hero/Hero'
import Marquee from '@/components/shared/Marquee'
import About from '@/components/About/About'
import Projects from '@/components/Projects/Projects'
import Experience from '@/components/Experience/Experience'
import Contact from '@/components/Contact/Contact'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <main>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <Nav />
      <Hero />
      <About />
      <Marquee />
      <Projects />
      <Experience />
      <Contact />
    </main>
  )
}
