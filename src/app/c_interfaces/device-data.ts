import { PowerUnit } from '../c_objects/power-unit';
export interface DeviceData {
  id: string;
  name: string;
  powerUnit: PowerUnit;
  power: number;
  peakDailyHours: number;
  nonPeakDailyHours: number;
}
