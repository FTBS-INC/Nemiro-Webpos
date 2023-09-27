import { Component, OnInit, TemplateRef, AfterViewInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
// import { RequestClass } from "../../../shared/requestClass/request";
import swal from "sweetalert2";

import { GlobalService } from "src/app/shared/services";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: ["./roles.component.scss"],
})
export class RolesComponent implements OnInit {
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
  };
  // rowData: any[]
  modalRef: BsModalRef;
  rolesList: any = [];
  featureList: any = [];
  formForAdd: any = false;
  formForEdit: any = false;
  p: number = 1;
  addRolesForm: FormGroup;
  loading: any = false;
  btnDisable: any = false;
  isProductNameDuplicate: any = false;
  isValidating: any = false;
  productNameForUpdate: any = "";
  isMarkCorrect: any = false;
  selectedObj: any;
  active: any = false;
  ActiveColor: any = "#ffff";
  roleCheck: any = true;
  feature: any;
  featureArray: any = [];
  selectedCityIds: string[];
  rolesWithFeaturesList: any = [];
  roleIDForUpdate: any;
  tempArray: any = [];
  objUpdate: any;
  input: any = "";
  btnForUpdate: any = true;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    // private request: RequestClass,
    public global: GlobalService,
    private spinner: NgxSpinnerService,
    
  ) {
    this.addRolesForm = formBuilder.group({
      roleName: ["", [Validators.required]],
      roleDescription: ["", [Validators.required]],
      roleRemarks: ["", [Validators.required]],
      featureAssigned: [[], [Validators.required]],
      roleIsActive: this.roleCheck,
    });
  }

  ngOnInit(): void {
    this.getRoles();
    this.dropdown();
  }

  onItemSelect($event) {
    console.log("$event is ", $event);
  }

  dropdown() {
    // try {
    //   this.request.getRequest(`Feature/GetFeatures`).subscribe(
    //     (response) => {
    //       console.log("Response at getRoles: ", response.data);
    //       this.featureList = response.data;
    //       this.spinner.hide();
    //     },
    //     (error) => {
    //       console.log("Error at request  getPatient", error);
    //       this.spinner.hide();
    //     }
    //   );
    // } catch (error) {
    //   console.log("Exception at getPatient: ", error);
    // }
  }
  getRoles() {
    // try {
    //   // this.spinner.show();
    //   // this.request.getRequest('Patient/GetPatient').subscribe((response) => {
    //   this.request.getRequest(`/Role/GetAllRoles?PageNo=1`).subscribe(
    //     (response) => {
    //       console.log("Response at getRoles: ", response.data);
    //       this.rolesList = response.data;
    //       // this.totalRecords = response.data.totalNoRecords;
    //       // this.recordsPerPage = response.data.recordsPerPage;
    //       this.spinner.hide();
    //     },
    //     (error) => {
    //       console.log("Error at request  getPatient", error);
    //       this.spinner.hide();
    //     }
    //   );
    // } catch (error) {
    //   console.log("Exception at getPatient: ", error);
    // }
  }

  pushFeature(id: any) {
    this.featureArray.push(id);
  }

  close() {
    try {
      this.formForEdit = false;
      this.formForAdd = false;
      this.modalRef.hide();
      this.addRolesForm.reset();
      this.isProductNameDuplicate = false;
      this.isValidating = false;
      this.isMarkCorrect = false;
      this.productNameForUpdate = "";
      // this.selectedOrganizations = [];
    } catch (error) {
      console.log("Exception at close: ", error);
    }
  }

  defineActiveColor() {
    if (this.active === true) {
      this.ActiveColor = "green";
    } else if (this.active === false) this.ActiveColor = "grey";
  }

  showSuccess(heading: any, statement: any) {
    try {
      // this.toaster.success(statement, heading);
    } catch (error) {
      console.log("Exception at showSuccess: ", error);
    }
  }
  
  setUpdateBtn() {
    
    if (this.objUpdate !== this.addRolesForm.value)
    {
      this.btnForUpdate = false
    }
    else {
      this.btnForUpdate = true;
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
      this.addRolesForm.reset();
      this.addRolesForm.controls.roleIsActive.setValue(true);
      // this.selectedOrganizations = [];
      this.modalRef = this.modalService.show(template, this.config);
    } catch (error) {
      console.log("Exception at openModalForAdd: ", error);
    }
  }

  addRole(obj: any) {
    // try {
    //   this.loading = true;
    //   this.btnDisable = true;
    //   let addObject = {
    //     featurelist: obj.featureAssigned,
    //     name: obj.roleName,
    //     descp: obj.roleDescription,
    //     remarks: obj.roleRemarks,
    //     isActive: obj.roleIsActive,
    //   };

    //   this.request.postRequest("Role/AddRole", addObject).subscribe(
    //     (response) => {
    //       // this.close();
    //       // this.getRoles();
    //       if (response > 0) {
    //         this.loading = false;
    //         this.btnDisable = false;
    //         this.close();
    //         this.global.showNotification('Succcess','','Role Added Successfully');
    //         this.getRoles();
    //       } else {
    //         this.global.showNotification('Error','','Role Already Exists')
    //         this.close();
           
    //       }
    //     },
        
    //   );
    // } catch (error) { console.log("Exception at addProduct: ", error);}
   
  }
  getFeaturesAssignedToRole(id: any) {
    // this.request.getRequest(`Role/GetRoleWithFeatures?RoleID=${id}`).subscribe(
    //   (response) => {
    //     // this.global.showNotification('Succcess','','Saved succesuly')
    //     console.log("Response at getRoles: ", response.data);
    //     this.rolesWithFeaturesList = response.data;
    //     console.log("Features: ", this.rolesWithFeaturesList);
    //     // debugger;
    //     for (var i = 0; i < this.rolesWithFeaturesList.length; i++) {
    //       this.featureList.map((feature, index) => {
    //         if (feature.featureID === this.rolesWithFeaturesList[i].featureID) {
    //           this.featureList[index].selected = true;
    //           this.tempArray.push(feature.featureID);
    //         }
    //       });
    //     }
    //     this.addRolesForm.controls.featureAssigned.setValue(this.tempArray);
    //   },
    //   (error) => {
    //     console.log("Error at request  getPatient", error);
    //     this.spinner.hide();
    //   }
    // );
  }

  async openModalForUpdate(iD: any, template: TemplateRef<any>) {
    try {
      this.btnForUpdate = true;
      let objForUpdate = this.rolesList.filter((it) => it.roleID === iD);
      this.objUpdate = objForUpdate[0];
      this.formForEdit = true;
      this.formForAdd = false;
      this.roleIDForUpdate = objForUpdate[0].roleID;
      await this.getFeaturesAssignedToRole(this.roleIDForUpdate);
      console.log("response at openmodalforupdate: ", this.featureList);
      this.addRolesForm.controls.roleName.setValue(objForUpdate[0].name);
      this.addRolesForm.controls.roleDescription.setValue(
        objForUpdate[0].descp
      );
      this.addRolesForm.controls.roleRemarks.setValue(objForUpdate[0].remarks);
      this.addRolesForm.controls.roleIsActive.setValue(
        objForUpdate[0].isActive
      );
   
      this.modalRef = this.modalService.show(template, this.config);
    } catch (error) {
      console.log("Exception at openModalForUpdate: ", error);
    }
  }

  againValidOnAdd(addObject: any) {
    this.addRole(addObject);
  }

  againValidOnUpdate(addObject: any) {
    this.updateProduct(addObject);
  }

  updateProduct(obj: any) {
    // try {
    //   this.loading = true;
    //   this.btnDisable = true;
    //   let updateObject = {
    //     roleID: this.roleIDForUpdate,
    //     featurelist: obj.featureAssigned,
    //     name: obj.roleName,
    //     descp: obj.roleDescription,
    //     remarks: obj.roleRemarks,
    //     isActive: this.roleCheck,
    //   };
    //   this.request.postRequest("Role/UpdateRole", updateObject).subscribe(
    //     (response) => {
    //       if (response[0].Status === 1) {
    //         this.loading = false;
    //         this.btnDisable = false;
    //         this.global.showNotification('success','','Role Updated Successfully');
    //         this.close();
    //         this.getRoles();
    //       } else {
    //         this.global.showNotification('Error','','Role Already Exists');
    //       }
    //     },
    //     (error) => {
    //       this.global.showNotification('Error','','Role Already Exists')
    //       console.log("Error at request addProduct", error);
    //     }
    //   );
    // } catch (error) {
    //   console.log("Exception at updateProduct: ", error);
    // }
    // finally {
    //   this.loading = false;
    //   this.btnDisable = false;
    //   this.close();
    // }

    // while (this.tempArray.length > 0) {
    //   this.tempArray.pop();
    // }
  }
  search() {
    // try {
    //   this.input = (<HTMLInputElement>(
    //     document.getElementById("searchInput")
    //   )).value;

    //   if (this.input === "") {
    //     this.getRoles();
    //   }
    //   // this.spinner.show();
    //   // this.request.getRequest('Generics/GetGenerics').subscribe((response) => {
    //   this.request
    //     .getRequest(`Role/GetAllRoles?PageNo=1&Search=${this.input}`)
    //     .subscribe(
    //       (response) => {
    //         if (response.statusCode === "200") {
    //           console.log("Response at SearchRole: ", response);
    //           this.rolesList = response.data;
    //           this.spinner.hide();
    //         }
    //         // console.log("Response at getGenerics: ", response);
    //         // this.productList = response.data.data;
    //         // this.spinner.hide();
    //       },
    //       (error) => {
    //         console.log("Error at request  getGenerics", error);
    //         this.spinner.hide();
    //       }
    //     );
    // } catch (error) {
    //   console.log("Exception at getGenerics: ", error);
    // }
  }
  onKeyUp(obj: any) {
    if(obj === "") {
      this.getRoles();
    }
  }

  // checkProductName(productNameToValidate: any) {
  //   try {
  //     this.isMarkCorrect = false;
  //     if (this.addRolesForm.controls.productName.valid === true) {
  //       if (this.productNameForUpdate === productNameToValidate) {
  //         this.isProductNameDuplicate = false;
  //         return;
  //       }
  //       this.isValidating = true;
  //       let object: any = { productName: productNameToValidate };
  //       this.request
  //         .getRequest(
  //           "Product/ValidateProduct?productName=" + productNameToValidate
  //         )
  //         .subscribe(
  //           (response) => {
  //             this.isValidating = false;
  //             if (response.data === "") {
  //               this.isProductNameDuplicate = false;
  //               this.isMarkCorrect = true;
  //             } else {
  //               this.isProductNameDuplicate = true;
  //               this.isMarkCorrect = false;
  //             }
  //             console.log("Response at ValidateProduct", response);
  //           },
  //           (error) => {
  //             this.isValidating = false;
  //             console.log("Error at ValidateProduct: ", error);
  //           }
  //         );
  //     } else {
  //       this.isProductNameDuplicate = false;
  //       this.isValidating = false;
  //       this.isMarkCorrect = false;
  //     }
  //   } catch (error) {
  //     console.log("Exception at checkProductName: ", error);
  //   }
  // }

  deleteProduct(obj: any, template: TemplateRef<any>) {
    // this.selectedObj = obj.roleID;
    // this.modalRef = this.modalService.show(template, this.config);
  }

  deletePrd(obj: any) {
      // try {
      //   this.request
      //     .postRequest(`Role/DeleteRole?RoleID=${obj.roleID}`, null)
      //     .subscribe(
      //       (response) => {
      //         if (response[0].Status === 1) {
      //           // this.showError("", "product delete successfully.");
      //           this.global.showNotification('Success','','Role Deleted Successfully')
      //           this.getRoles();
      //           console.log("Response: ", response);
      //           // this.close();
      //         }
      //       },
      //       (error) => {
      //         console.log("Error at request deleteProduct", error);
      //       }
      //     );
      // } catch (error) {
      //   console.log("Exception at deleteProduct: ", error);
      // }
  }

  deleteAlert(object: any) {
    // try {
    //   swal
    //     .fire({
    //       title: "Warning",
    //       text: "Are you sure you want to delete Role?",
    //       icon: "warning",
    //       showCancelButton: true,
    //       confirmButtonColor: "#d33",
    //       cancelButtonColor: "#3085d6",
    //       cancelButtonText: "CANCEL",
    //       confirmButtonText: "DELETE",
    //       allowOutsideClick: false,
    //     })
    //     .then((result) => {
    //       if (result.value) {
    //         this.deletePrd(object);
    //       }
    //     });
    // } catch (error) {
    //   console.log("Exception at deleteAdvertisement: ", error);
    // }
  }
}
