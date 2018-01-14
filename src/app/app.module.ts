import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatDialogModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { Mod1Component } from './mod1/mod1.component';
import { DeviceFormComponent } from './mod3/device-form/device-form.component';
import { DeviceListComponent } from './mod3/device-list/device-list.component';
import { HolderFormComponent } from './mod3/holder-form/holder-form.component';
import { Mod3Component } from './mod3/mod3.component';
import { ResultListComponent } from './mod3/result-list/result-list.component';
import { CalculationComponent } from './mod3/calculation/calculation.component';
import { ConsumptionComponent } from './mod3/consumption/consumption.component';

@NgModule({
  declarations: [
    AppComponent,
    Mod1Component,
    Mod3Component,
    HolderFormComponent,
    DeviceListComponent,
    DeviceFormComponent,
    ResultListComponent,
    CalculationComponent,
    ConsumptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CalculationComponent, ConsumptionComponent]
})
export class AppModule { }
