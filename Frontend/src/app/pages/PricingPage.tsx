import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Brain, Check, Sparkles } from 'lucide-react';

export function PricingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#2563EB] to-[#0EA5E9] rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Intelligent Document Analyst
              </span>
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
      </nav>

      {/* Pricing Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start for free or upgrade to unlock advanced AI analysis capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-8 hover:shadow-xl transition">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free Plan</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
            </div>

            <p className="text-gray-600 mb-8">
              Perfect for trying out document analysis with basic features
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#2563EB]" />
                </div>
                <span className="text-gray-700">Up to 5 document uploads per month</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#2563EB]" />
                </div>
                <span className="text-gray-700">50 AI questions per month</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#2563EB]" />
                </div>
                <span className="text-gray-700">Basic OCR text extraction</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#2563EB]" />
                </div>
                <span className="text-gray-700">Standard RAG question answering</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-[#2563EB]" />
                </div>
                <span className="text-gray-700">Community support</span>
              </li>
            </ul>

            <Button
              onClick={() => navigate('/login')}
              variant="outline"
              className="w-full h-12 border-2 border-gray-300 rounded-xl hover:border-[#2563EB] hover:text-[#2563EB]"
            >
              Get Started Free
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-[#2563EB] to-[#0EA5E9] rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden hover:shadow-3xl transition">
            {/* Popular Badge */}
            <div className="absolute top-4 right-4 bg-white text-[#2563EB] px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              Popular
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">$29</span>
                <span className="text-blue-100">/month</span>
              </div>
            </div>

            <p className="text-blue-100 mb-8">
              Unlimited power for professionals and teams
            </p>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>Unlimited document uploads</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>Unlimited AI questions</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>Advanced OCR with multi-language support</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>Enhanced RAG with GPT-4 analysis</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>Smart insights & auto-summaries</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>Batch processing capabilities</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>API access for integrations</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>Priority support</span>
              </li>
            </ul>

            <Button
              onClick={() => navigate('/login')}
              className="w-full h-12 bg-white text-[#2563EB] hover:bg-gray-100 rounded-xl font-semibold shadow-lg"
            >
              Upgrade to Pro
            </Button>
          </div>
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Questions about pricing?
          </h3>
          <p className="text-gray-600 mb-6">
            Contact our sales team for enterprise plans and custom solutions
          </p>
          <Button variant="outline" className="border-gray-300">
            Contact Sales
          </Button>
        </div>
      </div>
    </div>
  );
}
