import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ArrowLeft, MessageSquare, User, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { WriteReview } from '../components/sections/WriteReview';
import { supabase } from '../lib/supabase';

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
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    created_at: '2024-01-25T12:00:00.000Z',
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    company: 'Digital Innovations Inc',
    rating: 5,
    comment: 'Their UI/UX design transformed our user experience completely. Professional, creative, and results-driven approach.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    created_at: '2024-01-24T12:00:00.000Z',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    company: 'StartupHub',
    rating: 4,
    comment: 'Great digital marketing strategy that significantly improved our online presence and lead generation.',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    created_at: '2024-01-23T12:00:00.000Z',
  },
  {
    id: 4,
    name: 'Emily Chen',
    company: 'DataFlow Analytics',
    rating: 5,
    comment: 'Outstanding data analytics solutions that provided valuable insights for our business decisions. Highly recommended!',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    created_at: '2024-01-22T12:00:00.000Z',
  },
  {
    id: 5,
    name: 'David Rodriguez',
    company: 'SecureNet Systems',
    rating: 5,
    comment: 'Their cybersecurity expertise helped us strengthen our security posture significantly. Professional and thorough approach.',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    created_at: '2024-01-21T12:00:00.000Z',
  },
  {
    id: 6,
    name: 'Lisa Thompson',
    company: 'CloudTech Solutions',
    rating: 4,
    comment: 'Excellent IT security implementation. The team was knowledgeable and provided comprehensive protection for our infrastructure.',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    created_at: '2024-01-20T12:00:00.000Z',
  },
  {
    id: 7,
    name: 'Robert Kim',
    company: 'Innovation Labs',
    rating: 5,
    comment: 'Amazing web development work! They created a beautiful, fast, and user-friendly website that exceeded our expectations.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    created_at: '2024-01-19T12:00:00.000Z',
  },
  {
    id: 8,
    name: 'Maria Garcia',
    company: 'Creative Studio',
    rating: 5,
    comment: 'The mobile app they developed for us is fantastic. Great user experience, smooth performance, and excellent support.',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    created_at: '2024-01-18T12:00:00.000Z',
  },
];

export const ReviewsPage: React.FC = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState(initialReviews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
        return;
      }

      if (data && data.length > 0) {
        const combinedReviews = [...data, ...initialReviews.filter(
          initial => !data.some(db => db.id === initial.id)
        )];
        setReviews(combinedReviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmitted = () => {
    // Refresh reviews when a new one is submitted
    fetchReviews();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          fill={i < rating ? '#ffc107' : 'none'}
          color="#ffc107"
          size={16}
        />
      );
    }
    return stars;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-8 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Button>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl mb-6">
              <MessageSquare size={32} />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Client Reviews
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Read what our clients say about working with us and the results we've delivered for their businesses.
            </p>
            
            {/* Write Review Button */}
            <WriteReview onReviewSubmitted={handleReviewSubmitted} />
          </div>
        </motion.div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {reviews.map((review, index) => (
                <motion.article
                  key={review.id}
                  variants={itemVariants}
                  layout
                  className="relative rounded-2xl bg-gray-800/50 p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group backdrop-blur-sm"
                >
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 text-gray-600 group-hover:text-blue-400 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>

                  {/* Header */}
                  <div className="flex items-center mb-4">
                    <div className="relative mr-4">
                      {review.avatar ? (
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="h-12 w-12 rounded-full object-cover border-2 border-gray-600 group-hover:border-blue-500 transition-colors"
                          onError={(e) => {
                            // Fallback to default icon if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="h-12 w-12 rounded-full bg-gray-700 border-2 border-gray-600 group-hover:border-blue-500 transition-colors flex items-center justify-center">
                                  <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                                  </svg>
                                </div>
                              `;
                            }
                          }}
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-gray-700 border-2 border-gray-600 group-hover:border-blue-500 transition-colors flex items-center justify-center">
                          <User className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
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

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-400">
                      {review.rating}/5
                    </span>
                  </div>

                  {/* Comment */}
                  <p className="text-gray-300 italic leading-relaxed mb-4">
                    "{review.comment}"
                  </p>

                  {/* Date */}
                  <div className="text-xs text-gray-500 border-t border-gray-700 pt-4">
                    {new Date(review.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="text-3xl font-bold text-white mb-2">{reviews.length}+</div>
              <div className="text-gray-400 text-sm">Total Reviews</div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="text-3xl font-bold text-white mb-2">4.8</div>
              <div className="text-gray-400 text-sm">Average Rating</div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="text-3xl font-bold text-white mb-2">98%</div>
              <div className="text-gray-400 text-sm">Satisfaction Rate</div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <div className="text-3xl font-bold text-white mb-2">100+</div>
              <div className="text-gray-400 text-sm">Happy Clients</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};