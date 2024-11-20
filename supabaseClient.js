const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://kagjlvuxujovnoijwaio.supabase.co';  // Substitua pela URL do seu projeto
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthZ2psdnV4dWpvdm5vaWp3YWlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMjU2NDAsImV4cCI6MjA0NzcwMTY0MH0.HycUe8NaRd2kjk2MXXFz9qM982teqAvVlU5wcLPhNl8';  // Substitua pela chave da API

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;