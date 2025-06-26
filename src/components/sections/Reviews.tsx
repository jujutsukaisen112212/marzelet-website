import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, ArrowRight, MessageSquare, User, Building } from 'lucide-react';
import { Button } from '../ui/Button';
import { WriteReview } from './WriteReview';
import { supabase } from '../../lib/supabase';

interface Review {
  id: number;
  name: string;
  company: string;
  rating: number;
  comment: string;
  avatar: string;
  created_at: string;
}

const initialReviews: Review[] = [
  {
    id: 1,
    name: 'John Doe',
    company: 'TechCorp Solutions',
    rating: 5,
    comment: 'Exceptional service and outstanding results. The team delivered beyond our expectations with their mobile app development expertise.',
    avatar: '',
    created_at: '2024-01-25T12:00:00.000Z',
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    company: 'Digital Innovations Inc',
    rating: 5,
    comment: 'Their UI/UX design transformed our user experience completely. Professional, creative, and results-driven approach.',
    avatar: '',
    created_at: '2024-01-24T12:00:00.000Z',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    company: 'StartupHub',
    rating: 4,
    comment: 'Great digital marketing strategy that significantly improved our online presence and lead generation.',
    avatar: '',
    created_at: '2024-01-23T12:00:00.000Z',
  },
];

export const Reviews: React.FC = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState(initialReviews);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  useEffect(() => {
    fetchReviews();
    
    // Auto-rotate reviews every 15 seconds
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching reviews:', error);
        return;
      }

      if (data && data.length > 0) {
        const combinedReviews = [...data, ...initialReviews.filter(
          initial => !data.some(db => db.id === initial.id)
        )].slice(0, 6);
        setReviews(combinedReviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleReviewSubmitted = () => {
    fetchReviews();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <motion.div
          key={i}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
        >
          <Star
            fill={i < rating ? '#ffc107' : 'none'}
            color="#ffc107"
            size={16}
            className={i < rating ? 'animate-pulse' : ''}
          />
        </motion.div>
      );
    }
    return stars;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <section id="reviews" className="py-20 bg-gray-800/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          What Our Clients Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          Read testimonials from our satisfied clients who have experienced the quality and excellence of our services.
        </motion.p>

        {/* Write Review Button */}
        <WriteReview onReviewSubmitted={handleReviewSubmitted} />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="wait">
            {reviews.map((review, index) => (
              <motion.article
                key={review.id}
                variants={itemVariants}
                layout
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                }}
                className="relative rounded-2xl bg-gray-800/50 p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-500 group backdrop-blur-sm"
                style={{
                  background: index === currentReviewIndex 
                    ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))' 
                    : undefined
                }}
              >
                {/* Animated Quote Icon */}
                <motion.div 
                  className="absolute top-4 right-4 text-gray-600 group-hover:text-blue-400 transition-colors"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </motion.div>

                {/* Header */}
                <div className="flex items-center mb-4">
                  <div className="relative mr-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-gray-600 group-hover:border-blue-500 transition-colors flex items-center justify-center"
                    >
                      <User className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <User size={16} className="mr-2 text-blue-400" />
                      {review.name}
                    </h3>
                    {review.company && (
                      <p className="text-sm text-blue-400 font-medium flex items-center">
                        <Building size={14} className="mr-2" />
                        {review.company}
                      </p>
                    )}
                  </div>
                </div>

                {/* Rating with Animation */}
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">{renderStars(review.rating)}</div>
                  <span className="text-sm text-gray-400">
                    {review.rating}/5
                  </span>
                </div>

                {/* Comment */}
                <motion.p 
                  className="text-gray-300 italic leading-relaxed mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  "{review.comment}"
                </motion.p>

                {/* Date with Divider */}
                <div className="border-t border-gray-700 pt-4">
                  <div className="text-xs text-white font-medium">
                    {new Date(review.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            onClick={() => navigate('/reviews')}
            className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
          >
            View All Reviews <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};