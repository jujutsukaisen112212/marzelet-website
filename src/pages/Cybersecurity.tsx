import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Users,
  Award,
  Zap,
  FileText,
  Server,
  Wifi
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { useScrollAnimation, staggerContainer, staggerItem } from '../hooks/useScrollAnimation';
import { Button } from '../components/ui/Button';

const securitySolutions = [
  {
    icon: AlertTriangle,
    title: 'Security Audits & Assessments',
    description: 'Comprehensive evaluation of your security posture and vulnerability identification.'
  },
  {
    icon: Eye,
    title: 'Penetration Testing',
    description: 'Ethical hacking to test your defenses against real-world cyber threats.'
  },
  {
    icon: CheckCircle,
    title: 'Compliance Management',
    description: 'Ensure compliance with industry standards like GDPR, HIPAA, and SOC 2.'
  },
  {
    icon: Lock,
    title: '24/7 Security Monitoring',
    description: 'Round-the-clock monitoring and immediate response to security incidents.'
  },
  {
    icon: Server,
    title: 'Network Security',
    description: 'Advanced firewall management and network protection solutions.'
  },
  {
    icon: Wifi,
    title: 'Cloud Security Solutions',
    description: 'Secure your cloud infrastructure with advanced security controls.'
  }
];

const technologies = [
  'SIEM', 'Splunk', 'CrowdStrike', 'Wireshark', 'Nessus', 'Metasploit', 
  'AWS Security', 'Azure Security', 'Kubernetes', 'Palo Alto', 'Fortinet', 'Check Point'
];

const securityProcess = [
  {
    step: 1,
    title: 'Security Assessment',
    description: 'Comprehensive evaluation of your current security posture and vulnerabilities.'
  },
  {
    step: 2,
    title: 'Strategy Development',
    description: 'Creating a customized security strategy based on your risk profile.'
  },
  {
    step: 3,
    title: 'Implementation',
    description: 'Deploying security solutions and establishing monitoring systems.'
  },
  {
    step: 4,
    title: 'Ongoing Protection',
    description: 'Continuous monitoring, updates, and incident response services.'
  }
];

const benefits = [
  {
    icon: Shield,
    title: 'Complete Protection',
    description: 'Comprehensive security coverage across all your digital assets and systems.'
  },
  {
    icon: Clock,
    title: '24/7 Monitoring',
    description: 'Round-the-clock security monitoring and immediate threat response.'
  },
  {
    icon: Award,
    title: 'Compliance Ready',
    description: 'Ensure compliance with industry standards like GDPR, HIPAA, and SOC 2.'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Certified security professionals with extensive industry experience.'
  }
];

const stats = [
  { number: '1000+', label: 'Security Assessments' },
  { number: '99.9%', label: 'Threat Detection Rate' },
  { number: '<5min', label: 'Incident Response Time' },
  { number: '100%', label: 'Compliance Success Rate' }
];

export const Cybersecurity: React.FC = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <Layout showBackButton title="Cybersecurity">
      <div className="bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#1e293b]">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-gray-600 to-gray-800 opacity-10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-gray-600 to-gray-800 opacity-5 rounded-full blur-2xl" />
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
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-800 text-white rounded-2xl mb-8 shadow-2xl"
              >
                <Shield size={48} />
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
                Cybersecurity
              </h1>
              <p className="text-2xl text-gray-300 mb-6 font-medium">
                Comprehensive Security Solutions
              </p>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
                Protect your digital assets with enterprise-grade cybersecurity solutions and 24/7 monitoring services. Our comprehensive approach ensures your business remains secure against evolving cyber threats.
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

        {/* Security Solutions */}
        <section className="py-24 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={staggerContainer}
            >
              <motion.div variants={staggerItem} className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Our Cybersecurity Solutions</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Comprehensive security services designed to protect your business from all angles
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {securitySolutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-gray-500/50 transition-all duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 text-white rounded-xl mb-6">
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
                <h2 className="text-4xl font-bold text-white mb-6">Security Technologies We Use</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Industry-leading security tools and platforms for comprehensive protection
                </p>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-4">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    variants={staggerItem}
                    className="px-6 py-3 bg-gray-800/50 text-gray-300 rounded-full border border-gray-700 hover:border-gray-500/50 hover:text-white transition-all duration-300 text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Security Process */}
        <section className="py-24 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem} className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Our Security Process</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  A systematic approach to implementing and maintaining robust security measures
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {securityProcess.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="relative text-center"
                  >
                    {index < securityProcess.length - 1 && (
                      <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-gray-600 to-transparent transform translate-x-2" />
                    )}
                    
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-gray-500/50 transition-all duration-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 text-white rounded-xl mb-4 font-bold text-lg">
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
                <h2 className="text-4xl font-bold text-white mb-6">Why Choose Our Cybersecurity</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Experience the benefits of enterprise-grade security solutions
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3  className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
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
              className="relative overflow-hidden bg-gradient-to-br from-gray-600 to-gray-800 rounded-3xl p-12 text-white"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-4xl font-bold mb-4">
                  Ready to Strengthen Your Security?
                </h3>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Let's protect your business from evolving cyber threats with comprehensive security solutions.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white text-gray-800 hover:bg-gray-100 border-white"
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get Security Assessment
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-white border-white/30 hover:bg-white/10"
                    onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Learn More
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