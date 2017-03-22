import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstAndLastName'
})
export class FirstAndLastNamePipe implements PipeTransform {

  transform(name: string): any {
    let result;
    let array;
    if(name != null && name != undefined) {
      array = name.split(" ");

      if(array.length > 1) {
        result = array[0] + " " + array[array.length - 1];
      } 
      
      if(array.length == 1) {
        result = array[0];
      }
    }

    return result;
  }

}
