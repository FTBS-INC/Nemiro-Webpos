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
  selector: "app-consultant",
  templateUrl: "./consultant.component.html",
  styleUrls: ["./consultant.component.scss"],
})
export class ConsultantComponent implements OnInit {
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
    class: "modal-lg"
  };
  consultantList: any = [];
  modalRef: BsModalRef;
  addConsultantForm: FormGroup;
  formForAdd: any = false;
  formForEdit: any = false;
  loading: any = false;
  btnDisable: any = false;
  isConsultantNameDuplicate: any = false;
  isValidating: any = false;
  ConsultantNameForUpdate: any = "";
  ConsultantCodeForUpdate: any = "";
  isMarkCorrect: any = false;
  selectedObj: any;
  formControl: any = false;
  ConsultantNameToValidate: any = false;
  ConsultantCodeToValidate: any = false;
  p: number = 1;
  totalRecords: number;
  recordsPerPage: number;
  consultantCheck: boolean = false;
  date: any = new Date();
  input: string = "";
  consultantImage: Observable<any>;
  base64Image: any;
  consultantIDForUpdate: any;
  objUpdate: any;
  btnForUpdate: any = true;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private request: RequestClass,
    private spinner: NgxSpinnerService,
    private global: GlobalService
  ) {
    this.addConsultantForm = formBuilder.group({
      consultantLicenceNo: ["", [Validators.required]],
      consultantName: ["", [Validators.required]],
      consultantAge: ["", [Validators.required]],
      consultantQualification: ["", [Validators.required]],
      consultantExpertise: ["", [Validators.required]],
      consultantPhoneNo: ["", [Validators.required]],
      consultantImage: ["", [Validators.required]],
      consultantisActive: this.consultantCheck,
    });
  }

  ngOnInit(): void {
    this.getConsultant();
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

      this.consultantImage = e;
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
    this.consultantImage = obj;
    this.modalRef = this.modalService.show(template);
  }

  getConsultant() {
    try {
      this.request
        .getRequest(`Consultant/GetAllConsultants?PageNO=${this.p}`)
        .subscribe(
          (response) => {
            console.log("Response at getConsultant: ", response.data);
            this.consultantList = response.data.data;
            this.totalRecords = response.data.totalNoRecords;
            this.recordsPerPage = response.data.recordsPerPage;
            this.spinner.hide();
          },
          (error) => {
            console.log("Error at request  getConsultant", error);
            this.spinner.hide();
          }
        );
    } catch (error) {
      console.log("Exception at getConsultant: ", error);
    }
  }

  search() {
    try {
      this.input = (<HTMLInputElement>(
        document.getElementById("searchInput")
      )).value;

      if (this.input === "") {
        this.getConsultant();
      }
      this.request
        .getRequest(`Consultant/GetAllConsultants?PageNo=1&Search=${this.input}`)
        .subscribe(
          (response) => {
            console.log("Response at getGenerics: ", response);
            this.consultantList = response.data.data;
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
      this.getConsultant();
    }
  }

  close() {
    try {
      this.formForEdit = false;
      this.formForAdd = false;
      this.modalRef.hide();
      this.addConsultantForm.reset();
      this.isConsultantNameDuplicate = false;
      this.isValidating = false;
      this.isMarkCorrect = false;
      this.ConsultantNameForUpdate = "";
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
      this.addConsultantForm.reset();
      this.consultantImage = null;
      this.addConsultantForm.controls.consultantisActive.setValue(true);
      // this.selectedOrganizations = [];
      this.modalRef = this.modalService.show(template, this.config);
    } catch (error) {
      console.log("Exception at openModalForAdd: ", error);
    }
  }

  addConsultant(obj: any) {
    try {
      this.loading = true;
      this.btnDisable = true;
      let exp = obj.consultantQualification.toString().split(",");
      let qua = obj.consultantExpertise.toString().split(",");
      let addObject = {
        licenseNo: obj.consultantLicenceNo,
        consultantName: obj.consultantName,
        consultantAge: obj.consultantAge,
        qualification: exp,
        expertise: qua,
        phoneNo: obj.consultantPhoneNo,
        Image: this.consultantImage,
        isActive: this.consultantCheck,
        createDate: this.date.toJSON(),
      };
      this.request.postRequest("Consultant/AddConsultant", addObject).subscribe(
        (response) => {
          if (
            response[0].FunctionCode !== null &&
            response[0].FunctionCode > 0
          ) {
            this.loading = false;
            this.btnDisable = false;
            this.close();
            this.global.showNotification(
              "Success",
              "",
              "Consultant Added Successfully")
            this.getConsultant();
          } else {
            this.global.showNotification(
              "Error",
              "",
              "Consultant Already Exists")
              this.close();
          }
        },
        (error) => {
          console.log("Error at request addConsultant", error);
        }
      );
    } catch (error) {
      console.log("Exception at addConsultant: ", error);
    }
  }
  setUpdateBtn() {
    debugger;
    if (this.objUpdate !== this.addConsultantForm.value)
    {
      this.btnForUpdate = false
    }
    else {
      this.btnForUpdate = true;
    }
  }

  openModalForUpdate(iD: any, template: TemplateRef<any>) {
    try {
      this.btnForUpdate = true;
      let objForUpdate = this.consultantList.filter(
        (it) => it.consultantID === iD
      );
      this.objUpdate = objForUpdate[0];
      this.formForEdit = true;
      this.formForAdd = false;
      this.consultantIDForUpdate = objForUpdate[0].consultantID;
      this.consultantImage = objForUpdate[0].image;
      // this.addConsultantForm.controls.consultantImage.setValue(
      //   objForUpdate[0].image
      // );
      this.addConsultantForm.controls.consultantLicenceNo.setValue(
        objForUpdate[0].licenseNo
      );
      this.addConsultantForm.controls.consultantName.setValue(
        objForUpdate[0].consultantName
      );
      this.addConsultantForm.controls.consultantAge.setValue(
        objForUpdate[0].consultantAge
      );
      this.addConsultantForm.controls.consultantQualification.setValue(
        objForUpdate[0].qualification
      );
      this.addConsultantForm.controls.consultantExpertise.setValue(
        objForUpdate[0].expertise
      );
      this.addConsultantForm.controls.consultantPhoneNo.setValue(
        objForUpdate[0].phoneNo
      );
      this.addConsultantForm.controls.consultantisActive.setValue(
        objForUpdate[0].isActive
      );
    
      this.modalRef = this.modalService.show(template, this.config);
    } catch (error) {
      console.log("Exception at openModalForUpdate: ", error);
    }
  }

  againValidOnAdd(addObject: any) {
    try {
      this.addConsultant(addObject);
    } catch (error) {
      console.log("Exception at againValidOnAdd: ", error);
    }
  }

  againValidOnUpdate(addObject: any) {
    this.updateConsultant(addObject);
    // try {
    //   if (this.addConsultantForm.controls.ConsultantName.valid === true) {
    //     this.loading = true;
    //     this.btnDisable = true;
    //     let ConsultantNameToValidate =
    //       this.addConsultantForm.controls.ConsultantName.value;
    //     if (this.ConsultantNameForUpdate === ConsultantNameToValidate) {
    //       this.isConsultantNameDuplicate = false;
    //       this.updateConsultant(addObject);
    //       return;
    //     }
    //     this.request
    //       .getRequest(
    //         "Consultant/ValidateConsultant?ConsultantName=" +
    //           ConsultantNameToValidate
    //       )
    //       .subscribe(
    //         (response) => {
    //           if (response.data === "") {
    //             this.isConsultantNameDuplicate = false;
    //             this.updateConsultant(addObject);
    //           } else {
    //             this.isConsultantNameDuplicate = true;
    //             this.loading = false;
    //             this.btnDisable = false;
    //           }
    //           console.log("Response at ValidateConsultant", response);
    //         },
    //         (error) => {
    //           console.log("Error at ValidateConsultant: ", error);
    //         }
    //       );
    //   } else {
    //     this.isConsultantNameDuplicate = false;
    //     this.loading = false;
    //     this.btnDisable = false;
    //   }
    // } catch (error) {
    //   console.log("Exception at againValidOnUpdate: ", error);
    // }
  }

  updateConsultant(obj: any) {
    try {
      this.loading = true;
      this.btnDisable = true;

      let exp = obj.consultantQualification.toString().split(",");
      let qua = obj.consultantExpertise.toString().split(",");

      let updateObject = {
        consultantID: this.consultantIDForUpdate,
        licenseNo: obj.consultantLicenceNo,
        consultantName: obj.consultantName,
        consultantAge: obj.consultantAge,
        qualification: exp,
        expertise: qua,
        phoneNo: obj.consultantPhoneNo,
        Image: this.consultantImage,
        isActive: this.consultantCheck,
        createDate: this.date.toJSON(),
      };
      this.request
        .postRequest("Consultant/UpdateConsultant", updateObject)
        .subscribe(
          (response) => {
            if (response[0].Status === 1) {
              this.loading = false;
              this.btnDisable = false;
              this.global.showNotification(
                "Success",
                "",
                "Consultant Updated Successfully")
              this.close();
              this.getConsultant();
            } else {
              this.global.showNotification(
                "Error",
                "",
                "Consultant Already Exists")
                this.close();
            }
          },
          (error) => {
            console.log("Error at request addConsultant", error);
          }
        );
    } catch (error) {
      console.log("Exception at updateConsultant: ", error);
    }
  }

  checkConsultantName(ConsultantNameToValidate: any) {
    try {
      this.isMarkCorrect = false;
      if (this.addConsultantForm.controls.ConsultantName.valid === true) {
        if (this.ConsultantNameForUpdate === ConsultantNameToValidate) {
          this.isConsultantNameDuplicate = false;
          return;
        }
        this.isValidating = true;
        let object: any = { ConsultantName: ConsultantNameToValidate };
        this.request
          .getRequest(
            "Consultant/ValidateConsultant?ConsultantName=" +
              ConsultantNameToValidate
          )
          .subscribe(
            (response) => {
              this.isValidating = false;
              if (response.data === "") {
                this.isConsultantNameDuplicate = false;
                this.isMarkCorrect = true;
              } else {
                this.isConsultantNameDuplicate = true;
                this.isMarkCorrect = false;
              }
              console.log("Response at ValidateConsultant", response);
            },
            (error) => {
              this.isValidating = false;
              console.log("Error at ValidateConsultant: ", error);
            }
          );
      } else {
        this.isConsultantNameDuplicate = false;
        this.isValidating = false;
        this.isMarkCorrect = false;
      }
    } catch (error) {
      console.log("Exception at checkConsultantName: ", error);
    }
  }

  checkConsultantCode(ConsultantCodeToValidate: any) {
    try {
      this.isMarkCorrect = false;
      if (this.addConsultantForm.controls.ConsultantName.valid === true) {
        if (this.ConsultantCodeForUpdate === ConsultantCodeToValidate) {
          // this.isConsultantNameDuplicate = false;
          return;
        }
        this.isValidating = true;
        let object: any = { ConsultantName: ConsultantCodeToValidate };
        this.request
          .getRequest(
            "Consultant/ValidateConsultant?ConsultantCode=" +
              ConsultantCodeToValidate
          )
          .subscribe(
            (response) => {
              this.isValidating = false;
              if (response.data === "") {
                // this.isConsultantNameDuplicate = false;
                this.isMarkCorrect = true;
              } else {
                // this.isConsultantNameDuplicate = true;
                this.isMarkCorrect = false;
              }
              console.log("Response at ValidateConsultant", response);
            },
            (error) => {
              this.isValidating = false;
              console.log("Error at ValidateConsultant: ", error);
            }
          );
      } else {
        // this.isConsultantNameDuplicate = false;
        this.isValidating = false;
        this.isMarkCorrect = false;
      }
    } catch (error) {
      console.log("Exception at checkConsultantName: ", error);
    }
  }

  deleteConsultant(obj: any, template: TemplateRef<any>) {
    this.selectedObj = obj.consultantID;

    this.modalRef = this.modalService.show(template, this.config);
  }

  deletePrd(obj: any) {
    try {
      this.request
        .postRequest(
          `Consultant/DeleteConsultant?consultantID=${obj.consultantID}`,
          null
        )
        .subscribe(
          (response) => {
            if (response[0].Status === 1) {
              this.global.showNotification(
                "Success",
                "",
                "Consultant Deleted Successfully")
              this.getConsultant();
              console.log("Response: ", response);
              // this.close();
            }
          },
          (error) => {
            console.log("Error at request deleteConsultant", error);
          }
        );
    } catch (error) {
      console.log("Exception at deleteConsultant: ", error);
    }
  }

  deleteAlert(object: any) {
    try {
      swal
        .fire({
          title: "Warning",
          text: "Are you sure you want to delete Consultant ?",
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
