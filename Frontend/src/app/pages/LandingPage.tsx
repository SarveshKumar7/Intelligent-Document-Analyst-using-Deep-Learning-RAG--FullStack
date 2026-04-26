import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { 
  FileText, 
  MessageSquare, 
  Sparkles, 
  Upload, 
  Brain, 
  Search 
} from 'lucide-react';
import { useAuth } from "../../App";

export function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleUploadClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#0EA5E9] rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Intelligent Document Analyst
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <button className="text-gray-600 hover:text-gray-900 transition">
                Home
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition">
                Features
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition">
                Tools
              </button>
              <button className="text-gray-600 hover:text-gray-900 transition">
                Languages
              </button>
              <Button 
                onClick={() => navigate('/login')} 
                variant="outline"
                className="border-gray-300"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Powered by Advanced AI & RAG Technology</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Analyze Documents Intelligently with AI + RAG
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your documents into actionable insights. Upload any document and ask questions powered by OCR and Retrieval-Augmented Generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleUploadClick}
                size="lg"
                className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Document
              </Button>
              <Button 
                onClick={() => navigate('/pricing')}
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 px-8 py-6 text-lg rounded-xl hover:border-[#2563EB] hover:text-[#2563EB] transition"
              >
                View Pricing
              </Button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-16 relative max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#2563EB] to-[#0EA5E9] rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-xl">
                    <FileText className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-gray-600">Your intelligent document analysis starts here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful AI-Driven Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Leverage cutting-edge technology to unlock insights from your documents
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <FileText className="w-7 h-7 text-[#2563EB]" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                AI Document Analysis
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Advanced OCR technology extracts text from any document format. Our AI understands context, structure, and meaning to provide accurate analysis.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                <MessageSquare className="w-7 h-7 text-[#0EA5E9]" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                RAG Question Answering
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Ask questions in natural language. Our Retrieval-Augmented Generation technology finds relevant information and provides accurate, contextual answers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Smart Insights
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Automatically generate summaries, extract key information, and discover patterns across multiple documents with intelligent analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#2563EB] to-[#0EA5E9] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Documents?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust Intelligent Document Analyst for their document analysis needs.
          </p>
          <Button 
            onClick={handleUploadClick}
            size="lg"
            className="bg-white text-[#2563EB] hover:bg-gray-100 px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>© 2026 Intelligent Document Analyst. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
