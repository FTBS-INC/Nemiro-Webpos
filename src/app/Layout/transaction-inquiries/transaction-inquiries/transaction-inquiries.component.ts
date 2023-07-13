import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators  } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/shared/services';
import { validationService } from 'src/app/shared/services/validation.service';


@Component({
  selector: 'app-transaction-inquiries',
  templateUrl: './transaction-inquiries.component.html',
  styleUrls: ['./transaction-inquiries.component.scss']
})
export class TransactionInquiriesComponent implements OnInit {
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
  };
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
  userRegisterFormStep1: FormGroup;
  userRegisterFormStep2: FormGroup;
  featureArray: any = [];
  selectedCityIds: string[];
  designationWithFeaturesList: any = [];
  designationIDForUpdate: any;
  tempArray: any = [];
  APILoader: string;
  date: any = new Date();
  input: any = "";

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
    public global: GlobalService,
    private spinner: NgxSpinnerService,
    private validator: validationService,
  ) {
    // this.addDesignationForm = formBuilder.group({
    //   designationTitle: ["", [Validators.required]],
    //   designationDescription: ["", [Validators.required]],
    //   designationIsActive: this.designationCheck,
    // });
   }

  ngOnInit(): void {
  }
  search() {
    try {
      // this.input = (<HTMLInputElement>(
      //   document.getElementById("searchInput")
      // )).value;

      // if (this.input === "") {
      //   this.getDesignation();
      // }
      // this.spinner.show();
      // this.request.getRequest('Generics/GetGenerics').subscribe((response) => {
      // this.request
      //   .getRequest(`EmpDesignation/GetAllDesignations?PageNo=-1&Search=${this.input}`)
      //   .subscribe(
      //     (response) => {
      //       if (response.statusCode === "200") {
      //         console.log("Response at search: ", response);
      //         this.designationList = response.data.data;
      //         this.totalRecords = response.data.totalNoRecords;
      //         this.recordsPerPage = response.data.recordsPerPage;
      //         this.spinner.hide();
      //       }
      //       // console.log("Response at getGenerics: ", response);
      //       // this.productList = response.data.data;
      //       // this.spinner.hide();
      //     },
      //     (error) => {
      //       console.log("Error at request  getGenerics", error);
      //       this.spinner.hide();
      //     }
      //   );
    } catch (error) {
      // console.log("Exception at getGenerics: ", error);
    }
  }
  onKeyUp(obj: any) {
    if(obj === "") {
      this.getDesignation();
    }
  }

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

  getDesignation() {
    try {
      // this.request.getRequest(`EmpDesignation/GetAllDesignations?PageNo=${this.p}`).subscribe(
      //   (response) => {
      //     console.log("Response at getDesignation: ", response);
      //     this.designationList = response.data.data;
      //     this.totalRecords = response.data.totalNoRecords;
      //     this.recordsPerPage = response.data.recordsPerPage;
      //     this.spinner.hide();
      //   },
      //   (error) => {
      //     console.log("Error at request  getPatient", error);
      //     this.spinner.hide();
      //   }
      // );
    } catch (error) {
      // console.log("Exception at getPatient: ", error);
    }
  }

  pageChange(page: any)
  {
    try {
      // this.spinner.show();
      // this.request.getRequest('Batch​/GetBatch').subscribe((response) => {
      // this.request.getRequest(`EmpDesignation/GetAllDesignations?PageNo=${page}`).subscribe(
      //   (response) => {
      //     console.log("Response at getBatch: ", response.data);
      //     this.designationList = response.data.data;
      //     this.totalRecords = response.data.totalNoRecords;
      //     this.recordsPerPage = response.data.recordsPerPage;
      //     this.spinner.hide();
      //   },
      //   (error) => {
      //     console.log("Error at request  getBatch", error);
      //     this.spinner.hide();
      //   }
      // );
    } catch (error) {
      // console.log("Exception at getBatch: ", error);
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

  

  

  

  

  closeUserModel(modal) {
    this.initializeForm();
    this.APILoader = "";
    modal.hide();
    // this._user_variables._step = 1;
    // this._user_variables._step = 2;
    // this._user_variables._step = 3;
  }

  
  openModal(modal) {
    modal.show();
    this.initializeForm();
  }

  
}
