import { Link, useNavigate } from 'react-router-dom';
import { PenTool, Shield, Sparkles, Zap } from 'lucide-react';
import { useAuth } from 'react-oidc-context';

const Landing = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (auth.isAuthenticated) {
      navigate('/');
    }
    else {
      navigate('/signup');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-400/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-indigo-400/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-purple-300/20 rounded-full animate-pulse"></div>
      </div>
      
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-2 animate-fade-in">
          <PenTool className="w-8 h-8 text-white" />
          <span className="text-2xl font-bold text-white">Skimble</span>
        </div>
        <div className="space-x-4">
          <Link 
            to="/signup" 
            className="px-6 py-2 text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            Login
          </Link>
          <Link 
            to="/signup" 
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-6">
        <div className="text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in">
            Transform Your
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block">
              Ideas
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 animate-fade-in">
            The modern note-taking app that turns your thoughts into organized brilliance
          </p>
          <button 
            onClick={handleClick}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-lg font-semibold rounded-full hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-110 animate-fade-in"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Get Started Free
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Why Choose NoteAlchemy?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Secure & Private</h3>
              <p className="text-white/80">Your notes are encrypted and protected with enterprise-grade security.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-white/80">Create, edit, and organize your notes with blazing-fast performance.</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Beautiful Design</h3>
              <p className="text-white/80">Enjoy a stunning, intuitive interface that makes note-taking a pleasure.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;