import { 
  Code, 
  Palette, 
  Smartphone, 
  Globe, 
  Database, 
  Shield,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';

export const servicesData = {
  'web-development': {
    icon: Code,
    title: 'Web Development',
    subtitle: 'Custom Web Applications & Websites',
    description: 'Create powerful web applications and websites that engage users and drive business growth with modern technologies and best practices.',
    longDescription: 'Our web development expertise spans modern frameworks like React, Next.js, and Vue.js to create fast, scalable, and user-friendly web applications. We focus on performance, security, and user experience to deliver solutions that drive business success.',
    color: 'from-blue-500 to-cyan-500',
    features: [
      'React & Next.js Development',
      'Responsive Web Design',
      'E-commerce Solutions',
      'Content Management Systems',
      'API Development & Integration',
      'Progressive Web Apps (PWA)',
      'Performance Optimization',
      'SEO Implementation'
    ],
    benefits: [
      {
        icon: Users,
        title: 'User-Centric Design',
        description: 'Websites designed with user experience as the top priority for maximum engagement.'
      },
      {
        icon: TrendingUp,
        title: 'Performance Optimized',
        description: 'Fast-loading websites built for speed and optimal search engine rankings.'
      },
      {
        icon: Shield,
        title: 'Secure & Scalable',
        description: 'Built with security best practices and designed to scale with your business.'
      },
      {
        icon: Clock,
        title: 'Faster Time to Market',
        description: 'Agile development process to get your website live quickly and efficiently.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Discovery & Planning',
        description: 'Understanding your business goals and creating a comprehensive project roadmap.'
      },
      {
        step: 2,
        title: 'Design & Prototyping',
        description: 'Creating wireframes and interactive prototypes for user validation.'
      },
      {
        step: 3,
        title: 'Development & Testing',
        description: 'Building your website with clean code and thorough testing across devices.'
      },
      {
        step: 4,
        title: 'Launch & Optimization',
        description: 'Deploying your website and ongoing optimization for performance and SEO.'
      }
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 'PostgreSQL', 'AWS', 'Vercel', 'Tailwind CSS'],
    stats: [
      { number: '200+', label: 'Websites Built' },
      { number: '99.9%', label: 'Uptime Guarantee' },
      { number: '3s', label: 'Average Load Time' },
      { number: '50+', label: 'Happy Clients' }
    ]
  },
  'mobile-development': {
    icon: Smartphone,
    title: 'Mobile Development',
    subtitle: 'iOS & Android Applications',
    description: 'Create powerful mobile applications that engage users and drive business growth with native and cross-platform solutions.',
    longDescription: 'Our mobile development expertise spans native iOS and Android development as well as cross-platform solutions using React Native and Flutter. We create apps that deliver exceptional user experiences while maintaining optimal performance.',
    color: 'from-purple-500 to-pink-500',
    features: [
      'Native iOS Development',
      'Native Android Development',
      'React Native Apps',
      'Flutter Development',
      'App Store Optimization',
      'Push Notifications',
      'Offline Functionality',
      'In-App Purchases'
    ],
    benefits: [
      {
        icon: Users,
        title: 'User-Centric Design',
        description: 'Intuitive interfaces designed with user experience as the top priority.'
      },
      {
        icon: TrendingUp,
        title: 'Performance Optimized',
        description: 'Apps built for speed and efficiency across all device types and OS versions.'
      },
      {
        icon: Shield,
        title: 'Secure & Compliant',
        description: 'Following platform security guidelines and data protection regulations.'
      },
      {
        icon: Clock,
        title: 'Faster Time to Market',
        description: 'Agile development process to get your app to market quickly.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Strategy & Research',
        description: 'Market research and competitor analysis to define your app strategy.'
      },
      {
        step: 2,
        title: 'UX/UI Design',
        description: 'Creating engaging designs that follow platform-specific guidelines.'
      },
      {
        step: 3,
        title: 'Development & QA',
        description: 'Building and testing your app across multiple devices and OS versions.'
      },
      {
        step: 4,
        title: 'Launch & Growth',
        description: 'App store submission and post-launch optimization strategies.'
      }
    ],
    technologies: ['Swift', 'Kotlin', 'React Native', 'Flutter', 'Firebase', 'AWS', 'Redux', 'GraphQL', 'SQLite'],
    stats: [
      { number: '150+', label: 'Mobile Apps Built' },
      { number: '4.8★', label: 'Average App Rating' },
      { number: '1M+', label: 'Combined Downloads' },
      { number: '30+', label: 'App Store Features' }
    ]
  },
  'ui-ux-design': {
    icon: Palette,
    title: 'UI/UX Design',
    subtitle: 'User Experience & Interface Design',
    description: 'Create beautiful, intuitive designs that convert visitors into customers and provide exceptional user experiences.',
    longDescription: 'Our design team combines creativity with data-driven insights to create user experiences that not only look stunning but also drive conversions and user engagement. We focus on user-centered design principles to ensure every interaction is meaningful.',
    color: 'from-emerald-500 to-teal-500',
    features: [
      'User Research & Analysis',
      'Wireframing & Prototyping',
      'Visual Design Systems',
      'Interaction Design',
      'Usability Testing',
      'Responsive Design',
      'Brand Identity Design',
      'Design System Creation'
    ],
    benefits: [
      {
        icon: Users,
        title: 'User-Centered Approach',
        description: 'Every design decision is based on user research and behavior analysis.'
      },
      {
        icon: TrendingUp,
        title: 'Conversion Optimized',
        description: 'Designs that are proven to increase engagement and conversion rates.'
      },
      {
        icon: Award,
        title: 'Award-Winning Design',
        description: 'Recognized design excellence with multiple industry awards.'
      },
      {
        icon: Zap,
        title: 'Fast Turnaround',
        description: 'Efficient design process without compromising on quality.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Research & Discovery',
        description: 'Understanding your users, market, and business objectives.'
      },
      {
        step: 2,
        title: 'Concept & Wireframes',
        description: 'Creating initial concepts and wireframes for user flow validation.'
      },
      {
        step: 3,
        title: 'Visual Design',
        description: 'Developing the visual language and high-fidelity designs.'
      },
      {
        step: 4,
        title: 'Testing & Iteration',
        description: 'User testing and refinement based on feedback and analytics.'
      }
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'Framer', 'InVision', 'Miro', 'Hotjar', 'Google Analytics'],
    stats: [
      { number: '300+', label: 'Design Projects' },
      { number: '85%', label: 'Avg. Conversion Increase' },
      { number: '20+', label: 'Design Awards' },
      { number: '48h', label: 'Initial Concept Delivery' }
    ]
  },
  'data-analytics': {
    icon: Database,
    title: 'Data Analytics',
    subtitle: 'Business Intelligence & Data Solutions',
    description: 'Transform your data into actionable insights with advanced analytics solutions that drive informed business decisions.',
    longDescription: 'Our data analytics team helps businesses unlock the power of their data through comprehensive analytics solutions, business intelligence dashboards, and predictive modeling. We turn complex data into clear, actionable insights that drive strategic decision-making.',
    color: 'from-indigo-500 to-purple-500',
    features: [
      'Business Intelligence Dashboards',
      'Data Visualization',
      'Predictive Analytics',
      'Real-time Reporting',
      'Data Mining & ETL',
      'Machine Learning Models',
      'Statistical Analysis',
      'Custom Analytics Solutions'
    ],
    benefits: [
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
        icon: Shield,
        title: 'Data Security',
        description: 'Enterprise-grade security and compliance for all your data assets.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Data Assessment',
        description: 'Comprehensive audit of your current data infrastructure and quality.'
      },
      {
        step: 2,
        title: 'Solution Design',
        description: 'Designing analytics architecture tailored to your business needs.'
      },
      {
        step: 3,
        title: 'Implementation',
        description: 'Building dashboards, reports, and analytics solutions.'
      },
      {
        step: 4,
        title: 'Training & Support',
        description: 'Team training and ongoing support for maximum value realization.'
      }
    ],
    technologies: ['Python', 'R', 'SQL', 'Tableau', 'Power BI', 'Apache Spark', 'TensorFlow', 'AWS', 'Google Cloud'],
    stats: [
      { number: '100+', label: 'Analytics Projects' },
      { number: '10TB+', label: 'Data Processed Daily' },
      { number: '90%', label: 'Prediction Accuracy' },
      { number: '40%', label: 'Avg. Efficiency Gain' }
    ]
  },
  'cybersecurity': {
    icon: Shield,
    title: 'Cybersecurity',
    subtitle: 'Comprehensive Security Solutions',
    description: 'Protect your digital assets with enterprise-grade cybersecurity solutions and 24/7 monitoring services.',
    longDescription: 'Our cybersecurity experts provide comprehensive security solutions to protect your business from evolving cyber threats. From security audits to 24/7 monitoring, we ensure your digital assets remain secure and compliant with industry standards.',
    color: 'from-gray-600 to-gray-800',
    features: [
      'Security Audits & Assessments',
      'Penetration Testing',
      'Compliance Management',
      '24/7 Security Monitoring',
      'Incident Response',
      'Security Training',
      'Network Security',
      'Cloud Security Solutions'
    ],
    benefits: [
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
    ],
    process: [
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
    ],
    technologies: ['SIEM', 'Splunk', 'CrowdStrike', 'Wireshark', 'Nessus', 'Metasploit', 'AWS Security', 'Azure Security', 'Kubernetes'],
    stats: [
      { number: '1000+', label: 'Security Assessments' },
      { number: '99.9%', label: 'Threat Detection Rate' },
      { number: '<5min', label: 'Incident Response Time' },
      { number: '100%', label: 'Compliance Success Rate' }
    ]
  },
  'it-security': {
    icon: Shield,
    title: 'IT Security',
    subtitle: 'Enterprise IT Security Solutions',
    description: 'Comprehensive IT security services to protect your infrastructure, data, and applications from cyber threats.',
    longDescription: 'Our IT security specialists provide end-to-end security solutions for your IT infrastructure. From network security to endpoint protection, we ensure your technology assets are protected against sophisticated cyber threats while maintaining operational efficiency.',
    color: 'from-red-500 to-orange-500',
    features: [
      'Network Security & Firewalls',
      'Endpoint Protection',
      'Identity & Access Management',
      'Security Information & Event Management',
      'Vulnerability Management',
      'Incident Response & Forensics',
      'Security Awareness Training',
      'Compliance & Risk Management'
    ],
    benefits: [
      {
        icon: Shield,
        title: 'Multi-Layer Protection',
        description: 'Comprehensive security layers protecting every aspect of your IT infrastructure.'
      },
      {
        icon: Clock,
        title: 'Proactive Monitoring',
        description: 'Continuous monitoring and threat detection with immediate response capabilities.'
      },
      {
        icon: Award,
        title: 'Industry Compliance',
        description: 'Meet regulatory requirements and industry standards with our compliance expertise.'
      },
      {
        icon: Users,
        title: 'Security Expertise',
        description: 'Certified security professionals with deep IT infrastructure knowledge.'
      }
    ],
    process: [
      {
        step: 1,
        title: 'Infrastructure Assessment',
        description: 'Comprehensive evaluation of your IT infrastructure and security posture.'
      },
      {
        step: 2,
        title: 'Risk Analysis',
        description: 'Detailed risk assessment and vulnerability identification across all systems.'
      },
      {
        step: 3,
        title: 'Security Implementation',
        description: 'Deployment of security controls and monitoring systems.'
      },
      {
        step: 4,
        title: 'Continuous Protection',
        description: 'Ongoing monitoring, maintenance, and security updates.'
      }
    ],
    technologies: ['Cisco Security', 'Palo Alto Networks', 'Microsoft Security', 'CrowdStrike', 'Splunk', 'Rapid7', 'Qualys', 'Tenable', 'FortiGate'],
    stats: [
      { number: '500+', label: 'IT Environments Secured' },
      { number: '99.8%', label: 'Threat Prevention Rate' },
      { number: '<3min', label: 'Average Response Time' },
      { number: '100%', label: 'Compliance Achievement' }
    ]
  }
};