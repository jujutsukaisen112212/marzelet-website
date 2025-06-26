import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload,
  Calendar,
  Tag,
  User,
  MessageSquare,
  Star,
  Building,
  Eye,
  FileText,
  Mail,
  Briefcase,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ContactSubmissions } from '../components/admin/ContactSubmissions';
import { ProjectInquiries } from '../components/admin/ProjectInquiries';
import { BlogManagement } from '../components/admin/BlogManagement';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface Review {
  id: string;
  name: string;
  company: string;
  rating: number;
  comment: string;
  avatar: string;
  created_at: string;
  user_id: string;
}

interface DashboardStats {
  totalBlogs: number;
  totalReviews: number;
  totalContacts: number;
  totalInquiries: number;
  newContacts: number;
  newInquiries: number;
}

export const AdminDashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    totalReviews: 0,
    totalContacts: 0,
    totalInquiries: 0,
    newContacts: 0,
    newInquiries: 0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/');
      return;
    }
    fetchDashboardData();
  }, [user, isAdmin, navigate]);

  const fetchDashboardData = async () => {
    await Promise.all([
      fetchReviews(),
      fetchStats()
    ]);
  };

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        return;
      }

      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchStats = async () => {
    try {
      // Fetch blogs count
      const { count: blogsCount } = await supabase
        .from('blogs')
        .select('*', { count: 'exact', head: true });

      // Fetch reviews count
      const { count: reviewsCount } = await supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true });

      // Fetch contact submissions count
      const { count: contactsCount } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true });

      // Fetch project inquiries count
      const { count: inquiriesCount } = await supabase
        .from('project_inquiries')
        .select('*', { count: 'exact', head: true });

      // Fetch new contacts (last 7 days)
      const { count: newContactsCount } = await supabase
        .from('contact_submissions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      // Fetch new inquiries (last 7 days)
      const { count: newInquiriesCount } = await supabase
        .from('project_inquiries')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

      setStats({
        totalBlogs: blogsCount || 0,
        totalReviews: reviewsCount || 0,
        totalContacts: contactsCount || 0,
        totalInquiries: inquiriesCount || 0,
        newContacts: newContactsCount || 0,
        newInquiries: newInquiriesCount || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;

    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Failed to delete review');
        console.error('Review deletion error:', error);
      } else {
        toast.success('Review deleted successfully!');
        fetchReviews();
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Review deletion error:', error);
    }
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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'blogs', label: 'Blog Posts', icon: FileText },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'contacts', label: 'Contact Submissions', icon: Mail },
    { id: 'requests', label: 'Project Requests', icon: Briefcase },
  ];

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Manage your website content and monitor activity</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <tab.icon className="mr-2" size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Blog Posts</p>
                    <p className="text-3xl font-bold text-white">{stats.totalBlogs}</p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-400" />
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Reviews</p>
                    <p className="text-3xl font-bold text-white">{stats.totalReviews}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-green-400" />
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Contact Submissions</p>
                    <p className="text-3xl font-bold text-white">{stats.totalContacts}</p>
                    {stats.newContacts > 0 && (
                      <p className="text-sm text-blue-400">{stats.newContacts} new this week</p>
                    )}
                  </div>
                  <Mail className="w-8 h-8 text-purple-400" />
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Project Requests</p>
                    <p className="text-3xl font-bold text-white">{stats.totalInquiries}</p>
                    {stats.newInquiries > 0 && (
                      <p className="text-sm text-orange-400">{stats.newInquiries} new this week</p>
                    )}
                  </div>
                  <Briefcase className="w-8 h-8 text-orange-400" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Recent Reviews</h3>
                <div className="space-y-3">
                  {reviews.slice(0, 5).map((review) => (
                    <div key={review.id} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{review.name}</p>
                        <div className="flex items-center">
                          <div className="flex mr-2">{renderStars(review.rating)}</div>
                          <span className="text-gray-400 text-sm">{review.rating}/5</span>
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Management */}
        {activeTab === 'blogs' && <BlogManagement />}

        {/* Review Management */}
        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Reviews</h2>
            <div className="grid gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mr-4">
                          <User className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
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
                          <div className="flex items-center mt-1">
                            <div className="flex mr-2">{renderStars(review.rating)}</div>
                            <span className="text-sm text-gray-400">
                              {review.rating}/5
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300 italic mb-4">"{review.comment}"</p>
                      <div className="text-xs text-gray-500">
                        {new Date(review.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    <div className="ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteReview(review.id)}
                        className="text-red-400 border-red-400 hover:bg-red-400 hover:text-white"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Submissions */}
        {activeTab === 'contacts' && <ContactSubmissions />}

        {/* Project Requests */}
        {activeTab === 'requests' && <ProjectInquiries />}
      </div>
    </div>
  );
};