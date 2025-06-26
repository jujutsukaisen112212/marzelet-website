import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Search, 
  Share2, 
  PenTool, 
  TrendingUp,
  CheckCircle,
  Clock,
  Users,
  Award,
  Zap,
  Target,
  Globe
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { useScrollAnimation, staggerContainer, staggerItem } from '../hooks/useScrollAnimation';
import { Button } from '../components/ui/Button';

const marketingSolutions = [
  {
    icon: Search,
    title: 'Search Engine Optimization',
    description: 'Improve your search rankings and organic visibility with proven SEO strategies.'
  },
  {
    icon: Target,
    title: 'Pay-Per-Click Advertising',
    description: 'Targeted PPC campaigns that maximize ROI and drive qualified traffic to your site.'
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    description: 'Engage your audience across all social platforms with compelling content and campaigns.'
  },
  {
    icon: PenTool,
    title: 'Content Marketing Strategy',
    description: 'Create compelling content that drives conversions and builds brand authority.'
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reporting',
    description: 'Data-driven insights to optimize your campaigns and measure success effectively.'
  },
  {
    icon: Globe,
    title: 'Email Marketing Campaigns',
    description: 'Personalized email campaigns that nurture leads and drive customer retention.'
  }
];

const technologies = [
  'Google Ads', 'Facebook Ads', 'Google Analytics', 'SEMrush', 'HubSpot', 'Mailchimp', 
  'Hootsuite', 'Hotjar', 'Ahrefs', 'Buffer', 'Canva', 'Zapier'
];

const marketingProcess = [
  {
    step: 1,
    title: 'Market Analysis',
    description: 'Comprehensive analysis of your market, competitors, and opportunities for growth.'
  },
  {
    step: 2,
    title: 'Strategy Development',
    description: 'Creating a customized marketing strategy aligned with your business goals and budget.'
  },
  {
    step: 3,
    title: 'Campaign Execution',
    description: 'Implementing multi-channel campaigns with continuous optimization and monitoring.'
  },
  {
    step: 4,
    title: 'Analysis & Scaling',
    description: 'Performance analysis and scaling successful campaigns for maximum ROI and growth.'
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: 'Measurable Results',
    description: 'Data-driven strategies that deliver quantifiable business growth and ROI.'
  },
  {
    icon: Users,
    title: 'Targeted Reach',
    description: 'Precise audience targeting to maximize your marketing budget efficiency.'
  },
  {
    icon: Clock,
    title: '24/7 Monitoring',
    description: 'Continuous campaign monitoring and optimization for best performance.'
  },
  {
    icon: Award,
    title: 'Proven Strategies',
    description: 'Battle-tested marketing strategies that have driven success for 500+ clients.'
  }
];

const stats = [
  { number: '500+', label: 'Marketing Campaigns' },
  { number: '300%', label: 'Avg. ROI Increase' },
  { number: '50M+', label: 'Ad Impressions Managed' },
  { number: '95%', label: 'Client Satisfaction' }
];

export const DigitalMarketing: React.FC = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <Layout showBackButton title="Digital Marketing">
      <div className="bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#1e293b]">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-500 to-red-500 opacity-10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-500 to-red-500 opacity-5 rounded-full blur-2xl" />
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
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl mb-8 shadow-2xl"
              >
                <BarChart3 size={48} />
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
                Digital Marketing
              </h1>
              <p className="text-2xl text-gray-300 mb-6 font-medium">
                Comprehensive Digital Marketing Solutions
              </p>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
                Boost your online presence and drive growth with data-driven digital marketing strategies tailored to your business. Our comprehensive approach delivers measurable results and sustainable growth.
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

        {/* Marketing Solutions */}
        <section className="py-24 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={staggerContainer}
            >
              <motion.div variants={staggerItem} className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Our Digital Marketing Solutions</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Comprehensive marketing services designed to grow your online presence
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {marketingSolutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl mb-6">
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
                <h2 className="text-4xl font-bold text-white mb-6">Marketing Tools We Use</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Industry-leading platforms and tools for effective digital marketing
                </p>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-4">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    variants={staggerItem}
                    className="px-6 py-3 bg-gray-800/50 text-gray-300 rounded-full border border-gray-700 hover:border-orange-500/50 hover:text-white transition-all duration-300 text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Marketing Process */}
        <section className="py-24 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem} className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Our Marketing Process</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  A data-driven approach that delivers measurable results and sustainable growth
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {marketingProcess.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="relative text-center"
                  >
                    {index < marketingProcess.length - 1 && (
                      <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-orange-500 to-transparent transform translate-x-2" />
                    )}
                    
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl mb-4 font-bold text-lg">
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
                <h2 className="text-4xl font-bold text-white mb-6">Why Choose Our Digital Marketing</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Experience the benefits of professional digital marketing services
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
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
              className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-12 text-white"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-4xl font-bold mb-4">
                  Ready to Boost Your Online Presence?
                </h3>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Let's create a marketing strategy that delivers results and drives sustainable business growth.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white text-orange-600 hover:bg-gray-100 border-white"
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Start Your Campaign
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