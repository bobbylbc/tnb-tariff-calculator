import { Tariff } from './tariff.module';
import { BillData } from '../c_interfaces/bill-data';
import { DeviceData } from '../c_interfaces/device-data';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: []
} )

export class Bill {

  public static DAILY(): string { return 'DAILY'; }
  public static WEEKLY(): string { return 'WEEKLY'; }
  public static MONTHLY(): string { return 'MONTHLY'; }

  public static calAllTariffResults( devices: DeviceData[] ) {
    let totalKWH = 0;
    let maxDemand = 0;
    let peakHoursKWH = 0;
    let nonPeakHoursKWH = 0;
    let allBillData: any;

    // Total up the KWH, peakHours and nonPeak Hours
    for ( const device of devices ) {
      peakHoursKWH += device.peakDailyHours === null ? 0 : device.peakDailyHours * this.getDevicePowerInKWH( device );
      nonPeakHoursKWH += device.nonPeakDailyHours === null ? 0 : device.nonPeakDailyHours * this.getDevicePowerInKWH( device );
      maxDemand += this.getMaxDemandFromDevicePowerInKWH( device );
    }

    totalKWH = peakHoursKWH + nonPeakHoursKWH;

    allBillData = [
      {
        name: this.DAILY(), totalKWH: this.getTotalKWH(devices, this.DAILY()), bills: this.calTariffResults( totalKWH,
          maxDemand, peakHoursKWH, nonPeakHoursKWH )
      },
      {
        name: this.WEEKLY(), totalKWH: this.getTotalKWH(devices, this.WEEKLY()), bills: this.calTariffResults( this.calWeeklyKWH(totalKWH),
          maxDemand, this.calWeeklyKWH(peakHoursKWH), this.calWeeklyKWH(nonPeakHoursKWH))
      },
      {
        name: this.MONTHLY(), totalKWH: this.getTotalKWH(devices, this.MONTHLY()),
          bills: this.calTariffResults( this.calMonthlyKWH(totalKWH),
          maxDemand, this.calMonthlyKWH(peakHoursKWH), this.calMonthlyKWH(nonPeakHoursKWH))
      },
    ];

    return allBillData;

  }


  private static calWeeklyKWH(val: number): number {
    return val * 7;
  }

  private static calMonthlyKWH(val: number): number {
    return val * 30;
  }

  private static getMaxDemandFromDevicePowerInKWH( device: DeviceData ): number {
    /** Calculate MaxDemand
    * MD is the highest level of electricity demand recorded by TNB meter during a 30-minute
    * interval in a month. The amount charged to customer is based on the recorded MD in kW
    * multiplied by the respective MD rate. For example, the amount payable by a Tariff C2 customer
    * registering 100kW of MD for a particular month is RM4,510 (100kW x RM45.10/kW).​
    */
    if ( device.peakDailyHours > 0 && device.peakDailyHours < 0.5 ) {
      return this.getDevicePowerInKWH( device ) * device.peakDailyHours;
    }

    if ( device.peakDailyHours >= 0.5 ) {
      return this.getDevicePowerInKWH( device ) / 2;
    }

    return 0;
  }


  private static getDevicePowerInKWH( device: DeviceData ): number {
    return ( device.power * device.powerUnit.unitMeasure ) / 1000;
  }

  private static calTariffResults( totalKWH: number, maxDemand: number, peakHoursKWH: number, nonPeakHoursKWH: number ): BillData[] {

    let bills: BillData[];

    // Produce result in array
    bills = [
      { name: Tariff.DOM_A, bill: Tariff.calculateDomesticA( totalKWH ), minimumBill: Tariff.DOM_A_MIN_CHARGE },
      { name: Tariff.COM_B, bill: Tariff.calculateCommercialB( totalKWH ), minimumBill: Tariff.COM_B_MIN_CHARGE },
      { name: Tariff.COM_C1, bill: Tariff.calculateCommercialC1( totalKWH, maxDemand ), minimumBill: Tariff.COM_C1_MIN_CHARGE },
      {
        name: Tariff.COM_C2, bill: Tariff.calculateCommercialC2( peakHoursKWH, nonPeakHoursKWH, maxDemand ),
        minimumBill: Tariff.COM_C2_MIN_CHARGE
      },
      { name: Tariff.IND_D, bill: Tariff.calculateIndustryD( totalKWH ), minimumBill: Tariff.IND_D_MIN_CHARGE },
      {
        name: Tariff.IND_DS, bill: Tariff.calculateIndustryDs( totalKWH ),
        minimumBill: Tariff.IND_DS_MIN_CHARGE
      },
      {
        name: Tariff.IND_E1, bill: Tariff.calculateIndustryE1( totalKWH, maxDemand ),
        minimumBill: Tariff.IND_E1_MIN_CHARGE
      },
      {
        name: Tariff.IND_E1S, bill: Tariff.calculateIndustryE1s( totalKWH, maxDemand ),
        minimumBill: Tariff.IND_E1S_MIN_CHARGE
      },
      {
        name: Tariff.IND_E2, bill: Tariff.calculateIndustryE2( peakHoursKWH, nonPeakHoursKWH, maxDemand ),
        minimumBill: Tariff.IND_E2_MIN_CHARGE
      },
      {
        name: Tariff.IND_E2S, bill: Tariff.calculateIndustryE2s( peakHoursKWH, nonPeakHoursKWH, maxDemand ),
        minimumBill: Tariff.IND_E2S_MIN_CHARGE
      },
      {
        name: Tariff.IND_E3, bill: Tariff.calculateIndustryE3( peakHoursKWH, nonPeakHoursKWH, maxDemand ),
        minimumBill: Tariff.IND_E3_MIN_CHARGE
      },
      {
        name: Tariff.IND_E3S, bill: Tariff.calculateIndustryE3s( peakHoursKWH, nonPeakHoursKWH, maxDemand ),
        minimumBill: Tariff.IND_E3S_MIN_CHARGE
      },
      { name: Tariff.MIN_F, bill: Tariff.calculateMiningF( totalKWH ), minimumBill: Tariff.MIN_F_MIN_CHARGE },
      { name: Tariff.MIN_F1, bill: Tariff.calculateMiningF1( totalKWH, maxDemand ), minimumBill: Tariff.MIN_F1_MIN_CHARGE },
      {
        name: Tariff.MIN_F2, bill: Tariff.calculateMiningF2( peakHoursKWH, nonPeakHoursKWH, maxDemand ),
        minimumBill: Tariff.MIN_F2_MIN_CHARGE
      },
      { name: Tariff.AGR_H, bill: Tariff.calculateAgricultureH( totalKWH ), minimumBill: Tariff.AGR_H_MIN_CHARGE },
      {
        name: Tariff.AGR_H1, bill: Tariff.calculateAgricultureH1( totalKWH, maxDemand ),
        minimumBill: Tariff.AGR_H1_MIN_CHARGE
      },
      {
        name: Tariff.AGR_H2, bill: Tariff.calculateAgricultureH2( peakHoursKWH, nonPeakHoursKWH, maxDemand ),
        minimumBill: Tariff.AGR_H2_MIN_CHARGE
      }
    ];

    return bills;
  }

  // Use for display of calculation details (Not use in actual bill calculation)
  public static getTotalKWH( devices: DeviceData[], aggregate: string ): number {
    let totalKWH = 0;
    let peakHoursKWH = 0;
    let nonPeakHoursKWH = 0;
    for ( const device of devices ) {
      peakHoursKWH += device.peakDailyHours === null ? 0 : device.peakDailyHours * this.getDevicePowerInKWH( device );
      nonPeakHoursKWH += device.nonPeakDailyHours === null ? 0 : device.nonPeakDailyHours * this.getDevicePowerInKWH( device );
    }

    if ( aggregate === this.DAILY() ) {
      totalKWH = peakHoursKWH + nonPeakHoursKWH;
    } else if ( aggregate === this.WEEKLY() ) {
      totalKWH = this.calWeeklyKWH(peakHoursKWH + nonPeakHoursKWH);
    } else if ( aggregate === this.MONTHLY() ) {
      totalKWH = this.calMonthlyKWH(peakHoursKWH + nonPeakHoursKWH);
    }
    return totalKWH;
  }

   // Use for display of calculation details (Not use in actual bill calculation)
  public static getTotalPeakKWH( devices: DeviceData[], aggregate: string ): number {
    let peakHoursKWH = 0;
    for ( const device of devices ) {
      peakHoursKWH += device.peakDailyHours === null ? 0 : device.peakDailyHours * this.getDevicePowerInKWH( device );
    }

    if ( aggregate === this.WEEKLY() ) {
      peakHoursKWH = this.calWeeklyKWH(peakHoursKWH );
    } else if ( aggregate === this.MONTHLY() ) {
      peakHoursKWH = this.calMonthlyKWH(peakHoursKWH );
    }
    return peakHoursKWH;
  }

   // Use for display of calculation details (Not use in actual bill calculation)
  public static getTotalOffPeakKWH( devices: DeviceData[], aggregate: string ): number {

    let nonPeakHoursKWH = 0;
    for ( const device of devices ) {
      nonPeakHoursKWH += device.nonPeakDailyHours === null ? 0 : device.nonPeakDailyHours * this.getDevicePowerInKWH( device );
    }

    if ( aggregate === this.WEEKLY() ) {
      nonPeakHoursKWH = this.calWeeklyKWH(nonPeakHoursKWH);
    } else if ( aggregate === this.MONTHLY() ) {
      nonPeakHoursKWH = this.calMonthlyKWH(nonPeakHoursKWH);
    }
    return nonPeakHoursKWH;
  }

  // Use for display of calculation details (Not use in actual bill calculation)
  public static getTotalMaxDemand( devices: DeviceData[] ): number {
    let maxDemand = 0;
    for ( const device of devices ) {
      maxDemand += this.getMaxDemandFromDevicePowerInKWH( device );
    }

    return maxDemand;
  }

}
