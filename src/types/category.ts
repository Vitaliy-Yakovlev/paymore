export interface Category {
  id: number;
  key: string;
  label: string;
  icon?: string;
  parent_id?: number | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subcategory {
  id: number;
  key: string;
  label: string;
  category_id: number;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Device {
  id: number;
  key: string;
  label: string;
  brand: string;
  model: string;
  gtin?: string;
  mpn?: string;
  buy_min?: number;
  resale_floor?: number;
  icon?: string;
  device_image?: string;
  category_id?: number;
  subcategory_id?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
