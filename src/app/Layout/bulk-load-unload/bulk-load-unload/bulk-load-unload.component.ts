import { ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { DecimalFormatDirective } from 'src/app/shared/modules/directives/DecimalFormatDirective';
import { RequestClass } from 'src/app/shared/requestClass';
import { GlobalService } from 'src/app/shared/services';
import { validationService } from 'src/app/shared/services/validation.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-bulk-load-unload',
  templateUrl: './bulk-load-unload.component.html',
  styleUrls: ['./bulk-load-unload.component.scss']
})
export class BulkLoadUnloadComponent implements OnInit {
  bulkLoadList: any = [];
  @ViewChild('userModal') userModal!: ModalDirective;
  // @ViewChild('myModal') myModal: ModalDirective;
  // @HostListener('input', ['$event.target.value'])
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
  };
  number: Number;
  decimalFormat: DecimalFormatDirective;
  bsModalRef: BsModalRef;
  apiResponse: any;
  loading: any = false;
  btnDisable: any = false;
  formForAdd: any = false;
  formForEdit: any = false;
  loadFundsForm: FormGroup;
  selectedFile: File | null = null;
  showModal = false;
  accountReference: string;
  APILoader: string;
  modelRef: any = "#myModal"
  batchNo: any;
  public loadFundsFormVisible: boolean = true;

  modalRef: BsModalRef;

  loadFundsModal: any;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private request: RequestClass,
    public global: GlobalService,
    // private el: ElementRef,
    // private cdRef: ChangeDetectorRef,
    private router: Router,

    private validator: validationService
  ) {

  }
  _user_variables = {
    _userID: null,
    _step: 1,
    _btn_previous: false,
    _buttonState: "",
    _buttonDisabled: false,
  };
  type: "";
  userRegisterFormStep1: FormGroup;
  userRegisterFormStep2: FormGroup;
  userRegisterFormStep3: FormGroup;
  initializeForm() {

    this.userRegisterFormStep1 = this.formBuilder.group({

    });

    this.userRegisterFormStep2 = this.formBuilder.group({

    });
    this.userRegisterFormStep3 = this.formBuilder.group({

    });

    // let country = UtilitiesServices.
  }

  ngOnInit(): void {
    // this.userModal.show();
    // this.uploadCSVFile();
    this.initializeForm();
    // const storedValue = localStorage.getItem('referenceNo');
    // if (storedValue) {
    //   this.referenceNo = storedValue;
    // }
  }
  ngAfterViewInit(): void {
    // Open the userModal when the component is loaded
    this.userModal.show();
  }

  closeModal(): void {
    // Logic to close the modal
    // this.loadFundsForm.reset();
    localStorage.removeItem('referenceNo');
    this.router.navigate(['/cards-layout']);
    this.bsModalRef.hide();

    // this.loadFundsFormVisible = true;
    // this.myModal.hide();

  }

  downloadCSV() {

  }
  uploadCSV() {

  }
  openModal(modal) {
    modal.show();
    this.initializeForm();
  }
  closeUserModel(modal) {
    this.initializeForm();
    // this.APILoader = "";
    modal.hide();
    this._user_variables._step = 1;
  }
  ClickPrevious() {
    this._user_variables._step--;
  }
  ClickNext() {
    this._user_variables._step++;
    this._user_variables._btn_previous = true;
    // this.userRegisterFormStep2.controls.professionalEmail.setValue(
    //   this.userRegisterFormStep1.controls.userName.value
    // );
  }
  submitForm(modal) {
    // this.loader.display(true);
    this.userRegisterFormStep2.controls.isActive.setValue(
      this.userRegisterFormStep1.controls.isActive.value
    );

    var form = this.validator.formChecker(this.userRegisterFormStep1.controls);
    let form1 = this.validator.formChecker(this.userRegisterFormStep2.controls);
    // createDate: this.date.toJSON();
    // form1["designation"] = {
    //   desigID: parseInt(form1["designationID"]),
    // };
    form["employee"] = form1;

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
    // this.closeUserModel(modal);
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('Selected File:', this.selectedFile);
  }

  uploadCSVFile() {
    try {
      if (!this.selectedFile) {
        throw new Error('Please select a CSV file to upload.');
      }

      if (!this.selectedFile.name.endsWith('.csv')) {
        throw new Error('Please select a valid CSV file.');
      }
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.request.postRequest("v1/WebPOS/BatchFunds", formData).subscribe(
        (response) => {
          (response.isError === false)
          this.bulkLoadList = response.data;
          this.loading = false;
          this.btnDisable = false;
          this.apiResponse = response;
          console.log(this.bulkLoadList);
          this.global.showNotification('success', '', ' File Loaded Successfully');
          // this.bsModalRef.hide();
          this.userModal.hide();
          this.close();
        },
        (error) => {
          // this.global.showNotification('Error', '', 'Check Your Internet Connection');
          console.log("Error at request addProduct", error);
        }
      );
    } catch (error) {
      // Handle errors
      console.error('Error uploading file:', error);
      this.global.showNotification('Error', '', error.message);
    }
  }

  openModalForAdd(template: TemplateRef<any>) {
    try {
      // this.formForEdit = false;
      this.formForAdd = true;
      // this.inspectionRequired = false;
      // this.perishable = false;
      this.loadFundsForm.reset();
      this.loadFundsFormVisible = false;

      //  this.loadFundsForm.controls.distributorisActive.setValue(true);
      // this.addCategoryForm.controls.peri.setValue(true);
      // this.selectedOrganizations = [];
      this.bsModalRef = this.modalService.show(template, this.config);
      this.bsModalRef.content.apiResponse = this.apiResponse;
      // this.bsModalRef.onHidden.subscribe(() => {
      //   this.loadFundsFormVisible = true;
      // });
      // const modalElement = document.getElementById('myModal');
      // if (modalElement) {
      //   modalElement.addEventListener('hidden.bs.modal', () => {
      //     this.loadFundsFormVisible = true;
      //   });
      // }
    } catch (error) {
      console.log("Exception at openModalForAdd: ", error);
    }
  }

  close() {
    try {
      // this.formForEdit = false;
      // this.formForAdd = false;
      localStorage.removeItem('referenceNo');
      this.bsModalRef.hide();
      this.loadFundsForm.reset();
      this.loadFundsFormVisible = true;
      // this.isProductNameDuplicate = false;
      // this.isValidating = false;
      // this.isMarkCorrect = false;
      // this.productNameForUpdate = "";
      // this.selectedOrganizations = [];
    } catch (error) {
      console.log("Exception at close: ", error);
    }
  }
}
