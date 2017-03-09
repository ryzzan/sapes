import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayGenerator'
})
export class ArrayGeneratorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
