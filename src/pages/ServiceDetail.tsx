import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Users, 
  Star,
  BarChart3,
  Shield,
  Zap
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { servicesData } from '../data/servicesData';
import { useScrollAnimation, staggerContainer, staggerItem } from '../hooks/useScrollAnimation';
import { Button } from '../components/ui/Button';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { ref, controls } = useScrollAnimation();
  
  const service = serviceId ? servicesData[serviceId as keyof typeof servicesData] : null;

  if (!service) {
    return (
      <Layout showBackButton title="Service Not Found">
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
            <p className="text-gray-300 mb-8">The service you're looking for doesn't exist.</p>
            <Button onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const IconComponent = service.icon;

  return (
    <Layout showBackButton title={service.title}>
      <div className="bg-gray-900">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${service.color} opacity-10 rounded-full blur-3xl`} />
            <div className={`absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr ${service.color} opacity-5 rounded-full blur-2xl`} />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Service Icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${service.color} text-white rounded-2xl mb-8 shadow-2xl`}
              >
                <IconComponent size={48} />
              </motion.div>

              {/* Title & Subtitle */}
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
                {service.title}
              </h1>
              <p className="text-2xl text-gray-300 mb-6 font-medium">
                {service.subtitle}
              </p>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
                {service.longDescription}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {service.stats.map((stat, index) => (
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

        {/* Features Section */}
        <section className="py-24 bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={staggerContainer}
            >
              <motion.div variants={staggerItem} className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Key Features</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Comprehensive solutions designed to meet your specific business needs
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
                  >
                    <CheckCircle className="w-8 h-8 text-green-400 mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">{feature}</h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem} className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Why Choose Us</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Our expertise and commitment deliver exceptional results for your business
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12">
                {service.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="flex items-start space-x-4"
                  >
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center`}>
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

        {/* Process Section */}
        <section className="py-24 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem} className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Our Process</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  A proven methodology that ensures project success from start to finish
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {service.process.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="relative"
                  >
                    {/* Connection Line */}
                    {index < service.process.length - 1 && (
                      <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-gray-600 to-transparent transform translate-x-2" />
                    )}
                    
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${service.color} text-white rounded-xl mb-4 font-bold text-lg`}>
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

        {/* Technologies Section */}
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
                  Cutting-edge tools and technologies to deliver the best results
                </p>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-4">
                {service.technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    variants={staggerItem}
                    className="px-6 py-3 bg-gray-800 text-gray-300 rounded-full border border-gray-700 hover:border-gray-600 hover:text-white transition-all duration-300 text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={fadeInUp}
              viewport={{ once: true }}
              className={`relative overflow-hidden bg-gradient-to-br ${service.color} rounded-3xl p-12 text-white`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-4xl font-bold mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Let's discuss how our {service.title.toLowerCase()} services can help transform your business and achieve your goals.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 border-white"
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Get Free Consultation
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-white border-white/30 hover:bg-white/10"
                    onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    View Case Studies
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