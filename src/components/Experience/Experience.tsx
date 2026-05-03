'use client'
import { experience } from '@/lib/content'
import ExperiencePanel from './ExperiencePanel'

export default function Experience() {
  return (
    <section id="experience" data-section>
      {experience.map((exp) => (
        <ExperiencePanel key={exp.id} exp={exp} />
      ))}
    </section>
  )
}
