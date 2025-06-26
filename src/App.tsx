import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { WebDevelopment } from './pages/WebDevelopment';
import { MobileApp } from './pages/MobileApp';
import { UIUXDesign } from './pages/UIUXDesign';
import { DigitalMarketing } from './pages/DigitalMarketing';
import { Cybersecurity } from './pages/Cybersecurity';
import { CloudSolutions } from './pages/CloudSolutions';
import { ITSecurity } from './pages/ITSecurity';
import { Careers } from './pages/Careers';
import { Auth } from './pages/Auth';
import { BlogPost } from './pages/BlogPost';
import { LegalPage } from './pages/LegalPage';
import { ServiceDetail } from './pages/ServiceDetail';
import { ReviewsPage } from './pages/ReviewsPage';
import { ProfileSettings } from './pages/ProfileSettings';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#1e293b]">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services/web-development" element={<WebDevelopment />} />
              <Route path="/services/mobile-development" element={<MobileApp />} />
              <Route path="/services/ui-ux-design" element={<UIUXDesign />} />
              <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
              <Route path="/services/cybersecurity" element={<Cybersecurity />} />
              <Route path="/services/data-analytics" element={<CloudSolutions />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
              <Route path="/it-security" element={<ITSecurity />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/profile" element={<ProfileSettings />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2937',
                color: '#f9fafb',
                border: '1px solid #374151',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;