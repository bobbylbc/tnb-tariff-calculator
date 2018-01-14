import { PowerUnit } from '../../c_objects/power-unit';
import { Tool } from '../../c_modules/tools.module';
import { Bill } from '../../c_modules/bill.module';
import { HolderData } from '../../c_interfaces/holder-data';
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import _ from 'lodash';

@Component( {
    selector: 'app-holder-form',
    templateUrl: './holder-form.component.html',
    styleUrls: ['./holder-form.component.scss']
} )
export class HolderFormComponent implements OnInit, AfterViewInit {
    public holderData: HolderData;
    public submittedHolderData: HolderData;
    public results: any;

    public holderForm: FormGroup;

    constructor( private fb: FormBuilder ) { }

    ngOnInit() {
        this.holderData = this.getHolderData();
        this.holderForm = this.toFormGroup( this.holderData );
        this.submittedHolderData = _.cloneDeep( this.holderData );
        console.log( 'Initial holderData', this.holderData );
    }

    ngAfterViewInit() {
        this.holderForm.valueChanges
            .subscribe( value => {
                // console.log( 'Parent Form changed', value );
                this.holderData = _.mergeWith( this.holderData,
                    value,
                    Tool.mergeCustomizer );
            } );
    }

    onSubmit() {
        if ( !this.holderForm.valid ) {
            console.error( 'Holder Form invalid, preventing submission' );
            return false;
        }

        // Custom merging form data with DOM
        const updatedHolderData = _.mergeWith( this.holderData,
            this.holderForm.value,
            Tool.mergeCustomizer );

        console.log( 'Updated holderData', this.holderData );
        console.log( 'Calculating result...' );

        this.results = Bill.calAllTariffResults( this.holderData.devices );
        this.submittedHolderData = _.cloneDeep( this.holderData );

        return false;
    }


    private getHolderData(): HolderData {
        const mockData = {
            id: Tool.generateShortId(),
            devices: [
                {
                    id: Tool.generateShortId(),
                    name: 'Test Device',
                    powerUnit: PowerUnit.KILOWATT,
                    power: 3,
                    peakDailyHours: 10,
                    nonPeakDailyHours: 0
                }
            ]
        };
        return mockData;
    }

    private toFormGroup( data: HolderData ): FormGroup {
        const formGroup = this.fb.group( {
            id: [data.id],
        } );
        return formGroup;
    }



}
