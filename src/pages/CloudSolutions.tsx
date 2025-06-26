import React from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  BarChart3, 
  TrendingUp, 
  Zap,
  CheckCircle,
  Clock,
  Users,
  Award,
  Brain,
  PieChart
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { useScrollAnimation, staggerContainer, staggerItem } from '../hooks/useScrollAnimation';
import { Button } from '../components/ui/Button';

const analyticsSolutions = [
  {
    icon: BarChart3,
    title: 'Business Intelligence Dashboards',
    description: 'Interactive dashboards that provide real-time insights into your business performance.'
  },
  {
    icon: PieChart,
    title: 'Data Visualization',
    description: 'Transform complex data into clear, actionable visual insights and reports.'
  },
  {
    icon: Brain,
    title: 'Predictive Analytics',
    description: 'Advanced machine learning models to predict trends and future outcomes.'
  },
  {
    icon: TrendingUp,
    title: 'Real-time Reporting',
    description: 'Automated reporting systems that deliver insights when you need them most.'
  },
  {
    icon: Database,
    title: 'Data Mining & ETL',
    description: 'Extract, transform, and load data from multiple sources for comprehensive analysis.'
  },
  {
    icon: Zap,
    title: 'Custom Analytics Solutions',
    description: 'Tailored analytics platforms designed specifically for your business needs.'
  }
];

const technologies = [
  'Python', 'R', 'SQL', 'Tableau', 'Power BI', 'Apache Spark', 
  'TensorFlow', 'AWS', 'Google Cloud', 'Snowflake', 'Databricks', 'Looker'
];

const analyticsProcess = [
  {
    step: 1,
    title: 'Data Assessment',
    description: 'Comprehensive audit of your current data infrastructure and quality assessment.'
  },
  {
    step: 2,
    title: 'Solution Design',
    description: 'Designing analytics architecture tailored to your specific business needs.'
  },
  {
    step: 3,
    title: 'Implementation',
    description: 'Building dashboards, reports, and analytics solutions with best practices.'
  },
  {
    step: 4,
    title: 'Training & Support',
    description: 'Team training and ongoing support for maximum value realization and adoption.'
  }
];

const benefits = [
  {
    icon: TrendingUp,
    title: 'Data-Driven Decisions',
    description: 'Make informed decisions based on comprehensive data analysis and insights.'
  },
  {
    icon: Zap,
    title: 'Real-time Insights',
    description: 'Access to real-time dashboards and automated reporting systems.'
  },
  {
    icon: Award,
    title: 'Predictive Capabilities',
    description: 'Advanced machine learning models to predict trends and outcomes.'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Data scientists and analysts with extensive industry experience.'
  }
];

const stats = [
  { number: '100+', label: 'Analytics Projects' },
  { number: '10TB+', label: 'Data Processed Daily' },
  { number: '90%', label: 'Prediction Accuracy' },
  { number: '40%', label: 'Avg. Efficiency Gain' }
];

export const CloudSolutions: React.FC = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <Layout showBackButton title="Data Analytics">
      <div className="bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#1e293b]">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-5 rounded-full blur-2xl" />
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
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-2xl mb-8 shadow-2xl"
              >
                <Database size={48} />
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
                Data Analytics
              </h1>
              <p className="text-2xl text-gray-300 mb-6 font-medium">
                Business Intelligence & Data Solutions
              </p>
              <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed">
                Transform your data into actionable insights with advanced analytics solutions that drive informed business decisions. Our comprehensive approach helps you unlock the full potential of your data.
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

        {/* Analytics Solutions */}
        <section className="py-24 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={controls}
              variants={staggerContainer}
            >
              <motion.div variants={staggerItem} className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Our Data Analytics Solutions</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Comprehensive analytics services designed to unlock insights from your data
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {analyticsSolutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 hover:border-indigo-500/50 transition-all duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl mb-6">
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
                <h2 className="text-4xl font-bold text-white mb-6">Analytics Tools We Use</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Industry-leading platforms and technologies for data analytics
                </p>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-4">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={index}
                    variants={staggerItem}
                    className="px-6 py-3 bg-gray-800/50 text-gray-300 rounded-full border border-gray-700 hover:border-indigo-500/50 hover:text-white transition-all duration-300 text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Analytics Process */}
        <section className="py-24 bg-gray-800/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
            >
              <motion.div variants={staggerItem} className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-6">Our Analytics Process</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  A systematic approach to transforming your data into actionable insights
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {analyticsProcess.map((step, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="relative text-center"
                  >
                    {index < analyticsProcess.length - 1 && (
                      <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-indigo-500 to-transparent transform translate-x-2" />
                    )}
                    
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-indigo-500/50 transition-all duration-300">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-xl mb-4 font-bold text-lg">
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
                <h2 className="text-4xl font-bold text-white mb-6">Why Choose Our Data Analytics</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Experience the benefits of professional data analytics services
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className="flex items-start space-x-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
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
              className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl p-12 text-white"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-4xl font-bold mb-4">
                  Ready to Unlock Your Data's Potential?
                </h3>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Let's transform your data into actionable insights that drive informed business decisions and growth.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white text-indigo-600 hover:bg-gray-100 border-white"
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Start Analytics Project
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