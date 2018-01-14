import { BillCalData } from '../../c_interfaces/bill-cal-data';
import { Component, Input, Inject, OnInit } from '@angular/core';
import { DeviceData } from '../../c_interfaces/device-data';
import { Tool } from '../../c_modules/tools.module';
import { CalculationComponent } from '../calculation/calculation.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component( {
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: [ './result-list.component.scss' ]
} )

export class ResultListComponent {

  @Input( 'devices' )
  public devices: DeviceData[];

  @Input( 'results' )
  public results: any;

  constructor( public dialog: MatDialog ) { }

  openCalculationDialog( aggregate: string, tariffName: string ): void {
    const dialogRef = this.dialog.open( CalculationComponent, {
      height: '400px',
      data: new BillCalData( aggregate, tariffName, this.devices )
    } );

    dialogRef.afterClosed().subscribe( result => {
      console.log( 'The dialog was closed' );
    } );
  }

  private convertToRM( val: number ): string {
    return Tool.convertSenToRM( val );
  }

}
