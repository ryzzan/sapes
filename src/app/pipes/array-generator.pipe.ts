import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayGenerator'
})
export class ArrayGeneratorPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let arr = [];
    for(let i = 0; i < value; i++) {
      arr.push(i+1);
    }
    return arr;
  }

}
