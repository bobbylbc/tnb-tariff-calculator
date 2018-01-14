import { Tariff } from '../c_modules/tariff.module';
import { Component, OnInit } from '@angular/core';
import { PowerUnit } from '../c_objects/power-unit';
import { FormControl, FormGroup } from '@angular/forms';

@Component( {
  selector: 'app-mod1',
  templateUrl: './mod1.component.html',
  styleUrls: [ './mod1.component.scss' ]
} )

export class Mod1Component implements OnInit {

  devicePower: number;
  powerUnits: any;
  peakHours: number;
  nonPeakHours: number;
  aggregate: string;   // daily, weekly, monthly, yearly
  resultDisplay: any;
  form: FormGroup;
  states: any;

  constructor () { }

  ngOnInit() {
    console.log( 'Domestic A: ' + Tariff.calculateDomesticA( 1000 ) );
    console.log( 'Commercial B: ' + Tariff.calculateCommercialB( 1000 ) );
    console.log( 'Commercial C1: ' + Tariff.calculateCommercialC1( 1000, 50 ) );
    console.log( 'Commercial C2: ' + Tariff.calculateCommercialC2( 800, 200, 50 ) );
    console.log( 'Industry D: ' + Tariff.calculateIndustryD( 1000 ) );
    console.log( 'Industry Ds: ' + Tariff.calculateIndustryDs( 1000 ) );
    console.log( 'Industry E1: ' + Tariff.calculateIndustryE1( 1000, 50 ) );
    console.log( 'Industry E1s: ' + Tariff.calculateIndustryE1s( 1000, 50 ) );
    console.log( 'Industry E2: ' + Tariff.calculateIndustryE2( 800, 200, 50 ) );
    console.log( 'Industry E2s: ' + Tariff.calculateIndustryE2s( 800, 200, 50 ) );
    console.log( 'Industry E3: ' + Tariff.calculateIndustryE3( 800, 200, 50 ) );
    console.log( 'Industry E3s: ' + Tariff.calculateIndustryE3s( 800, 200, 50 ) );
    console.log( 'Mining F: ' + Tariff.calculateMiningF( 1000 ) );
    console.log( 'Mining F1: ' + Tariff.calculateMiningF1( 1000, 50 ) );
    console.log( 'Mining F2: ' + Tariff.calculateMiningF2( 800, 200, 50 ) );
    console.log( 'Agriculture H: ' + Tariff.calculateAgricultureH( 1000 ) );
    console.log( 'Agriculture H1: ' + Tariff.calculateAgricultureH1( 1000, 50 ) );
    console.log( 'Agriculture H2: ' + Tariff.calculateAgricultureH2( 800, 200, 50 ) );

    this.powerUnits = [
      PowerUnit.WATT,
      PowerUnit.KILOWATT,
      PowerUnit.MEGAWATT,
      PowerUnit.GIGAWATT,
      PowerUnit.TERRAWATT
    ];

    this.form = new FormGroup({
      powerUnitControl: new FormControl(this.powerUnits[1]),
    });
  }


  // Recalculate Results onChange
  calculate() {
    console.log (this.form.controls.powerUnitControl.value.name);
    this.getDailyResult();
    this.getMonthlyResult();
    this.getWeeklyResult();
    this.getYearlyResult();
  }

  getDailyResult() {
    // this.devicePower = convertToKWH(this.devicePower, this.selectedPowerUnit);
    // totalKWH = this.

    //    TM.calculateDomesticA( 1000 )
    //    TM.calculateCommercialB( 1000 )
    //    TM.calculateCommercialC1( 1000, 50 )
    //    TM.calculateCommercialC2( 800, 200, 50 )
    //    TM.calculateIndustryD( 1000 )
    //    TM.calculateIndustryDs( 1000 )
    //    TM.calculateIndustryE1( 1000, 50 )
    //    TM.calculateIndustryE1s( 1000, 50 )
    //    TM.calculateIndustryE2( 800, 200, 50 )
    //    TM.calculateIndustryE2s( 800, 200, 50 )
    //    TM.calculateIndustryE3( 800, 200, 50 )
    //    TM.calculateIndustryE3s( 800, 200, 50 )
    //    TM.calculateMiningF( 1000 )
    //    TM.calculateMiningF1( 1000, 50 )
    //    TM.calculateMiningF2( 800, 200, 50 )
    //    TM.calculateAgricultureH( 1000 )
    //    TM.calculateAgricultureH1( 1000, 50 )
    //    TM.calculateAgricultureH2( 800, 200, 50 )
  }

  getWeeklyResult() {

  }

  getMonthlyResult() {

  }

  getYearlyResult() {

  }

  showCalculation() {

  }


  showConsumptionCalculation() {

  }

  showInfoDisclaimer() {

  }

  getTNBRSS() {

  }

}
