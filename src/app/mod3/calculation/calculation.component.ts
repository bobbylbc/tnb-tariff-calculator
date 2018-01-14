import { BillCalData } from '../../c_interfaces/bill-cal-data';
import { DeviceData } from '../../c_interfaces/device-data';
import { DialogRow } from '../../c_interfaces/dialog-row-data';
import { Bill } from '../../c_modules/bill.module';
import { Tariff } from '../../c_modules/tariff.module';
import { Tool } from '../../c_modules/tools.module';
import { ConsumptionComponent } from '../consumption/consumption.component';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component( {
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: [ './calculation.component.scss' ]
} )
export class CalculationComponent implements OnInit {
  notGstF: DialogRow;
  notGstConKwhF: DialogRow;
  notGstConRmF: DialogRow;
  notGstIcptF: DialogRow;
  notGstDeductedIcptF: DialogRow;

  gstF: DialogRow;
  gstConKwhF: DialogRow;
  gstConRmF: DialogRow;
  gstIcptF: DialogRow;
  gstDeductedIcptF: DialogRow;
  gstGstF: DialogRow;
  gstAddedGstF: DialogRow;

  maxDemandKwF: DialogRow;
  maxDemandRmF: DialogRow;

  totalKwhF: DialogRow;
  totalRmF: DialogRow;

  constructor(
    public dialogRef: MatDialogRef<CalculationComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: BillCalData,
    public dialog: MatDialog ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openConsumptionCalculationDialog(): void {
    const dialogRef = this.dialog.open( ConsumptionComponent, {
      height: '400px',
      data: this.data
    } );

    dialogRef.afterClosed().subscribe( result => {
      console.log( 'The dialog was closed' );
    } );
  }


  ngOnInit() {
    this.notGstF = new DialogRow( true, 'GST Not Applicable' );
    this.notGstConKwhF = new DialogRow( true, '' );
    this.notGstConRmF = new DialogRow( true, '' );
    this.notGstIcptF = new DialogRow( true, '' );
    this.notGstDeductedIcptF = new DialogRow( true, '' );

    this.gstF = new DialogRow( true, 'GST Applicable' );
    this.gstConKwhF = new DialogRow( true, '' );
    this.gstConRmF = new DialogRow( true, '' );
    this.gstIcptF = new DialogRow( true, '' );
    this.gstDeductedIcptF = new DialogRow( true, '' );
    this.gstGstF = new DialogRow( true, '' );
    this.gstAddedGstF = new DialogRow( true, '' );

    this.maxDemandKwF = new DialogRow( true, '' );
    this.maxDemandRmF = new DialogRow( true, '' );

    this.totalKwhF = new DialogRow( true, '' );
    this.totalRmF = new DialogRow( true, '' );

    switch ( this.data.tariffName ) {
      case Tariff.DOM_A:
        this.constructDomestic();
        break;
      case Tariff.COM_B:
      case Tariff.IND_D:
      case Tariff.IND_DS:
      case Tariff.MIN_F:
      case Tariff.AGR_H:
        this.constructNoMaxDemand();
        break;
      case Tariff.COM_C1:
      case Tariff.IND_E1:
      case Tariff.IND_E1S:
      case Tariff.MIN_F1:
      case Tariff.AGR_H1:
        this.constructWithMaxDemand();
        break;
      case Tariff.COM_C2:
      case Tariff.IND_E2:
      case Tariff.IND_E2S:
      case Tariff.IND_E3:
      case Tariff.IND_E3S:
      case Tariff.MIN_F2:
      case Tariff.AGR_H2:
        this.constructWithMaxDemandPeakNonPeak();
        break;
    }

  }

  private constructDomestic() {
    this.showgstNotApplicableElements();
    this.showTotalElements();

    const totalKWH = Bill.getTotalKWH( this.data.devices, this.data.aggregate );
    let totalCost = Tariff.calculateDomesticA( totalKWH );

    this.totalKwhF.value = totalKWH + ' kWh';
    this.totalRmF.value = 'RM ' + Tool.convertSenToRM( totalCost );

    if ( totalKWH <= Tariff.ICPT_DOM_KWH_LMT ) {
      this.notGstConKwhF.value = totalKWH + ' kWh';
      this.notGstConRmF.value = 'RM ' + Tool.convertSenToRM( totalCost );
      this.notGstIcptF.value = 'RM 0.00';
      this.notGstDeductedIcptF.value = 'RM ' + Tool.convertSenToRM( totalCost );

    } else {
      /** If KWH greater than limit (300)
       * ICPT applicable for all KWH
       * GST only applicable for KWH 300 above
       **/

      this.showGstApplicableElements();
      const limitedTotalCost = Tariff.calculateDomesticAWithoutGstIcptMaxDemand( Tariff.ICPT_DOM_KWH_LMT );
      const limitedIcptCost = Tariff.calculateICPTCost( Tariff.ICPT_DOM_KWH_LMT );
      const limitedDeductedIctpCost = limitedTotalCost + limitedIcptCost;

      this.notGstConKwhF.value = Tariff.ICPT_DOM_KWH_LMT + ' kWh';
      this.notGstConRmF.value = 'RM ' + Tool.convertSenToRM( limitedTotalCost );
      this.notGstIcptF.value = 'RM ' + Tool.convertSenToRM( limitedIcptCost );
      this.notGstDeductedIcptF.value = 'RM ' + Tool.convertSenToRM( limitedDeductedIctpCost );


      const totalIcpt = Tariff.calculateICPTCost( totalKWH );
      totalCost = Tariff.calculateDomesticAWithoutGstIcptMaxDemand( totalKWH );
      const icptCost = totalIcpt - limitedIcptCost;
      const consumptionCost = totalCost - limitedTotalCost;
      const deductedIcptCost = consumptionCost + icptCost;
      const gstCost = Tariff.calculateGSTCost( deductedIcptCost );
      const addedGstCost = gstCost + deductedIcptCost;

      this.gstConKwhF.value = ( totalKWH - Tariff.ICPT_DOM_KWH_LMT ) + ' kWH';
      this.gstConRmF.value = 'RM ' + Tool.convertSenToRM( consumptionCost );
      this.gstIcptF.value = 'RM ' + Tool.convertSenToRM( icptCost );
      this.gstDeductedIcptF.value = 'RM ' + Tool.convertSenToRM( deductedIcptCost );
      this.gstGstF.value = 'RM ' + Tool.convertSenToRM( gstCost );
      this.gstAddedGstF.value = 'RM ' + Tool.convertSenToRM( addedGstCost );

      this.totalRmF.value = 'RM ' + Tool.convertSenToRM( limitedDeductedIctpCost )
        + ' + RM ' + Tool.convertSenToRM( addedGstCost ) + ' = RM ' + Tool.convertSenToRM( limitedDeductedIctpCost + addedGstCost );

    }
  }

  private constructNoMaxDemand() {
    this.showGstApplicableElements();
    // this.showTotalElements();

    const totalKWH = Bill.getTotalKWH( this.data.devices, this.data.aggregate );
    let totalCost = 0;
    switch ( this.data.tariffName ) {
      case Tariff.COM_B:
        totalCost = Tariff.calculateCommercialBWithoutGstIcptMaxDemand( totalKWH );
        break;
      case Tariff.IND_D:
        totalCost = Tariff.calculateIndustryDWithoutGstIcptMaxDemand( totalKWH );
        break;
      case Tariff.IND_DS:
        totalCost = Tariff.calculateIndustryDsWithoutGstIcptMaxDemand( totalKWH );
        break;
      case Tariff.MIN_F:
        totalCost = Tariff.calculateMiningFWithoutGstIcptMaxDemand( totalKWH );
        break;
      case Tariff.AGR_H:
        totalCost = Tariff.calculateAgricultureHWithoutGstIcptMaxDemand( totalKWH );
        break;
    }


    const totalIcpt = Tariff.calculateICPTCost( totalKWH );
    const consumptionCost = totalCost;
    const icptCost = totalIcpt;
    const deductedIcptCost = consumptionCost + icptCost;
    const gstCost = Tariff.calculateGSTCost( deductedIcptCost );
    const addedGstCost = gstCost + deductedIcptCost;

    this.gstConKwhF.value = ( totalKWH ) + ' kWh';
    this.gstConRmF.value = 'RM ' + Tool.convertSenToRM( consumptionCost );
    this.gstIcptF.value = 'RM ' + Tool.convertSenToRM( icptCost );
    this.gstDeductedIcptF.value = 'RM ' + Tool.convertSenToRM( deductedIcptCost );
    this.gstGstF.value = 'RM ' + Tool.convertSenToRM( gstCost );
    this.gstAddedGstF.value = 'RM ' + Tool.convertSenToRM( addedGstCost );

    this.totalKwhF.value = totalKWH + ' kWh';
    this.totalRmF.value = 'RM ' + Tool.convertSenToRM( addedGstCost );
  }

  private constructWithMaxDemand() {
    this.showGstApplicableElements();
    this.showMaxDemandElements();
    // this.showTotalElements();

    const totalKWH = Bill.getTotalKWH( this.data.devices, this.data.aggregate );
    const totalMaxDemand = Bill.getTotalMaxDemand( this.data.devices );
    let totalCost = 0;
    let totalMaxDemandCost = 0;
    switch ( this.data.tariffName ) {
      case Tariff.COM_C1:
        totalCost = Tariff.calculateCommercialC1WithoutGstIcptMaxDemand( totalKWH );
        totalMaxDemandCost = Tariff.calculateMaxDemandCost( totalMaxDemand, Tariff.COM_C1_MAX_DEMAND );
        break;
      case Tariff.IND_E1:
        totalCost = Tariff.calculateIndustryE1WithoutGstIcptMaxDemand( totalKWH );
        totalMaxDemandCost = Tariff.calculateMaxDemandCost( totalMaxDemand, Tariff.IND_E1_MAX_DEMAND );
        break;
      case Tariff.IND_E1S:
        totalCost = Tariff.calculateIndustryE1sWithoutGstIcptMaxDemand( totalKWH );
        totalMaxDemandCost = Tariff.calculateMaxDemandCost( totalMaxDemand, Tariff.IND_E1S_MAX_DEMAND );
        break;
      case Tariff.MIN_F1:
        totalCost = Tariff.calculateMiningF1WithoutGstIcptMaxDemand( totalKWH );
        totalMaxDemandCost = Tariff.calculateMaxDemandCost( totalMaxDemand, Tariff.MIN_F1_MAX_DEMAND );
        break;
      case Tariff.AGR_H1:
        totalCost = Tariff.calculateAgricultureH1WithoutGstIcptMaxDemand( totalKWH );
        totalMaxDemandCost = Tariff.calculateMaxDemandCost( totalMaxDemand, Tariff.AGR_H1_MAX_DEMAND );
        break;
    }


    const totalIcptCost = Tariff.calculateICPTCost( totalKWH );
    const consumptionCost = totalCost;
    const deductedIcptCost = consumptionCost + totalIcptCost + totalMaxDemandCost;
    const gstCost = Tariff.calculateGSTCost( deductedIcptCost );
    const addedGstCost = gstCost + deductedIcptCost;

    this.gstConKwhF.value = ( totalKWH ) + ' kWh';
    this.gstConRmF.value = 'RM ' + Tool.convertSenToRM( consumptionCost );
    this.maxDemandKwF.value = ( totalMaxDemand ) + ' kWh';
    this.maxDemandRmF.value = 'RM ' + Tool.convertSenToRM( totalMaxDemandCost );
    this.gstIcptF.value = 'RM ' + Tool.convertSenToRM( totalIcptCost );
    this.gstDeductedIcptF.value = 'RM ' + Tool.convertSenToRM( deductedIcptCost );
    this.gstGstF.value = 'RM ' + Tool.convertSenToRM( gstCost );
    this.gstAddedGstF.value = 'RM ' + Tool.convertSenToRM( addedGstCost );

    this.totalKwhF.value = totalKWH + ' kWh';
    this.totalRmF.value = 'RM ' + Tool.convertSenToRM( addedGstCost );
  }


  private constructWithMaxDemandPeakNonPeak() {
    this.showGstApplicableElements();
    this.showMaxDemandElements();
    // this.showTotalElements();

    const totalPeakKWH = Bill.getTotalPeakKWH( this.data.devices, this.data.aggregate );
    const totalOffPeakKWH = Bill.getTotalOffPeakKWH( this.data.devices, this.data.aggregate );
    const totalMaxDemand = Bill.getTotalMaxDemand( this.data.devices );
    let totalCost = 0;
    let totalMaxDemandCost = 0;
    switch ( this.data.tariffName ) {
      case Tariff.COM_C2:
        totalCost = Tariff.calculateCommercialC2WithoutGstIcptMaxDemand( totalPeakKWH, totalOffPeakKWH );
        totalMaxDemandCost = Tariff.calculateMaxDemandCost( totalMaxDemand, Tariff.COM_C2_MAX_DEMAND );
        break;
      case Tariff.IND_E2:
        totalCost = Tariff.calculateIndustryE2WithoutGstIcptMaxDemand( totalPeakKWH, totalOffPeakKWH );
        totalMaxDemandCost = Tariff.calculateMaxDemandCost( totalMaxDemand, Tariff.IND_E2_MAX_DEMAND );
        break;
      case Tariff.IND_E2S:
        totalCost = Tariff.calculateIndustryE2sWithoutGstIcptMaxDemand( totalPeakKWH, totalOffPeakKWH );
        totalMaxDemandCost = Tariff.calculateMaxDemandCost( totalMaxDemand, Tariff.IND_E2S_MAX_DEMAND );
        break;
      case Tariff.IND_E3:
        totalCost = Tariff.calculateIndustryE3WithoutGstIcptMaxDemand( totalPeakKWH, totalOffPeakKWH );
        totalMaxDemandCost = Tariff.calculateMaxDemandCost( totalMaxDemand, Tariff.IND_E3_MAX_DEMAND );
        break;
      case Tariff.IND_E3S:
        totalCost = Tariff.calculateIndustryE3sWithoutGstIcptMaxDemand( totalPeakKWH, totalOffPeakKWH );
        totalMaxDemandCost = Tariff.calculateMaxDemandCost( totalMaxDemand, Tariff.IND_E3S_MAX_DEMAND );
        break;
      case Tariff.MIN_F2:
        totalCost = Tariff.calculateMiningF2WithoutGstIcptMaxDemand( totalPeakKWH, totalOffPeakKWH );
        totalMaxDemandCost = Tariff.calculateMaxDemandCost( totalMaxDemand, Tariff.MIN_F2_MAX_DEMAND );
        break;
      case Tariff.AGR_H2:
        totalCost = Tariff.calculateAgricultureH2WithoutGstIcptMaxDemand( totalPeakKWH, totalOffPeakKWH );
        totalMaxDemandCost = Tariff.calculateMaxDemandCost( totalMaxDemand, Tariff.AGR_H2_MAX_DEMAND );
        break;
    }

    const totalKWH = totalPeakKWH + totalOffPeakKWH;
    const totalIcptCost = Tariff.calculateICPTCost( totalKWH );
    const consumptionCost = totalCost;
    const deductedIcptCost = consumptionCost + totalIcptCost + totalMaxDemandCost;
    const gstCost = Tariff.calculateGSTCost( deductedIcptCost );
    const addedGstCost = gstCost + deductedIcptCost;

    this.gstConKwhF.value = ( totalKWH ) + ' kWh';
    this.gstConRmF.value = 'RM ' + Tool.convertSenToRM( consumptionCost );
    this.maxDemandKwF.value = ( totalMaxDemand ) + ' kWh';
    this.maxDemandRmF.value = 'RM ' + Tool.convertSenToRM( totalMaxDemandCost );
    this.gstIcptF.value = 'RM ' + Tool.convertSenToRM( totalIcptCost );
    this.gstDeductedIcptF.value = 'RM ' + Tool.convertSenToRM( deductedIcptCost );
    this.gstGstF.value = 'RM ' + Tool.convertSenToRM( gstCost );
    this.gstAddedGstF.value = 'RM ' + Tool.convertSenToRM( addedGstCost );

    this.totalKwhF.value = totalKWH + ' kWh';
    this.totalRmF.value = 'RM ' + Tool.convertSenToRM( addedGstCost );
  }


  private showGstApplicableElements() {
    this.gstF.hidden = false;
    this.gstConKwhF.hidden = false;
    this.gstConRmF.hidden = false;
    this.gstIcptF.hidden = false;
    this.gstDeductedIcptF.hidden = false;
    this.gstGstF.hidden = false;
    this.gstAddedGstF.hidden = false;
  }

  private showgstNotApplicableElements() {
    this.notGstF.hidden = false;
    this.notGstConKwhF.hidden = false;
    this.notGstConRmF.hidden = false;
    this.notGstIcptF.hidden = false;
    this.notGstDeductedIcptF.hidden = false;
  }

  private showMaxDemandElements() {
    this.maxDemandKwF.hidden = false;
    this.maxDemandRmF.hidden = false;
  }

  private showTotalElements() {
    this.totalKwhF.hidden = false;
    this.totalRmF.hidden = false;
  }

}
