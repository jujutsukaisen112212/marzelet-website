import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Globe, 
  Smartphone, 
  Database, 
  Zap,
  CheckCircle,
  Clock,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { useScrollAnimation, staggerContainer, staggerItem } from '../hooks/useScrollAnimation';
import { Button } from '../components/ui/Button';

const webSolutions = [
  {
    icon: Globe,
    title: 'Custom Web Applications',
    description: 'Scalable web applications built with modern frameworks like React, Next.js, and Vue.js.'
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Mobile-first design approach ensuring perfect functionality across all devices and screen sizes.'
  },
  {
    icon: Database,
    title: 'E-commerce Solutions',
    description: 'Complete online stores with payment integration, inventory management, and analytics.'
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Lightning-fast websites optimized for speed, SEO, and user experience.'
  },
  {
    icon: Code,
    title: 'API Development',
    description: 'RESTful and GraphQL APIs for seamless integration with third-party services.'
  },
  {
    icon: Globe,
    title: 'Progressive Web Apps',
    description: 'App-like experiences on the web with offline functionality and push notifications.'
  }
];

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 
  'PostgreSQL', 'AWS', 'Vercel', 'Tailwind CSS', 'GraphQL', 'REST APIs'
];

const webProcess = [
  {
    step: 1,
    title: 'Discovery & Planning',
    description: 'Understanding your business goals, target audience, and technical requirements.'
  },
  {
    step: 2,
    title: 'Design & Prototyping',
    description: 'Creating wireframes, mockups, and interactive prototypes for validation.'
  },
  {
    step: 3,
    title: 'Development & Testing',
    description: 'Building your website with clean code and comprehensive testing across devices.'
  },
  {
    step: 4,
    title: 'Launch & Optimization',
    description: 'Deploying your website and ongoing optimization for performance and SEO.'
  }
];

const benefits = [
  {
    icon: Users,
    title: 'User-Centric Design',
    description: 'Websites designed with user experience as the top priority for maximum engagement.'
  },
  {
    icon: TrendingUp,
    title: 'Performance Optimized',
    description: 'Fast-loading websites built for speed and optimal search engine rankings.'
  },
  {
    icon: Award,
    title: 'Modern Technologies',
    description: 'Built with cutting-edge frameworks and tools for scalability and maintainability.'
  },
  {
    icon: Clock,
    title: 'Faster Time to Market',
    description: 'Agile development process to get your website live quickly and efficiently.'
  }
];

const stats = [
  { number: '200+', label: 'Websites Built' },
  { number: '99.9%', label: 'Uptime Guarantee' },
  { number: '3s', label: 'Average Load Time' },
  { number: '50+', label: 'Happy Clients' }
];

export const WebDevelopment: React.FC = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <Layout showBackButton title="Web Development">
      <div className="bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#1e293b]">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500 to-cyan-500 opacity-5 rounded-full blur-2xl" />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl mb-8 shadow-2xl"
              >
                <Code size={48} />
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
                Web Development
              </h1>
              <p className="text-2xl text-gray-300 mb-6 font-medium">
                Custom Web Applications & Websites
              </p>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
                Create powerful web applications and websites that engage users and drive business growth with modern technologies and best practices. Our expert team delivers scalable, secure, and high-performance web solutions.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Web Solutions */}
        <section className="py-24 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={staggerContainer}
            >
              <motion.div variants={staggerItem} className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Our Web Development Solutions</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Comprehensive web development services designed to meet your business needs
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {webSolutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl mb-6">
                      <solution.icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{solution.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{solution.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem} className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Technologies We Use</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Cutting-edge tools and frameworks for modern web development
                </p>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-4">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    variants={staggerItem}
                    className="px-6 py-3 bg-gray-800/50 text-gray-300 rounded-full border border-gray-700 hover:border-blue-500/50 hover:text-white transition-all duration-300 text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Development Process */}
        <section className="py-24 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem} className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Our Development Process</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  A proven methodology that ensures successful project delivery from concept to launch
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {webProcess.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="relative text-center"
                  >
                    {index < webProcess.length - 1 && (
                      <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent transform translate-x-2" />
                    )}
                    
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl mb-4 font-bold text-lg">
                        {step.step}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem} className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Why Choose Our Web Development</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Experience the benefits of modern web development practices
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-12 text-white"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-4xl font-bold mb-4">
                  Ready to Build Your Web Application?
                </h3>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Let's discuss your project and create a powerful web solution that drives your business forward.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-gray-100 border-white"
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Start Your Project
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-white border-white/30 hover:bg-white/10"
                    onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Portfolio
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};