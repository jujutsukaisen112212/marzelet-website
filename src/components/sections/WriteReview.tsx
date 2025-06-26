import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, MessageSquare, User, Send, Building } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface WriteReviewProps {
  onReviewSubmitted?: () => void;
}

export const WriteReview: React.FC<WriteReviewProps> = ({ onReviewSubmitted }) => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleWriteReview = () => {
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowReviewForm(true);
      if (user.user_metadata?.username) {
        setName(user.user_metadata.username);
      }
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([
          {
            user_id: user.id,
            rating,
            comment,
            name: name || user.user_metadata?.username || 'Anonymous',
            company: company || null,
            avatar: '', // No mandatory image upload
          }
        ]);

      if (error) {
        toast.error('Failed to submit review');
        console.error('Review submission error:', error);
      } else {
        toast.success('Review submitted successfully!', {
          duration: 4000,
          style: {
            background: '#10b981',
            color: '#ffffff',
          },
        });
        
        setShowReviewForm(false);
        setComment('');
        setRating(5);
        setName('');
        setCompany('');
        
        if (onReviewSubmitted) {
          onReviewSubmitted();
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Review submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-block"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={handleWriteReview}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <MessageSquare className="mr-2" size={20} />
            Write a Review
          </Button>
        </motion.div>
      </div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowReviewForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-8 w-full max-w-md border border-gray-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl mb-4">
                  <MessageSquare size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Write a Review</h3>
                <p className="text-gray-300">Share your experience with our services</p>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-6">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Rating
                  </label>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="transition-all duration-200"
                      >
                        <Star
                          size={32}
                          fill={star <= rating ? '#ffc107' : 'none'}
                          color="#ffc107"
                          className="hover:scale-110 transition-transform"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="peer w-full px-4 py-3 pt-6 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-blue-500 transition-all"
                    placeholder="Your name"
                    required
                  />
                  <label className="absolute left-4 top-2 text-xs font-medium text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-400">
                    <User size={14} className="inline mr-1" />
                    Name
                  </label>
                </div>

                {/* Company (Optional) */}
                <div className="relative">
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="peer w-full px-4 py-3 pt-6 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-blue-500 transition-all"
                    placeholder="Your company"
                  />
                  <label className="absolute left-4 top-2 text-xs font-medium text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-400">
                    <Building size={14} className="inline mr-1" />
                    Company (Optional)
                  </label>
                </div>

                {/* Comment */}
                <div className="relative">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="peer w-full px-4 py-3 pt-6 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-blue-500 transition-all resize-none"
                    rows={4}
                    placeholder="Share your experience..."
                    required
                  />
                  <label className="absolute left-4 top-2 text-xs font-medium text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-400">
                    Review
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    loading={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : (
                      <Send className="mr-2" size={16} />
                    )}
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="signin"
      />
    </>
  );
};