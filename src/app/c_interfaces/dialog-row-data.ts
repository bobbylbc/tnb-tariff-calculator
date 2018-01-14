import { BillStatus } from '../c_objects/bill-status';
import { DeviceData } from './device-data';

export interface DialogRow {
    hidden: boolean;
    value: string;
}

export class DialogRow {
  public constructor(public hidden: boolean, public value: string) { }
}

export interface DialogTitleRow {
    hidden: boolean;
    title: string;
    value: string;
}

export class DialogTitleRow {
  public constructor(public hidden: boolean, public title: string, public value: string) { }
}
