import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { RequestClass } from "../../../shared/requestClass/request";
import { GlobalService } from "src/app/shared/services";
import swal from "sweetalert2";
import { Observable, Subscriber } from "rxjs";

@Component({
  selector: "app-patient",
  templateUrl: "./patient.component.html",
  styleUrls: ["./patient.component.scss"],
})
export class PatientComponent implements OnInit {
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
    class: "modal-lg"
  };
  patientList: any = [];
  consultantList: any = [];
  diagnosisList: Array<String> = [];
  modalRef: BsModalRef;
  addPatientForm: FormGroup;
  formForAdd: any = false;
  formForEdit: any = false;
  loading: any = false;
  btnDisable: any = false;
  isPatientNameDuplicate: any = false;
  isValidating: any = false;
  PatientNameForUpdate: any = "";
  PatientCodeForUpdate: any = "";
  isMarkCorrect: any = false;
  selectedObj: any;
  formControl: any = false;
  PatientNameToValidate: any = false;
  PatientCodeToValidate: any = false;
  p: number = 1;
  totalRecords: number;
  recordsPerPage: number;
  patientCheck: boolean = false;
  patientRepeat: boolean = true;
  date: any = new Date();
  input: string = "";
  patientImage: Observable<any>;
  base64Image: any;
  temp: any;
  displayImage: any;
  patientIDForUpdate: any;
  objUpdate: any;
  btnForUpdate: any = true;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private request: RequestClass,
    private spinner: NgxSpinnerService,
    private global: GlobalService
  ) {
    this.addPatientForm = formBuilder.group({
      patientIMG: [this.patientImage, [Validators.required]],
      patientNo: ["", [Validators.required]],
      patientName: ["", [Validators.required]],
      patientAge: ["", [Validators.required]],
      patientDiagnoses: ["", [Validators.required]],
      patientPhoneNo: ["", [Validators.required]],
      consultant: ["", [Validators.required]],
      oneTimeRepeat: this.patientRepeat,
      patientisActive: this.patientCheck,
    });
  }

  ngOnInit(): void {
    this.getPatient();
    this.dropdownList();
  }

  onChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    console.log(file);

    this.base64conversion(file);
  }

  base64conversion(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });

    observable.subscribe((e) => {
      console.log(e);

      this.patientImage = e;
      this.base64Image = e;
    });
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    };

    fileReader.onerror = () => {
      subscriber.error();
      subscriber.complete();
    };
  }

  displayPrescription(obj: any, template: TemplateRef<any>) {
    this.displayImage = obj;
    this.modalRef = this.modalService.show(template);
  }

  dropdownList() {
    try {

      // this.spinner.show();
      // this.request.getRequest('Batch​/GetBatch').subscribe((response) => {
      this.request
        .getRequest(`Consultant/GetAllConsultants?PageNo=-1`)
        .subscribe(
          (response) => {
            console.log("Response at getConsultant: ", response.data);
            this.consultantList = response.data.data;
            // this.totalRecords = response.data.totalNoRecords;
            // this.recordsPerPage = response.data.recordsPerPage;
            // this.spinner.hide();
          },
          (error) => {
            console.log("Error at request  getConsultant", error);
            // this.spinner.hide();
          }
        );
    } catch (error) {
      console.log("Exception at getBatch: ", error);
    }
  }

  setUpdateBtn() {
    debugger;
    if (this.objUpdate !== this.addPatientForm.value)
    {
      this.btnForUpdate = false
    }
    else {
      this.btnForUpdate = true;
    }
  }
  pageChange(page: any) {
    try {

      // this.spinner.show();
      // this.request.getRequest('Batch​/GetBatch').subscribe((response) => {
      this.request
        .getRequest(`Patient/GetAllPatients?PageNo=${page}`)
        .subscribe(
          (response) => {
            console.log("Response at getBatch: ", response.data);
            this.patientList = response.data.data;
            this.totalRecords = response.data.totalNoRecords;
            this.recordsPerPage = response.data.recordsPerPage;
            this.spinner.hide();
          },
          (error) => {
            console.log("Error at request  getBatch", error);
            this.spinner.hide();
          }
        );
    } catch (error) {
      console.log("Exception at getBatch: ", error);
    }
  }

  getPatient() {
    try {

      // this.spinner.show();
      // this.request.getRequest('Patient/GetPatient').subscribe((response) => {
      this.request
        .getRequest(`Patient/GetAllPatients?PageNO=${this.p}`)
        .subscribe(
          (response) => {
            console.log("Response at getPatient: ", response.data);
            this.patientList = response.data.data;
            this.totalRecords = response.data.totalNoRecords;
            this.recordsPerPage = response.data.recordsPerPage;
            this.spinner.hide();
          },
          (error) => {
            console.log("Error at request  getPatient", error);
            this.spinner.hide();
          }
        );
    } catch (error) {
      console.log("Exception at getPatient: ", error);
    }
  }

  search() {
    try {

      this.input = (<HTMLInputElement>(
        document.getElementById("searchInput")
      )).value;

      if (this.input === "") {
        this.getPatient();
      }
      // this.spinner.show();
      // this.request.getRequest('Generics/GetGenerics').subscribe((response) => {
      this.request
        .getRequest(`Patient/GetAllPatients?PageNo=1&Search=${this.input}`)
        .subscribe(
          (response) => {
            console.log("Response at Patient: ", response);
            this.patientList = response.data.data;
            this.spinner.hide();
          },
          (error) => {
            console.log("Error at request  getGenerics", error);
            this.spinner.hide();
          }
        );
    } catch (error) {
      console.log("Exception at getGenerics: ", error);
    }
  }

  onKeyUp(obj: any) {
    if(obj === "") {
      this.getPatient();
    }
  }


  close() {
    try {
      this.formForEdit = false;
      this.formForAdd = false;
      this.modalRef.hide();
      this.addPatientForm.reset();
      this.isPatientNameDuplicate = false;
      this.isValidating = false;
      this.isMarkCorrect = false;
      this.PatientNameForUpdate = "";
      // this.selectedOrganizations = [];
    } catch (error) {
      console.log("Exception at close: ", error);
    }
  }

  showSuccess(heading: any, statement: any) {
    try {
      // this.toaster.success(statement, heading);
    } catch (error) {
      console.log("Exception at showSuccess: ", error);
    }
  }

  showError(heading: any, statement: any) {
    try {
      // this.toaster.success(statement, heading);
    } catch (error) {
      console.log("Exception at showError: ", error);
    }
  }
  openModalForAdd(template: TemplateRef<any>) {
    try {
      this.formForEdit = false;
      this.formForAdd = true;
      // this.inspectionRequired = false;
      // this.perishable = false;
      this.addPatientForm.reset();
      this.addPatientForm.controls.patientisActive.setValue(true);
      this.addPatientForm.controls.oneTimeRepeat.setValue(true);
      // this.selectedOrganizations = [];
      this.modalRef = this.modalService.show(template, this.config);
    } catch (error) {
      console.log("Exception at openModalForAdd: ", error);
    }
  }

  addPatient(obj: any) {
    try {
      this.loading = true;
      this.btnDisable = true;
      let obj1 = {
        consultantID: obj.consultant,
      };
      let dlSt = obj.patientDiagnoses.split(",");
      let addObject = {
        patientNo: obj.patientNo,
        patientName: obj.patientName,
        patientAge: obj.patientAge,
        diagnosis: dlSt,
        phoneNo: obj.patientPhoneNo,
        consultant: obj1,
        prescription: this.patientImage,
        isActive: this.patientCheck,
        oneTimeRepeat: this.patientRepeat,
        createDate: this.date.toJSON(),
      };

      this.request.postRequest("Patient/AddPatient", addObject).subscribe(
        (response) => {
          if (
            response[0].Status > 0
          ) {
            this.loading = false;
            this.btnDisable = false;
            this.close();
            this.global.showNotification(
              "Success",
              "",
              "Patient Added Successfully")
            this.getPatient();
          } else {
            this.global.showNotification(
              "Error",
              "",
              "Patient Already Exists")
              this.close();
          }
        },
        (error) => {
          console.log("Error at request addPatient", error);
        }
      );
    } catch (error) {
      console.log("Exception at addPatient: ", error);
    }

    this.diagnosisList = [];
    this.patientImage = null;
  }

  openModalForUpdate(iD: any, template: TemplateRef<any>) {
    try {
      this.btnForUpdate = true;
      let objForUpdate = this.patientList.filter((it) => it.patientID === iD);
      this.objUpdate = objForUpdate[0];
      this.formForEdit = true;
      this.formForAdd = false;
      this.patientIDForUpdate = objForUpdate[0].patientID;
      this.addPatientForm.controls.patientNo.setValue(
        objForUpdate[0].patientNo
      );
      this.addPatientForm.controls.patientName.setValue(
        objForUpdate[0].patientName
      );
      this.addPatientForm.controls.patientAge.setValue(
        objForUpdate[0].patientAge
      );
      this.addPatientForm.controls.patientDiagnoses.setValue(
        objForUpdate[0].diagnosis
      );
      this.addPatientForm.controls.consultant.setValue(
        objForUpdate[0].consultant.consultantID
      );
      this.addPatientForm.controls.oneTimeRepeat.setValue(
        objForUpdate[0].oneTimeRepeat
      );
      this.addPatientForm.controls.patientPhoneNo.setValue(
        objForUpdate[0].phoneNo
      );
      this.addPatientForm.controls.patientisActive.setValue(
        objForUpdate[0].isActive
      );
      this.addPatientForm.controls.patientIMG.setValue(
        objForUpdate[0].prescription
      );
      this.patientImage = objForUpdate[0].prescription;
      // this.productNameForUpdate = objForUpdate[0].prdProductName;
      //this.objProducts.controls.expiryDays.setValue(objForUpdate[0].prdExpiryDays);
      // if(objForUpdate[0].prdFdaInspectionRqrd === true) {
      //    this.objProducts.controls.inspect.setValue(true);
      //  // this.inspectionRequired = true;
      // }
      //  else { this.objProducts.controls.inspect.setValue(false); }
      // this.addCategoryForm.controls.peri.setValue(objForUpdate[0].prdIsPerishable);
      // if (objForUpdate[0].prdIsPerishable === true) {
      //    this.objProducts.controls.peri.setValue(true);
      //   // this.perishable = true;
      // } else {
      //   this.objProducts.controls.peri.setValue(false);
      // }

      // this.addCategoryForm.controls.handlingInstructions.setValue(objForUpdate[0].prdHandlingInstructions);
      // this.selectedOrganizations.push({OrgID: objForUpdate[0].prdOrgID, OrgName: objForUpdate[0].OrgName});
      this.modalRef = this.modalService.show(template, this.config);
    } catch (error) {
      console.log("Exception at openModalForUpdate: ", error);
    }
  }

  againValidOnAdd(addObject: any) {
    try {
      this.addPatient(addObject);
    } catch (error) {
      console.log("Exception at againValidOnAdd: ", error);
    }
  }

  againValidOnUpdate(addObject: any) {
    this.updatePatient(addObject);
    // try {
    //   if (this.addPatientForm.controls.PatientName.valid === true) {
    //     this.loading = true;
    //     this.btnDisable = true;
    //     let PatientNameToValidate =
    //       this.addPatientForm.controls.PatientName.value;
    //     if (this.PatientNameForUpdate === PatientNameToValidate) {
    //       this.isPatientNameDuplicate = false;
    //       this.updatePatient(addObject);
    //       return;
    //     }
    //     this.request
    //       .getRequest(
    //         "Patient/ValidatePatient?PatientName=" +
    //           PatientNameToValidate
    //       )
    //       .subscribe(
    //         (response) => {
    //           if (response.data === "") {
    //             this.isPatientNameDuplicate = false;
    //             this.updatePatient(addObject);
    //           } else {
    //             this.isPatientNameDuplicate = true;
    //             this.loading = false;
    //             this.btnDisable = false;
    //           }
    //           console.log("Response at ValidatePatient", response);
    //         },
    //         (error) => {
    //           console.log("Error at ValidatePatient: ", error);
    //         }
    //       );
    //   } else {
    //     this.isPatientNameDuplicate = false;
    //     this.loading = false;
    //     this.btnDisable = false;
    //   }
    // } catch (error) {
    //   console.log("Exception at againValidOnUpdate: ", error);
    // }
  }

  updatePatient(obj: any) {
    try {

      this.loading = true;
      this.btnDisable = true;
      let obj1 = {
        consultantID: obj.consultant,
      };
      let dist = obj.patientDiagnoses.toString().split(",");

      let updateObject = {
        patientID: this.patientIDForUpdate,
        patientNo: obj.patientNo,
        patientName: obj.patientName,
        patientAge: obj.patientAge,
        diagnosis: dist,
        phoneNo: obj.patientPhoneNo,
        consultant: obj1,
        prescription: this.patientImage,
        isActive: this.patientCheck,
        oneTimeRepeat: this.patientRepeat,
        updateDate: this.date.toJSON(),
      };
      this.request.postRequest("Patient/UpdatePatient", updateObject).subscribe(
        (response) => {
          if (response[0].Status === 1) {
            this.loading = false;
            this.btnDisable = false;
            this.global.showNotification(
              "Success",
              "",
              "Patient Updated Successfully")
            this.close();
            this.getPatient();
          } else {
            this.loading = false;
            this.btnDisable = false;
            this.global.showNotification(
              "Error",
              "",
              "Patient Already Exists")
              this.close();
          }
        },
        (error) => {
          console.log("Error at request addPatient", error);
        }
      );
    } catch (error) {
      console.log("Exception at updatePatient: ", error);
    }

    this.patientImage = null;
  }

  checkPatientName(PatientNameToValidate: any) {
    try {
      this.isMarkCorrect = false;
      if (this.addPatientForm.controls.PatientName.valid === true) {
        if (this.PatientNameForUpdate === PatientNameToValidate) {
          this.isPatientNameDuplicate = false;
          return;
        }
        this.isValidating = true;
        let object: any = { PatientName: PatientNameToValidate };
        this.request
          .getRequest(
            "Patient/ValidatePatient?PatientName=" + PatientNameToValidate
          )
          .subscribe(
            (response) => {
              this.isValidating = false;
              if (response.data === "") {
                this.isPatientNameDuplicate = false;
                this.isMarkCorrect = true;
              } else {
                this.isPatientNameDuplicate = true;
                this.isMarkCorrect = false;
              }
              console.log("Response at ValidatePatient", response);
            },
            (error) => {
              this.isValidating = false;
              console.log("Error at ValidatePatient: ", error);
            }
          );
      } else {
        this.isPatientNameDuplicate = false;
        this.isValidating = false;
        this.isMarkCorrect = false;
      }
    } catch (error) {
      console.log("Exception at checkPatientName: ", error);
    }
  }

  checkPatientCode(PatientCodeToValidate: any) {
    try {
      this.isMarkCorrect = false;
      if (this.addPatientForm.controls.PatientName.valid === true) {
        if (this.PatientCodeForUpdate === PatientCodeToValidate) {
          // this.isPatientNameDuplicate = false;
          return;
        }
        this.isValidating = true;
        let object: any = { PatientName: PatientCodeToValidate };
        this.request
          .getRequest(
            "Patient/ValidatePatient?PatientCode=" + PatientCodeToValidate
          )
          .subscribe(
            (response) => {
              this.isValidating = false;
              if (response.data === "") {
                // this.isPatientNameDuplicate = false;
                this.isMarkCorrect = true;
              } else {
                // this.isPatientNameDuplicate = true;
                this.isMarkCorrect = false;
              }
              console.log("Response at ValidatePatient", response);
            },
            (error) => {
              this.isValidating = false;
              console.log("Error at ValidatePatient: ", error);
            }
          );
      } else {
        // this.isPatientNameDuplicate = false;
        this.isValidating = false;
        this.isMarkCorrect = false;
      }
    } catch (error) {
      console.log("Exception at checkPatientName: ", error);
    }
  }

  deletePatient(obj: any, template: TemplateRef<any>) {
    this.selectedObj = obj.patientID;

    this.modalRef = this.modalService.show(template, this.config);
  }

  deletePrd(obj: any) {
    try {
      this.request
        .postRequest(`Patient/DeletePatient?PatientID=${obj.patientID}`, null)
        .subscribe(
          (response) => {
            if (response[0].Status === 1) {
              this.global.showNotification(
                "Success",
                "",
                "Patient Deleted successfully")
              this.getPatient();
              console.log("Response: ", response);
              // this.close();
            }
          },
          (error) => {
            console.log("Error at request deletePatient", error);
          }
        );
    } catch (error) {
      console.log("Exception at deletePatient: ", error);
    }
  }

  deleteAlert(object: any) {
    try {
      swal
        .fire({
          title: "Warning",
          text: "Are you sure you want to delete Patient ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          cancelButtonText: "CANCEL",
          confirmButtonText: "DELETE",
          allowOutsideClick: false,
        })
        .then((result) => {
          if (result.value) {
            this.deletePrd(object);
          }
        });
    } catch (error) {
      console.log("Exception at deleteAdvertisement: ", error);
    }
  }
}
