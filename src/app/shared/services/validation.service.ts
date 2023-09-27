import { Injectable } from "@angular/core";
import { AbstractControl } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class validationService {
  formChecker(obj) {
    var requiredobj = {};
    var nonrequiredobj = {};
    for (var key in obj) {
      if (obj[key].controls === undefined) {
        const validator = obj[key].validator({} as AbstractControl);
        if (validator && validator.required) {
          requiredobj[key] = obj[key].value;
        } else {
          nonrequiredobj[key] = obj[key].value;
        }
      } else {
        let obj2 = obj[key].controls;
        for (var key2 in obj2) {
          const validator = obj2[key2].validator({} as AbstractControl);
          if (validator && validator.required) {
            requiredobj[key] = {};
            requiredobj[key][key2] = obj2[key2].value;
          } else {
            nonrequiredobj[key] = {};
            nonrequiredobj[key][key2] = obj2[key2].value;
          }
        }
      }
    }
    for (var key in requiredobj) {
      if (typeof requiredobj[key] === "object" && requiredobj[key] !== null) {
        let objIn = requiredobj[key];
        for (var key2 in objIn) {
          let str = key2.toLowerCase();
          if (!str.includes("id")) {
            objIn[key2] = objIn[key2].toString().trim();

            if (objIn[key2] === "") {
              return { key: key2, value: false };
            }
          } else {
            objIn[key2] = parseInt(objIn[key2]);
          }
        }
      } else {
        requiredobj[key] = requiredobj[key].toString().trim();
      }

      if (requiredobj[key] === "") {
        return { key: key, value: false };
      }
    }
    return { ...requiredobj, ...nonrequiredobj };
  }
  duplicateValue(obj) {
    if (obj[0].ID < 0) {
      return true;
    } else {
      return false;
    }
  }
}
