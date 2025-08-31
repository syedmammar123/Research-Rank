import  { useEffect, useState, useRef } from 'react'
import {  useNavigate } from 'react-router-dom'
import { auth, db } from '../../firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

function Landing() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const observerRef = useRef(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const q = query(collection(db, 'users'), where('email', '==', user.email))
          const querySnapshot = await getDocs(q)
          
          if (!querySnapshot.empty) {
            setIsAuthenticated(true)
            navigate('/app/dashboard')
          } else {
            setIsAuthenticated(true)
            navigate('/app/register')
          }
        } catch (error) {
          console.error('Error checking user profile:', error)
          setIsAuthenticated(false)
        }
      } else {
        setIsAuthenticated(false)
      }
      setIsLoading(false)
    })

    return unsubscribe
  }, [navigate])

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observerRef.current.observe(el))

    // Fallback: ensure elements are visible after a delay
    const fallbackTimer = setTimeout(() => {
      elements.forEach((el) => {
        if (!el.classList.contains('animate-in')) {
          el.classList.add('animate-in')
        }
      })
    }, 1000)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      clearTimeout(fallbackTimer)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 4)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/app/dashboard')
    } else {
      navigate('/app')
    }
  }

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
          </div>
          <p className="text-gray-700 text-xl mt-6 font-medium">Loading Research Rank Platform...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
  
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/30 via-purple-100/30 to-indigo-100/30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-indigo-50/50"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-indigo-700 bg-clip-text text-transparent">
              Research Rank
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Features</a>
            <a href="#workflow" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Workflow</a>
            <a href="#demo" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">Demo</a>
            <a href="#about" className="text-gray-700 hover:text-indigo-600 transition-colors duration-300">About</a>
            <a 
              href="https://www.youtube.com/watch?v=-0TP9IKcWUE" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors duration-300"
            >
              {/* YouTube Icon */}
              <svg 
                className="w-5 h-5" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a2.974 2.974 0 00-2.097-2.107C19.184 3.5 12 3.5 12 3.5s-7.184 0-9.401.579A2.974 2.974 0 00.502 6.186 31.36 31.36 0 000 12a31.36 31.36 0 00.502 5.814 2.974 2.974 0 002.097 2.107C4.816 20.5 12 20.5 12 20.5s7.184 0 9.401-.579a2.974 2.974 0 002.097-2.107A31.36 31.36 0 0024 12a31.36 31.36 0 00-.502-5.814zM9.75 15.5v-7l6 3.5-6 3.5z" />
              </svg>
              <span>How it Works</span>
            </a>

          </div>

          <button
            onClick={handleGetStarted}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-40 px-6 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="animate-on-scroll">
            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              <span className="bg-gradient-to-r from-gray-900 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
                Research Rank
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              Evaluate and rank students with AI-powered research assessment. Match students to your research programs based on their publications, impact factors, and characteristics that matter most to your academic goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Evaluating Research
              </button>
              <a
                href="#demo"
                className="px-8 py-4 border-2 border-indigo-300 text-indigo-700 text-lg font-semibold rounded-full hover:bg-indigo-50 transition-all duration-300"
              >
                Watch Demo
              </a>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-200/40 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-purple-200/40 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-indigo-300/40 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-30 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-on-scroll">
              Revolutionary Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the cutting-edge capabilities that make Research Rank the ultimate research evaluation platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🧠',
                title: 'AI-Powered Analysis',
                description: 'Advanced OpenAI integration for intelligent content analysis and specialty matching',
                color: 'from-indigo-500 to-indigo-600'
              },
              {
                icon: '📊',
                title: 'Smart Scoring',
                description: 'Sophisticated algorithms that evaluate research quality, impact factors, and author contributions',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: '📈',
                title: 'Advanced Analytics',
                description: 'Comprehensive reporting with statistical visualizations and comparative analysis',
                color: 'from-indigo-600 to-purple-600'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="animate-on-scroll"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`bg-gradient-to-br ${feature.color} p-8 rounded-2xl h-full transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl`}>
                  <div className="text-6xl mb-6">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/90 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="relative z-30 px-6 py-20 bg-gray-50/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-on-scroll">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the seamless workflow that transforms research evaluation
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Upload Data', description: 'Import research products, student information, and supporting documents' },
              { step: '02', title: 'AI Analysis', description: 'Our AI analyzes content, specialty alignment, and publication quality' },
              { step: '03', title: 'Smart Scoring', description: 'Advanced algorithms calculate comprehensive scores and rankings' },
              { step: '04', title: 'Generate Reports', description: 'Create professional PDF reports with visualizations and insights' }
            ].map((workflow, index) => (
              <div
                key={index}
                className="animate-on-scroll text-center"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-white">
                    {workflow.step}
                  </div>
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transform -translate-y-1/2"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{workflow.title}</h3>
                <p className="text-gray-600">{workflow.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="relative z-30 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-on-scroll">
              See It In Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch our comprehensive demo showcasing the platform's powerful capabilities
            </p>
          </div>

          <div className="animate-on-scroll">
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl aspect-video">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                poster="/src/assets/demo-poster.png"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              >
                <source src="/src/assets/demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video Controls Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={handleVideoPlay}
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                >
                  {isVideoPlaying ? (
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Base Section */}
      <section id="about" className="relative z-30 px-6 py-20 bg-gray-50/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-on-scroll">
              Trusted by Leading Institutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of medical professionals and academic institutions worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '👨‍⚕️', title: 'Medical Professors', count: '2,500+', description: 'Research evaluation and student assessment' },
              { icon: '🏥', title: 'Academic Institutions', count: '150+', description: 'Universities and medical schools' },
              { icon: '📚', title: 'Research Committees', count: '500+', description: 'Publication quality evaluation' },
              { icon: '🎓', title: 'Medical Students', count: '10,000+', description: 'Portfolio tracking and improvement' }
            ].map((user, index) => (
              <div
                key={index}
                className="animate-on-scroll text-center"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 hover:bg-white/90 transition-all duration-500 shadow-lg hover:shadow-xl">
                  <div className="text-5xl mb-4">{user.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{user.title}</h3>
                  <div className="text-3xl font-bold text-indigo-600 mb-3">{user.count}</div>
                  <p className="text-gray-600 text-sm">{user.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-30 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-on-scroll">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Ready to Transform Research Evaluation?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Join the future of academic assessment with our AI-powered platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleGetStarted}
                className="px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xl font-semibold rounded-full hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Your Free Trial
              </button>
              <a
                href="#demo"
                className="px-10 py-5 border-2 border-indigo-300 text-indigo-700 text-xl font-semibold rounded-full hover:bg-indigo-50 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 px-6 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-center items-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">Research Rank</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm">
            © 2025 Research Rank. Empowering academic excellence through intelligent research evaluation.
          </p>
        </div>
      </footer>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: all 1s ease-out;
        }
        
        .animate-on-scroll.animate-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Landing