import { BillCalData } from '../../c_interfaces/bill-cal-data';
import { DialogRow, DialogTitleRow } from '../../c_interfaces/dialog-row-data';
import { Bill } from '../../c_modules/bill.module';
import { Tariff } from '../../c_modules/tariff.module';
import { Tool } from '../../c_modules/tools.module';
import { CalculationComponent } from '../calculation/calculation.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component( {
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: [ './consumption.component.scss' ]
} )
export class ConsumptionComponent implements OnInit {

  public row1: DialogTitleRow;
  public row2: DialogTitleRow;
  public row3: DialogTitleRow;
  public row4: DialogTitleRow;
  public row5: DialogTitleRow;
  public total: DialogTitleRow;
  public errorMsg: DialogRow;
  public explanationRow1: DialogRow;
  public explanationRow2: DialogRow;

  constructor( public dialogRef: MatDialogRef<CalculationComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: BillCalData ) { }

  ngOnInit() {
    this.row1 = new DialogTitleRow( true, '', '' );
    this.row2 = new DialogTitleRow( true, '', '' );
    this.row3 = new DialogTitleRow( true, '', '' );
    this.row4 = new DialogTitleRow( true, '', '' );
    this.row5 = new DialogTitleRow( true, '', '' );
    this.total = new DialogTitleRow( true, '', '' );
    this.errorMsg = new DialogRow( true, '' );
    this.explanationRow1 = new DialogRow( true, '' );
    this.explanationRow2 = new DialogRow( true, '' );

    switch ( this.data.tariffName ) {
      case Tariff.DOM_A:
        this.setupAConsumption();
        break;
      case Tariff.COM_B:
        this.setupBConsumption();
        break;
      case Tariff.COM_C1:
        this.setupC1Consumption();
        break;
      case Tariff.COM_C2:
        this.setupC2Consumption();
        break;
      case Tariff.IND_D:
        this.setupDConsumption();
        break;
      case Tariff.IND_DS:
        this.setupDSConsumption();
        break;
      case Tariff.IND_E1:
        this.setupE1Consumption();
        break;
      case Tariff.IND_E1S:
        this.setupE1SConsumption();
        break;
      case Tariff.IND_E2:
        this.setupE2Consumption();
        break;
      case Tariff.IND_E2S:
        this.setupE2SConsumption();
        break;
      case Tariff.IND_E3:
        this.setupE3Consumption();
        break;
      case Tariff.IND_E3S:
        this.setupE3SConsumption();
        break;
      case Tariff.MIN_F:
        this.setupFConsumption();
        break;
      case Tariff.MIN_F1:
        this.setupF1Consumption();
        break;
      case Tariff.MIN_F2:
        this.setupF2Consumption();
        break;
      case Tariff.AGR_H:
        this.setupHConsumption();
        break;
      case Tariff.AGR_H1:
        this.setupH1Consumption();
        break;
      case Tariff.AGR_H2:
        this.setupH2Consumption();
        break;
      default:
        this.errorMsg.hidden = false;
        this.errorMsg.value = 'Unable to display info, please retry...';
        break;
    }

  }

  private unhideRow(): boolean {
    return false;
  }

  private hideRow(): boolean {
    return true;
  }

  private onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private setupNoConsumptionRow() {
    this.row1 = { hidden: this.unhideRow(), title: 'No Consumption', value: 'RM 0.00' };
  }

  private setupTotalRow( total: number ) {
    this.total = { hidden: this.unhideRow(), title: 'Total (RM)', value: 'RM ' + Tool.convertSenToRM( total ) };
  }

  private setupDynamicTitle( title: string, totalKWH: number, lowerLimit: number,
    upperLimit: number, tariffCharge: number ): string {

    if ( upperLimit === null ) {
      title = title + ' [' + ( totalKWH - lowerLimit ) +
        'hrs X RM ' +
        ( tariffCharge > 100 ? Tool.convertSenToRM( tariffCharge ) : Tool.convertSenToRM_V2( tariffCharge ) )
        + ']';
    } else {
      title = title + ' [' + ( totalKWH > upperLimit ? ( upperLimit - lowerLimit ) : totalKWH - lowerLimit )
        + 'hrs X RM ' + ( tariffCharge > 100 ? Tool.convertSenToRM( tariffCharge ) : Tool.convertSenToRM_V2( tariffCharge ) )
        + ']';
    }

    return title;
  }

  private setupPeakOffPeakConsumption( peakTariff: number, offPeakTariff: number ) {
    const totalPeakKWH = Bill.getTotalPeakKWH( this.data.devices, this.data.aggregate );
    const totalOffPeakKWH = Bill.getTotalOffPeakKWH( this.data.devices, this.data.aggregate );

    if ( totalPeakKWH === 0 && totalOffPeakKWH === 0 ) {
      this.setupNoConsumptionRow();
    } else {
      const peak = totalPeakKWH * peakTariff;
      const offPeak = totalOffPeakKWH * offPeakTariff;

      this.setupTotalRow(( peak + offPeak ) );

      this.row1 = {
        hidden: peak > 0 ? this.unhideRow() : this.hideRow(),
        title: this.setupDynamicTitle( '1) Peak', totalPeakKWH, 0, null, peakTariff ),
        value: 'RM ' + Tool.convertSenToRM( peak )
      };

      this.row2 = {
        hidden: offPeak > 0 ? this.unhideRow() : this.hideRow(),
        title: this.setupDynamicTitle( '2) Off-Peak', totalOffPeakKWH, 0, null, offPeakTariff ),
        value: 'RM ' + Tool.convertSenToRM( offPeak )
      };
    }
  }


  private setupOneLevelConsumption( tariffLevelAll: number ) {
    const totalKWH = Bill.getTotalKWH( this.data.devices, this.data.aggregate );
    if ( totalKWH === 0 ) {
      this.setupNoConsumptionRow();
    } else {
      const first = Tariff.getCharges( totalKWH, 0, null, tariffLevelAll );

      this.setupTotalRow(( first ) );

      this.row1 = {
        hidden: first > 0 ? this.unhideRow() : this.hideRow(),
        title: this.setupDynamicTitle( '1) [ 1kWh and more ]', totalKWH, 0, null, tariffLevelAll ),
        value: 'RM ' + Tool.convertSenToRM( first )
      };
    }

  }

  private setupTwoLevelConsumption( tariffLevelOneTitle: string, tariffLevelOne: number,
    tariffLevelTwoTitle: string, tariffLevelTwo: number ) {
    const totalKWH = Bill.getTotalKWH( this.data.devices, this.data.aggregate );
    if ( totalKWH === 0 ) {
      this.setupNoConsumptionRow();
    } else {
      const first = Tariff.getCharges( totalKWH, 0, 200, tariffLevelOne );
      const second = Tariff.getCharges( totalKWH, 200, null, tariffLevelTwo );

      this.setupTotalRow(( first + second ) );

      this.row1 = {
        hidden: first > 0 ? this.unhideRow() : this.hideRow(),
        title: this.setupDynamicTitle( tariffLevelOneTitle, totalKWH, 0, 200, tariffLevelOne ),
        value: 'RM ' + Tool.convertSenToRM( first )
      };

      this.row2 = {
        hidden: second > 0 ? this.unhideRow() : this.hideRow(),
        title: this.setupDynamicTitle( tariffLevelTwoTitle, totalKWH, 200, null, tariffLevelTwo ),
        value: 'RM ' + Tool.convertSenToRM( second )
      };
    }
  }


  private setupAConsumption() {
    const totalKWH = Bill.getTotalKWH( this.data.devices, this.data.aggregate );
    if ( totalKWH === 0 ) {
      this.setupNoConsumptionRow();
    } else {
      const first = Tariff.getCharges( totalKWH, 0, 200, Tariff.DOM_A_0_200 );
      const second = Tariff.getCharges( totalKWH, 200, 300, Tariff.DOM_A_201_300 );
      const third = Tariff.getCharges( totalKWH, 300, 600, Tariff.DOM_A_301_600 );
      const fourth = Tariff.getCharges( totalKWH, 600, 900, Tariff.DOM_A_601_900 );
      const fifth = Tariff.getCharges( totalKWH, 900, null, Tariff.DOM_A_901_MORE );

      this.setupTotalRow(( first + second + third + fourth + fifth ) );
      this.row1 = {
        hidden: first > 0 ? this.unhideRow() : this.hideRow(),
        title: this.setupDynamicTitle( '1) [ 1 - 200kWh ]', totalKWH, 0, 200, Tariff.DOM_A_0_200 ),
        value: 'RM ' + Tool.convertSenToRM( first )
      };

      this.row2 = {
        hidden: second > 0 ? this.unhideRow() : this.hideRow(),
        title: this.setupDynamicTitle( '2) [ 201 - 300kWh ]', totalKWH, 200, 300, Tariff.DOM_A_201_300 ),
        value: 'RM ' + Tool.convertSenToRM( second )
      };

      this.row3 = {
        hidden: third > 0 ? this.unhideRow() : this.hideRow(),
        title: this.setupDynamicTitle( '3) [ 301 - 600kWh ]', totalKWH, 300, 600, Tariff.DOM_A_301_600 ),
        value: 'RM ' + Tool.convertSenToRM( third )
      };

      this.row4 = {
        hidden: fourth > 0 ? this.unhideRow() : this.hideRow(),
        title: this.setupDynamicTitle( '4) [ 601 - 900kWh ]', totalKWH, 600, 900, Tariff.DOM_A_601_900 ),
        value: 'RM ' + Tool.convertSenToRM( fourth )
      };

      this.row5 = {
        hidden: fifth > 0 ? this.unhideRow() : this.hideRow(),
        title: this.setupDynamicTitle( '5) [ 901kWh and more ]', totalKWH, 900, null, Tariff.DOM_A_901_MORE ),
        value: 'RM ' + Tool.convertSenToRM( fifth )
      };

      this.explanationRow1 = {
        hidden: totalKWH > 300 ? this.unhideRow() : this.hideRow(),
        value: 'Non-GST Applicable = RM ' + Tool.convertSenToRM( first ) + ' + RM ' +
        Tool.convertSenToRM( second ) + ' = RM ' + Tool.convertSenToRM(( first + second ) )
      };

      this.explanationRow2 = {
        hidden: totalKWH > 300 ? this.unhideRow() : this.hideRow(),
        value: 'Non-GST Applicable = RM ' + Tool.convertSenToRM( third ) + ' + RM ' +
        Tool.convertSenToRM( fourth ) + ' + RM ' +
        Tool.convertSenToRM( fifth ) + ' = RM ' + Tool.convertSenToRM(( third + fourth + fifth ) )
      };

    }

  }

  private setupBConsumption() {
    this.setupTwoLevelConsumption( '1) [ 1 - 200kWh ]', Tariff.COM_B_0_200, '2) [ 201kWh and more ]', Tariff.COM_B_201_MORE );
  }

  private setupC1Consumption() {
    this.setupOneLevelConsumption( Tariff.COM_C1_ALL );

  }

  private setupC2Consumption() {
    this.setupPeakOffPeakConsumption( Tariff.COM_C2_PEAK, Tariff.COM_C2_OFF_PEAK );
  }

  private setupDConsumption() {
    this.setupTwoLevelConsumption( '1) [ 1 - 200kWh ]', Tariff.IND_D_0_200, '2) [ 201kWh and more ]', Tariff.IND_D_201_MORE );
  }


  private setupDSConsumption() {
    this.setupOneLevelConsumption( Tariff.IND_DS_ALL );
  }

  private setupE1Consumption() {
    this.setupOneLevelConsumption( Tariff.IND_E1_ALL );

  }

  private setupE1SConsumption() {
    this.setupOneLevelConsumption( Tariff.IND_E1S_ALL );
  }

  private setupE2Consumption() {
    this.setupPeakOffPeakConsumption( Tariff.IND_E2_PEAK, Tariff.IND_E2_OFF_PEAK );
  }

  private setupE2SConsumption() {
    this.setupPeakOffPeakConsumption( Tariff.IND_E2S_PEAK, Tariff.IND_E2S_OFF_PEAK );
  }


  private setupE3Consumption() {
    this.setupPeakOffPeakConsumption( Tariff.IND_E3_PEAK, Tariff.IND_E3_OFF_PEAK );

  }

  private setupE3SConsumption() {
    this.setupPeakOffPeakConsumption( Tariff.IND_E3S_PEAK, Tariff.IND_E3S_OFF_PEAK );

  }

  private setupFConsumption() {
    this.setupOneLevelConsumption( Tariff.MIN_F_ALL );

  }

  private setupF1Consumption() {
    this.setupOneLevelConsumption( Tariff.MIN_F1_ALL );

  }

  private setupF2Consumption() {
    this.setupPeakOffPeakConsumption( Tariff.MIN_F2_PEAK, Tariff.MIN_F2_OFF_PEAK );

  }

  private setupHConsumption() {
    this.setupTwoLevelConsumption( '1) [ 1 - 200kWh ]', Tariff.AGR_H_0_200, '2) [ 201kWh and more ]', Tariff.AGR_H_201_MORE );
  }

  private setupH1Consumption() {
    this.setupOneLevelConsumption( Tariff.AGR_H1_ALL );
  }

  private setupH2Consumption() {
    this.setupPeakOffPeakConsumption( Tariff.AGR_H2_PEAK, Tariff.AGR_H2_OFF_PEAK );
  }
}
