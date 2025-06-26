import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowRight, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
}

const defaultBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2025",
    excerpt: "Explore cutting-edge technologies and methodologies that are reshaping how we build modern web applications.",
    content: `
      <h2>Introduction</h2>
      <p>The web development landscape is constantly evolving, and 2025 brings exciting new trends and technologies that are reshaping how we build digital experiences. From artificial intelligence integration to new frameworks, developers have more tools than ever to create innovative solutions.</p>
      
      <h2>Artificial Intelligence Integration</h2>
      <p>AI is no longer just a buzzword in web development. We're seeing practical implementations of machine learning algorithms, chatbots, and automated testing tools that significantly improve both development efficiency and user experience.</p>
      
      <h2>Advanced Frameworks and Technologies</h2>
      <p>Modern frameworks like Next.js 14, React 18, and Vue 3 continue to push the boundaries of what's possible in web development. These tools offer improved performance, better developer experience, and enhanced user interfaces.</p>
      
      <h2>The Rise of Edge Computing</h2>
      <p>Edge computing is revolutionizing how we think about web performance. By processing data closer to users, we can achieve faster load times and better user experiences across the globe.</p>
      
      <h2>Conclusion</h2>
      <p>As we move forward in 2025, staying updated with these trends will be crucial for any web developer looking to create cutting-edge applications that meet modern user expectations.</p>
    `,
    author: "Marzelet Team",
    date: "2025-01-15",
    category: "Technology",
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Web Development", "Technology", "Future"]
  },
  {
    id: 2,
    title: "Mastering UI/UX Design: A Comprehensive Guide",
    excerpt: "Learn essential design principles, user research methods, and prototyping techniques to create intuitive and beautiful user experiences.",
    content: `
      <h2>Understanding User Experience</h2>
      <p>User experience design is about creating meaningful and relevant experiences for users. It involves the design of the entire process of acquiring and integrating the product, including aspects of branding, design, usability, and function.</p>
      
      <h2>The Importance of User Research</h2>
      <p>Before designing any interface, it's crucial to understand your users. Conduct surveys, interviews, and usability tests to gather insights about user needs, behaviors, and pain points.</p>
      
      <h2>Design Principles</h2>
      <p>Good design follows established principles: consistency, hierarchy, contrast, and alignment. These principles help create interfaces that are both beautiful and functional.</p>
      
      <h2>Prototyping and Testing</h2>
      <p>Create prototypes early and test them with real users. This iterative approach helps identify issues before development begins, saving time and resources.</p>
    `,
    author: "Marzelet Team",
    date: "2025-01-10",
    category: "Design",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["UI/UX", "Design", "User Experience"]
  },
  {
    id: 3,
    title: "Building Scalable Applications with Modern Architecture",
    excerpt: "Discover microservices patterns, containerization, and cloud-native approaches to create applications that grow with your business.",
    content: `
      <h2>Introduction to Scalable Architecture</h2>
      <p>Building applications that can scale effectively is crucial for modern businesses. This guide explores the key principles and technologies that enable scalable application development.</p>
      
      <h2>Microservices Architecture</h2>
      <p>Microservices break down applications into smaller, independent services that can be developed, deployed, and scaled independently. This approach offers greater flexibility and resilience.</p>
      
      <h2>Containerization with Docker</h2>
      <p>Docker containers provide a consistent environment for applications across different stages of development and deployment, making scaling and management much easier.</p>
      
      <h2>Cloud-Native Development</h2>
      <p>Leveraging cloud platforms like AWS, Azure, and Google Cloud enables automatic scaling, improved reliability, and reduced infrastructure management overhead.</p>
    `,
    author: "Marzelet Team",
    date: "2025-01-05",
    category: "Development",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Architecture", "Scalability", "Cloud Computing"]
  },
  {
    id: 4,
    title: "AI-Powered Marketing: Revolutionizing Customer Engagement",
    excerpt: "Discover how machine learning, predictive analytics, and automated personalization are transforming digital marketing strategies.",
    content: `
      <h2>The AI Revolution in Marketing</h2>
      <p>Artificial Intelligence is transforming how businesses engage with customers, offering unprecedented opportunities for personalization and efficiency.</p>
      
      <h2>Predictive Analytics</h2>
      <p>AI-powered analytics can predict customer behavior, helping businesses make data-driven decisions about marketing campaigns and customer engagement strategies.</p>
      
      <h2>Automated Personalization</h2>
      <p>Machine learning algorithms can analyze customer data to deliver personalized content, product recommendations, and marketing messages at scale.</p>
      
      <h2>Future Trends</h2>
      <p>As AI technology continues to evolve, we can expect even more sophisticated marketing automation and customer engagement tools.</p>
    `,
    author: "Marzelet Team",
    date: "2024-12-28",
    category: "Marketing",
    image: "https://images.pexels.com/photos/507883/pexels-photo-507883.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["AI", "Marketing", "Automation"]
  },
  {
    id: 5,
    title: "Cybersecurity Essentials for Modern Businesses",
    excerpt: "Comprehensive security strategies including zero-trust architecture, endpoint protection, and incident response planning.",
    content: `
      <h2>The Current Threat Landscape</h2>
      <p>Modern businesses face an ever-evolving array of cyber threats. Understanding these threats is the first step in building effective defenses.</p>
      
      <h2>Zero-Trust Architecture</h2>
      <p>The zero-trust model assumes that no user or device should be trusted by default, requiring verification for every access request.</p>
      
      <h2>Endpoint Protection</h2>
      <p>With remote work becoming more common, protecting endpoints like laptops, mobile devices, and IoT devices is crucial for maintaining security.</p>
      
      <h2>Incident Response Planning</h2>
      <p>Having a well-defined incident response plan can minimize the impact of security breaches and help organizations recover quickly.</p>
    `,
    author: "Marzelet Team",
    date: "2024-12-20",
    category: "Security",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Cybersecurity", "Security", "Business Protection"]
  },
  {
    id: 6,
    title: "Progressive Web Apps: The Mobile Revolution",
    excerpt: "Deep dive into PWA development, service workers, offline functionality, and push notifications to create app-like web experiences.",
    content: `
      <h2>What are Progressive Web Apps?</h2>
      <p>Progressive Web Apps (PWAs) combine the best of web and mobile apps, offering app-like experiences through web browsers.</p>
      
      <h2>Service Workers</h2>
      <p>Service workers enable offline functionality, background sync, and push notifications, making web apps more reliable and engaging.</p>
      
      <h2>App-like Features</h2>
      <p>PWAs can be installed on devices, work offline, and provide native app-like experiences while being built with web technologies.</p>
      
      <h2>Benefits for Businesses</h2>
      <p>PWAs offer improved performance, reduced development costs, and better user engagement compared to traditional web applications.</p>
    `,
    author: "Marzelet Team",
    date: "2024-12-15",
    category: "Technology",
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["PWA", "Mobile Development", "Web Technology"]
  }
];

export const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState(defaultBlogPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const postsPerPage = 3;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching blog posts:', error);
        return;
      }

      if (data && data.length > 0) {
        const formattedPosts = data.map(post => ({
          ...post,
          tags: post.category ? [post.category] : []
        }));
        setBlogPosts([...formattedPosts, ...defaultBlogPosts]);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    }
  };

  const getCurrentPagePosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return blogPosts.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document.querySelector('#blog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReadMore = (postId: number) => {
    navigate(`/blog/${postId}`);
  };

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `${window.location.origin}/blog/${post.id}`,
      });
    } else {
      // Fallback to copying URL to clipboard
      navigator.clipboard.writeText(`${window.location.origin}/blog/${post.id}`);
      // You could show a toast notification here
    }
  };

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400">Blog</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest trends, tips, and insights from the world of technology and design.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {getCurrentPagePosts().map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group border border-gray-700/50"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 text-xs font-medium rounded-full border border-blue-500/30">
                    {post.category}
                  </span>
                </div>
                <button
                  onClick={() => handleShare(post)}
                  className="absolute top-4 right-4 p-2 bg-gray-900/80 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <Share2 size={16} />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed line-clamp-2">{post.excerpt}</p>
                
                <div className="flex items-center justify-between text-gray-400 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span className="text-sm">{post.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span className="text-sm">{post.author}</span>
                  </div>
                </div>
                
                <div className="flex items-center mb-4 space-x-2">
                  <Tag size={16} className="text-blue-400" />
                  <span className="text-sm text-gray-300">
                    {post.tags.join(', ')}
                  </span>
                </div>
                
                <Button 
                  variant="secondary" 
                  className="w-full justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white hover:text-white"
                  onClick={() => handleReadMore(post.id)}
                >
                  Read More <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Previous
            </button>
            
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};