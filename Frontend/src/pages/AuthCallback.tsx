import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { supabase } from '../supabaseClient';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handle = async () => {
      try {
        // v2 method to parse session from URL after OAuth redirect
        const { data, error } = await supabase.auth.getSessionFromUrl();
        if (error) {
          console.error('Auth callback error', error);
          navigate('/login');
          return;
        }
        // session established, redirect to dashboard
        navigate('/dashboard');
      } catch (e) {
        console.error(e);
        navigate('/login');
      }
    };
    handle();
  }, [navigate]);

  return <div className="p-8">Signing you in…</div>;
}
