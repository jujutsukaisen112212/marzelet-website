import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  { 
    name: 'Microsoft', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png',
    color: '#00BCF2'
  },
  { 
    name: 'Google', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png',
    color: '#4285F4'
  },
  { 
    name: 'Amazon AWS', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/200px-Amazon_Web_Services_Logo.svg.png',
    color: '#FF9900'
  },
  { 
    name: 'Meta', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/200px-Meta_Platforms_Inc._logo.svg.png',
    color: '#1877F2'
  },
  { 
    name: 'Adobe', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.svg/200px-Adobe_Corporate_Logo.svg.png',
    color: '#FF0000'
  },
  { 
    name: 'Salesforce', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/200px-Salesforce.com_logo.svg.png',
    color: '#00A1E0'
  },
  { 
    name: 'IBM', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/200px-IBM_logo.svg.png',
    color: '#1261FE'
  },
  { 
    name: 'Oracle', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Oracle_logo.svg/200px-Oracle_logo.svg.png',
    color: '#F80000'
  },
];

export const Partners: React.FC = () => {
  return (
    <section className="py-20 bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          Trusted Technology Partners
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto"
        >
          We collaborate with industry-leading technology partners to deliver cutting-edge solutions and ensure the highest quality standards.
        </motion.p>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Animated Logo Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex space-x-12"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <motion.div
                key={`first-${index}`}
                className="flex-shrink-0 w-48 h-24 flex items-center justify-center bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  borderColor: partner.color
                }}
                style={{
                  '--partner-color': partner.color
                } as React.CSSProperties}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto object-contain transition-all duration-300 group-hover:brightness-110"
                  style={{
                    filter: 'none',
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-gray-300 group-hover:text-white font-semibold text-sm transition-colors duration-300" style="color: var(--partner-color)">${partner.name}</span>`;
                    }
                  }}
                />
              </motion.div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <motion.div
                key={`second-${index}`}
                className="flex-shrink-0 w-48 h-24 flex items-center justify-center bg-gray-800/50 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  borderColor: partner.color
                }}
                style={{
                  '--partner-color': partner.color
                } as React.CSSProperties}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto object-contain transition-all duration-300 group-hover:brightness-110"
                  style={{
                    filter: 'none',
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-gray-300 group-hover:text-white font-semibold text-sm transition-colors duration-300" style="color: var(--partner-color)">${partner.name}</span>`;
                    }
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Partnership Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div 
              className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">99.9%</div>
              <div className="text-gray-300 group-hover:text-white transition-colors">Uptime Guarantee</div>
            </motion.div>
            <motion.div 
              className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">24/7</div>
              <div className="text-gray-300 group-hover:text-white transition-colors">Enterprise Support</div>
            </motion.div>
            <motion.div 
              className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group"
              whileHover={{ y: -5 }}
            >
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">Global</div>
              <div className="text-gray-300 group-hover:text-white transition-colors">Infrastructure</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};