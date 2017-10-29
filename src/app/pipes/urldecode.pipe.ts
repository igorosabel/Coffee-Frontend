import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urldecode'
})
export class UrldecodePipe implements PipeTransform {

  transform(str: string): string {
    return this.urldecode(str);
  }
  
  urldecode(str){
    if (!str){ return ''; }
      return decodeURIComponent( str.replace( /\+/g, '%20' ).replace( /\%21/g, '!' ).replace( /\%27/g, "'" ).replace( /\%28/g, '(' ).replace( /\%29/g, ')' ).replace( /\%2A/g, '*' ).replace( /\%7E/g, '~' ) );
  }

}
