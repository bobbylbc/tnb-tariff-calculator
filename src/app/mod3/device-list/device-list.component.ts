import { PowerUnit } from '../../c_objects/power-unit';
import { Tool } from '../../c_modules/tools.module';
import { DeviceData } from '../../c_interfaces/device-data';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component( {
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: [ './device-list.component.scss' ]
} )

export class DeviceListComponent implements OnInit {
  @Input( 'holderForm' )
  public holderForm: FormGroup;

  @Input( 'devices' )
  public devices: DeviceData[];
  constructor ( private cd: ChangeDetectorRef ) { }


  ngOnInit() {
    console.log( 'Initializing device list', this.devices );
    this.holderForm.addControl( 'devices', new FormArray( [] ) );
  }

  addDevice() {
    const device: DeviceData = {
      id: Tool.generateShortIdExtraSafe( this.getDevicesId() ),
      name: 'New Device',
      powerUnit: PowerUnit.KILOWATT,
      power: 1,
      nonPeakDailyHours: 8,
      peakDailyHours: 0
    };
    this.devices.push( device );
    this.cd.detectChanges();
    return false;
  }

  removeDevice( idx: number ) {
    if ( this.devices.length > 1 ) {
      this.devices.splice( idx, 1 ); // Remove DeviceData
      ( <FormArray>this.holderForm.get( 'devices' ) ).removeAt( idx ); // Remove DeviceForm
    }
    return false;
  }

  private getDevicesId(): any {
    const devicesId = [];
    for ( const d of this.devices ) {
      devicesId.push( d.id );
    }

    return devicesId;
  }


}
