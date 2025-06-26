import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowLeft, Share2, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';

const blogPosts = [
  {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2025",
    excerpt: "Explore cutting-edge technologies and methodologies that are reshaping how we build modern web applications.",
    content: `
      <div class="prose prose-lg prose-invert max-w-none">
        <h2>Introduction</h2>
        <p>The web development landscape is constantly evolving, and 2025 brings exciting new trends and technologies that are reshaping how we build digital experiences. From artificial intelligence integration to new frameworks, developers have more tools than ever to create innovative solutions.</p>
        
        <h2>Artificial Intelligence Integration</h2>
        <p>AI is no longer just a buzzword in web development. We're seeing practical implementations of machine learning algorithms, chatbots, and automated testing tools that significantly improve both development efficiency and user experience.</p>
        
        <blockquote>
          <p>"The integration of AI in web development is not just about automation—it's about creating smarter, more intuitive user experiences."</p>
        </blockquote>
        
        <h2>Advanced Frameworks and Technologies</h2>
        <p>Modern frameworks like Next.js 14, React 18, and Vue 3 continue to push the boundaries of what's possible in web development. These tools offer:</p>
        <ul>
          <li>Improved performance and faster load times</li>
          <li>Better developer experience with enhanced tooling</li>
          <li>Enhanced user interfaces with smoother interactions</li>
          <li>Better SEO capabilities and server-side rendering</li>
        </ul>
        
        <h2>The Rise of Edge Computing</h2>
        <p>Edge computing is revolutionizing how we think about web performance. By processing data closer to users, we can achieve faster load times and better user experiences across the globe. This technology is particularly beneficial for:</p>
        <ul>
          <li>Real-time applications</li>
          <li>IoT device management</li>
          <li>Content delivery optimization</li>
          <li>Reduced latency for global users</li>
        </ul>
        
        <h2>WebAssembly and Performance</h2>
        <p>WebAssembly (WASM) is enabling near-native performance in web browsers, opening up new possibilities for complex applications that were previously only possible as desktop software.</p>
        
        <h2>Conclusion</h2>
        <p>As we move forward in 2025, staying updated with these trends will be crucial for any web developer looking to create cutting-edge applications that meet modern user expectations. The future of web development is bright, with technologies that promise to make the web faster, more interactive, and more accessible than ever before.</p>
      </div>
    `,
    author: "Marzelet Team",
    date: "2025-01-15",
    category: "Technology",
    image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Web Development", "Technology", "Future"],
    readTime: "8 min read"
  },
  {
    id: 2,
    title: "Mastering UI/UX Design: A Comprehensive Guide",
    excerpt: "Learn essential design principles, user research methods, and prototyping techniques to create intuitive and beautiful user experiences.",
    content: `
      <div class="prose prose-lg prose-invert max-w-none">
        <h2>Understanding User Experience</h2>
        <p>User experience design is about creating meaningful and relevant experiences for users. It involves the design of the entire process of acquiring and integrating the product, including aspects of branding, design, usability, and function.</p>
        
        <h2>The Importance of User Research</h2>
        <p>Before designing any interface, it's crucial to understand your users. Conduct surveys, interviews, and usability tests to gather insights about user needs, behaviors, and pain points.</p>
        
        <blockquote>
          <p>"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs</p>
        </blockquote>
        
        <h2>Design Principles</h2>
        <p>Good design follows established principles:</p>
        <ul>
          <li><strong>Consistency:</strong> Maintain uniform design patterns throughout the interface</li>
          <li><strong>Hierarchy:</strong> Guide users through content with clear visual hierarchy</li>
          <li><strong>Contrast:</strong> Use contrast to highlight important elements</li>
          <li><strong>Alignment:</strong> Create order and organization through proper alignment</li>
        </ul>
        
        <h2>Prototyping and Testing</h2>
        <p>Create prototypes early and test them with real users. This iterative approach helps identify issues before development begins, saving time and resources.</p>
        
        <h2>Tools of the Trade</h2>
        <p>Modern designers have access to powerful tools like Figma, Adobe XD, and Sketch that enable collaborative design and rapid prototyping.</p>
      </div>
    `,
    author: "Marzelet Team",
    date: "2025-01-10",
    category: "Design",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["UI/UX", "Design", "User Experience"],
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "Building Scalable Applications with Modern Architecture",
    excerpt: "Discover microservices patterns, containerization, and cloud-native approaches to create applications that grow with your business.",
    content: `
      <div class="prose prose-lg prose-invert max-w-none">
        <h2>Introduction to Scalable Architecture</h2>
        <p>Building applications that can scale effectively is crucial for modern businesses. This guide explores the key principles and technologies that enable scalable application development.</p>
        
        <h2>Microservices Architecture</h2>
        <p>Microservices break down applications into smaller, independent services that can be developed, deployed, and scaled independently. This approach offers greater flexibility and resilience.</p>
        
        <h2>Containerization with Docker</h2>
        <p>Docker containers provide a consistent environment for applications across different stages of development and deployment, making scaling and management much easier.</p>
        
        <h2>Cloud-Native Development</h2>
        <p>Leveraging cloud platforms like AWS, Azure, and Google Cloud enables automatic scaling, improved reliability, and reduced infrastructure management overhead.</p>
      </div>
    `,
    author: "Marzelet Team",
    date: "2025-01-05",
    category: "Development",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Architecture", "Scalability", "Cloud Computing"],
    readTime: "10 min read"
  }
];

const relatedPosts = [
  {
    id: 4,
    title: "AI-Powered Marketing Strategies",
    image: "https://images.pexels.com/photos/507883/pexels-photo-507883.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Marketing"
  },
  {
    id: 5,
    title: "Cybersecurity Best Practices",
    image: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Security"
  },
  {
    id: 6,
    title: "Progressive Web Apps Guide",
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: "Technology"
  }
];

export const BlogPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find(post => post.id === parseInt(id || '1'));
  
  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <Button onClick={() => navigate('/')} variant="primary">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-24">
      <article className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Navigation */}
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-8 text-gray-300 hover:text-white"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Blog
          </Button>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-8 rounded-2xl overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 text-sm font-medium rounded-full border border-blue-500/30">
                {post.category}
              </span>
              <div className="flex items-center text-gray-400 text-sm">
                <Clock size={16} className="mr-2" />
                {post.readTime}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
            
            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-between text-gray-400 mb-6 pb-6 border-b border-gray-700">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span className="text-sm">{post.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span className="text-sm">{post.author}</span>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
            </div>
            
            {/* Tags */}
            <div className="flex items-center space-x-2 mb-8">
              <Tag size={16} className="text-blue-400" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="prose prose-lg prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="border-t border-gray-700 pt-8 mb-12"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Share this article</h3>
                <p className="text-gray-300">Help others discover this content</p>
              </div>
              <div className="flex space-x-4 mt-4 sm:mt-0">
                <Button variant="outline" size="sm" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                  Twitter
                </Button>
                <Button variant="outline" size="sm" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10">
                  Facebook
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Related Posts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <motion.div
                  key={relatedPost.id}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/blog/${relatedPost.id}`)}
                >
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <span className="text-xs text-blue-400 font-medium">{relatedPost.category}</span>
                    <h4 className="text-white font-semibold mt-2 line-clamp-2">{relatedPost.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </article>
    </div>
  );
};