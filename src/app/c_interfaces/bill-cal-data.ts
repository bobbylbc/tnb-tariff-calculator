import { BillStatus } from '../c_objects/bill-status';
import { DeviceData } from './device-data';

export interface BillCalData {
    aggregate: string;
    tariffName: string;
    devices: DeviceData[];

}

export class BillCalData {
  public constructor(public aggregate: string, public tariffName: string, public devices: DeviceData[]) { }

}
