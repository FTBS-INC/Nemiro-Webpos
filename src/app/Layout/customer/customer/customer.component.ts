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
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent implements OnInit {
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
    class: "modal-lg"
  };
  CustomerList: any = [];
  consultantList: any = [];
  diagnosisList: Array<String> = [];
  modalRef: BsModalRef;
  addCustomerForm: FormGroup;
  formForAdd: any = false;
  formForEdit: any = false;
  loading: any = false;
  btnDisable: any = false;
  isCustomerNameDuplicate: any = false;
  isValidating: any = false;
  CustomerNameForUpdate: any = "";
  CustomerCodeForUpdate: any = "";
  isMarkCorrect: any = false;
  selectedObj: any;
  formControl: any = false;
  CustomerNameToValidate: any = false;
  CustomerCodeToValidate: any = false;
  p: number = 1;
  totalRecords: number;
  recordsPerPage: number;
  customerCheck: boolean = false;
  CustomerRepeat: boolean = true;
  date: any = new Date();
  input: string = "";
  customerImage: Observable<any>;
  base64Image: any;
  temp: any;
  displayImage: any;
  customerIDForUpdate: any;
  voucherID: any = this.generateRandomNo();

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private request: RequestClass,
    private spinner: NgxSpinnerService,
    private global: GlobalService
  ) {
    this.addCustomerForm = formBuilder.group({
      customerImage: ["", [Validators.required]],
      customerCode: this.voucherID,
      customerFirstName: ["", [Validators.required]],
      customerLastName: ["", [Validators.required]],
      customerType: ["", [Validators.required]],
      customerPhoneNo: ["", [Validators.required]],
      customerEmail: ["", [Validators.required]],
      customerAddress: ["", [Validators.required]],
      customerIsActive: this.customerCheck,
    });
  }

  ngOnInit(): void {
    this.getCustomer();
  
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

      this.customerImage = e;
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
  
pageChange(page: any) {
    try {
      this.request
        .getRequest(`Customer/GetAllCustomers?PageNo=${page}`)
        .subscribe(
          (response) => {
            console.log("Response at getBatch: ", response.data);
            this.CustomerList = response.data.data;
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

  getCustomer() {
    try {
      this.request
        .getRequest(`Customer/GetAllCustomers?PageNO=${this.p}`)
        .subscribe(
          (response) => {
            console.log("Response at getCustomer: ", response.data);
            this.CustomerList = response.data.data;
            this.totalRecords = response.data.totalNoRecords;
            this.recordsPerPage = response.data.recordsPerPage;
            this.spinner.hide();
          },
          (error) => {
            console.log("Error at request  getCustomer", error);
            this.spinner.hide();
          }
        );
    } catch (error) {
      console.log("Exception at getCustomer: ", error);
    }
  }

  search() {
    try {

      this.input = (<HTMLInputElement>(
        document.getElementById("searchInput")
      )).value;

      if (this.input === "") {
        this.getCustomer();
      }
      // this.spinner.show();
      // this.request.getRequest('Generics/GetGenerics').subscribe((response) => {
      this.request
        .getRequest(`Customer/GetAllCustomers?PageNO=1&Search=${this.input}`)
        .subscribe(
          (response) => {
            console.log("Response at Customer: ", response);
            this.CustomerList = response.data.data;
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
      this.getCustomer();
    }
  }

  generateRandomNo() {
    return "CTR-" + Math.floor(Math.random() * 100) + 1;
  }
  

  close() {
    try {
      this.formForEdit = false;
      this.formForAdd = false;
      this.modalRef.hide();
      this.addCustomerForm.reset();
      this.isCustomerNameDuplicate = false;
      this.isValidating = false;
      this.isMarkCorrect = false;
      this.CustomerNameForUpdate = "";
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
      this.addCustomerForm.reset();
      this.voucherID = this.generateRandomNo();
      this.addCustomerForm.controls.customerCode.setValue(this.voucherID);
      this.addCustomerForm.controls.customerIsActive.setValue(true);
      this.modalRef = this.modalService.show(template, this.config);
    } catch (error) {
      console.log("Exception at openModalForAdd: ", error);
    }
  }

  addCustomer(obj: any) {
    try {
      this.loading = true;
      this.btnDisable = true;
      // let obj1 = {
      //   customerID: obj.consultant,
      // };
      // let dlSt = obj.CustomerDiagnoses.split(",");
      let addObject = {
        cs_Image: this.customerImage,
        customerNo: obj.customerCode,
        cs_FirstName: obj.customerFirstName,
        cs_LastName: obj.customerLastName,
        cs_CustomerType: obj.customerType,
        cs_Phone: obj.customerPhoneNo,
        cs_Email: obj.customerEmail,
        cs_Address: obj.customerAddress,
        isActive: this.customerCheck,
  
        createDate: this.date.toJSON(),
      };

      this.request.postRequest("Customer/AddCustomer", addObject).subscribe(
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
              "Customer Added Successfully")
            this.getCustomer();
          } else {
            this.global.showNotification(
              "Error",
              "",
              "Customer Already Exists")
              this.close();
          }
        },
        (error) => {
          console.log("Error at request addCustomer", error);
        }
      );
    } catch (error) {
      console.log("Exception at addCustomer: ", error);
    }

    this.diagnosisList = [];
    this.customerImage = null;
  }

  openModalForUpdate(iD: any, template: TemplateRef<any>) {
    try {
      let objForUpdate = this.CustomerList.filter((it) => it.customerID === iD);
      this.formForEdit = true;
      this.formForAdd = false;
      this.customerIDForUpdate = objForUpdate[0].customerID;
      this.customerImage = objForUpdate[0].cs_Image;
      this.addCustomerForm.controls.customerCode.setValue(
        objForUpdate[0].customerNo
      );
      this.addCustomerForm.controls.customerFirstName.setValue(
        objForUpdate[0].cs_FirstName
      );
      this.addCustomerForm.controls.customerLastName.setValue(
        objForUpdate[0].cs_LastName
      );
      this.addCustomerForm.controls.customerPhoneNo.setValue(
        objForUpdate[0].cs_Phone
      );
      this.addCustomerForm.controls.customerType.setValue(
        objForUpdate[0].cs_CustomerType
      );
      this.addCustomerForm.controls.customerEmail.setValue(
        objForUpdate[0].cs_Email
      );
      this.addCustomerForm.controls.customerAddress.setValue(
        objForUpdate[0].cs_Address
      );
      this.addCustomerForm.controls.customerIsActive.setValue(
        objForUpdate[0].isActive
      );
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
      this.addCustomer(addObject);
    } catch (error) {
      console.log("Exception at againValidOnAdd: ", error);
    }
  }

  againValidOnUpdate(addObject: any) {
    this.updateCustomer(addObject);
    // try {
    //   if (this.addCustomerForm.controls.CustomerName.valid === true) {
    //     this.loading = true;
    //     this.btnDisable = true;
    //     let CustomerNameToValidate =
    //       this.addCustomerForm.controls.CustomerName.value;
    //     if (this.CustomerNameForUpdate === CustomerNameToValidate) {
    //       this.isCustomerNameDuplicate = false;
    //       this.updateCustomer(addObject);
    //       return;
    //     }
    //     this.request
    //       .getRequest(
    //         "Customer/ValidateCustomer?CustomerName=" +
    //           CustomerNameToValidate
    //       )
    //       .subscribe(
    //         (response) => {
    //           if (response.data === "") {
    //             this.isCustomerNameDuplicate = false;
    //             this.updateCustomer(addObject);
    //           } else {
    //             this.isCustomerNameDuplicate = true;
    //             this.loading = false;
    //             this.btnDisable = false;
    //           }
    //           console.log("Response at ValidateCustomer", response);
    //         },
    //         (error) => {
    //           console.log("Error at ValidateCustomer: ", error);
    //         }
    //       );
    //   } else {
    //     this.isCustomerNameDuplicate = false;
    //     this.loading = false;
    //     this.btnDisable = false;
    //   }
    // } catch (error) {
    //   console.log("Exception at againValidOnUpdate: ", error);
    // }
  }

  updateCustomer(obj: any) {
    try {

      this.loading = true;
      this.btnDisable = true;
      // let obj1 = {
      //   customerID: obj.consultant,
      // };
      // let dist = obj.CustomerDiagnoses.toString().split(",");
      let updateObject = {
        customerID: this.customerIDForUpdate,
        cs_Image: this.customerImage,
        customerNo: obj.customerCode,
        cs_FirstName: obj.customerFirstName,
        cs_LastName: obj.customerLastName,
        cs_CustomerType: obj.customerType,
        cs_Phone: obj.customerPhoneNo,
        cs_Email: obj.customerEmail,
        cs_Address: obj.customerAddress,
        isActive: this.customerCheck,
        updateDate: this.date.toJSON(),
      };
      this.request.postRequest("Customer/UpdateCustomer", updateObject).subscribe(
        (response) => {
          if (response[0].Status === 1) {
            this.loading = false;
            this.btnDisable = false;
            this.global.showNotification(
              "Success",
              "",
              "Customer Updated Successfully")
            this.close();
            this.getCustomer();
          } else {
            this.loading = false;
            this.btnDisable = false;
            this.global.showNotification(
              "Error",
              "",
              "Customer Already Exists")
              this.close();
          }
        },
        (error) => {
          console.log("Error at request addCustomer", error);
        }
      );
    } catch (error) {
      console.log("Exception at updateCustomer: ", error);
    }

    this.customerImage = null;
  }

  checkCustomerName(CustomerNameToValidate: any) {
    try {
      this.isMarkCorrect = false;
      if (this.addCustomerForm.controls.CustomerName.valid === true) {
        if (this.CustomerNameForUpdate === CustomerNameToValidate) {
          this.isCustomerNameDuplicate = false;
          return;
        }
        this.isValidating = true;
        let object: any = { CustomerName: CustomerNameToValidate };
        this.request
          .getRequest(
            "Customer/ValidateCustomer?CustomerName=" + CustomerNameToValidate
          )
          .subscribe(
            (response) => {
              this.isValidating = false;
              if (response.data === "") {
                this.isCustomerNameDuplicate = false;
                this.isMarkCorrect = true;
              } else {
                this.isCustomerNameDuplicate = true;
                this.isMarkCorrect = false;
              }
              console.log("Response at ValidateCustomer", response);
            },
            (error) => {
              this.isValidating = false;
              console.log("Error at ValidateCustomer: ", error);
            }
          );
      } else {
        this.isCustomerNameDuplicate = false;
        this.isValidating = false;
        this.isMarkCorrect = false;
      }
    } catch (error) {
      console.log("Exception at checkCustomerName: ", error);
    }
  }

  checkCustomerCode(CustomerCodeToValidate: any) {
    try {
      this.isMarkCorrect = false;
      if (this.addCustomerForm.controls.CustomerName.valid === true) {
        if (this.CustomerCodeForUpdate === CustomerCodeToValidate) {
          // this.isCustomerNameDuplicate = false;
          return;
        }
        this.isValidating = true;
        let object: any = { CustomerName: CustomerCodeToValidate };
        this.request
          .getRequest(
            "Customer/ValidateCustomer?CustomerCode=" + CustomerCodeToValidate
          )
          .subscribe(
            (response) => {
              this.isValidating = false;
              if (response.data === "") {
                // this.isCustomerNameDuplicate = false;
                this.isMarkCorrect = true;
              } else {
                // this.isCustomerNameDuplicate = true;
                this.isMarkCorrect = false;
              }
              console.log("Response at ValidateCustomer", response);
            },
            (error) => {
              this.isValidating = false;
              console.log("Error at ValidateCustomer: ", error);
            }
          );
      } else {
        // this.isCustomerNameDuplicate = false;
        this.isValidating = false;
        this.isMarkCorrect = false;
      }
    } catch (error) {
      console.log("Exception at checkCustomerName: ", error);
    }
  }

  deleteCustomer(obj: any, template: TemplateRef<any>) {
    this.selectedObj = obj.CustomerID;

    this.modalRef = this.modalService.show(template, this.config);
  }

  deletePrd(obj: any) {
    try {
      this.request
        .postRequest(`Customer/DeleteCustomer?customerID=${obj.customerID}`, null)
        .subscribe(
          (response) => {
            if (response[0].Status === 1) {
              this.global.showNotification(
                "Success",
                "",
                "Customer Deleted successfully")
              this.getCustomer();
              console.log("Response: ", response);
              // this.close();
            }
          },
          (error) => {
            console.log("Error at request deleteCustomer", error);
          }
        );
    } catch (error) {
      console.log("Exception at deleteCustomer: ", error);
    }
  }

  deleteAlert(object: any) {
    try {
      swal
        .fire({
          title: "Warning",
          text: "Are you sure you want to delete Customer ?",
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
