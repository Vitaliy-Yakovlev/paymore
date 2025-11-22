// src/services/quoteService.ts
import { supabase } from '../lib/supabase';

export interface Quote {
  device_id?: number | null;
  device_variant_id?: number | null;
  device_name?: string | null;
  sale_price?: number | null;
  email: string;
  phone?: string | null;
  name?: string | null;
  options?: Record<string, any>; // Optional JSON object
}

export async function createQuote(payload: Quote) {
  // If JSON not provided, default to empty object
  const finalPayload = {
    ...payload,
    options: payload.options ?? {}
  };

  const { data, error } = await supabase
    .from("quotes")
    .insert(finalPayload)
    .select()
    .single();

  if (error) {
    console.error("Error inserting quote:", error);
    throw error;
  }

  return data;
}
