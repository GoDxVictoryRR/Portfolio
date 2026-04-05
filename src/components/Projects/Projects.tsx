'use client'
import { projects } from '@/lib/content'
import ProjectPanel from './ProjectPanel'

export default function Projects() {
  return (
    <section id="projects">
      {projects.map((project, i) => (
        <ProjectPanel
          key={project.id}
          project={project}
          isLast={i === projects.length - 1}
        />
      ))}
    </section>
  )
}
