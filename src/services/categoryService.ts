// Service for working with categories from Supabase
import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase';
import { handleSupabaseError } from '../utils/handleSupabaseError';

export type Category = Database['public']['Tables']['categories']['Row'];
export type Subcategory = Database['public']['Tables']['subcategories']['Row'];
export type Device = Database['public']['Tables']['devices']['Row'];
export type CategorialQuestions = Database['public']['Tables']['categorial_questions']['Row'];

export type CategorialQuestionsWithAnswers = CategorialQuestions & {
  question_answers: Array<{ value: string }>;
};

// Get all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase.from('categories').select('*').eq('is_active', true).order('sort_order');

    if (error) {
      console.error('Error fetching categories:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getCategories:', error);
    return [];
  }
}

// Get subcategories for specific category (or all if categoryId is 0)
export async function getSubcategories(categoryId: number = 0): Promise<Subcategory[]> {
  try {
    let query = supabase.from('subcategories').select('*').eq('is_active', true).order('sort_order');

    if (categoryId > 0) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching subcategories:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getSubcategories:', error);
    return [];
  }
}

// Get devices for category from devices table
export async function getDevicesByCategory(categoryId: number = 0): Promise<Device[]> {
  try {
    let query = supabase.from('devices').select('*').eq('is_active', true).order('label');

    if (categoryId > 0) {
      query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching devices by category:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getDevicesByCategory:', error);
    return [];
  }
}

// Get devices for subcategory from devices table
export async function getDevicesBySubcategory(subcategoryId: number): Promise<Device[]> {
  try {
    const { data, error } = await supabase
      .from('devices')
      .select('*')
      .eq('subcategory_id', subcategoryId)
      .eq('is_active', true)
      .order('label');

    if (error) {
      console.error('Error fetching devices by subcategory:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getDevicesBySubcategory:', error);
    return [];
  }
}

// Get categorial questions for a category and device with their answers
export async function getCategorialQuestions(categoryId: number | null, deviceId: number | null = null) {
  try {
    let query = supabase.from('categorial_questions').select(`
        *,
        question_answers (
          id,
          question_id,
          value,
          is_active
        )
      `);

    if (categoryId !== null) {
      query = query.eq('category_id', categoryId);
    }

    // For now, we'll ignore deviceId as the current schema doesn't support device-specific questions
    // TODO: Add device-specific filtering when schema supports it

    const { data, error } = await query.order('id');

    if (error) {
      console.error('❌ Error fetching questions:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('💥 getCategorialQuestions failed:', error);
    throw error;
  }
}

export async function getCategorialQuestionsWithAnswers(categoryId: number = 0): Promise<CategorialQuestionsWithAnswers[]> {
  if (categoryId === 0) return [];

  try {
    const { data, error } = await supabase
      .from('categorial_questions')
      .select(
        `
        *,
        question_answers ( 
          id,
          question_id,
          value,
          is_active
        )
      `,
      )
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .order('id');

    if (error) return handleSupabaseError('getCategorialQuestionsWithAnswers', error);
    return data ?? [];
  } catch (err) {
    console.error('❌ Unexpected error in getCategorialQuestionsWithAnswers:', err);
    return [];
  }
}
