import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const SupabaseTest: React.FC = () => {
  const [status, setStatus] = useState<string>('Testing...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Простий тест підключення
        const { data, error } = await supabase.from('price_list').select('count').limit(1);
        
        if (error) {
          setError(`Supabase Error: ${error.message}`);
          setStatus('❌ Connection Failed');
        } else {
          setStatus('✅ Supabase Connected!');
          setError(null);
        }
      } catch (err) {
        setError(`Connection Error: ${err}`);
        setStatus('❌ Connection Failed');
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      padding: '10px', 
      border: '1px solid #ccc',
      borderRadius: '5px',
      zIndex: 9999,
      fontSize: '12px'
    }}>
      <div><strong>Supabase Status:</strong> {status}</div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};
