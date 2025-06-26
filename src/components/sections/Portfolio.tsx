import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Eye, X, Play } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  demoLink: string;
  technologies: string[];
  details: {
    overview: string;
    features: string[];
    challenges: string[];
    results: string[];
  };
}

const portfolioProjects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution with advanced features and seamless user experience.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Web Development',
    demoLink: '#',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    details: {
      overview: 'A comprehensive e-commerce platform built for a retail client, featuring advanced product management, secure payment processing, and real-time inventory tracking.',
      features: ['Multi-vendor support', 'Advanced search & filtering', 'Real-time inventory', 'Secure payment gateway', 'Mobile-responsive design'],
      challenges: ['Complex inventory management', 'Multi-vendor coordination', 'Payment security', 'Performance optimization'],
      results: ['300% increase in online sales', '50% reduction in cart abandonment', '99.9% uptime achieved', '4.8/5 customer satisfaction']
    }
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    description: 'Secure and intuitive mobile banking application with biometric authentication.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Mobile Development',
    demoLink: '#',
    technologies: ['React Native', 'Firebase', 'Redux', 'Biometrics'],
    details: {
      overview: 'A secure mobile banking application with advanced security features and intuitive user interface for seamless financial transactions.',
      features: ['Biometric authentication', 'Real-time transactions', 'Budget tracking', 'Investment portfolio', 'Bill payments'],
      challenges: ['Security compliance', 'Real-time data sync', 'Cross-platform compatibility', 'Regulatory requirements'],
      results: ['1M+ downloads', '4.7/5 app store rating', '40% increase in mobile transactions', 'Zero security incidents']
    }
  },
  {
    id: 3,
    title: 'Healthcare Dashboard',
    description: 'Comprehensive healthcare management system with real-time analytics.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'UI/UX Design',
    demoLink: '#',
    technologies: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    details: {
      overview: 'A comprehensive healthcare dashboard designed to streamline patient management and provide real-time insights for healthcare providers.',
      features: ['Patient management', 'Appointment scheduling', 'Medical records', 'Analytics dashboard', 'Telemedicine integration'],
      challenges: ['Complex data visualization', 'HIPAA compliance', 'User workflow optimization', 'Multi-role access control'],
      results: ['60% reduction in admin time', '95% user satisfaction', '30% improvement in patient flow', 'HIPAA compliant design']
    }
  },
  {
    id: 4,
    title: 'SaaS Marketing Campaign',
    description: 'Comprehensive digital marketing strategy that increased conversions by 300%.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Digital Marketing',
    demoLink: '#',
    technologies: ['Google Ads', 'SEO', 'Content Marketing', 'Analytics'],
    details: {
      overview: 'A comprehensive digital marketing campaign for a SaaS startup, focusing on lead generation and conversion optimization.',
      features: ['SEO optimization', 'PPC campaigns', 'Content strategy', 'Social media marketing', 'Email automation'],
      challenges: ['Competitive market', 'Budget optimization', 'Lead quality', 'Attribution tracking'],
      results: ['300% increase in conversions', '150% growth in organic traffic', '45% reduction in CAC', '25% improvement in LTV']
    }
  },
  {
    id: 5,
    title: 'Learning Management System',
    description: 'Interactive LMS platform with video streaming and progress tracking.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Web Development',
    demoLink: '#',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS'],
    details: {
      overview: 'An interactive learning management system designed for educational institutions with advanced features for course management and student tracking.',
      features: ['Course management', 'Video streaming', 'Progress tracking', 'Assessment tools', 'Discussion forums'],
      challenges: ['Video streaming optimization', 'Large user base scaling', 'Content delivery', 'Real-time collaboration'],
      results: ['10,000+ active users', '95% course completion rate', '50% reduction in support tickets', '4.9/5 user rating']
    }
  },
  {
    id: 6,
    title: 'Fitness Tracking App',
    description: 'Cross-platform fitness app with social features and workout plans.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Mobile Development',
    demoLink: '#',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Health Kit'],
    details: {
      overview: 'A comprehensive fitness tracking application with social features, personalized workout plans, and health monitoring capabilities.',
      features: ['Workout tracking', 'Social challenges', 'Nutrition logging', 'Progress analytics', 'Wearable integration'],
      challenges: ['Health data integration', 'Real-time sync', 'Social features', 'Battery optimization'],
      results: ['500K+ downloads', '4.6/5 app rating', '80% user retention', '2M+ workouts logged']
    }
  }
];

const categories = ['All', 'Web Development', 'Mobile Development', 'UI/UX Design', 'Digital Marketing'];

// Demo Request Modal Component
const DemoRequestModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    mobile: '',
    subject: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Store demo request in project_inquiries table
      const { error } = await supabase
        .from('project_inquiries')
        .insert([
          {
            name: formData.name,
            email: '', // We'll use mobile as primary contact for demo requests
            company: formData.company || null,
            phone: formData.mobile,
            service_type: project.category.toLowerCase().replace(' ', '-'),
            project_description: `Demo request for ${project.title}: ${formData.description}`,
            requirements: {
              type: 'demo_request',
              project_title: project.title,
              subject: formData.subject
            },
            status: 'new',
            priority: 'medium'
          }
        ]);

      if (error) {
        console.error('Error storing demo request:', error);
        toast.error('Failed to submit demo request');
        return;
      }

      toast.success('Demo request submitted successfully! We\'ll contact you soon.');
      onClose();
    } catch (error) {
      console.error('Demo request error:', error);
      toast.error('Failed to submit demo request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-white">Demo Request - {project.title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Mobile *</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="demo">Demo Request</option>
                  <option value="consultation">Consultation</option>
                  <option value="pricing">Pricing Inquiry</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                placeholder="Tell us about your requirements..."
                required
              />
            </div>

            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="flex-1"
              >
                Submit Demo Request
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Project Detail Modal Component
const ProjectDetailModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => {
  const [showDemoRequest, setShowDemoRequest] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-64 object-cover rounded-t-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent rounded-t-2xl" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-gray-900/80 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
            <div className="absolute bottom-4 left-6">
              <span className="px-3 py-1 bg-blue-600/90 text-white text-sm rounded-full">
                {project.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>
            
            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Project Overview</h3>
              <p className="text-gray-300 leading-relaxed">{project.details.overview}</p>
            </div>

            {/* Features & Results Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {project.details.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white mb-4">Results Achieved</h3>
                <ul className="space-y-2">
                  {project.details.results.map((result, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Challenges */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Challenges Overcome</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {project.details.challenges.map((challenge, index) => (
                  <div key={index} className="p-4 bg-gray-800 rounded-lg">
                    <p className="text-gray-300">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button
                variant="primary"
                onClick={() => setShowDemoRequest(true)}
                className="flex-1"
              >
                <Play className="mr-2" size={16} />
                Request Live Demo
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {showDemoRequest && (
        <DemoRequestModal 
          project={project} 
          onClose={() => setShowDemoRequest(false)} 
        />
      )}
    </>
  );
};

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'All' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === selectedCategory);

  return (
    <>
      <section id="portfolio" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Our <span className="text-blue-400">Portfolio</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our latest projects and see how we've helped businesses achieve their digital goals.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600/90 text-white text-sm rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Project Detail
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </>
  );
};