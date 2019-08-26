import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'take'
})
export class TakePipe implements PipeTransform {
  transform(value: any[], type: 'even' | 'odd', ...args: any[]): any[] {
    if (type === 'even') {
      return value.filter(
        (_, index) => index % 2 === 0
      );
    } else if (type === 'odd') {
      return value.filter(
        (_, index) => index % 2 === 1
      );
    }
  }
}
