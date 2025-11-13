export interface BaseListItem {
  id: number;
  key: string;
  [key: string]: any;
}

export interface DeviceItem extends BaseListItem {
  brand?: string;
  category_id?: number;
  created_at?: string;
  device_image?: string | null;
  gtin?: string | null;
  icon?: string | null;
  is_active?: boolean;
  mpn?: string | null;
  subcategory_id?: number | null;
  updated_at?: string;
  label?: string;
}

export interface DeviceListProps<T extends BaseListItem = BaseListItem> {
  items: T[];
  onItemClick: (item: T) => void;
  onNoDevicesClick?: () => void;
  emptyMessage?: string;
  emptyButtonText?: string;
  visibleText?: boolean;
  itemsPerPage?: number;
  showPagination?: boolean;
}
