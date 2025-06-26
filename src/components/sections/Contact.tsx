import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Clock, Globe } from 'lucide-react';
import { useScrollAnimation, staggerContainer, staggerItem } from '../../hooks/useScrollAnimation';
import { Button } from '../ui/Button';
import { ContactForm } from '../../types';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    details: 'info@marzelet.info',
    link: 'mailto:info@marzelet.info',
    description: 'Send us an email anytime'
  },
  {
    icon: Phone,
    title: 'Phone',
    details: '+91-9629997391',
    link: 'tel:9629997391',
    description: 'Call us during business hours'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: 'Mon - Fri: 9AM - 6PM IST',
    description: 'We\'re here to help'
  }
];

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { ref, controls } = useScrollAnimation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Store in Supabase contact_submissions table
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            name: data.name,
            email: data.email,
            company: data.company || null,
            phone: data.phone || null,
            subject: data.subject,
            message: data.message,
            status: 'new'
          }
        ]);

      if (error) {
        console.error('Error storing contact submission:', error);
        setSubmitStatus('error');
        toast.error('Failed to send message. Please try again.');
        return;
      }

      // Create email content for fallback
      const emailBody = `
        Name: ${data.name}
        Email: ${data.email}
        Company: ${data.company || 'Not provided'}
        Phone: ${data.phone || 'Not provided'}
        Subject: ${data.subject}
        
        Message:
        ${data.message}
      `;

      // Create mailto link as fallback
      const mailtoLink = `mailto:info@marzelet.info?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Show success message
      setSubmitStatus('success');
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      reset();

      // Optional: Open email client as backup
      // window.location.href = mailtoLink;
      
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div variants={staggerItem} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to start your next project? We'd love to hear from you. 
              Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Side - Contact Information */}
            <motion.div variants={staggerItem} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  Contact Information
                </h3>
                <p className="text-gray-300 mb-8">
                  We're here to help you transform your digital vision into reality. 
                  Reach out through any of these channels.
                </p>
              </div>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    whileHover={{ x: 10 }}
                    className="flex items-start p-6 bg-gray-900 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-700"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                      <info.icon size={24} className="text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm text-gray-400 mb-1">
                        {info.title}
                      </div>
                      <div className="text-white font-medium mb-1">
                        {info.details}
                      </div>
                      <div className="text-sm text-gray-400">
                        {info.description}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div variants={staggerItem}>
              <div className="bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Send us a message
                </h3>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        {...register('name', { required: 'Name is required' })}
                        type="text"
                        id="name"
                        className="peer w-full px-4 py-3 pt-6 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white transition-all placeholder-transparent"
                        placeholder="Your full name"
                      />
                      <label
                        htmlFor="name"
                        className="absolute left-4 top-2 text-xs font-medium text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-400"
                      >
                        Name *
                      </label>
                      {errors.name && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-400 flex items-center"
                        >
                          <AlertCircle size={16} className="mr-1" />
                          {errors.name.message}
                        </motion.p>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        id="email"
                        className="peer w-full px-4 py-3 pt-6 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white transition-all placeholder-transparent"
                        placeholder="your.email@example.com"
                      />
                      <label
                        htmlFor="email"
                        className="absolute left-4 top-2 text-xs font-medium text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-400"
                      >
                        Email *
                      </label>
                      {errors.email && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-1 text-sm text-red-400 flex items-center"
                        >
                          <AlertCircle size={16} className="mr-1" />
                          {errors.email.message}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative">
                      <input
                        {...register('company')}
                        type="text"
                        id="company"
                        className="peer w-full px-4 py-3 pt-6 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white transition-all placeholder-transparent"
                        placeholder="Your company name"
                      />
                      <label
                        htmlFor="company"
                        className="absolute left-4 top-2 text-xs font-medium text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-400"
                      >
                        Company
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        {...register('phone')}
                        type="tel"
                        id="phone"
                        className="peer w-full px-4 py-3 pt-6 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white transition-all placeholder-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                      <label
                        htmlFor="phone"
                        className="absolute left-4 top-2 text-xs font-medium text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-400"
                      >
                        Phone
                      </label>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      {...register('subject', { required: 'Subject is required' })}
                      type="text"
                      id="subject"
                      className="peer w-full px-4 py-3 pt-6 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white transition-all placeholder-transparent"
                      placeholder="Project inquiry, consultation, etc."
                    />
                    <label
                      htmlFor="subject"
                      className="absolute left-4 top-2 text-xs font-medium text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-400"
                    >
                      Subject *
                    </label>
                    {errors.subject && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400 flex items-center"
                      >
                        <AlertCircle size={16} className="mr-1" />
                        {errors.subject.message}
                      </motion.p>
                    )}
                  </div>

                  <div className="relative">
                    <textarea
                      {...register('message', { required: 'Message is required' })}
                      id="message"
                      rows={6}
                      className="peer w-full px-4 py-3 pt-6 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-800 text-white transition-all resize-none placeholder-transparent"
                      placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-4 top-2 text-xs font-medium text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-400"
                    >
                      Message *
                    </label>
                    {errors.message && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400 flex items-center"
                      >
                        <AlertCircle size={16} className="mr-1" />
                        {errors.message.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Submit Status */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-900/30 border border-green-500/30 rounded-lg flex items-center"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                      <span className="text-green-300">
                        Message sent successfully! We'll get back to you soon.
                      </span>
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-900/30 border border-red-500/30 rounded-lg flex items-center"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                      <span className="text-red-300">
                        Failed to send message. Please try again.
                      </span>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Send size={20} className="mr-2" />
                    )}
                    {isSubmitting ? 'Sending Message...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};