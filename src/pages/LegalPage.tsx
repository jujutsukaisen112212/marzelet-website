
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Cookie, Eye } from 'lucide-react';

type LegalSection = 'privacy' | 'terms' | 'cookies' | 'gdpr';

export const LegalPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<LegalSection>('privacy');

  const sections = [
    { id: 'privacy' as LegalSection, title: 'Privacy Policy', icon: Shield },
    { id: 'terms' as LegalSection, title: 'Terms of Service', icon: FileText },
    { id: 'cookies' as LegalSection, title: 'Cookie Policy', icon: Cookie },
    { id: 'gdpr' as LegalSection, title: 'GDPR Compliance', icon: Eye },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'privacy':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Privacy Policy</h2>
            <div className="space-y-4 text-gray-300">
              <p>Last updated: January 2025</p>
              <h3 className="text-xl font-semibold text-white">Information We Collect</h3>
              <p>We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support.</p>
              <h3 className="text-xl font-semibold text-white">How We Use Your Information</h3>
              <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
              <h3 className="text-xl font-semibold text-white">Information Sharing</h3>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
              <h3 className="text-xl font-semibold text-white">Data Security</h3>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </div>
          </div>
        );
      case 'terms':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Terms of Service</h2>
            <div className="space-y-4 text-gray-300">
              <p>Last updated: January 2025</p>
              <h3 className="text-xl font-semibold text-white">Acceptance of Terms</h3>
              <p>By accessing and using our services, you accept and agree to be bound by the terms and provision of this agreement.</p>
              <h3 className="text-xl font-semibold text-white">Use License</h3>
              <p>Permission is granted to temporarily download one copy of our materials for personal, non-commercial transitory viewing only.</p>
              <h3 className="text-xl font-semibold text-white">Disclaimer</h3>
              <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied.</p>
              <h3 className="text-xl font-semibold text-white">Limitations</h3>
              <p>In no event shall Marzelet or its suppliers be liable for any damages arising out of the use or inability to use our services.</p>
            </div>
          </div>
        );
      case 'cookies':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Cookie Policy</h2>
            <div className="space-y-4 text-gray-300">
              <p>Last updated: January 2025</p>
              <h3 className="text-xl font-semibold text-white">What Are Cookies</h3>
              <p>Cookies are small text files that are placed on your computer or mobile device when you visit our website.</p>
              <h3 className="text-xl font-semibold text-white">How We Use Cookies</h3>
              <p>We use cookies to improve your browsing experience, analyze site traffic, and personalize content.</p>
              <h3 className="text-xl font-semibold text-white">Types of Cookies We Use</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Essential cookies: Required for the website to function properly</li>
                <li>Analytics cookies: Help us understand how visitors interact with our website</li>
                <li>Functional cookies: Enable enhanced functionality and personalization</li>
              </ul>
              <h3 className="text-xl font-semibold text-white">Managing Cookies</h3>
              <p>You can control and manage cookies through your browser settings. Please note that disabling cookies may affect the functionality of our website.</p>
            </div>
          </div>
        );
      case 'gdpr':
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">GDPR Compliance</h2>
            <div className="space-y-4 text-gray-300">
              <p>Last updated: January 2025</p>
              <h3 className="text-xl font-semibold text-white">Your Rights Under GDPR</h3>
              <p>If you are a resident of the European Union, you have certain rights regarding your personal data:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to rectification of inaccurate data</li>
                <li>Right to erasure (right to be forgotten)</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
              </ul>
              <h3 className="text-xl font-semibold text-white">Legal Basis for Processing</h3>
              <p>We process your personal data based on legitimate interests, contract performance, legal obligations, and your consent.</p>
              <h3 className="text-xl font-semibold text-white">Contact Us</h3>
              <p>If you have any questions about your rights or our data practices, please contact us at privacy@marzelet.info</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Legal Information
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Important legal documents and policies for our services
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <section.icon className="mr-3" size={20} />
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 rounded-2xl p-8"
              >
                {renderContent()}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
