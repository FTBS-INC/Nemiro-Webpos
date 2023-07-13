import { Component, OnInit, TemplateRef, AfterViewInit } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { RequestClass } from "../../../shared/requestClass/request";
import swal from "sweetalert2";

import { GlobalService } from "src/app/shared/services";

@Component({
  selector: "app-designation",
  templateUrl: "./designation.component.html",
  styleUrls: ["./designation.component.scss"],
})
export class DesignationComponent implements OnInit {
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
  };
  // rowData: any[]
  modalRef: BsModalRef;
  designationList: any = [];
  featureList: any = [];
  formForAdd: any = false;
  formForEdit: any = false;
  p: number = 1;
  addDesignationForm: FormGroup;
  totalRecords: number;
  recordsPerPage: number;
  loading: any = false;
  btnDisable: any = false;
  isProductNameDuplicate: any = false;
  isValidating: any = false;
  productNameForUpdate: any = "";
  isMarkCorrect: any = false;
  selectedObj: any;
  active: any = false;
  ActiveColor: any = "#ffff";
  designationCheck: any = true;
  feature: any;
  featureArray: any = [];
  selectedCityIds: string[];
  designationWithFeaturesList: any = [];
  designationIDForUpdate: any;
  tempArray: any = [];
  date: any = new Date();
  input: any = "";

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private request: RequestClass,
    public global: GlobalService,
    private spinner: NgxSpinnerService,
    
  ) {
    this.addDesignationForm = formBuilder.group({
      designationTitle: ["", [Validators.required]],
      designationDescription: ["", [Validators.required]],
      designationIsActive: this.designationCheck,
    });
  }

  ngOnInit(): void {
    this.getDesignation();
  
  }

  search() {
    try {
      this.input = (<HTMLInputElement>(
        document.getElementById("searchInput")
      )).value;

      if (this.input === "") {
        this.getDesignation();
      }
      // this.spinner.show();
      // this.request.getRequest('Generics/GetGenerics').subscribe((response) => {
      this.request
        .getRequest(`EmpDesignation/GetAllDesignations?PageNo=-1&Search=${this.input}`)
        .subscribe(
          (response) => {
            if (response.statusCode === "200") {
              console.log("Response at search: ", response);
              this.designationList = response.data.data;
              this.totalRecords = response.data.totalNoRecords;
              this.recordsPerPage = response.data.recordsPerPage;
              this.spinner.hide();
            }
            // console.log("Response at getGenerics: ", response);
            // this.productList = response.data.data;
            // this.spinner.hide();
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
      this.getDesignation();
    }
  }

  getDesignation() {
    try {
      this.request.getRequest(`EmpDesignation/GetAllDesignations?PageNo=${this.p}`).subscribe(
        (response) => {
          console.log("Response at getDesignation: ", response);
          this.designationList = response.data.data;
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

  pageChange(page: any)
  {
    try {
      // this.spinner.show();
      // this.request.getRequest('Batch​/GetBatch').subscribe((response) => {
      this.request.getRequest(`EmpDesignation/GetAllDesignations?PageNo=${page}`).subscribe(
        (response) => {
          console.log("Response at getBatch: ", response.data);
          this.designationList = response.data.data;
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

  pushFeature(id: any) {
    this.featureArray.push(id);
  }

  close() {
    try {
      this.formForEdit = false;
      this.formForAdd = false;
      this.modalRef.hide();
      this.addDesignationForm.reset();
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
      this.addDesignationForm.reset();
      this.addDesignationForm.controls.designationIsActive.setValue(true);
      this.modalRef = this.modalService.show(template, this.config);
    } catch (error) {
      console.log("Exception at openModalForAdd: ", error);
    }
  }

  addRole(obj: any) {
    try {
      this.loading = true;
      this.btnDisable = true;
      let addObject = {
        title: obj.designationTitle,
        descp: obj.designationDescription,
        isActive: obj.designationIsActive,
      };

      this.request.postRequest("EmpDesignation/AddEmpDesignation", addObject).subscribe(
        (response) => {
          // this.close();
          // this.getDesignation();
          if (response[0].EmpDesignationID > 0) {
            this.loading = false;
            this.btnDisable = false;
            this.close();
            this.global.showNotification('Succcess','','Designation Added Successfully');
            this.getDesignation();
          } else {
            this.global.showNotification('Error','','Designation Already Exists')
            this.close();
            this.loading = false;
            this.btnDisable = false;
          }
        },
        (error) => {
          this.global.showNotification('Error','','Role Already Exists')
        }
      );
    } catch (error) { console.log("Exception at addProduct: ", error);}
  
  }

  openModalForUpdate(iD: any, template: TemplateRef<any>) {
    try {
      let objForUpdate = this.designationList.filter((it) => it.dsgDesigID === iD);
      this.formForEdit = true;
      this.formForAdd = false;
      this.designationIDForUpdate = objForUpdate[0].dsgDesigID;
      this.addDesignationForm.controls.designationTitle.setValue(objForUpdate[0].dsgTitle);
      this.addDesignationForm.controls.designationDescription.setValue(
        objForUpdate[0].dsgDescp
      );
      this.addDesignationForm.controls.designationIsActive.setValue(
        objForUpdate[0].dsgIsActive
      );
      

      this.modalRef = this.modalService.show(template, this.config);
    } catch (error) {
      console.log("Exception at openModalForUpdate: ", error);
    }
  }

  againValidOnAdd(addObject: any) {
    try {
      this.addRole(addObject);
    } catch (error) {
      console.log("Exception at againValidOnAdd: ", error);
    }
  }

  againValidOnUpdate(addObject: any) {
    this.updateProduct(addObject);
  }

  updateProduct(obj: any) {
    try {
  
      this.loading = true;
      this.btnDisable = true;
      let updateObject = {
        desigID: this.designationIDForUpdate,
        title: obj.designationTitle,
        descp: obj.designationDescription,
        isActive: this.designationCheck,
        updateDate: this.date.toJSON(),
      };
      this.request.postRequest("EmpDesignation/UpdateEmpDesignation", updateObject).subscribe(
        (response) => {
          if (response[0].Status > 0) {
            this.loading = false;
            this.btnDisable = false;
            this.global.showNotification('success','','Designation Updated Successfully');
            this.close();
            this.getDesignation();
          } else {
            this.global.showNotification('Error','','Designation Exists');
          }
        },
        // (error) => {
        //   this.global.showNotification('Error','','Role Already Exists')
        //   console.log("Error at request addProduct", error);
        // }
      );
    } catch (error) {
      console.log("Exception at updateProduct: ", error);
    }
    finally {
      this.loading = false;
      this.btnDisable = false;
      this.close();
    }

    while (this.tempArray.length > 0) {
      this.tempArray.pop();
    }
  }


  deleteProduct(obj: any, template: TemplateRef<any>) {
    this.selectedObj = obj.desigID;
    this.modalRef = this.modalService.show(template, this.config);
  }

  deletePrd(obj: any) {
    try {
    
      this.request
        .postRequest(`EmpDesignation/DeleteEmpDesignation?EmpDesigID=${obj.dsgDesigID}`, null)
        .subscribe(
          (response) => {
            if (response[0].Status === 1) {
              // this.showError("", "product delete successfully.");
              this.global.showNotification('Success','','Designation Deleted Successfully')
              this.getDesignation();
              console.log("Response: ", response);
              // this.close();
            }
          },
          (error) => {
            console.log("Error at request deleteProduct", error);
          }
        );
    } catch (error) {
      console.log("Exception at deleteProduct: ", error);
    }
  }

  deleteAlert(object: any) {
    try {
      swal
        .fire({
          title: "Warning",
          text: "Are you sure you want to delete Designation?",
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
