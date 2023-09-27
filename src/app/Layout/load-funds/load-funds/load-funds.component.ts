import { Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from "@angular/router";
import { RequestClass } from 'src/app/shared/requestClass';
import { GlobalService } from 'src/app/shared/services';
import { CurrencyFormatPipe } from 'src/app/shared/modules/pipes/currency-format.pipe';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { DecimalFormatDirective } from 'src/app/shared/modules/directives/DecimalFormatDirective';


@Component({
  selector: 'app-load-funds',
  templateUrl: './load-funds.component.html',
  styleUrls: ['./load-funds.component.scss']
})
export class LoadFundsComponent implements OnInit {
  @ViewChild('myModal') myModal: ModalDirective;
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
  accountReference: string;
  modelRef: any = "#myModal"
  amount: number;
  fee: number;
  totalAmount: number;
  referenceNo: string;
  public loadFundsFormVisible: boolean = true;

  loadFundsModal: any;
  constructor(
    private formBuilder: FormBuilder, 
    private modalService: BsModalService,
    private request: RequestClass,
    public global: GlobalService,
    // private el: ElementRef,
    private router: Router
    ) {

    this.loadFundsForm = this.formBuilder.group({
      // accountReference: ['', Validators.required],
      // amount: [0, Validators.required],
      accountReference: [null, Validators.compose([Validators.required])],
      amount: [null, Validators.compose([Validators.required])],
      totalAmount: [null, Validators.compose([Validators.required])],
      // fee: [null, Validators.compose([Validators.required])],
      // comments: ["POS Load", Validators.nullValidator],
    });

   }

  ngOnInit(): void {
    const storedValue = localStorage.getItem('referenceNo');
    if (storedValue) {
      this.referenceNo = storedValue;
    }
    // console.log(this.referenceNo);
  }
    // this.bsModalRef = this.modalService.show(this.loadFundsModal);
  
    // onInput(value: string): void {
    //   const parsedValue = parseFloat(value);
    //   const formattedValue = isNaN(parsedValue) ? '' : parsedValue.toFixed(2);
    //   this.el.nativeElement.value = formattedValue;
    // }
  closeModal(): void {
    // Logic to close the modal
    // this.loadFundsForm.reset();
    localStorage.removeItem('referenceNo');
    this.router.navigate(['/cards-layout']);
    this.bsModalRef.hide();
    
    // this.loadFundsFormVisible = true;
    // this.myModal.hide();
    
  }
  calculateFee() {
    // this.fee = this.amount * 0.03; // Calculate 3% of the amount
    this.totalAmount = this.amount - 5;
  }
  submitForm(): void {
    
    // this.router.navigate(['/cards-layout']);
    // Logic to handle form submission
   this.bsModalRef =  this.modalService.show(this.myModal);
    // this.bsModalRef.hide();
 
  }

  submitLoadFunds(form: any, template: TemplateRef<any>) {

    try {
      this.loading = true;
      this.btnDisable = true;
      let obj = {
        referenceId: form.controls.accountReference.value,
        
        // fee: form.controls.fee.value,
        amount: form.controls.totalAmount.value,
        fee: "5",
comments: "POS Load"
        // fee: form.fee
      }
      this.request.postRequest("v1/WebPOS/LoadFunds", obj).subscribe(
        (response) => {
          if (response.isError === false) {
            this.loading = false;
            this.btnDisable = false;
            
            // this.close();
            this.apiResponse = response;
            this.openModalForAdd(template)
            localStorage.removeItem('referenceNo');
            // this.getRoles();
            this.global.showNotification('success','',' Funds Loaded Successfully');
          } else {
            this.global.showNotification('Error','','Internal Server Error');
          }
        },
        (error) => {
          this.global.showNotification('Error','','Check Your Internet Connection');
          console.log("Error at request addProduct", error);
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
