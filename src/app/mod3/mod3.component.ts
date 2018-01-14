import { Component, OnInit } from '@angular/core';
import _ from 'lodash';

@Component( {
  selector: 'app-mod3',
  templateUrl: './mod3.component.html',
  styleUrls: [ './mod3.component.scss' ]
} )
export class Mod3Component implements OnInit {
  constructor () { }

  ngOnInit() {
    console.log( 'Initializing Main Page' );

  }
}
