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

@Component({
  selector: "app-distributers",
  templateUrl: "./distributers.component.html",
  styleUrls: ["./distributers.component.scss"],
})
export class DistributersComponent implements OnInit {
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
  };
  distributorList: any = [];
  modalRef: BsModalRef;
  addDistributersForm: FormGroup;
  formForAdd: any = false;
  formForEdit: any = false;
  loading: any = false;
  btnDisable: any = false;
  isDistributersNameDuplicate: any = false;
  isValidating: any = false;
  distributersNameForUpdate: any = "";
  distributersCodeForUpdate: any = "";
  isMarkCorrect: any = false;
  selectedObj: any;
  formControl: any = false;
  distributersNameToValidate: any = false;
  distributersCodeToValidate: any = false;
  p: number = 1;
  totalRecords: number;
  recordsPerPage: number;
  distributorCheck: boolean = false;
  date: any = new Date();
  distributorIDForUpdate: any;
  input: string;
  objUpdate: any;
  btnForUpdate: any = true;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private request: RequestClass,
    private spinner: NgxSpinnerService,
    private global: GlobalService
  ) {
    this.addDistributersForm = formBuilder.group({
      distributorName: ["", [Validators.required]],
      distributorCode: ["", [Validators.required]],
      distributorAddress: ["", [Validators.required]],
      distributorEmail: [ "",
      Validators.compose([
        Validators.required,
        Validators.pattern(
          /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/
        ),
      ]),],
      distributorPhoneNo: ["", [Validators.required]],
      distributorNTN: ["", [Validators.required]],
      distributorCertificate: ["", [Validators.required]],
      distributorWebsite: ["", [Validators.required]],
      distributorisActive: this.distributorCheck,
    });
  }

  ngOnInit(): void {
    this.getDistributers();
  }

  getDistributers() {
    try {

      // this.spinner.show();
      // this.request.getRequest('Distributers​/GetDistributers').subscribe((response) => {
      this.request
        .getRequest(`Distributor/GetAllDistributor?PageNO=${this.p}`)
        .subscribe(
          (response) => {
            console.log("Response at getDistributers: ", response.data);
            this.distributorList = response.data.data;
            this.totalRecords = response.data.totalNoRecords;
            this.recordsPerPage = response.data.recordsPerPage;
            this.spinner.hide();
          },
          (error) => {
            console.log("Error at request  getDistributers", error);
            this.spinner.hide();
          }
        );
    } catch (error) {
      console.log("Exception at getDistributers: ", error);
    }
  }

  pageChange(page: any) {
    try {

      // this.spinner.show();
      // this.request.getRequest('Batch​/GetBatch').subscribe((response) => {
      this.request
        .getRequest(`Distributor/GetAllDistributor?PageNO=${page}`)
        .subscribe(
          (response) => {
            console.log("Response at getBatch: ", response.data);
            this.distributorList = response.data.data;
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
  search() {
    try {

      this.input = (<HTMLInputElement>(
        document.getElementById("searchInput")
      )).value;

      if (this.input === "") {
        this.getDistributers();
      }
      // this.spinner.show();
      // this.request.getRequest('Generics​/GetGenerics').subscribe((response) => {
      this.request
        .getRequest(`Distributor/GetAllDistributor?PageNO=1&Search=${this.input}`)
        .subscribe(
          (response) => {
            // if (response.statusCode === "200") {
            // console.log("Response at getDistributors: ", response);
            // this.distributorList = response.data.data;
            // this.spinner.hide();
            // }
            console.log("Response at getDistributors: ", response);
            this.distributorList = response.data.data;
            this.spinner.hide();
          },
          (error) => {
            console.log("Error at request  getDistributors", error);
            this.spinner.hide();
          }
        );
    } catch (error) {
      console.log("Exception at getDistributors: ", error);
    }
  }
  onKeyUp(obj: any) {
    if(obj === "") {
      this.getDistributers();
    }
  }

  close() {
    try {
      this.formForEdit = false;
      this.formForAdd = false;
      this.modalRef.hide();
      this.addDistributersForm.reset();
      this.isDistributersNameDuplicate = false;
      this.isValidating = false;
      this.isMarkCorrect = false;
      this.distributersNameForUpdate = "";
      // this.selectedOrganizations = [];
    } catch (error) {
      console.log("Exception at close: ", error);
    }
  }
  setUpdateBtn() {
    debugger;
    if (this.objUpdate !== this.addDistributersForm.value)
    {
      this.btnForUpdate = false
    }
    else {
      this.btnForUpdate = true;
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
      this.addDistributersForm.reset();
       this.addDistributersForm.controls.distributorisActive.setValue(true);
      // this.addCategoryForm.controls.peri.setValue(true);
      // this.selectedOrganizations = [];
      this.modalRef = this.modalService.show(template, this.config);
    } catch (error) {
      console.log("Exception at openModalForAdd: ", error);
    }
  }

  addDistributers(obj: any) {
    try {
      //obj.peri = obj.peri !== null ? true :false;
      this.loading = true;
      this.btnDisable = true;
      let addObject = {
        distributorCode: obj.distributorCode,
        distributorName: obj.distributorName,
        distributorAddress: obj.distributorAddress,
        email: obj.distributorEmail,
        phoneNo: obj.distributorPhoneNo,
        certificate: obj.distributorCertificate,
        ntn: obj.distributorNTN,
        website: obj.distributorWebsite,
        isActive: this.distributorCheck,
        createDate: this.date.toJSON(),
      };
      this.request
        .postRequest("Distributor/AddDistributor", addObject)
        .subscribe(
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
                "Distributer added successfully")
              this.getDistributers();
            } else {
              this.global.showNotification(
                "Error",
                "",
                "Distributer Already Exists")
                this.close();
                
            }
          },
          (error) => {
            console.log("Error at request addDistributers", error);
          }
        );
    } catch (error) {
      console.log("Exception at addDistributers: ", error);
    }
  }

  openModalForUpdate(iD: any, template: TemplateRef<any>) {
    try {
      this.btnForUpdate = true;
      let objForUpdate = this.distributorList.filter(
        (it) => it.distributorID === iD
      );
      this.objUpdate = objForUpdate[0];
      this.formForEdit = true;
      this.formForAdd = false;
      this.distributorIDForUpdate = objForUpdate[0].distributorID;
      this.addDistributersForm.controls.distributorName.setValue(
        objForUpdate[0].distributorName
      );
      this.addDistributersForm.controls.distributorCode.setValue(
        objForUpdate[0].distributorCode
      );
      this.addDistributersForm.controls.distributorAddress.setValue(
        objForUpdate[0].distributorAddress
      );
      this.addDistributersForm.controls.distributorEmail.setValue(
        objForUpdate[0].email
      );
      this.addDistributersForm.controls.distributorNTN.setValue(
        objForUpdate[0].ntn
      );
      this.addDistributersForm.controls.distributorPhoneNo.setValue(
        objForUpdate[0].phoneNo
      );
      this.addDistributersForm.controls.distributorCertificate.setValue(
        objForUpdate[0].certificate
      );
      this.addDistributersForm.controls.distributorWebsite.setValue(
        objForUpdate[0].website
      );
      this.addDistributersForm.controls.distributorisActive.setValue(
        objForUpdate[0].isActive
      );
      // this.productIDForUpdate = objForUpdate[0].prdProductID;
      // this.addCategoryForm.controls.productName.setValue(objForUpdate[0].prdProductName);
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
      this.addDistributers(addObject);
    } catch (error) {
      console.log("Exception at againValidOnAdd: ", error);
    }
  }
  

  againValidOnUpdate(addObject: any) {
    this.updateDistributers(addObject);
    // try {

    //   if (this.addDistributersForm.controls.distributersName.valid === true) {
    //     this.loading = true;
    //     this.btnDisable = true;
    //     let distributersNameToValidate =
    //       this.addDistributersForm.controls.distributersName.value;
    //     if (this.distributersNameForUpdate === distributersNameToValidate) {
    //       this.isDistributersNameDuplicate = false;
    //       this.updateDistributers(addObject);
    //       return;
    //     }
    //     this.request
    //       .getRequest(
    //         "Distributers/ValidateDistributers?distributersName=" +
    //           distributersNameToValidate
    //       )
    //       .subscribe(
    //         (response) => {
    //           if (response.data === "") {
    //             this.isDistributersNameDuplicate = false;
    //             this.updateDistributers(addObject);
    //           } else {
    //             this.isDistributersNameDuplicate = true;
    //             this.loading = false;
    //             this.btnDisable = false;
    //           }
    //           console.log("Response at ValidateDistributers", response);
    //         },
    //         (error) => {
    //           console.log("Error at ValidateDistributers: ", error);
    //         }
    //       );
    //   } else {
    //     this.isDistributersNameDuplicate = false;
    //     this.loading = false;
    //     this.btnDisable = false;
    //   }
    // } catch (error) {
    //   console.log("Exception at againValidOnUpdate: ", error);
    // }
  }

  updateDistributers(obj: any) {
  
    try {
      this.loading = true;
      this.btnDisable = true;
      let updateObject = {
        distributorID: this.distributorIDForUpdate,
        distributorCode: obj.distributorCode,
        distributorName: obj.distributorName,
        distributorAddress: obj.distributorAddress,
        email: obj.distributorEmail,
        phoneNo: obj.distributorPhoneNo,
        certificate: obj.distributorCertificate,
        ntn: obj.distributorNTN,
        website: obj.distributorWebsite,
        isActive: this.distributorCheck,
        updateDate: this.date.toJSON(),
      };
      console.log("response at updateobject", updateObject);
      this.request
        .postRequest("Distributor/UpdateDistributor", updateObject)
        .subscribe(
          (response) => {
            if (response[0].Status === 1) {
              this.loading = false;
              this.btnDisable = false;
              this.close();
              this.global.showNotification(
                "Success",
                "",
                "Distributer Updated successfully")
             
              this.getDistributers();
            } else {
              this.global.showNotification(
                "Error",
                "",
                "Distributer Already Exists");
                this.close();
            }
          },
          (error) => {
            console.log("Error at request addDistributers", error);
          }
        );
    } catch (error) {
      console.log("Exception at updateDistributers: ", error);
    }
  }

  checkDistributersName(distributersNameToValidate: any) {
    try {
      this.isMarkCorrect = false;
      if (this.addDistributersForm.controls.distributersName.valid === true) {
        if (this.distributersNameForUpdate === distributersNameToValidate) {
          this.isDistributersNameDuplicate = false;
          return;
        }
        this.isValidating = true;
        let object: any = { distributersName: distributersNameToValidate };
        this.request
          .getRequest(
            "Distributers/ValidateDistributers?distributersName=" +
              distributersNameToValidate
          )
          .subscribe(
            (response) => {
              this.isValidating = false;
              if (response.data === "") {
                this.isDistributersNameDuplicate = false;
                this.isMarkCorrect = true;
              } else {
                this.isDistributersNameDuplicate = true;
                this.isMarkCorrect = false;
              }
              console.log("Response at ValidateDistributers", response);
            },
            (error) => {
              this.isValidating = false;
              console.log("Error at ValidateDistributers: ", error);
            }
          );
      } else {
        this.isDistributersNameDuplicate = false;
        this.isValidating = false;
        this.isMarkCorrect = false;
      }
    } catch (error) {
      console.log("Exception at checkDistributersName: ", error);
    }
  }

  checkDistributersCode(distributersCodeToValidate: any) {
    try {
      this.isMarkCorrect = false;
      if (this.addDistributersForm.controls.distributersName.valid === true) {
        if (this.distributersCodeForUpdate === distributersCodeToValidate) {
          // this.isDistributersNameDuplicate = false;
          return;
        }
        this.isValidating = true;
        let object: any = { distributersName: distributersCodeToValidate };
        this.request
          .getRequest(
            "Distributers/ValidateDistributers?distributersCode=" +
              distributersCodeToValidate
          )
          .subscribe(
            (response) => {
              this.isValidating = false;
              if (response.data === "") {
                // this.isDistributersNameDuplicate = false;
                this.isMarkCorrect = true;
              } else {
                // this.isDistributersNameDuplicate = true;
                this.isMarkCorrect = false;
              }
              console.log("Response at ValidateDistributers", response);
            },
            (error) => {
              this.isValidating = false;
              console.log("Error at ValidateDistributers: ", error);
            }
          );
      } else {
        // this.isDistributersNameDuplicate = false;
        this.isValidating = false;
        this.isMarkCorrect = false;
      }
    } catch (error) {
      console.log("Exception at checkDistributersName: ", error);
    }
  }

  deleteDistributers(obj: any, template: TemplateRef<any>) {
    this.selectedObj = obj.distributorID;

    this.modalRef = this.modalService.show(template, this.config);
  }

  deletePrd(obj: any) {
    try {
      this.request
        .postRequest(
          `Distributor/DeleteDistributor?DistributorID=${obj.distributorID}`,
          null
        )
        .subscribe(
          (response) => {
            if (response[0].Status === 1) {
              this.global.showNotification(
                "Success",
                "",
                "Distributer Deleted successfully")
              this.getDistributers();
              console.log("Response: ", response);
              // this.close();
            }
          },
          (error) => {
            console.log("Error at request deleteDistributers", error);
          }
        );
    } catch (error) {
      console.log("Exception at deleteDistributers: ", error);
    }
  }

  deleteAlert(object: any) {
    try {
      swal
        .fire({
          title: "Warning",
          text: "Are you sure you want to delete Distributors?",
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
