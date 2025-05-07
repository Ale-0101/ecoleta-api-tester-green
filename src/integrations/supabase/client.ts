
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yjtrycepjhffkuzpdudj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqdHJ5Y2VwamhmZmt1enBkdWRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NzQwMTYsImV4cCI6MjA2MjE1MDAxNn0.qsm85Xd_8sCIxMQocqErk54_00BkqU01Lod2_g3fDmA";

// Observe que para integração com API externas (como a API Ecoleta), é recomendável
// usar um proxy ou gateway para evitar expor chaves diretamente no frontend

const API_BASE_URL = "https://api.ecoleta-sustentavel.com/v1";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Helper functions para interagir com a API Ecoleta (isso simplifica os testes)
export const ecoletaApi = {
  login: async (email: string, senha: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      return await response.json();
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  },
  
  getPontos: async (token?: string) => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    try {
      const response = await fetch(`${API_BASE_URL}/pontos`, { headers });
      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar pontos:", error);
      throw error;
    }
  },
  
  createPonto: async (data: any, token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pontos`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ${response.status}: ${JSON.stringify(errorData)}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error("Erro ao criar ponto de coleta:", error);
      throw error;
    }
  }
};
