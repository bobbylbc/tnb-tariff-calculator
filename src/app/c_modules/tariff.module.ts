import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: []
} )
export class Tariff {
  /** Tariff Names **/
  public static get DOM_A(): string { return 'DOMESTIC A'; }
  public static get COM_B(): string { return 'COMMERCIAL B'; }
  public static get COM_C1(): string { return 'COMMERCIAL C1'; }
  public static get COM_C2(): string { return 'COMMERCIAL C2'; }
  public static get IND_D(): string { return 'INDUSTRY D'; }
  public static get IND_DS(): string { return 'INDUSTRY Ds'; }
  public static get IND_E1(): string { return 'INDUSTRY E1'; }
  public static get IND_E1S(): string { return 'INDUSTRY E1s'; }
  public static get IND_E2(): string { return 'INDUSTRY E2'; }
  public static get IND_E2S(): string { return 'INDUSTRY E2s'; }
  public static get IND_E3(): string { return 'INDUSTRY E3'; }
  public static get IND_E3S(): string { return 'INDUSTRY E3s'; }
  public static get MIN_F(): string { return 'MINING F'; }
  public static get MIN_F1(): string { return 'MINING F1'; }
  public static get MIN_F2(): string { return 'MINING F2'; }
  public static get AGR_H(): string { return 'AGRICULTURE H'; }
  public static get AGR_H1(): string { return 'AGRICULTURE H1'; }
  public static get AGR_H2(): string { return 'AGRICULTURE H2'; }



  /** ICPT Jan 2018 - June 2018 **/
  public static get ICPT(): number { return -1.52; } // sen/kWh
  public static get ICPT_DOM_KWH_LMT(): number { return 300; }

  /** GST as of 1st April 2015 **/
  public static get GST(): number { return 0.06; } // 6%

  /**Charges as of 1st Jan 2014 **/
  /** Tariff A - Domestic Tariff (sen/kWh) **/
  public static get DOM_A_0_200(): number { return 21.80; }
  public static get DOM_A_201_300(): number { return 33.40; }
  public static get DOM_A_301_600(): number { return 51.60; }
  public static get DOM_A_601_900(): number { return 54.60; }
  public static get DOM_A_901_MORE(): number { return 57.10; }
  public static get DOM_A_MIN_CHARGE(): number { return 300; } // Flat Rate

  /** Tariff B - Low Voltage Commercial Tariff (sen/kWh) **/
  public static get COM_B_0_200(): number { return 43.50; }
  public static get COM_B_201_MORE(): number { return 50.90; }
  public static get COM_B_MIN_CHARGE(): number { return 720; }

  /** Tariff C1 - Medium Voltage General Commercial Tariff (sen/kWh) **/
  public static get COM_C1_ALL(): number { return 36.50; }
  public static get COM_C1_MAX_DEMAND(): number { return 3030; }
  public static get COM_C1_MIN_CHARGE(): number { return 60000; } // Flat Rate

  /** Tariff C2 - Medium Voltage Peak / Off-Peak Commercial Tariff (sen/kWh) **/
  public static get COM_C2_PEAK(): number { return 36.50; }
  public static get COM_C2_OFF_PEAK(): number { return 22.40; }
  public static get COM_C2_MAX_DEMAND(): number { return 4510; }
  public static get COM_C2_MIN_CHARGE(): number { return 60000; } // Flat Rate

  /** Tariff D - Low Voltage Industrial Tariff (sen/kWh) **/
  public static get IND_D_0_200(): number { return 38.00; }
  public static get IND_D_201_MORE(): number { return 44.10; }
  public static get IND_D_MIN_CHARGE(): number { return 720; } // Flat Rate

  /** Tariff Ds - Low Voltage Special Industrial Tariff (sen/kWh) **/
  public static get IND_DS_ALL(): number { return 43.60; }
  public static get IND_DS_MIN_CHARGE(): number { return 720; } // Flat Rate



  /** Tariff E1 - Medium Voltage General Industrial Tariff (sen/kWh) **/
  public static get IND_E1_ALL(): number { return 33.70; }
  public static get IND_E1_MAX_DEMAND(): number { return 2960; }
  public static get IND_E1_MIN_CHARGE(): number { return 60000; } // Flat Rate

   /** Tariff E1s - Medium Voltage Special Industrial Tariff (sen/kWh) **/
  public static get IND_E1S_ALL(): number { return 33.70; }
  public static get IND_E1S_MAX_DEMAND(): number { return 2850; }
  public static get IND_E1S_MIN_CHARGE(): number { return 60000; } // Flat Rate


  /** Tariff E2 - Medium Voltage Peak/Off-Peak Industrial Tariff(sen/kWh) **/
  public static get IND_E2_PEAK(): number { return 35.50; }
  public static get IND_E2_OFF_PEAK(): number { return 21.90; }
  public static get IND_E2_MAX_DEMAND(): number { return 3700; }
  public static get IND_E2_MIN_CHARGE(): number { return 60000; } // Flat Rate

  /** Tariff E2 - Medium Voltage Peak/Off-Peak Industrial Tariff(sen/kWh) **/
  public static get IND_E2S_PEAK(): number { return 35.00; }
  public static get IND_E2S_OFF_PEAK(): number { return 19.90; }
  public static get IND_E2S_MAX_DEMAND(): number { return 3430; }
  public static get IND_E2S_MIN_CHARGE(): number { return 60000; } // Flat Rate


  /** Tariff E3 - High Voltage Peak/Off-Peak Industrial Tariff (sen/kWh) **/
  public static get IND_E3_PEAK(): number { return 33.70; }
  public static get IND_E3_OFF_PEAK(): number { return 20.20; }
  public static get IND_E3_MAX_DEMAND(): number { return 3550; }
  public static get IND_E3_MIN_CHARGE(): number { return 60000; } // Flat Rate

  /** Tariff E3 - High Voltage Peak/Off-Peak Industrial Tariff (sen/kWh) **/
  public static get IND_E3S_PEAK(): number { return 32.90; }
  public static get IND_E3S_OFF_PEAK(): number { return 18.30; }
  public static get IND_E3S_MAX_DEMAND(): number { return 3020; }
  public static get IND_E3S_MIN_CHARGE(): number { return 60000; } // Flat Rate


  /** Tariff F - Low Voltage Mining Tariff (sen/kWh) **/
  public static get MIN_F_ALL(): number { return 38.10; }
  public static get MIN_F_MIN_CHARGE(): number { return 12000; } // Flat Rate

  /** Tariff F1 - Medium Voltage General Peak/Off-Peak Mining Tariff(sen/kWh) **/
  public static get MIN_F1_ALL(): number { return 31.30; }
  public static get MIN_F1_MAX_DEMAND(): number { return 2110; }
  public static get MIN_F1_MIN_CHARGE(): number { return 12000; } // Flat Rate

  /** Tariff F2 - Medium Voltage Peak/Off-Peak Mining Tariff (sen/kWh) **/
  public static get MIN_F2_PEAK(): number { return 31.30; }
  public static get MIN_F2_OFF_PEAK(): number { return 17.20; }
  public static get MIN_F2_MAX_DEMAND(): number { return 2980; }
  public static get MIN_F2_MIN_CHARGE(): number { return 12000; } // Flat Rate

  /** Tariff H - Low Voltage Specific Agriculture Tariff(sen/kWh) **/
  public static get AGR_H_0_200(): number { return 39.00; }
  public static get AGR_H_201_MORE(): number { return 47.20; }
  public static get AGR_H_MIN_CHARGE(): number { return 7200; } // Flat Rate

  /** Tariff H1 - Medium Voltage General Specific Agriculture Tariff (sen/kWh) **/
  public static get AGR_H1_ALL(): number { return 35.10; }
  public static get AGR_H1_MAX_DEMAND(): number { return 3030; }
  public static get AGR_H1_MIN_CHARGE(): number { return 60000; } // Flat Rate

  /** Tariff H2 - Medium Voltage Peak/Off-Peak Agricultre Tariff (sen/kWh) **/
  public static get AGR_H2_PEAK(): number { return 36.50; }
  public static get AGR_H2_OFF_PEAK(): number { return 22.40; }
  public static get AGR_H2_MAX_DEMAND(): number { return 4080; }
  public static get AGR_H2_MIN_CHARGE(): number { return 60000; } // Flat Rate

  public static calculateDomesticA( totalKWH: number ): number {
    let totalCharges: number;
    if ( totalKWH === 0 ) {
      totalCharges = 0;
    } else {
      totalCharges = this.getCharges( totalKWH, 0, 200, this.DOM_A_0_200 );
      totalCharges += this.getCharges( totalKWH, 200, 300, this.DOM_A_201_300 );
      // Check if Applicable for ICPT
      if ( totalKWH > this.ICPT_DOM_KWH_LMT ) {
        totalCharges += this.calculateICPTCost( this.ICPT_DOM_KWH_LMT ); // Adding ICPT to non-gst charges

        let gstApplicable = this.getCharges( totalKWH, 300, 600, this.DOM_A_301_600 );
        gstApplicable += this.getCharges( totalKWH, 600, 900, this.DOM_A_601_900 );
        gstApplicable += this.getCharges( totalKWH, 900, null, this.DOM_A_901_MORE );
        gstApplicable += this.calculateICPTCost( totalKWH - this.ICPT_DOM_KWH_LMT );
        gstApplicable += this.calculateGSTCost( gstApplicable );

        totalCharges += gstApplicable;
      }
    }

    return totalCharges;
  }

  public static calculateCommercialB( totalKWH: number ): number {
    let totalCharges: number;
    if ( totalKWH === 0 ) {
      totalCharges = 0;
    } else {
      totalCharges = this.getCharges( totalKWH, 0, 200, this.COM_B_0_200 );
      totalCharges += this.getCharges( totalKWH, 200, null, this.COM_B_201_MORE );
      totalCharges += this.calculateICPTCost( totalKWH );
      totalCharges += this.calculateGSTCost( totalCharges );
    }

    return totalCharges;
  }

  public static calculateCommercialC1( totalKWH: number, maxDemand: number ): number {
    let totalCharges: number;
    if ( totalKWH === 0 ) {
      totalCharges = 0;
    } else {
      totalCharges = this.getCharges( totalKWH, 0, null, this.COM_C1_ALL );
      totalCharges += this.calculateMaxDemandCost( maxDemand, this.COM_C1_MAX_DEMAND );
      totalCharges += this.calculateICPTCost( totalKWH );
      totalCharges += this.calculateGSTCost( totalCharges );
    }

    return totalCharges;
  }

  public static calculateCommercialC2( peakKWH: number, offPeakKWH: number, maxDemand: number ): number {
    let totalCharges: number;

    totalCharges = peakKWH * this.COM_C2_PEAK;
    totalCharges += offPeakKWH * this.COM_C2_OFF_PEAK;
    totalCharges += this.calculateICPTCost( peakKWH + offPeakKWH );
    totalCharges += maxDemand * this.COM_C2_MAX_DEMAND;
    totalCharges += this.calculateGSTCost( totalCharges );


    return totalCharges;
  }

  public static calculateIndustryD( totalKWH: number ): number {
    let totalCharges: number;

    totalCharges = this.getCharges( totalKWH, 0, 200, this.IND_D_0_200 );
    totalCharges += this.getCharges( totalKWH, 200, null, this.IND_D_201_MORE );
    totalCharges += this.calculateICPTCost( totalKWH );
    totalCharges += this.calculateGSTCost( totalCharges );


    return totalCharges;
  }

  public static calculateIndustryDs( totalKWH: number ): number {
    let totalCharges: number;

    totalCharges = this.getCharges( totalKWH, 0, null, this.IND_DS_ALL );
    totalCharges += this.calculateICPTCost( totalKWH );
    totalCharges += this.calculateGSTCost( totalCharges );


    return totalCharges;
  }

  public static calculateIndustryE1( totalKWH: number, maxDemand: number ): number {
    let totalCharges: number;

    totalCharges = this.getCharges( totalKWH, 0, null, this.IND_E1_ALL );
    totalCharges += this.calculateICPTCost( totalKWH );
    totalCharges += maxDemand * this.IND_E1_MAX_DEMAND;
    totalCharges += this.calculateGSTCost( totalCharges );


    return totalCharges;
  }

  public static calculateIndustryE1s( totalKWH: number, maxDemand: number ): number {
    let totalCharges: number;

    totalCharges = this.getCharges( totalKWH, 0, null, this.IND_E1S_ALL );
    totalCharges += this.calculateICPTCost( totalKWH );
    totalCharges += maxDemand * this.IND_E1S_MAX_DEMAND;
    totalCharges += this.calculateGSTCost( totalCharges );


    return totalCharges;
  }

  public static calculateIndustryE2( peakKWH: number, offPeakKWH: number, maxDemand: number ): number {
    let totalCharges: number;

    totalCharges = peakKWH * this.IND_E2_PEAK;
    totalCharges += offPeakKWH * this.IND_E2_OFF_PEAK;
    totalCharges += this.calculateICPTCost( peakKWH + offPeakKWH );
    totalCharges += maxDemand * this.IND_E2_MAX_DEMAND;
    totalCharges += this.calculateGSTCost( totalCharges );

    return totalCharges;
  }

  public static calculateIndustryE2s( peakKWH: number, offPeakKWH: number, maxDemand: number ): number {
    let totalCharges: number;

    totalCharges = peakKWH * this.IND_E2S_PEAK;
    totalCharges += offPeakKWH * this.IND_E2S_OFF_PEAK;
    totalCharges += this.calculateICPTCost( peakKWH + offPeakKWH );
    totalCharges += maxDemand * this.IND_E2S_MAX_DEMAND;
    totalCharges += this.calculateGSTCost( totalCharges );

    return totalCharges;
  }

  public static calculateIndustryE3( peakKWH: number, offPeakKWH: number, maxDemand: number ): number {
    let totalCharges: number;

    totalCharges = peakKWH * this.IND_E3_PEAK;
    totalCharges += offPeakKWH * this.IND_E3_OFF_PEAK;
    totalCharges += this.calculateICPTCost( peakKWH + offPeakKWH );
    totalCharges += maxDemand * this.IND_E3_MAX_DEMAND;
    totalCharges += this.calculateGSTCost( totalCharges );

    return totalCharges;
  }

  public static calculateIndustryE3s( peakKWH: number, offPeakKWH: number, maxDemand: number ): number {
    let totalCharges: number;

    totalCharges = peakKWH * this.IND_E3S_PEAK;
    totalCharges += offPeakKWH * this.IND_E3S_OFF_PEAK;
    totalCharges += this.calculateICPTCost( peakKWH + offPeakKWH );
    totalCharges += maxDemand * this.IND_E3S_MAX_DEMAND;
    totalCharges += this.calculateGSTCost( totalCharges );

    return totalCharges;
  }

  public static calculateMiningF( totalKWH: number ): number {
    let totalCharges: number;

    totalCharges = this.getCharges( totalKWH, 0, null, this.MIN_F_ALL );
    totalCharges += this.calculateICPTCost( totalKWH );
    totalCharges += this.calculateGSTCost( totalCharges );


    return totalCharges;
  }

  public static calculateMiningF1( totalKWH: number, maxDemand: number ): number {
    let totalCharges: number;

    totalCharges = this.getCharges( totalKWH, 0, null, this.MIN_F1_ALL );
    totalCharges += this.calculateICPTCost( totalKWH );
    totalCharges += maxDemand * this.MIN_F1_MAX_DEMAND;
    totalCharges += this.calculateGSTCost( totalCharges );


    return totalCharges;
  }

  public static calculateMiningF2( peakKWH: number, offPeakKWH: number, maxDemand: number ): number {
    let totalCharges: number;

    totalCharges = peakKWH * this.MIN_F2_PEAK;
    totalCharges += offPeakKWH * this.MIN_F2_OFF_PEAK;
    totalCharges += this.calculateICPTCost( peakKWH + offPeakKWH );
    totalCharges += maxDemand * this.MIN_F2_MAX_DEMAND;
    totalCharges += this.calculateGSTCost( totalCharges );

    return totalCharges;
  }

  public static calculateAgricultureH( totalKWH: number ): number {
    let totalCharges: number;

    totalCharges = this.getCharges( totalKWH, 0, 200, this.AGR_H_0_200 );
    totalCharges += this.getCharges( totalKWH, 200, null, this.AGR_H_201_MORE );
    totalCharges += this.calculateICPTCost( totalKWH );
    totalCharges += this.calculateGSTCost( totalCharges );

    return totalCharges;
  }

  public static calculateAgricultureH1( totalKWH: number, maxDemand: number ): number {
    let totalCharges: number;

    totalCharges = this.getCharges( totalKWH, 0, null, this.AGR_H1_ALL );
    totalCharges += this.calculateICPTCost( totalKWH );
    totalCharges += maxDemand * this.AGR_H1_MAX_DEMAND;
    totalCharges += this.calculateGSTCost( totalCharges );


    return totalCharges;
  }

  public static calculateAgricultureH2( peakKWH: number, offPeakKWH: number, maxDemand: number ): number {
    let totalCharges: number;

    totalCharges = peakKWH * this.AGR_H2_PEAK;
    totalCharges += offPeakKWH * this.AGR_H2_OFF_PEAK;
    totalCharges += this.calculateICPTCost( peakKWH + offPeakKWH );
    totalCharges += maxDemand * this.AGR_H2_MAX_DEMAND;
    totalCharges += this.calculateGSTCost( totalCharges );

    return totalCharges;
  }


  /** Not use for Actual Calculation, Only for Display Purpose **/
   public static calculateDomesticAWithoutGstIcptMaxDemand( totalKWH: number ): number {
    let totalCharges: number;
    if ( totalKWH === 0 ) {
      totalCharges = 0;
    } else {
      totalCharges = this.getCharges( totalKWH, 0, 200, this.DOM_A_0_200 );
      totalCharges += this.getCharges( totalKWH, 200, 300, this.DOM_A_201_300 );
      // Check if Applicable for ICPT
      if ( totalKWH > this.ICPT_DOM_KWH_LMT ) {
        let gstApplicable = this.getCharges( totalKWH, 300, 600, this.DOM_A_301_600 );
        gstApplicable += this.getCharges( totalKWH, 600, 900, this.DOM_A_601_900 );
        gstApplicable += this.getCharges( totalKWH, 900, null, this.DOM_A_901_MORE );

        totalCharges += gstApplicable;
      }
    }

    return totalCharges;
  }

  /** Not use for Actual Calculation, Only for Display Purpose **/
  public static calculateCommercialBWithoutGstIcptMaxDemand( totalKWH: number ): number {
    let totalCharges: number;
    if ( totalKWH === 0 ) {
      totalCharges = 0;
    } else {
      totalCharges = this.getCharges( totalKWH, 0, 200, this.COM_B_0_200 );
      totalCharges += this.getCharges( totalKWH, 200, null, this.COM_B_201_MORE );
    }

    return totalCharges;
  }

  /** Not use for Actual Calculation, Only for Display Purpose **/
  public static calculateCommercialC1WithoutGstIcptMaxDemand( totalKWH: number ): number {
    let totalCharges: number;
    if ( totalKWH === 0 ) {
      totalCharges = 0;
    } else {
      totalCharges = this.getCharges( totalKWH, 0, null, this.COM_C1_ALL );
    }

    return totalCharges;
  }


  /** Not use for Actual Calculation, Only for Display Purpose **/
  public static calculateCommercialC2WithoutGstIcptMaxDemand( peakKWH: number, offPeakKWH: number ): number {
    let totalCharges: number;

    totalCharges = peakKWH * this.COM_C2_PEAK;
    totalCharges += offPeakKWH * this.COM_C2_OFF_PEAK;

    return totalCharges;
  }


  /** Not use for Actual Calculation, Only for Display Purpose **/
  public static calculateIndustryDWithoutGstIcptMaxDemand( totalKWH: number ): number {
    let totalCharges: number;

    totalCharges = this.getCharges( totalKWH, 0, 200, this.IND_D_0_200 );
    totalCharges += this.getCharges( totalKWH, 200, null, this.IND_D_201_MORE );


    return totalCharges;
  }


  /** Not use for Actual Calculation, Only for Display Purpose **/
  public static calculateIndustryDsWithoutGstIcptMaxDemand( totalKWH: number ): number {
    let totalCharges: number;

    totalCharges = this.getCharges( totalKWH, 0, null, this.IND_DS_ALL );

    return totalCharges;
  }


  /** Not use for Actual Calculation, Only for Display Purpose **/
  public static calculateIndustryE1WithoutGstIcptMaxDemand( totalKWH: number ): number {
    let totalCharges: number;

    totalCharges = this.getCharges( totalKWH, 0, null, this.IND_E1_ALL );

    return totalCharges;
  }


  /** Not use for Actual Calculation, Only for Display Purpose **/
  public static calculateIndustryE1sWithoutGstIcptMaxDemand( totalKWH: number ): number {
    let totalCharges: number;

    totalCharges = this.getCharges( totalKWH, 0, null, this.IND_E1S_ALL );


    return totalCharges;
  }

  /** Not use for Actual Calculation, Only for Display Purpose **/
  public static calculateIndustryE2WithoutGstIcptMaxDemand( peakKWH: number, offPeakKWH: number ): number {
    let totalCharges: number;

    totalCharges = peakKWH * this.IND_E2_PEAK;
    totalCharges += offPeakKWH * this.IND_E2_OFF_PEAK;

    return totalCharges;
  }


  /** Not use for Actual Calculation, Only for Display Purpose **/
  public static calculateIndustryE2sWithoutGstIcptMaxDemand( peakKWH: number, offPeakKWH: number ): number {
    let totalCharges: number;

    totalCharges = peakKWH * this.IND_E2S_PEAK;
    totalCharges += offPeakKWH * this.IND_E2S_OFF_PEAK;

    return totalCharges;
  }


  /** Not use for Actual Calculation, Only for Display Purpose **/
  public static calculateIndustryE3WithoutGstIcptMaxDemand( peakKWH: number, offPeakKWH: number ): number {
    let totalCharges: number;

    totalCharges = peakKWH * this.IND_E3_PEAK;
    totalCharges += offPeakKWH * this.IND_E3_OFF_PEAK;

    return totalCharges;
  }

  /** Not use for Actual Calculation, Only for Display Purpose **/
  public static calculateIndustryE3sWithoutGstIcptMaxDemand( peakKWH: number, offPeakKWH: number ): number {
    let totalCharges: number;

    totalCharges = peakKWH * this.IND_E3S_PEAK;
    totalCharges += offPeakKWH * this.IND_E3S_OFF_PEAK;

    return totalCharges;
  }


  /** Not use for Actual Calculation, Only for Display Purpose **/
  public static calculateMiningFWithoutGstIcptMaxDemand( totalKWH: number ): number {
    let totalCharges: number;

    totalCharges = this.getCharges( totalKWH, 0, null, this.MIN_F_ALL );

    return totalCharges;
  }

  /** Not use for Actual Calculation, Only for Display Purpose **/
  public static calculateMiningF1WithoutGstIcptMaxDemand( totalKWH: number ): number {
    let totalCharges: number;

    totalCharges = this.getCharges( totalKWH, 0, null, this.MIN_F1_ALL );


    return totalCharges;
  }

  /** Not use for Actual Calculation, Only for Display Purpose **/
  public static calculateMiningF2WithoutGstIcptMaxDemand( peakKWH: number, offPeakKWH: number ): number {
    let totalCharges: number;

    totalCharges = peakKWH * this.MIN_F2_PEAK;
    totalCharges += offPeakKWH * this.MIN_F2_OFF_PEAK;

    return totalCharges;
  }

  /** Not use for Actual Calculation, Only for Display Purpose **/
  public static calculateAgricultureHWithoutGstIcptMaxDemand( totalKWH: number ): number {
    let totalCharges: number;

    totalCharges = this.getCharges( totalKWH, 0, 200, this.AGR_H_0_200 );
    totalCharges += this.getCharges( totalKWH, 200, null, this.AGR_H_201_MORE );

    return totalCharges;
  }

  /** Not use for Actual Calculation, Only for Display Purpose **/
  public static calculateAgricultureH1WithoutGstIcptMaxDemand( totalKWH: number ): number {
    let totalCharges: number;

    totalCharges = this.getCharges( totalKWH, 0, null, this.AGR_H1_ALL );


    return totalCharges;
  }

  /** Not use for Actual Calculation, Only for Display Purpose **/
  public static calculateAgricultureH2WithoutGstIcptMaxDemand( peakKWH: number, offPeakKWH: number ): number {
    let totalCharges: number;

    totalCharges = peakKWH * this.AGR_H2_PEAK;
    totalCharges += offPeakKWH * this.AGR_H2_OFF_PEAK;

    return totalCharges;
  }


  public static getCharges( kWh: number, kWhMin: number, kWhMax: number, tariff: number ): number {

    if ( kWhMax !== null ) {
      if ( kWh > kWhMax ) {
        return ( kWhMax - kWhMin ) * tariff;
      } else if ( kWh > kWhMin ) {
        return ( kWh - kWhMin ) * tariff;
      }
    } else {
      if ( kWh > kWhMin ) {
        return ( kWh - kWhMin ) * tariff;
      }
    }
    return 0;
  }

  public static calculateICPTCost( kWh: number ) {
    return kWh * this.ICPT;
  }

  public static calculateGSTCost( charges: number ) {
    return charges * this.GST;
  }

  public static calculateMaxDemandCost( kWh: number, maxDemand: number ) {
    return kWh * maxDemand;
  }
}
