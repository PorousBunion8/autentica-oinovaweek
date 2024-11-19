import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xrebmlkbammrjxxhveao.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyZWJtbGtiYW1tcmp4eGh2ZWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwOTUwNDksImV4cCI6MjA0MjY3MTA0OX0.6wqZw4t8CUBEPu3Rhi2kc6Cqw1-Q_7R4_e5zotKdafA';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export { supabase };