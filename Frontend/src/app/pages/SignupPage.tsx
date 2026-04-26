import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Mail, Lock } from 'lucide-react';
import { supabase } from '../../supabaseClient';

export function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      if (!supabase) {
        alert('Supabase not configured.');
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        alert(`Sign up error: ${error.message}`);
        console.error(error);
        setLoading(false);
        return;
      }
      alert('Sign-up successful. Check your email for confirmation if required. You can now sign in.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Unexpected error during sign-up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold mb-4">Create account</h2>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-11" required />
              </div>
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-11" required />
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1 h-11 bg-[#2563EB] text-white rounded-xl" disabled={loading}>
                {loading ? 'Creating…' : 'Create account'}
              </Button>
              <Button type="button" variant="ghost" onClick={() => navigate('/login')} className="flex-1 h-11 border rounded-xl">
                Back
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
