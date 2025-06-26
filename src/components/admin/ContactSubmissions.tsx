import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  MessageSquare,
  Eye,
  CheckCircle,
  Clock,
  X,
  User
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  admin_notes?: string;
  created_at: string;
}

export const ContactSubmissions: React.FC = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contact submissions:', error);
        return;
      }

      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status })
        .eq('id', id);

      if (error) {
        toast.error('Failed to update status');
        return;
      }

      toast.success('Status updated successfully');
      fetchSubmissions();
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const filteredSubmissions = statusFilter === 'all' 
    ? submissions 
    : submissions.filter(sub => sub.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-400';
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-400';
      case 'resolved': return 'bg-green-500/20 text-green-400';
      case 'closed': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Contact Submissions</h2>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredSubmissions.map((submission) => (
          <div key={submission.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 text-blue-400 mr-2" />
                  <h3 className="text-lg font-semibold text-white">{submission.name}</h3>
                  <span className={`ml-4 px-3 py-1 rounded-full text-sm ${getStatusColor(submission.status)}`}>
                    {submission.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-300">
                    <Mail className="w-4 h-4 mr-2 text-blue-400" />
                    {submission.email}
                  </div>
                  {submission.phone && (
                    <div className="flex items-center text-gray-300">
                      <Phone className="w-4 h-4 mr-2 text-green-400" />
                      {submission.phone}
                    </div>
                  )}
                  {submission.company && (
                    <div className="flex items-center text-gray-300">
                      <Building className="w-4 h-4 mr-2 text-purple-400" />
                      {submission.company}
                    </div>
                  )}
                  <div className="flex items-center text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 text-orange-400" />
                    {new Date(submission.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2">Subject:</h4>
                  <p className="text-gray-300">{submission.subject}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-white font-medium mb-2">Message:</h4>
                  <p className="text-gray-300 line-clamp-3">{submission.message}</p>
                </div>
              </div>

              <div className="flex space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <Eye size={16} />
                </Button>
                
                {submission.status === 'new' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => updateStatus(submission.id, 'in_progress')}
                  >
                    <Clock size={16} />
                  </Button>
                )}
                
                {submission.status === 'in_progress' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => updateStatus(submission.id, 'resolved')}
                  >
                    <CheckCircle size={16} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedSubmission && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSubmission(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Contact Submission Details</h3>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Contact Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Name</label>
                    <p className="text-white">{selectedSubmission.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <p className="text-white">{selectedSubmission.email}</p>
                  </div>
                  {selectedSubmission.company && (
                    <div>
                      <label className="text-sm text-gray-400">Company</label>
                      <p className="text-white">{selectedSubmission.company}</p>
                    </div>
                  )}
                  {selectedSubmission.phone && (
                    <div>
                      <label className="text-sm text-gray-400">Phone</label>
                      <p className="text-white">{selectedSubmission.phone}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400">Subject</label>
                <p className="text-white">{selectedSubmission.subject}</p>
              </div>

              <div>
                <label className="text-sm text-gray-400">Message</label>
                <p className="text-white whitespace-pre-wrap">{selectedSubmission.message}</p>
              </div>

              <div>
                <label className="text-sm text-gray-400">Status</label>
                <select
                  value={selectedSubmission.status}
                  onChange={(e) => {
                    updateStatus(selectedSubmission.id, e.target.value);
                    setSelectedSubmission({ ...selectedSubmission, status: e.target.value as any });
                  }}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-400">Submitted</label>
                <p className="text-white">
                  {new Date(selectedSubmission.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};