"use client"

import React from "react"
import { CVFormat } from "@/lib/types"
import { personalInfo } from "@/data/cv-formats"
import { skills } from "@/data/skills"
import { experiences, education } from "@/data/experience"
import { projects } from "@/data/projects"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react"

interface CVTemplateProps {
  format: CVFormat
  className?: string
}

export function CVTemplate({ format, className = "" }: CVTemplateProps) {
  const enabledSections = format.sections
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order)

  const renderPersonalInfo = () => (
    <div className="mb-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{personalInfo.name}</h1>
      <h2 className="text-xl text-gray-600 mb-4">{personalInfo.title}</h2>
      
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Mail className="w-4 h-4" />
          {personalInfo.email}
        </div>
        <div className="flex items-center gap-1">
          <Phone className="w-4 h-4" />
          {personalInfo.phone}
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {personalInfo.location}
        </div>
        <div className="flex items-center gap-1">
          <Globe className="w-4 h-4" />
          {personalInfo.website}
        </div>
        <div className="flex items-center gap-1">
          <Github className="w-4 h-4" />
          {personalInfo.github}
        </div>
        <div className="flex items-center gap-1">
          <Linkedin className="w-4 h-4" />
          {personalInfo.linkedin}
        </div>
      </div>
    </div>
  )

  const renderSummary = () => {
    const summaryText = personalInfo.summary[format.template as keyof typeof personalInfo.summary]
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
          {format.template === "executive" ? "Perfil Ejecutivo" : 
           format.template === "creative" ? "Perfil Creativo" : "Resumen Profesional"}
        </h3>
        <p className="text-gray-700 leading-relaxed">{summaryText}</p>
      </div>
    )
  }

  const renderSkills = () => {
    const relevantSkills = format.template === "creative" 
      ? skills.filter(skill => skill.category === "design" || skill.category === "frontend")
      : format.template === "executive"
      ? skills.filter(skill => skill.category === "soft-skills" || skill.level >= 80)
      : skills.filter(skill => skill.category !== "soft-skills")

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
          {format.template === "creative" ? "Habilidades de Diseño" : 
           format.template === "executive" ? "Competencias" : "Habilidades Técnicas"}
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {relevantSkills.slice(0, 12).map((skill) => (
            <div key={skill.id} className="flex justify-between items-center">
              <span className="text-gray-700 text-sm">{skill.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gray-800 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-8">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderExperience = () => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
        {format.template === "executive" ? "Experiencia Profesional" : "Experiencia Laboral"}
      </h3>
      
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div key={exp.id}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                <p className="text-gray-600">{exp.company}</p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <p>{exp.startDate.getFullYear()} - {exp.endDate?.getFullYear() || "Presente"}</p>
                {exp.location && <p>{exp.location}</p>}
              </div>
            </div>
            
            <p className="text-gray-700 text-sm mb-3">{exp.description}</p>
            
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 mb-3">
              {exp.achievements.slice(0, 3).map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-1">
              {exp.technologies.slice(0, 6).map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderProjects = () => {
    const featuredProjects = projects.filter(p => p.featured).slice(0, 4)
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
          {format.template === "creative" ? "Portfolio" : 
           format.template === "executive" ? "Proyectos Estratégicos" : "Proyectos Destacados"}
        </h3>
        
        <div className="space-y-4">
          {featuredProjects.map((project) => (
            <div key={project.id}>
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-gray-900">{project.title}</h4>
                <span className="text-xs text-gray-500">{project.startDate.getFullYear()}</span>
              </div>
              
              <p className="text-gray-700 text-sm mb-2">{project.description}</p>
              
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 5).map((tech) => (
                  <Badge key={tech.name} variant="outline" className="text-xs">
                    {tech.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderEducation = () => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
        Formación
      </h3>
      
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id}>
            <div className="flex justify-between items-start mb-1">
              <div>
                <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                <p className="text-gray-600">{edu.institution}</p>
              </div>
              <span className="text-sm text-gray-500">
                {edu.startDate.getFullYear()} - {edu.endDate?.getFullYear() || "Presente"}
              </span>
            </div>
            
            {edu.description && (
              <p className="text-gray-700 text-sm">{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const renderLanguages = () => {
    const languageSkills = skills.filter(skill => skill.category === "languages")
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
          Idiomas
        </h3>
        
        <div className="space-y-2">
          {languageSkills.map((lang) => (
            <div key={lang.id} className="flex justify-between items-center">
              <span className="text-gray-700">{lang.name}</span>
              <span className="text-sm text-gray-600">{lang.description}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderAchievements = () => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
        Logros Clave
      </h3>
      
      <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
        <li>Desarrollé más de 15 proyectos web exitosos para clientes internacionales</li>
        <li>Implementé arquitecturas escalables que soportaron crecimiento del 300%</li>
        <li>Reduje costos de infraestructura en un 25% mediante optimizaciones</li>
        <li>Graduado con Matrícula de Honor en Ingeniería Informática (9.2/10)</li>
        <li>Certificación AWS Solutions Architect con puntuación 850/1000</li>
      </ul>
    </div>
  )

  const renderCertifications = () => {
    const certifications = education.filter(edu => edu.degree.includes("Certified") || edu.degree.includes("Bootcamp"))
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
          Certificaciones
        </h3>
        
        <div className="space-y-2">
          {certifications.map((cert) => (
            <div key={cert.id} className="flex justify-between items-center">
              <div>
                <span className="text-gray-900 font-medium">{cert.degree}</span>
                <span className="text-gray-600 ml-2">- {cert.institution}</span>
              </div>
              <span className="text-sm text-gray-500">{cert.endDate?.getFullYear()}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderTools = () => {
    const toolSkills = skills.filter(skill => skill.category === "tools" || skill.category === "design")
    
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-200 pb-1">
          Herramientas
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {toolSkills.map((tool) => (
            <Badge key={tool.id} variant="outline" className="text-xs">
              {tool.name}
            </Badge>
          ))}
        </div>
      </div>
    )
  }

  const sectionRenderers = {
    personal: renderPersonalInfo,
    summary: renderSummary,
    skills: renderSkills,
    experience: renderExperience,
    projects: renderProjects,
    education: renderEducation,
    languages: renderLanguages,
    achievements: renderAchievements,
    certifications: renderCertifications,
    tools: renderTools
  }

  return (
    <div className={`bg-white p-8 max-w-4xl mx-auto ${className}`} id="cv-template">
      {enabledSections.map((section) => {
        const renderer = sectionRenderers[section.id as keyof typeof sectionRenderers]
        return renderer ? (
          <div key={section.id}>
            {renderer()}
            {section.order < enabledSections.length && <Separator className="my-6" />}
          </div>
        ) : null
      })}
    </div>
  )
}