import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Award, TrendingUp } from 'lucide-react';
import { useScrollAnimation, staggerContainer, staggerItem } from '../../hooks/useScrollAnimation';

const coreValues = [
  {
    icon: Calendar,
    title: 'Security First',
    description: 'We prioritize security in every solution, ensuring your data and systems are protected against evolving threats.'
  },
  {
    icon: TrendingUp,
    title: 'Results Driven',
    description: 'Our focus is on delivering measurable outcomes that drive real business value and operational efficiency.'
  },
  {
    icon: Users,
    title: 'Client Partnership',
    description: 'We build long-term partnerships with our clients, working collaboratively to achieve shared success.'
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'We maintain the highest standards of quality and professionalism in everything we do.'
  }
];

const journeyMilestones = [
  {
    year: '2024',
    title: 'Company Founded',
    description: 'Marzelet Info Technology established in Chennai with a vision to transform IT infrastructure.'
  },
  {
    year: '2024',
    title: 'First Major Client',
    description: 'Successfully delivered 30% cost savings through optimized IT asset management for enterprise client.'
  },
  {
    year: '2024',
    title: 'Service Expansion',
    description: 'Expanded service portfolio to include comprehensive cybersecurity and cloud solutions.'
  },
  {
    year: '2025',
    title: 'Growing Impact',
    description: 'Serving 20+ clients across government, banking, telecom, and enterprise sectors.'
  }
];

export const CompanyJourney: React.FC = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <section className="py-24 bg-gray-800/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
        >
          {/* Core Values Section */}
          <motion.div variants={staggerItem} className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
              The principles that guide our work and define our commitment to excellence
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-6">
                    <value.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Journey Timeline Section */}
          <motion.div variants={staggerItem} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16">
              A timeline of growth, innovation, and success in transforming businesses
            </p>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

              <div className="space-y-16">
                {journeyMilestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    className={`flex items-center ${
                      index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                        <div className="text-2xl font-bold text-blue-400 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-bold text-white mb-3">{milestone.title}</h3>
                        <p className="text-gray-300">{milestone.description}</p>
                      </div>
                    </div>
                    
                    {/* Timeline Node */}
                    <div className="relative z-10 w-6 h-6 bg-blue-500 rounded-full border-4 border-gray-900 shadow-lg"></div>
                    
                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};