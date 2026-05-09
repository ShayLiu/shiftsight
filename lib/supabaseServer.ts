import { createClient, SupabaseClient } from '@supabase/supabase-js';

let _server: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  return url.length > 0 && !url.includes('placeholder') && key.length > 0 && key !== 'placeholder';
}

export function getSupabaseServer(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!_server) {
    _server = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _server;
}
