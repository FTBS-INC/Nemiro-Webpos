import { Component, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { RequestClass } from 'src/app/shared/requestClass';
import { GlobalService, StorageService } from 'src/app/shared/services';

@Component({
  selector: 'app-customer-inquiry',
  templateUrl: './customer-inquiry.component.html',
  styleUrls: ['./customer-inquiry.component.scss']
})
export class CustomerInquiryComponent implements OnInit {
  @ViewChild('myModal') myModal: ModalDirective;
  selectedOption: string = 'email';
  label: string = 'Enter';
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
  };
  bsModalRef: BsModalRef;
   customerInquiryValue: any;
  public customerInquiryFormVisible: boolean = true;
  apiResponse: any;
  isValidating: any = false;
  isMarkCorrect: any = false;
 
  loading: any = false;
  btnDisable: any = false;
  formForAdd: any = false;
  customerInquiryForm: FormGroup;
  accountReference: string;
  modalResponse: any;
  userArr: any;
 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalServices: BsModalService,
    private request: RequestClass,
    private global: GlobalService,
    private storage: StorageService
  ) {

   }

  ngOnInit(): void {
  
  }
  updateLabel() {
    if (this.selectedOption === 'email') {
      this.label = 'Email';
    } else if (this.selectedOption === 'referenceId') {
      this.label = 'ReferenceID';
    } else if (this.selectedOption === 'phoneNo') {
      this.label = 'PhoneNo';
    }
  }
  

  closeModal(): void {
    // Logic to close the modal
    this.router.navigate(['/cards-layout']);
    this.bsModalRef.hide();
    
  }
 
  loadFunds(): void {
    // Logic to close the modal
    this.router.navigate(['/load-funds']);
    this.bsModalRef.hide();
    
  }
  redeemFunds(): void {
    // Logic to close the modal
    this.router.navigate(['/redeem-funds']);
    this.bsModalRef.hide();
    
  }
  
  submitForm(): void {
    // if (this.customerInquiryForm.invalid) {
    //   return; // Stop form submission if the form is invalid
    // }
    this.bsModalRef =  this.modalServices.show(this.myModal);
    this.formForAdd = true;
    // this.router.navigate(['/cards-layout']);
    // // Logic to handle form submission
    // this.bsModalRef.hide();
  }
 

  submitCustomerInquiry(template: TemplateRef<any>) {
    try {
     
      this.loading = true;
      this.btnDisable = true;
      let customerInquiryValue = (<HTMLInputElement>document.getElementById("customerInquiryValue")).value;

    this.request.getRequest(`v1/WebPOS/CustomerEnquiry?RefOrPhoneOrEmail=${customerInquiryValue}`).subscribe(
        (response) => {
          if (response.isError === false) {
            debugger
            this.loading = false;
            this.btnDisable = false;
            // this.global.showNotification('success','','Role Updated Successfully');
            // this.close();
            this.apiResponse = response;
            localStorage.setItem('referenceNo', response.data.referenceNo);
            this.openModalForAdd(template)
          }
          else {
            
  
            // this.userArr = response;
            // console.log(this.userArr);
            // this.getUserDetails();
            // this.global.showNotification('Error','','Role Already Exists');
          }
        },
        (error) => {
          this.global.showNotification('Error','','Invalid Credentials');
        }
      );
    } catch (error) {
      console.log("Exception at getGenerics: ", error);
    }
    finally {
      this.loading = false;
      this.btnDisable = false;
      this.close();
    }

}



openModalForAdd(template: TemplateRef<any>) {
    try {
      // this.formForEdit = false;
      this.formForAdd  = true;
      // this.inspectionRequired = false;
      // this.perishable = false;
      // this.customerInquiryForm.reset();
      this.customerInquiryFormVisible = false;
    
      //  this.loadFundsForm.controls.distributorisActive.setValue(true);
      // this.addCategoryForm.controls.peri.setValue(true);
      // this.selectedOrganizations = [];
      this.bsModalRef = this.modalServices.show(template, this.config);
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
      // this.customerInquiryForm.reset();
      this.bsModalRef.hide();
      this.customerInquiryFormVisible = true;
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
