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
  FileText,
  Eye
} from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  created_at: string;
}

export const BlogManagement: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);

  // Blog form state
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: 'Marzelet Team',
    category: 'Technology',
    tags: [] as string[]
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blogs:', error);
        return;
      }

      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setBlogForm(prev => ({
          ...prev,
          image: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('blogs')
        .insert([{
          ...blogForm,
          date: new Date().toISOString().split('T')[0],
          tags: blogForm.tags
        }]);

      if (error) {
        toast.error('Failed to create blog post');
        console.error('Blog creation error:', error);
      } else {
        toast.success('Blog post created successfully!');
        setShowBlogForm(false);
        setBlogForm({
          title: '',
          excerpt: '',
          content: '',
          image: '',
          author: 'Marzelet Team',
          category: 'Technology',
          tags: []
        });
        fetchBlogs();
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Blog creation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('blogs')
        .update({
          ...blogForm,
          tags: blogForm.tags
        })
        .eq('id', editingBlog.id);

      if (error) {
        toast.error('Failed to update blog post');
        console.error('Blog update error:', error);
      } else {
        toast.success('Blog post updated successfully!');
        setEditingBlog(null);
        setBlogForm({
          title: '',
          excerpt: '',
          content: '',
          image: '',
          author: 'Marzelet Team',
          category: 'Technology',
          tags: []
        });
        fetchBlogs();
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Blog update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Failed to delete blog post');
        console.error('Blog deletion error:', error);
      } else {
        toast.success('Blog post deleted successfully!');
        fetchBlogs();
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Blog deletion error:', error);
    }
  };

  const startEditBlog = (blog: BlogPost) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      author: blog.author,
      category: blog.category,
      tags: blog.tags || []
    });
    setShowBlogForm(true);
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag);
    setBlogForm(prev => ({ ...prev, tags }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
        <Button
          variant="primary"
          onClick={() => {
            setShowBlogForm(true);
            setEditingBlog(null);
            setBlogForm({
              title: '',
              excerpt: '',
              content: '',
              image: '',
              author: 'Marzelet Team',
              category: 'Technology',
              tags: []
            });
          }}
        >
          <Plus className="mr-2" size={20} />
          Create Blog Post
        </Button>
      </div>

      {/* Blog Form Modal */}
      {showBlogForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowBlogForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-2xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                {editingBlog ? 'Edit Blog Post' : 'Create Blog Post'}
              </h3>
              <button
                onClick={() => setShowBlogForm(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={editingBlog ? handleUpdateBlog : handleCreateBlog} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Technology">Technology</option>
                    <option value="Design">Design</option>
                    <option value="Development">Development</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Security">Security</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    value={blogForm.author}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={blogForm.tags.join(', ')}
                    onChange={(e) => handleTagsChange(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="Technology, Web Development, React"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Excerpt *
                </label>
                <textarea
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Featured Image
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="blog-image"
                  />
                  <label
                    htmlFor="blog-image"
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors flex items-center"
                  >
                    <Upload className="mr-2" size={16} />
                    Upload Image
                  </label>
                  {blogForm.image && (
                    <img
                      src={blogForm.image}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Content *
                </label>
                <textarea
                  value={blogForm.content}
                  onChange={(e) => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                  rows={12}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Write your blog content here..."
                  required
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowBlogForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  className="flex-1"
                >
                  <Save className="mr-2" size={16} />
                  {editingBlog ? 'Update' : 'Create'} Blog Post
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Blog Posts List */}
      <div className="grid gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-white">{blog.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Calendar className="mr-1" size={14} />
                        {blog.date}
                      </span>
                      <span className="flex items-center">
                        <Tag className="mr-1" size={14} />
                        {blog.category}
                      </span>
                      <span className="flex items-center">
                        <User className="mr-1" size={14} />
                        {blog.author}
                      </span>
                    </div>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {blog.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{blog.excerpt}</p>
              </div>
              <div className="flex space-x-2 ml-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startEditBlog(blog)}
                >
                  <Edit size={16} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteBlog(blog.id)}
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
  );
};