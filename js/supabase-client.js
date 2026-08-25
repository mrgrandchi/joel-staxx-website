/* Joel Staxx Entertainment — Supabase client configuration.
   Phase 1 uses the public publishable/anon key in the browser. NEVER put a Supabase service_role/secret key here.
   Create a Supabase project, then replace the two values below or load them through your deployment config. */
window.STAXX_SUPABASE_CONFIG = {
  url: 'https://YOUR_PROJECT_REF.supabase.co',
  publishableKey: 'YOUR_SUPABASE_PUBLISHABLE_KEY'
};

window.staxxSupabase = null;

(function () {
  const cfg = window.STAXX_SUPABASE_CONFIG;
  if (!window.supabase || !cfg || cfg.url.includes('YOUR_PROJECT_REF') || cfg.publishableKey.includes('YOUR_SUPABASE')) return;
  window.staxxSupabase = window.supabase.createClient(cfg.url, cfg.publishableKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
})();
