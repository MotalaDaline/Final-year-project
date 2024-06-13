import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iluhndkjckorgolgjfvh.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsdWhuZGtqY2tvcmdvbGdqZnZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1ODIzNDIsImV4cCI6MjAzMzE1ODM0Mn0.Xs_qn7a_34rqSrv9gISfQyPdZ93wHdSLGxDccDqxu9I";

const serviceRole =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlsdWhuZGtqY2tvcmdvbGdqZnZoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNzU4MjM0MiwiZXhwIjoyMDMzMTU4MzQyfQ.7NRdwJ6gyGrsD2yREyWg0zWmMO-g41ILmdhSx5hde_s";

export const supabase = createClient(supabaseUrl, supabaseKey);
const supabaseAdmin = createClient(supabaseUrl, serviceRole, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export const supabaseAuth = supabase.auth;
export const supabaseAdminAuth = supabaseAdmin.auth;
