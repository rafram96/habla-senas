"use client"

import Link from "next/link"
import { ArrowRight, Zap, Users, Brain, Accessibility, Globe, Shield, GraduationCap } from "lucide-react"
import { useState, useEffect } from "react"

// Animated Background Components
function AnimatedWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
            <stop offset="50%" stopColor="rgba(168, 85, 247, 0.15)" />
            <stop offset="100%" stopColor="rgba(99, 102, 241, 0.1)" />
          </linearGradient>
          <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0.08)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.12)" />
            <stop offset="100%" stopColor="rgba(147, 51, 234, 0.08)" />
          </linearGradient>
        </defs>

        {/* First Wave */}
        <path
          d="M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z"
          fill="url(#wave1)"
          className="animate-wave-slow"
        />

        {/* Second Wave */}
        <path
          d="M0,500 Q400,300 800,500 T1600,500 L1600,800 L0,800 Z"
          fill="url(#wave2)"
          className="animate-wave-medium"
        />

        {/* Third Wave */}
        <path
          d="M0,600 Q200,450 400,600 T800,600 T1200,600 L1200,800 L0,800 Z"
          fill="rgba(168, 85, 247, 0.05)"
          className="animate-wave-fast"
        />
      </svg>
    </div>
  )
}

function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Circles */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full opacity-60 animate-float-slow"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-40 animate-float-medium"></div>
      <div className="absolute top-60 left-1/4 w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full opacity-50 animate-float-fast"></div>
      <div className="absolute bottom-40 right-1/3 w-5 h-5 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full opacity-45 animate-float-slow"></div>
      <div className="absolute bottom-60 left-1/2 w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-55 animate-float-medium"></div>

      {/* Floating Geometric Shapes */}
      <div className="absolute top-32 right-1/4 w-8 h-8 border-2 border-violet-300 rotate-45 opacity-30 animate-spin-slow"></div>
      <div className="absolute bottom-32 left-1/3 w-6 h-6 border-2 border-cyan-300 opacity-40 animate-pulse-slow"></div>
      <div className="absolute top-1/2 right-10 w-10 h-1 bg-gradient-to-r from-purple-300 to-indigo-300 opacity-25 animate-slide"></div>
    </div>
  )
}

function ParticleField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 bg-violet-400 rounded-full opacity-20 animate-twinkle`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        ></div>
      ))}
    </div>
  )
}

const emojiTransformations = [
  { emoji: "👋", word: "Hola", color: "from-pink-500 to-rose-500" },
  { emoji: "❤️", word: "Amor", color: "from-red-500 to-pink-500" },
  { emoji: "🌟", word: "Estrella", color: "from-yellow-400 to-orange-500" },
  { emoji: "🚀", word: "Cohete", color: "from-blue-500 to-purple-600" },
  { emoji: "🎯", word: "Meta", color: "from-green-500 to-teal-500" },
  { emoji: "💡", word: "Idea", color: "from-amber-400 to-yellow-500" },
]

function AnimatedEmojiWord() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransformed, setIsTransformed] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransformed(true)
      setTimeout(() => {
        setIsTransformed(false)
        setCurrentIndex((prev) => (prev + 1) % emojiTransformations.length)
      }, 2000)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const current = emojiTransformations[currentIndex]

  return (
    <div className="inline-flex items-center justify-center w-32 h-16 mx-2">
      <div
        className={`transition-all duration-1000 transform ${
          isTransformed ? "scale-110 rotate-12" : "scale-100 rotate-0"
        }`}
      >
        {isTransformed ? (
          <span
            className={`text-2xl font-bold bg-gradient-to-r ${current.color} bg-clip-text text-transparent animate-pulse`}
          >
            {current.word}
          </span>
        ) : (
          <span className="text-4xl animate-bounce">{current.emoji}</span>
        )}
      </div>
    </div>
  )
}

export default function HablaSenasLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 relative overflow-hidden">
      <AnimatedWaves />
      <FloatingElements />
      <ParticleField />

      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">HS</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Habla-Señas
              </h1>
              <p className="text-xs text-gray-500 font-medium">UTEC Student Project</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">
              Características
            </a>
            <a href="#about" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">
              Acerca de
            </a>
            <a href="#contact" className="text-gray-600 hover:text-violet-600 transition-colors font-medium">
              Contacto
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* University Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-violet-100 to-indigo-100 border border-violet-200 mb-6">
              <GraduationCap className="w-5 h-5 mr-2 text-violet-600" />
              <span className="text-violet-800 font-semibold text-sm">
                Proyecto Estudiantil - Universidad de Ingeniería y Tecnología (UTEC)
              </span>
            </div>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800">
              <Zap className="w-4 h-4 mr-2" />
              Impulsado por Inteligencia Artificial
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Conectando mundos a través del{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              lenguaje de señas
            </span>
          </h1>

          {/* Animated Emoji Section */}
          <div className="mb-8">
            <p className="text-lg text-gray-600 mb-4">Mira cómo transformamos emociones en palabras:</p>
            <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
              <AnimatedEmojiWord />
              <span className="text-2xl text-gray-400">→</span>
              <AnimatedEmojiWord />
              <span className="text-2xl text-gray-400">→</span>
              <AnimatedEmojiWord />
            </div>
          </div>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Habla-Señas es un traductor de lenguaje de señas revolucionario desarrollado por estudiantes de UTEC, que
            utiliza IA avanzada para crear un mundo más accesible e inclusivo para la comunidad sorda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/landing-page-2"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105"
            >
              Explorar Habla-Señas
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="inline-flex items-center px-8 py-4 border-2 border-violet-300 text-violet-700 font-semibold rounded-xl hover:border-violet-600 hover:text-violet-600 hover:bg-violet-50 transition-all duration-300 transform hover:-translate-y-1">
              Ver Demo Interactivo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Tecnología que transforma vidas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Descubre cómo nuestra IA avanzada, desarrollada en UTEC, está revolucionando la comunicación y creando un
              mundo más inclusivo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="group bg-gradient-to-br from-violet-50 to-purple-100 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-violet-100">
              <div className="w-14 h-14 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">IA Avanzada</h3>
              <p className="text-gray-600 leading-relaxed">
                Algoritmos de aprendizaje profundo desarrollados por estudiantes de UTEC que reconocen y traducen el
                lenguaje de señas con precisión excepcional.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-cyan-50 to-blue-100 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-cyan-100">
              <div className="w-14 h-14 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Accessibility className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Accesibilidad Total</h3>
              <p className="text-gray-600 leading-relaxed">
                Diseñado desde cero pensando en la accesibilidad, cumpliendo con los estándares WCAG para una
                experiencia verdaderamente inclusiva.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-emerald-50 to-green-100 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-emerald-100">
              <div className="w-14 h-14 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Multiidioma</h3>
              <p className="text-gray-600 leading-relaxed">
                Soporte para múltiples lenguajes de señas regionales, conectando comunidades sordas de todo el mundo
                desde Perú.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-amber-50 to-orange-100 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-amber-100">
              <div className="w-14 h-14 bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tiempo Real</h3>
              <p className="text-gray-600 leading-relaxed">
                Traducción instantánea que permite conversaciones fluidas y naturales sin interrupciones, optimizada
                para dispositivos móviles.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-pink-50 to-rose-100 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-pink-100">
              <div className="w-14 h-14 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Comunidad</h3>
              <p className="text-gray-600 leading-relaxed">
                Desarrollado en colaboración con la comunidad sorda peruana para garantizar autenticidad y precisión
                cultural.
              </p>
            </div>

            <div className="group bg-gradient-to-br from-indigo-50 to-blue-100 p-8 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-indigo-100">
              <div className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Privacidad</h3>
              <p className="text-gray-600 leading-relaxed">
                Procesamiento seguro que protege la privacidad del usuario con encriptación de extremo a extremo y
                estándares universitarios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Únete a la revolución de la comunicación inclusiva
          </h2>
          <p className="text-xl text-violet-100 mb-8 max-w-3xl mx-auto">
            Sé parte del cambio hacia un mundo más accesible. Descubre cómo Habla-Señas, desarrollado por estudiantes
            peruanos, puede transformar la manera en que nos comunicamos.
          </p>
          <Link
            href="/landing-page-2"
            className="group inline-flex items-center px-10 py-5 bg-white text-violet-600 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105"
          >
            Comenzar ahora
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">HS</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Habla-Señas</h3>
                <p className="text-gray-400 text-sm mb-2">Conectando mundos a través de la IA</p>
                <p className="text-violet-400 text-sm font-medium">Proyecto Estudiantil UTEC</p>
              </div>
            </div>

            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4 text-violet-400">Universidad</h4>
              <div className="bg-gray-800 p-4 rounded-xl">
                <h5 className="font-bold text-white mb-1">UTEC</h5>
                <p className="text-gray-400 text-sm">Universidad de Ingeniería y Tecnología</p>
                <p className="text-gray-400 text-sm">Lima, Perú</p>
              </div>
            </div>

            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold mb-4 text-violet-400">Desarrollado con el apoyo de</h4>
              <div className="inline-flex items-center space-x-4">
                <div className="bg-white px-6 py-3 rounded-xl">
                  <span className="text-blue-600 font-bold text-xl">IEEE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Habla-Señas - Proyecto Estudiantil UTEC. Todos los derechos reservados. Construyendo un futuro más
              inclusivo desde Perú para el mundo.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
