// Приклади використання Supabase в PayMore App

import { supabase } from '../lib/supabase';
import { useSupabase } from '../hooks/useSupabase';

// Приклад 1: Отримання всіх котирувань
export const fetchQuotes = async () => {
  const { data, error } = await supabase.from('quotes').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }

  return data;
};

// Приклад 2: Отримання котирувань конкретного користувача
export const fetchUserQuotes = async (userId: string) => {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user quotes:', error);
    return [];
  }

  return data;
};

// Приклад 3: Оновлення статусу котирування
export const updateQuoteStatus = async (quoteId: string, status: string) => {
  const { data, error } = await supabase.from('quotes').update({ status }).eq('id', quoteId).select();

  if (error) {
    console.error('Error updating quote status:', error);
    return null;
  }

  return data;
};

// Приклад 4: Використання хука для отримання даних
export const useQuotes = () => {
  const { fetchData, loading, error } = useSupabase();

  const getQuotes = async () => {
    try {
      return await fetchData('quotes', {
        orderBy: { column: 'created_at', ascending: false },
      });
    } catch (err) {
      console.error('Error fetching quotes:', err);
      return [];
    }
  };

  return { getQuotes, loading, error };
};

// Приклад 5: Створення нової котирування
export const createQuote = async (quoteData: any) => {
  const { data, error } = await supabase
    .from('quotes')
    .insert({
      ...quoteData,
      created_at: new Date().toISOString(),
      status: 'pending',
    })
    .select();

  if (error) {
    console.error('Error creating quote:', error);
    return null;
  }

  return data;
};

// Приклад 6: Пошук котирувань за категорією
export const searchQuotesByCategory = async (category: string) => {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching quotes by category:', error);
    return [];
  }

  return data;
};

// Приклад 7: Отримання статистики
export const getQuoteStats = async () => {
  const { data, error } = await supabase.from('quotes').select('status, created_at');

  if (error) {
    console.error('Error fetching quote stats:', error);
    return null;
  }

  // Групування по статусах
  const stats = data.reduce((acc: any, quote: any) => {
    acc[quote.status] = (acc[quote.status] || 0) + 1;
    return acc;
  }, {});

  return stats;
};

// Приклад 8: Реальний час - підписка на зміни
export const subscribeToQuotes = (callback: (payload: any) => void) => {
  const subscription = supabase
    .channel('quotes_changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'quotes' }, callback)
    .subscribe();

  return subscription;
};
