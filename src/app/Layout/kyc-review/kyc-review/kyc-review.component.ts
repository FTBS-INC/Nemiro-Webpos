import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef , BsModalService} from "ngx-bootstrap/modal";
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
import { validationService } from "src/app/shared/services/validation.service";
// import { CarouselComponent } from "ngx-owl-carousel-o";

@Component({
  selector: "app-kyc-review",
  templateUrl: "./kyc-review.component.html",
  styleUrls: ["./kyc-review.component.scss"],
})
export class KycReviewComponent implements OnInit {
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
  };
  kycList: any = [];
  modalRef: BsModalRef;
  addKycForm: FormGroup;
  formForAdd: any = false;
  formForEdit: any = false;
  showModal: boolean;
  loading: any = false;
  fieldTextType: Boolean;
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
  APILoader: string;
  p: number = 1;
  totalRecords: number;
  recordsPerPage: number;
  distributorCheck: boolean = false;
  date: any = new Date();
  distributorIDForUpdate: any;
  input: string;
  objUpdate: any;
  btnForUpdate: any = true;
  userRegisterFormStep1: FormGroup;
  userRegisterFormStep2: FormGroup;
  userRegisterFormStep3: FormGroup;
  _user_variables = {
    _userID: null,
    _step: 1,
    _btn_previous: false,
    _buttonState: "",
    _buttonDisabled: false,
  };
  type: "";

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private validator: validationService,
    private request: RequestClass,
    private spinner: NgxSpinnerService,
    private global: GlobalService
  
  ) {}
 

  initializeForm() {
    this.userRegisterFormStep1 = this.formBuilder.group({
      // userID: [-1, Validators.nullValidator],
      // email: [
      //   "",
      //   Validators.compose([
      //     Validators.required,
      //     Validators.pattern(
      //       /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,3})$/
      //     ),
      //   ]),
      // ],
      //  firstName: ["", Validators.compose([Validators.required])],
      // lastName: ["", Validators.compose([Validators.nullValidator])],
      // password: [
      //   "",
      //   Validators.compose([
      //     Validators.required,
      //     Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
      //     Validators.minLength(8),
      //   ]),
      // ],
    });

    this.userRegisterFormStep2 = this.formBuilder.group({
      //employeeID: [-1, Validators.nullValidator],
      // employeeID: [-1, Validators.nullValidator],
      // designationID: [-1, Validators.required],
      // firstName: ["", Validators.compose([Validators.required])],
      // lastName: ["", Validators.compose([Validators.nullValidator])],
      // phoneExt: ["", Validators.compose([Validators.nullValidator])],
      // designation: this.formBuilder.group({
      //   //designationID: [-1, Validators.required],
      //   desigID: [0, Validators.required],
      // }),
      // desigID: [null, Validators.required],
      // city: [null, Validators.compose([Validators.nullValidator])],
      // country: [null, Validators.compose([Validators.nullValidator])],
      // state: [null, Validators.compose([Validators.nullValidator])],
      // address1: ["", Validators.required],
      // zip: [
      //   "",
      //   Validators.compose([
      //     Validators.nullValidator,
      //     Validators.pattern("^[0-9]{5}(?:-[0-9]{4})?$"),
      //   ]),],
      // workPhone: ["", Validators.compose([Validators.required])],
      // homePhone: ["", Validators.compose([Validators.required])],
      // faxNo: ["", Validators.compose([Validators.nullValidator])],
      // homePhone: ["", Validators.nullValidator],
      // mobilePhone: ["", Validators.required],
      // professionalEmail: [
      //   "",
      //   Validators.compose([
      //     Validators.required,
      //     Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      //   ]),
      // ],
      // personalEmail: [
      //   "",
      //   Validators.compose([
      //     Validators.required,
      //     Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
      //   ]),
      // ],
      // imageURL: ["", Validators.nullValidator],
      // isActive: [true, Validators.nullValidator],
    });

    // let country = UtilitiesServices.
  }
  ngOnInit(): void {
    this.getKyc();
    this.initializeForm();
  }

  getKyc() {
    // try {

    //   // this.spinner.show();
    //   // this.request.getRequest('Distributers​/GetDistributers').subscribe((response) => {
    //   this.request
    //     .getRequest(`Distributor/GetAllDistributor?PageNO=${this.p}`)
    //     .subscribe(
    //       (response) => {
    //         console.log("Response at getDistributers: ", response.data);
    //         this.distributorList = response.data.data;
    //         this.totalRecords = response.data.totalNoRecords;
    //         this.recordsPerPage = response.data.recordsPerPage;
    //         this.spinner.hide();
    //       },
    //       (error) => {
    //         console.log("Error at request  getDistributers", error);
    //         this.spinner.hide();
    //       }
    //     );
    // } catch (error) {
    //   console.log("Exception at getDistributers: ", error);
    // }
  }

  pageChange(page: any) {
    // try {

    //   // this.spinner.show();
    //   // this.request.getRequest('Batch​/GetBatch').subscribe((response) => {
    //   this.request
    //     .getRequest(`Distributor/GetAllDistributor?PageNO=${page}`)
    //     .subscribe(
    //       (response) => {
    //         console.log("Response at getBatch: ", response.data);
    //         this.distributorList = response.data.data;
    //         this.totalRecords = response.data.totalNoRecords;
    //         this.recordsPerPage = response.data.recordsPerPage;
    //         this.spinner.hide();
    //       },
    //       (error) => {
    //         console.log("Error at request  getBatch", error);
    //         this.spinner.hide();
    //       }
    //     );
    // } catch (error) {
    //   console.log("Exception at getBatch: ", error);
    // }
  }
  search() {
    // try {

    //   this.input = (<HTMLInputElement>(
    //     document.getElementById("searchInput")
    //   )).value;

    //   if (this.input === "") {
    //     this.getDistributers();
    //   }
    //   // this.spinner.show();
    //   // this.request.getRequest('Generics​/GetGenerics').subscribe((response) => {
    //   this.request
    //     .getRequest(`Distributor/GetAllDistributor?PageNO=1&Search=${this.input}`)
    //     .subscribe(
    //       (response) => {
    //         // if (response.statusCode === "200") {
    //         // console.log("Response at getDistributors: ", response);
    //         // this.distributorList = response.data.data;
    //         // this.spinner.hide();
    //         // }
    //         console.log("Response at getDistributors: ", response);
    //         this.distributorList = response.data.data;
    //         this.spinner.hide();
    //       },
    //       (error) => {
    //         console.log("Error at request  getDistributors", error);
    //         this.spinner.hide();
    //       }
    //     );
    // } catch (error) {
    //   console.log("Exception at getDistributors: ", error);
    // }
  }
  onKeyUp(obj: any) {
    if(obj === "") {
      this.getKyc();
    }
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  close() {
    try {
      this.formForEdit = false;
      this.formForAdd = false;
      this.modalRef.hide();
      this.addKycForm.reset();
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
    if (this.objUpdate !== this.addKycForm.value)
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

  openModal(modal) {
    modal.show();
    this.initializeForm();
  }

  

  openModalForUpdate(iD: any, template: TemplateRef<any>) {
    try {
      this.btnForUpdate = true;
      let objForUpdate = this.kycList.filter(
        (it) => it.distributorID === iD
      );
      this.objUpdate = objForUpdate[0];
      this.formForEdit = true;
      this.formForAdd = false;
      this.distributorIDForUpdate = objForUpdate[0].distributorID;
      this.addKycForm.controls.distributorName.setValue(
        objForUpdate[0].distributorName
      );
      this.addKycForm.controls.distributorCode.setValue(
        objForUpdate[0].distributorCode
      );
      this.addKycForm.controls.distributorAddress.setValue(
        objForUpdate[0].distributorAddress
      );
      this.addKycForm.controls.distributorEmail.setValue(
        objForUpdate[0].email
      );
      this.addKycForm.controls.distributorNTN.setValue(
        objForUpdate[0].ntn
      );
      this.addKycForm.controls.distributorPhoneNo.setValue(
        objForUpdate[0].phoneNo
      );
      this.addKycForm.controls.distributorCertificate.setValue(
        objForUpdate[0].certificate
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

  closeUserModel(modal) {
    this.initializeForm();
    // this.APILoader = "";
    modal.hide();
    this._user_variables._step = 1;
    this._user_variables._step = 2;
    this._user_variables._step = 3;
  }

  // againValidOnAdd(addObject: any) {
  //   try {
  //     this.addDistributers(addObject);
  //   } catch (error) {
  //     console.log("Exception at againValidOnAdd: ", error);
  //   }
  // }
  

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
  
    // try {
    //   this.loading = true;
    //   this.btnDisable = true;
    //   let updateObject = {
    //     distributorID: this.distributorIDForUpdate,
    //     distributorCode: obj.distributorCode,
    //     distributorName: obj.distributorName,
    //     distributorAddress: obj.distributorAddress,
    //     email: obj.distributorEmail,
    //     phoneNo: obj.distributorPhoneNo,
    //     certificate: obj.distributorCertificate,
    //     ntn: obj.distributorNTN,
    //     website: obj.distributorWebsite,
    //     isActive: this.distributorCheck,
    //     updateDate: this.date.toJSON(),
    //   };
    //   console.log("response at updateobject", updateObject);
    //   this.request
    //     .postRequest("Distributor/UpdateDistributor", updateObject)
    //     .subscribe(
    //       (response) => {
    //         if (response[0].Status === 1) {
    //           this.loading = false;
    //           this.btnDisable = false;
    //           this.close();
    //           this.global.showNotification(
    //             "Success",
    //             "",
    //             "Distributer Updated successfully")
             
    //           this.getDistributers();
    //         } else {
    //           this.global.showNotification(
    //             "Error",
    //             "",
    //             "Distributer Already Exists");
    //             this.close();
    //         }
    //       },
    //       (error) => {
    //         console.log("Error at request addDistributers", error);
    //       }
    //     );
    // } catch (error) {
    //   console.log("Exception at updateDistributers: ", error);
    // }
  }

  checkDistributersName(distributersNameToValidate: any) {
    // try {
    //   this.isMarkCorrect = false;
    //   if (this.addDistributersForm.controls.distributersName.valid === true) {
    //     if (this.distributersNameForUpdate === distributersNameToValidate) {
    //       this.isDistributersNameDuplicate = false;
    //       return;
    //     }
    //     this.isValidating = true;
    //     let object: any = { distributersName: distributersNameToValidate };
    //     this.request
    //       .getRequest(
    //         "Distributers/ValidateDistributers?distributersName=" +
    //           distributersNameToValidate
    //       )
    //       .subscribe(
    //         (response) => {
    //           this.isValidating = false;
    //           if (response.data === "") {
    //             this.isDistributersNameDuplicate = false;
    //             this.isMarkCorrect = true;
    //           } else {
    //             this.isDistributersNameDuplicate = true;
    //             this.isMarkCorrect = false;
    //           }
    //           console.log("Response at ValidateDistributers", response);
    //         },
    //         (error) => {
    //           this.isValidating = false;
    //           console.log("Error at ValidateDistributers: ", error);
    //         }
    //       );
    //   } else {
    //     this.isDistributersNameDuplicate = false;
    //     this.isValidating = false;
    //     this.isMarkCorrect = false;
    //   }
    // } catch (error) {
    //   console.log("Exception at checkDistributersName: ", error);
    // }
  }
  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  checkDistributersCode(distributersCodeToValidate: any) {
    // try {
    //   this.isMarkCorrect = false;
    //   if (this.addDistributersForm.controls.distributersName.valid === true) {
    //     if (this.distributersCodeForUpdate === distributersCodeToValidate) {
    //       // this.isDistributersNameDuplicate = false;
    //       return;
    //     }
    //     this.isValidating = true;
    //     let object: any = { distributersName: distributersCodeToValidate };
    //     this.request
    //       .getRequest(
    //         "Distributers/ValidateDistributers?distributersCode=" +
    //           distributersCodeToValidate
    //       )
    //       .subscribe(
    //         (response) => {
    //           this.isValidating = false;
    //           if (response.data === "") {
    //             // this.isDistributersNameDuplicate = false;
    //             this.isMarkCorrect = true;
    //           } else {
    //             // this.isDistributersNameDuplicate = true;
    //             this.isMarkCorrect = false;
    //           }
    //           console.log("Response at ValidateDistributers", response);
    //         },
    //         (error) => {
    //           this.isValidating = false;
    //           console.log("Error at ValidateDistributers: ", error);
    //         }
    //       );
    //   } else {
    //     // this.isDistributersNameDuplicate = false;
    //     this.isValidating = false;
    //     this.isMarkCorrect = false;
    //   }
    // } catch (error) {
    //   console.log("Exception at checkDistributersName: ", error);
    // }
  }

  ClickNext() {
    this._user_variables._step++;
    this._user_variables._btn_previous = true;
    // this.userRegisterFormStep2.controls.professionalEmail.setValue(
    //   this.userRegisterFormStep1.controls.userName.value
    // );
  }
  ClickPrevious() {
    this._user_variables._step--;
  }

  submitForm(modal) {

    this.closeUserModel(modal);
    // this.loader.display(true);
    // this.userRegisterFormStep2.controls.isActive.setValue(
    //   this.userRegisterFormStep1.controls.isActive.value
    // );

    // var form = this.validator.formChecker(this.userRegisterFormStep1.controls);
    // let form1 = this.validator.formChecker(this.userRegisterFormStep2.controls);
    // createDate: this.date.toJSON();
    // form1["designation"] = {
    //   desigID: parseInt(form1["designationID"]),
    // };
    // form["employee"] = form1;

    // form["role"] = {
    //   roleID: parseInt(form["roleID"]),
    // };

    // if (form["employeeID"] > -1) {
    //   this.updateEmployee(form["employee"], modal);
    // } else {
    //   this.addEmployee(form["employee"], modal);
    // }

    // if (form["userID"] > -1) {
    //   this.updateUser(form, modal);
    // } else {
    //   this.addUser(form, modal);
    // }
    this.closeUserModel(modal);
  }

  
}
