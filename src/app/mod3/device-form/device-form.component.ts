import { PowerUnit } from '../../c_objects/power-unit';
import { DeviceData } from '../../c_interfaces/device-data';
import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component( {
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: [ './device-form.component.scss' ]
} )
export class DeviceFormComponent implements OnInit {
  @Input( 'devices' )
  public devices: FormArray;

  @Input( 'device' )
  public device: DeviceData;

  public deviceForm: FormGroup;
  constructor ( private fb: FormBuilder ) { }

  public powerUnits: PowerUnit[];

  ngOnInit() {
    console.log( 'Initializing device form', this.device );
    this.deviceForm = this.toFormGroup( this.device );
    this.devices.push( this.deviceForm );
    this.powerUnits = [
      PowerUnit.WATT,
      PowerUnit.KILOWATT,
      PowerUnit.MEGAWATT,
      PowerUnit.GIGAWATT,
      PowerUnit.TERRAWATT
    ];
  }


  private toFormGroup( data: DeviceData ): FormGroup {
    const posIntegersOnly = '[0-9]+';
    const upTo5Decimals = '(?:[0-9]+(?:\\.[0-9]{0,5})?)';
    const formGroup = this.fb.group( {
      id: [ data.id ],
      name: [ data.name || 'device name', Validators.required ],
      powerUnit: [ data.powerUnit || PowerUnit.WATT ],
      power: [ data.power || 0, [ Validators.required, Validators.pattern( upTo5Decimals ) ] ],
      nonPeakDailyHours: [ data.nonPeakDailyHours || 0, Validators.pattern( upTo5Decimals ) ],
      peakDailyHours: [ data.peakDailyHours || 0, Validators.pattern( upTo5Decimals ) ]
    } );
    return formGroup;
  }

}
