import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) || '';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) || '';

const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isConfigured) {
  console.warn('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY not set. Supabase auth disabled.');
}

let _supabase: SupabaseClient | null = null;
if (isConfigured) {
  _supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = _supabase as SupabaseClient | null;
export const supabaseConfigured = isConfigured;

export default supabase;
