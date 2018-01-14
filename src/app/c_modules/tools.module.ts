import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import _ from 'lodash';

@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: []
} )
export class Tool {
  // 25 alphanumeric, removed profanity, alike-number&alphabets and uppercases
  private static ALPHABET = '23456789abdegjkmnpqrvwxyz';
  private static ID_LENGTH = 8;
  private static UNIQUE_RETRIES = 999;

  public static generateShortId(): string {
    let rtn = '';
    for ( let i = 0; i < this.ID_LENGTH; i++ ) {
      rtn += this.ALPHABET.charAt( Math.floor( Math.random() * this.ALPHABET.length ) );
    }
    return rtn;

  }

  public static generateShortIdExtraSafe( previous: [ string ] ): string {
    let retries = 0;
    let id: string;

    while ( !id && retries < this.UNIQUE_RETRIES ) {
      id = this.generateShortId();
      if ( previous.indexOf( id ) !== -1 ) {
        id = null;
        retries++;
      }
    }
    return id;
  }


  /** Custom Merge by id **/
  public static mergeCustomizer = ( objValue, srcValue ) => {
    if ( _.isArray( objValue ) ) {
      if ( _.isPlainObject( objValue[ 0 ] ) || _.isPlainObject( srcValue[ 0 ] ) ) {
        // If we found an array of objects, take our form values, and
        // attempt to merge them into existing values in the data model,
        // defaulting back to new empty object if none found.
        return srcValue.map( src => {
          const obj = _.find( objValue, { id: src.id } );
          return _.mergeWith( obj || {}, src, Tool.mergeCustomizer );
        } );

      }
      return srcValue;
    }
  }



  public static convertSenToRM( val: number ): string {
    val = val / 100;

    return val.toFixed(2);
  }

  public static convertSenToRM_V2( val: number ): string {
    val = val / 100;

    return val.toFixed(4);
  }

}
