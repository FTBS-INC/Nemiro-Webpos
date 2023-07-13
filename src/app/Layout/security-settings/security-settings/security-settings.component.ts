import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.component.html',
  styleUrls: ['./security-settings.component.scss']
})
export class SecuritySettingsComponent implements OnInit {
  bsModalRef: BsModalRef;
  fieldTextType: boolean;
  userPreferencesForm: FormGroup;
  accountReference: string;
  amount: number;
  loadFundsModal: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalServices: BsModalService
  ) { }

  ngOnInit(): void {
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
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
