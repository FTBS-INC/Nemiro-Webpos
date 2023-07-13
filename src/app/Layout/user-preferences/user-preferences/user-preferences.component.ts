import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.scss']
})
export class UserPreferencesComponent implements OnInit {
bsModalRef: BsModalRef;

userPreferencesForm: FormGroup;
accountReference: string;
amount: number;
userName: string;
firstName: string;
lastName: string;
role: string;
address: string;
email: string;
zip: string;
country: string;
loadFundsModal: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalServices: BsModalService
  ) {
    this.userPreferencesForm = this.formBuilder.group({
      accountReference: ['', Validators.required],
      amount: [0, Validators.required],
    });
   }


  ngOnInit(): void {
    this.userName = localStorage.getItem("username")?.trim();
    this.firstName = localStorage.getItem("firstName")?.trim();
    this.lastName = localStorage.getItem("lastName")?.trim();
    this.email = localStorage.getItem("email")?.trim();
    this.address = localStorage.getItem("address")?.trim();
    this.zip = localStorage.getItem("zip")?.trim();
    this.country = localStorage.getItem("country")?.trim();
  }

  closeModal(): void {
    // Logic to close the modal
    this.router.navigate(['/cards-layout']);
    this.bsModalRef.hide();
    
  }

  submitForm(): void {
    
    this.router.navigate(['/cards-layout']);
    // Logic to handle form submission
    this.bsModalRef.hide();
  }

}
