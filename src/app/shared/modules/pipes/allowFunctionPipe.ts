import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'test'
})
export class AllowFunctionPipe implements PipeTransform {

  transform(obj: any, defaultFunc: string[], type: any): any {
    var bool = false;
    switch (type) {
      case 'Devices':
        bool = obj.Devices.some((item) => {
          return item === defaultFunc[0] || item === defaultFunc[1] || item === defaultFunc[2] || item === defaultFunc[3];
        });
        bool;
        break;
      case 'License':
        bool = obj.Devices.some((item) => {
          return item === defaultFunc[0] || item === defaultFunc[1] || item === defaultFunc[2] || item === defaultFunc[3];
        });
        bool;
      default:
        break;
    }
    return bool;
  }
}