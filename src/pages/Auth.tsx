import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';
import logo from '../assets/logo .jpg';

interface SignInForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface SignUpForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ForgotPasswordForm {
  email: string;
}

export const Auth: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const signInForm = useForm<SignInForm>();
  const signUpForm = useForm<SignUpForm>();
  const forgotPasswordForm = useForm<ForgotPasswordForm>();

  const handleSignIn = async (data: SignInForm) => {
    setLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) {
        toast.error(error);
      } else {
        toast.success('Welcome back!');
        window.location.href = '/';
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (data: SignUpForm) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (data.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(data.email, data.password, data.username);
      
      if (error) {
        toast.error(error);
      } else {
        toast.success('Account created successfully!');
        window.location.href = '/';
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (data: ForgotPasswordForm) => {
    setLoading(true);
    try {
      // Simulate password recovery
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password recovery email sent!');
      setMode('signin');
    } catch (error) {
      toast.error('Failed to send recovery email');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle();
      
      if (error) {
        toast.error(error);
      } else {
        toast.success('Signed in with Google!');
        window.location.href = '/';
      }
    } catch (error) {
      toast.error('Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex">
      {/* Left Side - Company Branding (40%) */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-2/5 relative overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(135deg, #4a90e2 0%, #357abd 50%, #1e5f99 100%)',
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white rounded-full"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            {/* Logo */}
            <div className="w-32 h-32 rounded-full overflow-hidden mb-8 mx-auto shadow-2xl border-4 border-white/20">
              <img src={logo} alt="Marzelet Logo" className="w-full h-full object-cover" />
            </div>

            {/* Company Name */}
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Marzelet Info Tech
            </h1>
            
            <p className="text-xl mb-8 opacity-90 max-w-md leading-relaxed">
              Transform your digital vision into reality with innovative technology solutions
            </p>

            {/* Features */}
            <div className="space-y-4 text-left max-w-sm">
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-3 text-blue-200" />
                <span className="text-sm">Secure & Reliable Platform</span>
              </div>
              <div className="flex items-center">
                <User className="w-5 h-5 mr-3 text-blue-200" />
                <span className="text-sm">Expert Team Support</span>
              </div>
              <div className="flex items-center">
                <ArrowRight className="w-5 h-5 mr-3 text-blue-200" />
                <span className="text-sm">Fast Project Delivery</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Authentication Forms (60%) */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-3/5 flex items-center justify-center p-8 bg-[#2d2d2d]"
      >
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-[#1a1a1a] rounded-2xl p-8 shadow-2xl border border-gray-700"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {mode === 'signin' && 'Welcome Back'}
                  {mode === 'signup' && 'Create Account'}
                  {mode === 'forgot' && 'Reset Password'}
                </h2>
                <p className="text-[#e0e0e0]">
                  {mode === 'signin' && 'Sign in to your account'}
                  {mode === 'signup' && 'Join us today'}
                  {mode === 'forgot' && 'Enter your email to reset password'}
                </p>
              </div>

              {/* Google Sign In - Only for signin/signup */}
              {mode !== 'forgot' && (
                <>
                  <Button
                    variant="outline"
                    className="w-full mb-6 border-gray-600 hover:border-[#4a90e2] bg-transparent text-white hover:bg-[#4a90e2]/10 transition-all duration-300"
                    onClick={handleGoogleSignIn}
                    loading={loading}
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </Button>

                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-[#1a1a1a] text-gray-400">Or continue with email</span>
                    </div>
                  </div>
                </>
              )}

              {/* Sign In Form */}
              {mode === 'signin' && (
                <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        {...signInForm.register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent bg-[#2d2d2d] text-white transition-all duration-300"
                        placeholder="Enter your email"
                      />
                    </div>
                    {signInForm.formState.errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400 flex items-center"
                      >
                        <AlertCircle size={16} className="mr-1" />
                        {signInForm.formState.errors.email.message}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#e0e0e0] mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        {...signInForm.register('password', { required: 'Password is required' })}
                        type={showPassword ? 'text' : 'password'}
                        className="w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent bg-[#2d2d2d] text-white transition-all duration-300"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-300"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {signInForm.formState.errors.password && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400 flex items-center"
                      >
                        <AlertCircle size={16} className="mr-1" />
                        {signInForm.formState.errors.password.message}
                      </motion.p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input 
                        {...signInForm.register('rememberMe')}
                        type="checkbox" 
                        className="rounded border-gray-600 text-[#4a90e2] focus:ring-[#4a90e2] bg-[#2d2d2d]" 
                      />
                      <span className="ml-2 text-sm text-[#e0e0e0]">Remember me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-sm text-[#4a90e2] hover:text-blue-300 transition-colors duration-300"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full bg-[#4a90e2] hover:bg-[#357abd] transition-all duration-300" 
                    loading={loading}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              )}

              {/* Sign Up Form */}
              {mode === 'signup' && (
                <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#e0e0e0] mb-2">Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        {...signUpForm.register('username', { required: 'Username is required' })}
                        type="text"
                        className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent bg-[#2d2d2d] text-white transition-all duration-300"
                        placeholder="Choose a username"
                      />
                    </div>
                    {signUpForm.formState.errors.username && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400 flex items-center"
                      >
                        <AlertCircle size={16} className="mr-1" />
                        {signUpForm.formState.errors.username.message}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#e0e0e0] mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        {...signUpForm.register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent bg-[#2d2d2d] text-white transition-all duration-300"
                        placeholder="Enter your email"
                      />
                    </div>
                    {signUpForm.formState.errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400 flex items-center"
                      >
                        <AlertCircle size={16} className="mr-1" />
                        {signUpForm.formState.errors.email.message}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#e0e0e0] mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        {...signUpForm.register('password', { 
                          required: 'Password is required',
                          minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters'
                          }
                        })}
                        type={showPassword ? 'text' : 'password'}
                        className="w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent bg-[#2d2d2d] text-white transition-all duration-300"
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-300"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {signUpForm.formState.errors.password && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400 flex items-center"
                      >
                        <AlertCircle size={16} className="mr-1" />
                        {signUpForm.formState.errors.password.message}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#e0e0e0] mb-2">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        {...signUpForm.register('confirmPassword', { required: 'Please confirm your password' })}
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent bg-[#2d2d2d] text-white transition-all duration-300"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-300"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {signUpForm.formState.errors.confirmPassword && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400 flex items-center"
                      >
                        <AlertCircle size={16} className="mr-1" />
                        {signUpForm.formState.errors.confirmPassword.message}
                      </motion.p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full bg-[#4a90e2] hover:bg-[#357abd] transition-all duration-300" 
                    loading={loading}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              )}

              {/* Forgot Password Form */}
              {mode === 'forgot' && (
                <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#e0e0e0] mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        {...forgotPasswordForm.register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        type="email"
                        className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4a90e2] focus:border-transparent bg-[#2d2d2d] text-white transition-all duration-300"
                        placeholder="Enter your email"
                      />
                    </div>
                    {forgotPasswordForm.formState.errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-400 flex items-center"
                      >
                        <AlertCircle size={16} className="mr-1" />
                        {forgotPasswordForm.formState.errors.email.message}
                      </motion.p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full bg-[#4a90e2] hover:bg-[#357abd] transition-all duration-300" 
                    loading={loading}
                  >
                    {loading ? 'Sending...' : 'Send Recovery Email'}
                  </Button>
                </form>
              )}

              {/* Toggle Mode */}
              <div className="mt-6 text-center">
                {mode === 'signin' && (
                  <p className="text-[#e0e0e0]">
                    Don't have an account?{' '}
                    <button
                      onClick={() => setMode('signup')}
                      className="text-[#4a90e2] hover:text-blue-300 font-medium transition-colors duration-300"
                    >
                      Sign Up
                    </button>
                  </p>
                )}
                {mode === 'signup' && (
                  <p className="text-[#e0e0e0]">
                    Already have an account?{' '}
                    <button
                      onClick={() => setMode('signin')}
                      className="text-[#4a90e2] hover:text-blue-300 font-medium transition-colors duration-300"
                    >
                      Sign In
                    </button>
                  </p>
                )}
                {mode === 'forgot' && (
                  <p className="text-[#e0e0e0]">
                    Remember your password?{' '}
                    <button
                      onClick={() => setMode('signin')}
                      className="text-[#4a90e2] hover:text-blue-300 font-medium transition-colors duration-300"
                    >
                      Sign In
                    </button>
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};