import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Mail, 
  Phone, 
  Building, 
  Calendar, 
  DollarSign,
  Clock,
  Eye,
  CheckCircle,
  AlertTriangle,
  X,
  User
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Button } from '../ui/Button';
import toast from 'react-hot-toast';

interface ProjectRequest {
  id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service_type: string;
  budget_range?: string;
  timeline?: string;
  project_description: string;
  requirements: any;
  status: string;
  priority: string;
  assigned_to?: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export const ProjectInquiries: React.FC = () => {
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<ProjectRequest | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('project_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching project requests:', error);
        return;
      }

      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching project requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('project_inquiries')
        .update({ status })
        .eq('id', id);

      if (error) {
        toast.error('Failed to update status');
        return;
      }

      toast.success('Status updated successfully');
      fetchRequests();
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const updatePriority = async (id: string, priority: string) => {
    try {
      const { error } = await supabase
        .from('project_inquiries')
        .update({ priority })
        .eq('id', id);

      if (error) {
        toast.error('Failed to update priority');
        return;
      }

      toast.success('Priority updated successfully');
      fetchRequests();
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const filteredRequests = statusFilter === 'all' 
    ? requests 
    : requests.filter(request => request.status === statusFilter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-400';
      case 'reviewing': return 'bg-yellow-500/20 text-yellow-400';
      case 'quoted': return 'bg-purple-500/20 text-purple-400';
      case 'approved': return 'bg-green-500/20 text-green-400';
      case 'in_progress': return 'bg-orange-500/20 text-orange-400';
      case 'completed': return 'bg-green-600/20 text-green-300';
      case 'cancelled': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-400';
      case 'high': return 'bg-orange-500/20 text-orange-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatServiceType = (serviceType: string) => {
    return serviceType.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
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
        <h2 className="text-2xl font-bold text-white">Project Requests</h2>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="reviewing">Reviewing</option>
          <option value="quoted">Quoted</option>
          <option value="approved">Approved</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="grid gap-6">
        {filteredRequests.map((request) => (
          <div key={request.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <User className="w-5 h-5 text-blue-400 mr-2" />
                  <h3 className="text-lg font-semibold text-white">{request.name}</h3>
                  <span className={`ml-4 px-3 py-1 rounded-full text-sm ${getStatusColor(request.status)}`}>
                    {request.status.replace('_', ' ')}
                  </span>
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm ${getPriorityColor(request.priority)}`}>
                    {request.priority}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-gray-300">
                    <Mail className="w-4 h-4 mr-2 text-blue-400" />
                    {request.email}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Briefcase className="w-4 h-4 mr-2 text-purple-400" />
                    {formatServiceType(request.service_type)}
                  </div>
                  {request.budget_range && (
                    <div className="flex items-center text-gray-300">
                      <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                      {request.budget_range.replace('-', ' - ').toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-gray-300 line-clamp-2">{request.project_description}</p>
                </div>

                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  Created: {new Date(request.created_at).toLocaleDateString()}
                  {request.timeline && (
                    <>
                      <Clock className="w-4 h-4 ml-4 mr-1" />
                      Timeline: {request.timeline.replace('-', ' ')}
                    </>
                  )}
                </div>
              </div>

              <div className="flex space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedRequest(request)}
                >
                  <Eye size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedRequest(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Project Request Details</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-400">Name</label>
                      <p className="text-white">{selectedRequest.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Email</label>
                      <p className="text-white">{selectedRequest.email}</p>
                    </div>
                    {selectedRequest.company && (
                      <div>
                        <label className="text-sm text-gray-400">Company</label>
                        <p className="text-white">{selectedRequest.company}</p>
                      </div>
                    )}
                    {selectedRequest.phone && (
                      <div>
                        <label className="text-sm text-gray-400">Phone</label>
                        <p className="text-white">{selectedRequest.phone}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Project Details</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-400">Service Type</label>
                      <p className="text-white">{formatServiceType(selectedRequest.service_type)}</p>
                    </div>
                    {selectedRequest.budget_range && (
                      <div>
                        <label className="text-sm text-gray-400">Budget Range</label>
                        <p className="text-white">{selectedRequest.budget_range.replace('-', ' - ').toUpperCase()}</p>
                      </div>
                    )}
                    {selectedRequest.timeline && (
                      <div>
                        <label className="text-sm text-gray-400">Timeline</label>
                        <p className="text-white">{selectedRequest.timeline.replace('-', ' ')}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Project Description</h4>
                  <p className="text-white whitespace-pre-wrap">{selectedRequest.project_description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Management</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400">Status</label>
                      <select
                        value={selectedRequest.status}
                        onChange={(e) => {
                          updateStatus(selectedRequest.id, e.target.value);
                          setSelectedRequest({ ...selectedRequest, status: e.target.value });
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      >
                        <option value="new">New</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="quoted">Quoted</option>
                        <option value="approved">Approved</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400">Priority</label>
                      <select
                        value={selectedRequest.priority}
                        onChange={(e) => {
                          updatePriority(selectedRequest.id, e.target.value);
                          setSelectedRequest({ ...selectedRequest, priority: e.target.value });
                        }}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Created</label>
                  <p className="text-white">
                    {new Date(selectedRequest.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};