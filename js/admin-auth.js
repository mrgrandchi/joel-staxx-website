document.addEventListener('DOMContentLoaded', async () => {
  const supabase = window.staxxSupabase;
  const isLogin = Boolean(document.getElementById('admin-login-form'));
  const message = document.getElementById('auth-message');

  const setMessage = (text, kind = '') => {
    if (!message) return;
    message.textContent = text;
    message.className = `auth-message ${kind}`;
  };

  if (!supabase) {
    setMessage('Admin authentication is not configured yet. Add the Supabase project URL and publishable key in js/supabase-client.js.', 'error');
    if (!isLogin) setTimeout(() => { window.location.href = './login.html'; }, 1800);
    return;
  }

  const { data: { session } } = await supabase.auth.getSession();

  if (isLogin) {
    if (session) {
      window.location.href = './';
      return;
    }

    document.getElementById('admin-login-form').addEventListener('submit', async (event) => {
      event.preventDefault();
      setMessage('Signing in…');
      const email = document.getElementById('admin-email').value.trim();
      const password = document.getElementById('admin-password').value;
      if (!email || !password) return setMessage('Enter your email and password.', 'error');

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return setMessage(error.message, 'error');
      window.location.href = './';
    });

    document.getElementById('forgot-password')?.addEventListener('click', async () => {
      const email = document.getElementById('admin-email').value.trim();
      if (!email) return setMessage('Enter your email first, then choose Forgot password.', 'error');
      setMessage('Sending reset email…');
      const redirectTo = `${window.location.origin}${window.location.pathname}`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
      setMessage(error ? error.message : 'If that account exists, a password reset email has been sent.', error ? 'error' : 'success');
    });

    supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === 'SIGNED_IN' && nextSession) window.location.href = './';
    });
    return;
  }

  if (!session) {
    window.location.href = './login.html';
    return;
  }

  const email = session.user?.email || 'Authorized user';
  const emailEl = document.getElementById('admin-email-display');
  const nameEl = document.getElementById('admin-name');
  if (emailEl) emailEl.textContent = email;
  if (nameEl) nameEl.textContent = email.split('@')[0];

  document.getElementById('admin-signout')?.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = './login.html';
  });
});
