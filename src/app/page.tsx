'use client'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { PenTool, Zap, Share2, BarChart2 } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">IA Post </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a
                href="#features"
                className="hover:text-purple-300 transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="hover:text-purple-300 transition-colors"
              >
                Sign Up
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.h2
            className="text-5xl md:text-7xl font-extrabold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            The Future of Content Creation
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Create, manage, and analyze your posts with cutting-edge AI
            technology
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-gray-900"
            >
              Get Started
            </Button>
          </motion.div>
        </section>

        <section id="features" className="container mx-auto px-4 py-20">
          <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900">
            Futuristic Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: PenTool,
                title: 'AI-Powered Writing',
                description:
                  'Let our advanced AI assist you in creating engaging content',
              },
              {
                icon: Zap,
                title: 'Instant Publishing',
                description:
                  'Publish your posts across multiple platforms with a single click',
              },
              {
                icon: Share2,
                title: 'Smart Scheduling',
                description:
                  'Optimize your post timing with our ML-driven scheduler',
              },
              {
                icon: BarChart2,
                title: 'Deep Analytics',
                description:
                  'Gain insights with our comprehensive analytics dashboard',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <feature.icon className="w-12 h-12 mb-4 text-purple-400" />
                <h4 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-white border-opacity-20 text-center">
        <nav className="mb-4">
          <ul className="flex justify-center space-x-6">
            <li>
              <a
                href="#"
                className="hover:text-purple-300 transition-colors text-gray-900"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-purple-300 transition-colors text-gray-900"
              >
                Privacy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-purple-300 transition-colors text-gray-900"
              >
                Terms
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-purple-300 transition-colors text-gray-900"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <p className="text-sm text-gray-500">
          &copy; 2024 FuturePost. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
