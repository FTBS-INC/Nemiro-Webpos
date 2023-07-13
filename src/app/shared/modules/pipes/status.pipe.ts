import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "Status",
})
export class StatusPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value === true) {
      return "Active";
    } else if (value === false) {
      return "InActive";
    }
  }
}
