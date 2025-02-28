import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://dweacuygywbnvsxxifch.supabase.co"
const supabaseKey =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZWFjdXlneXdibnZzeHhpZmNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNzkzODAsImV4cCI6MjA1NTY1NTM4MH0.Kr7Ny3XulzHM7LWSWvjXqQk9GQ5HfSiCXSdkIfPDCk0";


export const supabase = createClient(supabaseUrl, supabaseKey);
