import { BaseListItem } from '../DeviceList/types';

export interface ModelSelectProps {
  items: BaseListItem[];
  category: string;
  brand: string;
  model: string;
  setDeviceSearchTerm: (value: string) => void;
  deviceSearchTerm: string;
  setSelectedDevice: (deviceId: number) => void;
  setStep?: (step: number) => void;
}
