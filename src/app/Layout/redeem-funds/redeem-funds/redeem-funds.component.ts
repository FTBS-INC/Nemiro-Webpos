import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { RequestClass } from 'src/app/shared/requestClass';
import { GlobalService } from 'src/app/shared/services';

@Component({
  selector: 'app-redeem-funds',
  templateUrl: './redeem-funds.component.html',
  styleUrls: ['./redeem-funds.component.scss']
})
export class RedeemFundsComponent implements OnInit {
  @ViewChild('myModal') myModal: ModalDirective;

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
  };
  bsModalRef: BsModalRef;
  public redeemFundsFormVisible: boolean = true;
  loading: any = false;
  btnDisable: any = false;
  apiResponse: any;
  formForAdd: any = false;
  formForEdit: any = false;
  modelRef: any = "#myModal"
  redeemFundsForm: FormGroup;
  accountReference: string;
  amount: number;
  totalAmount: number;
  fee: number;
  referenceNo: string;
  redeemFundsModal: any;
  constructor(
    private formBuilder: FormBuilder, 
    private modalService: BsModalService,
    private router: Router,
    private request: RequestClass,
    public global: GlobalService
  ) { 
    this.redeemFundsForm = this.formBuilder.group({
      accountReference: [null, Validators.compose([Validators.required])],
      amount: [null, Validators.compose([Validators.required])],
      // totalAmount: [null, Validators.compose([Validators.required])],
      // fee: [null, Validators.compose([Validators.required])],
      // fee: ["5", Validators.nullValidator],
  });}

  ngOnInit(): void {
    const storedValue = localStorage.getItem('referenceNo');
    if (storedValue) {
      this.referenceNo = storedValue;
    }
  }

  closeModal(): void {
    // Logic to close the modal
    localStorage.removeItem('referenceNo');
    this.redeemFundsForm.reset();
    this.router.navigate(['/cards-layout']);
    this.bsModalRef.hide();
    
  }

  submitForm(): void {
    this.bsModalRef =  this.modalService.show(this.myModal);
    // this.router.navigate(['/cards-layout']);
    // // Logic to handle form submission
    // this.bsModalRef.hide();
  }
  // calculateFee() {
  //   // this.fee = this.amount * 0.03; // Calculate 3% of the amount
  //   this.totalAmount = this.amount - 5;
  // }
  submitRedeemFunds(form: any, template: TemplateRef<any>) {
    try {
      this.loading = true;
      this.btnDisable = true;
      let obj = {
        referenceId: form.controls.accountReference.value,
        amount: form.controls.amount.value,
        // fee: "5",
comments: "POS Redeem"
        // fee: form.fee
      }
      this.request.postRequest("v1/WebPOS/RedeemFunds", obj).subscribe(
        (response) => {
          if (response.isError === false) {
            this.loading = false;
            this.btnDisable = false;
            
            // this.close();
            this.apiResponse = response;
            this.openModalForAdd(template)
            this.global.showNotification('success','','Funds Redeemed Successfully');
            localStorage.removeItem('referenceNo');
            // this.getRoles();
          } else {
            this.global.showNotification('Error','','Internal Server Error');
          }
        },
        (error) => {
          this.global.showNotification('Error','','Check Your Internet Connection')
          // console.log("Error at request addProduct", error);
        }
      );
    } catch (error) {
      console.log("Exception at updateProduct: ", error);
    }
    finally {
      this.loading = false;
      this.btnDisable = false;
      this.close();
    }

    // while (this.tempArray.length > 0) {
    //   this.tempArray.pop();
    // }
  }
  openModalForAdd(template: TemplateRef<any>) {
    try {
      // this.formForEdit = false;
      this.formForAdd  = true;
      // this.inspectionRequired = false;
      // this.perishable = false;
      this.redeemFundsForm.reset();
      this.redeemFundsFormVisible = false;
    
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
      this.redeemFundsForm.reset();
      this.bsModalRef.hide();
      this.redeemFundsFormVisible = true;
      
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
