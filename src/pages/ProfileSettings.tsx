import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Camera, 
  Save, 
  Bell, 
  Shield, 
  Eye, 
  EyeOff,
  ArrowLeft,
  Upload,
  Link as LinkIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface ProfileForm {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  phone: string;
  company: string;
  portfolioLink: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  marketingEmails: boolean;
  securityAlerts: boolean;
  projectUpdates: boolean;
}

interface SecuritySettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const ProfileSettings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showPasswords, setShowPasswords] = useState(false);
  const [loading, setLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    marketingEmails: false,
    securityAlerts: true,
    projectUpdates: true,
  });

  const profileForm = useForm<ProfileForm>({
    defaultValues: {
      username: user?.user_metadata?.username || '',
      email: user?.email || '',
      firstName: '',
      lastName: '',
      bio: '',
      phone: '',
      company: '',
      portfolioLink: '',
    }
  });

  const securityForm = useForm<SecuritySettings>();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = async (data: ProfileForm) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSecuritySubmit = async (data: SecuritySettings) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password updated successfully!');
      securityForm.reset();
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationChange = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success('Notification preferences updated');
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast.success(twoFactorEnabled ? 'Two-factor authentication disabled' : 'Two-factor authentication enabled');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Button>

          <h1 className="text-4xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-gray-300">Manage your account settings and preferences</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <tab.icon className="mr-3" size={20} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Profile Information</h2>
                  
                  {/* Circular Profile Image */}
                  <div className="flex items-center mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center border-4 border-gray-600">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User size={32} className="text-gray-400" />
                        )}
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg"
                      >
                        <Camera size={16} className="text-white" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold text-white">Profile Picture</h3>
                      <p className="text-gray-400 text-sm">Upload a circular profile picture (max 5MB)</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload size={16} className="mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  </div>

                  {/* Profile Form */}
                  <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Username
                        </label>
                        <input
                          {...profileForm.register('username')}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="Enter username"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email
                        </label>
                        <input
                          {...profileForm.register('email')}
                          type="email"
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="Enter email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          First Name
                        </label>
                        <input
                          {...profileForm.register('firstName')}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name
                        </label>
                        <input
                          {...profileForm.register('lastName')}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        {...profileForm.register('bio')}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                        placeholder="Tell us about yourself"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone
                        </label>
                        <input
                          {...profileForm.register('phone')}
                          type="tel"
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Company
                        </label>
                        <input
                          {...profileForm.register('company')}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="Enter company name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <LinkIcon size={16} className="inline mr-2" />
                        Portfolio Link
                      </label>
                      <input
                        {...profileForm.register('portfolioLink')}
                        type="url"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="https://your-portfolio.com"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      loading={loading}
                      className="w-full"
                    >
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </Button>
                  </form>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div>
                          <h3 className="text-white font-medium">
                            {key === 'emailNotifications' && 'Email Notifications'}
                            {key === 'marketingEmails' && 'Marketing Emails'}
                            {key === 'securityAlerts' && 'Security Alerts'}
                            {key === 'projectUpdates' && 'Project Updates'}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {key === 'emailNotifications' && 'Receive email notifications for important updates'}
                            {key === 'marketingEmails' && 'Receive promotional emails and newsletters'}
                            {key === 'securityAlerts' && 'Get notified about security-related activities'}
                            {key === 'projectUpdates' && 'Receive updates about your projects'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleNotificationChange(key as keyof NotificationSettings)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            value ? 'bg-blue-600' : 'bg-gray-600'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              value ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Security Settings</h2>
                  
                  <form onSubmit={securityForm.handleSubmit(handleSecuritySubmit)} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          {...securityForm.register('currentPassword', { required: 'Current password is required' })}
                          type={showPasswords ? 'text' : 'password'}
                          className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPasswords(!showPasswords)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                          {showPasswords ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        New Password
                      </label>
                      <input
                        {...securityForm.register('newPassword', { required: 'New password is required' })}
                        type={showPasswords ? 'text' : 'password'}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        {...securityForm.register('confirmPassword', { required: 'Please confirm your password' })}
                        type={showPasswords ? 'text' : 'password'}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      loading={loading}
                      className="w-full"
                    >
                      <Shield size={16} className="mr-2" />
                      Update Password
                    </Button>
                  </form>

                  {/* Two-Factor Authentication */}
                  <div className="mt-8 p-6 bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Two-Factor Authentication</h3>
                        <p className="text-gray-300 text-sm">
                          Add an extra layer of security to your account by enabling two-factor authentication.
                        </p>
                      </div>
                      <button
                        onClick={handleTwoFactorToggle}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          twoFactorEnabled ? 'bg-green-600' : 'bg-gray-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            twoFactorEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    {!twoFactorEnabled && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4"
                        onClick={handleTwoFactorToggle}
                      >
                        Enable 2FA
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};