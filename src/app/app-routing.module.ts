import { AppComponent } from './app.component';
import { Mod1Component } from './mod1/mod1.component';
import { CalculationComponent } from './mod3/calculation/calculation.component';
import { Mod3Component } from './mod3/mod3.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'obsolete',
    component: Mod1Component
  },
  {
    path: '',
    component: Mod3Component
  }

];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
