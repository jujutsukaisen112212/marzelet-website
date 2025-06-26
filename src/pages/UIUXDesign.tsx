import React from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Users, 
  Layers, 
  Target, 
  Zap,
  CheckCircle,
  Clock,
  Award,
  TrendingUp,
  Eye,
  Figma
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { useScrollAnimation, staggerContainer, staggerItem } from '../hooks/useScrollAnimation';
import { Button } from '../components/ui/Button';

const designSolutions = [
  {
    icon: Users,
    title: 'User Research & Analysis',
    description: 'Deep understanding of your users through research, interviews, and behavioral analysis.'
  },
  {
    icon: Layers,
    title: 'Wireframing & Prototyping',
    description: 'Interactive prototypes that bring ideas to life before development begins.'
  },
  {
    icon: Palette,
    title: 'Visual Design Systems',
    description: 'Comprehensive design systems that ensure consistency across all touchpoints.'
  },
  {
    icon: Target,
    title: 'Usability Testing',
    description: 'Data-driven design decisions based on real user feedback and testing.'
  },
  {
    icon: Eye,
    title: 'Interaction Design',
    description: 'Engaging micro-interactions and animations that enhance user experience.'
  },
  {
    icon: Zap,
    title: 'Responsive Design',
    description: 'Designs that work perfectly across all devices and screen sizes.'
  }
];

const technologies = [
  'Figma', 'Adobe XD', 'Sketch', 'Principle', 'Framer', 'InVision', 
  'Miro', 'Hotjar', 'Google Analytics', 'Maze', 'UserTesting', 'Zeplin'
];

const designProcess = [
  {
    step: 1,
    title: 'Research & Discovery',
    description: 'Understanding your users, market, and business objectives through comprehensive research.'
  },
  {
    step: 2,
    title: 'Concept & Wireframes',
    description: 'Creating initial concepts and wireframes for user flow validation and feedback.'
  },
  {
    step: 3,
    title: 'Visual Design',
    description: 'Developing the visual language and high-fidelity designs that align with your brand.'
  },
  {
    step: 4,
    title: 'Testing & Iteration',
    description: 'User testing and refinement based on feedback and analytics data.'
  }
];

const benefits = [
  {
    icon: Users,
    title: 'User-Centered Approach',
    description: 'Every design decision is based on user research and behavior analysis for optimal experiences.'
  },
  {
    icon: TrendingUp,
    title: 'Conversion Optimized',
    description: 'Designs that are proven to increase engagement and conversion rates significantly.'
  },
  {
    icon: Award,
    title: 'Award-Winning Design',
    description: 'Recognized design excellence with multiple industry awards and client satisfaction.'
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description: 'Efficient design process without compromising on quality or attention to detail.'
  }
];

const stats = [
  { number: '300+', label: 'Design Projects' },
  { number: '85%', label: 'Avg. Conversion Increase' },
  { number: '20+', label: 'Design Awards' },
  { number: '48h', label: 'Initial Concept Delivery' }
];

export const UIUXDesign: React.FC = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <Layout showBackButton title="UI/UX Design">
      <div className="bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#1e293b]">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500 to-teal-500 opacity-10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-500 to-teal-500 opacity-5 rounded-full blur-2xl" />
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
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-2xl mb-8 shadow-2xl"
              >
                <Palette size={48} />
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
                UI/UX Design
              </h1>
              <p className="text-2xl text-gray-300 mb-6 font-medium">
                User Experience & Interface Design
              </p>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
                Create beautiful, intuitive designs that convert visitors into customers and provide exceptional user experiences. Our design team combines creativity with data-driven insights to deliver results.
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

        {/* Design Solutions */}
        <section className="py-24 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={staggerContainer}
            >
              <motion.div variants={staggerItem} className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Our Design Solutions</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Comprehensive UI/UX design services that create meaningful user experiences
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {designSolutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-emerald-500/50 transition-all duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-xl mb-6">
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
                <h2 className="text-4xl font-bold text-white mb-6">Design Tools We Use</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Industry-leading tools and platforms for modern UI/UX design
                </p>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-4">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    variants={staggerItem}
                    className="px-6 py-3 bg-gray-800/50 text-gray-300 rounded-full border border-gray-700 hover:border-emerald-500/50 hover:text-white transition-all duration-300 text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Design Process */}
        <section className="py-24 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem} className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Our Design Process</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  A user-centered design process that ensures optimal user experiences
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {designProcess.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="relative text-center"
                  >
                    {index < designProcess.length - 1 && (
                      <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-emerald-500 to-transparent transform translate-x-2" />
                    )}
                    
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-emerald-500/50 transition-all duration-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-xl mb-4 font-bold text-lg">
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
                <h2 className="text-4xl font-bold text-white mb-6">Why Choose Our Design Services</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Experience the benefits of professional UI/UX design
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
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
              className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-12 text-white"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-4xl font-bold mb-4">
                  Ready to Transform Your User Experience?
                </h3>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Let's create designs that your users will love and that drive meaningful business results.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white text-emerald-600 hover:bg-gray-100 border-white"
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