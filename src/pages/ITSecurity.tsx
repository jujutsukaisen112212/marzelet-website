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
    icon: Shield,
    title: 'Advanced Threat Protection',
    description: 'Multi-layered security approach to protect against sophisticated cyber threats and malware.'
  },
  {
    icon: Eye,
    title: 'Security Monitoring & SOC',
    description: '24/7 security operations center with real-time threat detection and incident response.'
  },
  {
    icon: Lock,
    title: 'Identity & Access Management',
    description: 'Comprehensive IAM solutions to control and monitor user access across your organization.'
  },
  {
    icon: Server,
    title: 'Network Security',
    description: 'Firewall management, intrusion detection, and network segmentation for robust protection.'
  },
  {
    icon: FileText,
    title: 'Compliance & Risk Assessment',
    description: 'Ensure compliance with industry standards and regulations while managing security risks.'
  },
  {
    icon: Wifi,
    title: 'Cloud Security',
    description: 'Secure your cloud infrastructure with advanced security controls and monitoring.'
  }
];

const threatProtection = [
  'Advanced Persistent Threat (APT) Detection',
  'Ransomware Protection & Recovery',
  'Zero-Day Exploit Prevention',
  'Phishing & Social Engineering Defense',
  'Malware & Virus Protection',
  'Data Loss Prevention (DLP)'
];

const complianceStandards = [
  'ISO 27001/27002',
  'NIST Cybersecurity Framework',
  'GDPR Compliance',
  'HIPAA Security',
  'SOC 2 Type II',
  'PCI DSS'
];

const securityProcess = [
  {
    step: 1,
    title: 'Security Assessment',
    description: 'Comprehensive evaluation of your current security posture and vulnerability identification.'
  },
  {
    step: 2,
    title: 'Risk Analysis',
    description: 'Detailed risk assessment and prioritization of security threats and vulnerabilities.'
  },
  {
    step: 3,
    title: 'Solution Design',
    description: 'Custom security architecture design tailored to your specific business requirements.'
  },
  {
    step: 4,
    title: 'Implementation',
    description: 'Deployment of security solutions with minimal disruption to business operations.'
  },
  {
    step: 5,
    title: 'Monitoring & Support',
    description: 'Continuous monitoring, maintenance, and 24/7 support for optimal security posture.'
  }
];

const benefits = [
  {
    icon: Shield,
    title: 'Complete Protection',
    description: 'Comprehensive security coverage across all your digital assets and infrastructure.'
  },
  {
    icon: Clock,
    title: '24/7 Monitoring',
    description: 'Round-the-clock security monitoring with immediate threat response capabilities.'
  },
  {
    icon: Award,
    title: 'Compliance Ready',
    description: 'Ensure compliance with industry standards and regulatory requirements.'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Certified security professionals with extensive industry experience and expertise.'
  }
];

const stats = [
  { number: '1000+', label: 'Security Assessments' },
  { number: '99.9%', label: 'Threat Detection Rate' },
  { number: '<5min', label: 'Incident Response Time' },
  { number: '100%', label: 'Compliance Success Rate' }
];

export const ITSecurity: React.FC = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <Layout showBackButton title="IT Security">
      <div className="bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#1e293b]">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500 to-orange-500 opacity-10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-red-500 to-orange-500 opacity-5 rounded-full blur-2xl" />
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
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-2xl mb-8 shadow-2xl"
              >
                <Shield size={48} />
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
                IT Security
              </h1>
              <p className="text-2xl text-gray-300 mb-6 font-medium">
                Comprehensive Security Solutions
              </p>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
                Protect your digital assets with enterprise-grade cybersecurity solutions. Our comprehensive IT security services safeguard your business from evolving cyber threats while ensuring compliance with industry standards.
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
                <h2 className="text-4xl font-bold text-white mb-6">Our IT Security Solutions</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Comprehensive security services designed to protect your business from all angles
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {securitySolutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-red-500/50 transition-all duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-xl mb-6">
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

        {/* Threat Protection */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-4xl font-bold text-white mb-6">Advanced Threat Protection</h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Our multi-layered security approach protects against the most sophisticated cyber threats, ensuring your business remains secure and operational.
                  </p>
                </div>

                <div className="space-y-4">
                  {threatProtection.map((threat, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{threat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl p-8 border border-red-500/30">
                  <img
                    src="https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Cybersecurity Protection"
                    className="w-full h-64 object-cover rounded-2xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Compliance & Standards */}
        <section className="py-24 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem} className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Compliance & Standards</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Ensure your organization meets industry standards and regulatory requirements
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {complianceStandards.map((standard, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 text-center hover:border-red-500/50 transition-all duration-300"
                  >
                    <Award className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white">{standard}</h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Security Process */}
        <section className="py-24">
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

              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
                {securityProcess.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="relative text-center"
                  >
                    {index < securityProcess.length - 1 && (
                      <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-red-500 to-transparent transform translate-x-2" />
                    )}
                    
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-red-500/50 transition-all duration-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-xl mb-4 font-bold text-lg">
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
        <section className="py-24 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem} className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Why Choose Our IT Security</h2>
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
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
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
              className="relative overflow-hidden bg-gradient-to-br from-red-500 to-orange-500 rounded-3xl p-12 text-white"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-4xl font-bold mb-4">
                  Secure Your Business Today
                </h3>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Don't wait for a security breach. Protect your business with our comprehensive IT security solutions and expert support.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white text-red-600 hover:bg-gray-100 border-white"
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get Security Assessment
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-white border-white/30 hover:bg-white/10"
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Contact Security Experts
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