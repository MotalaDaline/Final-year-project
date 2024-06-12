import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iluhndkjckorgolgjfvh.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsdWhuZGtqY2tvcmdvbGdqZnZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1ODIzNDIsImV4cCI6MjAzMzE1ODM0Mn0.Xs_qn7a_34rqSrv9gISfQyPdZ93wHdSLGxDccDqxu9I";
export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabaseAuth = supabase.auth;
