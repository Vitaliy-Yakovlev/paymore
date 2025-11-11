export interface ModelSelectProps {
  items: any[];
  category: string;
  brand: string;
  model: string;
  setDeviceSearchTerm: (value: string) => void;
  deviceSearchTerm: string;
  setSelectedDevice: (deviceId: number) => void;
}
