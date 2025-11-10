export interface Category {
  id: number;
  key: string;
  label: string;
  icon: string | null;
  parent_id: number | null;
  sort_order: number | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Subcategory {
  id: number;
  key: string;
  label: string;
  category_id: number;
  sort_order: number | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Device {
  id: number;
  key: string;
  label: string;
  brand: string;
  model: string;
  gtin: string | null;
  mpn: string | null;
  buy_min: number | null;
  resale_floor: number | null;
  icon: string | null;
  device_image: string | null;
  category_id: number | null;
  subcategory_id: number | null;
  is_active: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface DeviceWithVariants extends Device {
  storage?: string;
  condition?: string;
  storageOptions?: string[];
  sale_price?: number;
  battery_percentage?: number;
}
