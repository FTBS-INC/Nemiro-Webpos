import { Component, OnInit, TemplateRef } from "@angular/core";
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

@Component({
  selector: "app-features",
  templateUrl: "./features.component.html",
  styleUrls: ["./features.component.scss"],
})
export class FeaturesComponent implements OnInit {
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
  };
  // rowData: any[]
  modalRef: BsModalRef;
  addFeatureForm: FormGroup;
  formForAdd: any = false;
  formForEdit: any = false;
  featureList: any = [];
  roleList: any = [];
  loading: any = false;
  btnDisable: any = false;
  isProductNameDuplicate: any = false;
  isValidating: any = false;
  productNameForUpdate: any = "";
  isMarkCorrect: any = false;
  selectedObj: any;
  active: any = false;
  ActiveColor: any = "#ffff";

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    // private request: RequestClass,
    private spinner: NgxSpinnerService
  ) {
    this.addFeatureForm = formBuilder.group({
      role: ["", [Validators.required]],
      feature: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {}
  getProducts() {
    // try {
    //   // this.spinner.show();
    //   // this.request.getRequest('Product/GetProduct').subscribe((response) => {
    //   this.request.getRequest("Product/GetProduct").subscribe(
    //     (response) => {
    //       console.log("Response at getProducts: ", response);
    //       // this.productList = response;
    //       this.spinner.hide();
    //     },
    //     (error) => {
    //       console.log("Error at request  getProducts", error);
    //       this.spinner.hide();
    //     }
    //   );
    // } catch (error) {
    //   console.log("Exception at getProducts: ", error);
    // }
  }

  close() {
    try {
      this.formForEdit = false;
      this.formForAdd = false;
      this.modalRef.hide();
      this.addFeatureForm.reset();
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
      this.addFeatureForm.reset();
      // this.addCategoryForm.controls.peri.setValue(true);
      // this.selectedOrganizations = [];
      this.modalRef = this.modalService.show(template, this.config);
    } catch (error) {
      console.log("Exception at openModalForAdd: ", error);
    }
  }

  addProduct(obj: any) {
    // try {
    //   //obj.peri = obj.peri !== null ? true :false;
    //   this.loading = true;
    //   this.btnDisable = true;
    //   let addObject = {
    //     prdProductName: obj.productName,
    //     // prdOrgID: this.localStorageOrgId,
    //     // orgName: this.localStorageOrgId.toString(),
    //     // prdExpiryDays: obj.expiryDays.toString(),
    //     prdIsPerishable: obj.peri,
    //     // prdFdaInspectionRqrd: true,
    //     prdHandlingInstructions: obj.handlingInstructions,
    //     prdPackingTypeID: 0,
    //     prdMeasureUnitID: 0,
    //   };
    //   this.request.postRequest("Product/AddProduct", addObject).subscribe(
    //     (response) => {
    //       if (
    //         response[0].prdProductID !== null &&
    //         response[0].prdProductID > 0
    //       ) {
    //         this.loading = false;
    //         this.btnDisable = false;
    //         this.close();
    //         this.getProducts();
    //       } else {
    //         this.showError(
    //           "Product",
    //           "There is something wrong on product add"
    //         );
    //       }
    //     },
    //     (error) => {
    //       console.log("Error at request addProduct", error);
    //     }
    //   );
    // } catch (error) {
    //   console.log("Exception at addProduct: ", error);
    // }
  }

  openModalForUpdate(Code: any, template: TemplateRef<any>) {
    try {
      // let objForUpdate = this.productList.filter(it => it.prdProductID === iD);
      this.formForEdit = true;
      this.formForAdd = false;
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
    // try {
    //   if (this.addFeatureForm.controls.productName.valid === true) {
    //     this.loading = true;
    //     this.btnDisable = true;
    //     let productNameToValidate =
    //       this.addFeatureForm.controls.productName.value;
    //     this.request
    //       .getRequest(
    //         "Product/ValidateProduct?productName=" + productNameToValidate
    //       )
    //       .subscribe(
    //         (response) => {
    //           if (response.data === "") {
    //             this.isProductNameDuplicate = false;
    //             this.addProduct(addObject);
    //           } else {
    //             this.isProductNameDuplicate = true;
    //             this.loading = false;
    //             this.btnDisable = false;
    //           }
    //           console.log("Response at ValidateProduct", response);
    //         },
    //         (error) => {
    //           console.log("Error at ValidateProduct: ", error);
    //         }
    //       );
    //   } else {
    //     this.isProductNameDuplicate = false;
    //     this.loading = false;
    //     this.btnDisable = false;
    //   }
    // } catch (error) {
    //   console.log("Exception at againValidOnAdd: ", error);
    // }
  }

  againValidOnUpdate(addObject: any) {
    // try {
    //   if (this.addFeatureForm.controls.productName.valid === true) {
    //     this.loading = true;
    //     this.btnDisable = true;
    //     let productNameToValidate =
    //       this.addFeatureForm.controls.productName.value;
    //     if (this.productNameForUpdate === productNameToValidate) {
    //       this.isProductNameDuplicate = false;
    //       this.updateProduct(addObject);
    //       return;
    //     }
    //     this.request
    //       .getRequest(
    //         "Product/ValidateProduct?productName=" + productNameToValidate
    //       )
    //       .subscribe(
    //         (response) => {
    //           if (response.data === "") {
    //             this.isProductNameDuplicate = false;
    //             this.updateProduct(addObject);
    //           } else {
    //             this.isProductNameDuplicate = true;
    //             this.loading = false;
    //             this.btnDisable = false;
    //           }
    //           console.log("Response at ValidateProduct", response);
    //         },
    //         (error) => {
    //           console.log("Error at ValidateProduct: ", error);
    //         }
    //       );
    //   } else {
    //     this.isProductNameDuplicate = false;
    //     this.loading = false;
    //     this.btnDisable = false;
    //   }
    // } catch (error) {
    //   console.log("Exception at againValidOnUpdate: ", error);
    // }
  }

  updateProduct(obj: any) {
    // try {
    //   this.loading = true;
    //   this.btnDisable = true;
    //   let updateObject = {
    //     // prdProductID: this.productIDForUpdate ,
    //     prdProductName: obj.categoryName,
    //     // prdOrgID: this.localStorageOrgId,
    //     // orgName: this.localStorageOrgId.toString(),
    //     // prdExpiryDays: obj.expiryDays.toString(),
    //     prdIsPerishable: obj.peri,
    //     //prdFdaInspectionRqrd: true,
    //     prdHandlingInstructions: obj.handlingInstructions,
    //     prdPackingTypeID: 0,
    //     prdMeasureUnitID: 0,
    //   };
    //   this.request.postRequest("Product/UpdateProduct", updateObject).subscribe(
    //     (response) => {
    //       if (response[0].status === 1) {
    //         this.loading = false;
    //         this.btnDisable = false;
    //         this.showSuccess("", "Product is Updated Successfully.");
    //         this.close();
    //         this.getProducts();
    //       } else {
    //         this.showError("", "Something went wrong, please try again.");
    //       }
    //     },
    //     (error) => {
    //       console.log("Error at request addProduct", error);
    //     }
    //   );
    // } catch (error) {
    //   console.log("Exception at updateProduct: ", error);
    // }
  }

  checkProductName(productNameToValidate: any) {
    // try {
    //   this.isMarkCorrect = false;
    //   if (this.addFeatureForm.controls.productName.valid === true) {
    //     if (this.productNameForUpdate === productNameToValidate) {
    //       this.isProductNameDuplicate = false;
    //       return;
    //     }
    //     this.isValidating = true;
    //     let object: any = { productName: productNameToValidate };
    //     this.request
    //       .getRequest(
    //         "Product/ValidateProduct?productName=" + productNameToValidate
    //       )
    //       .subscribe(
    //         (response) => {
    //           this.isValidating = false;
    //           if (response.data === "") {
    //             this.isProductNameDuplicate = false;
    //             this.isMarkCorrect = true;
    //           } else {
    //             this.isProductNameDuplicate = true;
    //             this.isMarkCorrect = false;
    //           }
    //           console.log("Response at ValidateProduct", response);
    //         },
    //         (error) => {
    //           this.isValidating = false;
    //           console.log("Error at ValidateProduct: ", error);
    //         }
    //       );
    //   } else {
    //     this.isProductNameDuplicate = false;
    //     this.isValidating = false;
    //     this.isMarkCorrect = false;
    //   }
    // } catch (error) {
    //   console.log("Exception at checkProductName: ", error);
    // }
  }

  deleteProduct(obj: any, template: TemplateRef<any>) {
    this.selectedObj = obj.prdProductID;

    this.modalRef = this.modalService.show(template, this.config);
  }

  deletePrd(obj: any) {
    // try {
    //   this.request
    //     .postRequest(`Product/DeleteProduct?id=${obj.prdProductID}`, null)
    //     .subscribe(
    //       (response) => {
    //         if (response[0].Status === 1) {
    //           this.showError("", "product delete successfully.");
    //           this.getProducts();
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

  deleteAlert(object) {
    try {
      swal
        .fire({
          title: "Warning",
          text: "Are you sure you want to delete product ?",
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
