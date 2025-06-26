
import React from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Clock, ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';

const positions = [
  {
    title: 'Senior Full Stack Developer',
    department: 'Engineering',
    location: 'Chennai, Tamil Nadu',
    type: 'Full-time',
    description: 'Join our engineering team to build scalable web applications using modern technologies.',
    requirements: ['5+ years React experience', 'Node.js expertise', 'Database design', 'API development']
  },
  {
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Chennai, Tamil Nadu',
    type: 'Full-time',
    description: 'Create beautiful and intuitive user experiences for our clients digital products.',
    requirements: ['3+ years design experience', 'Figma/Sketch proficiency', 'User research skills', 'Prototyping']
  },
  {
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    description: 'Drive growth through strategic digital marketing campaigns and SEO optimization.',
    requirements: ['SEO/SEM expertise', 'Social media marketing', 'Analytics tools', 'Content strategy']
  },
  {
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Chennai, Tamil Nadu',
    type: 'Full-time',
    description: 'Manage our cloud infrastructure and deployment pipelines for optimal performance.',
    requirements: ['AWS/Azure experience', 'Docker & Kubernetes', 'CI/CD pipelines', 'Monitoring tools']
  }
];

const benefits = [
  'Competitive salary and equity',
  'Health insurance coverage',
  'Flexible working hours',
  'Remote work options',
  'Professional development budget',
  'Modern office environment'
];

export const Careers: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-24">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl mb-6">
              <Users size={32} />
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
              Join Our <span className="text-purple-400">Team</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Build the future of digital innovation with a passionate team of creators, developers, and visionaries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-6">Open Positions</h2>
            <p className="text-xl text-gray-300">
              Discover exciting opportunities to grow your career with us.
            </p>
          </motion.div>

          <div className="space-y-6">
            {positions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">{position.title}</h3>
                      <span className="px-3 py-1 bg-purple-600/20 text-purple-400 text-sm rounded-full">
                        {position.department}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6 text-gray-300 mb-4">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2" />
                        {position.location}
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2" />
                        {position.type}
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">{position.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {position.requirements.map((req, reqIndex) => (
                        <span key={reqIndex} className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-lg">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 lg:mt-0 lg:ml-8">
                    <Button variant="primary">
                      Apply Now <ArrowRight size={16} className="ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Why Work With Us?</h2>
              <p className="text-xl text-gray-300 mb-8">
                We believe in creating an environment where our team can thrive, innovate, and build amazing things together.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <Star className="w-5 h-5 text-purple-400 mr-3" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl p-8 border border-purple-500/30">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">50+</div>
                  <div className="text-gray-300 mb-6">Team Members</div>
                  
                  <div className="text-4xl font-bold text-white mb-2">100+</div>
                  <div className="text-gray-300 mb-6">Projects Delivered</div>
                  
                  <div className="text-4xl font-bold text-white mb-2">5+</div>
                  <div className="text-gray-300">Years of Excellence</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
