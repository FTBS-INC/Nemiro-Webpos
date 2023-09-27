import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestClass } from 'src/app/shared/requestClass';
import { GlobalService } from 'src/app/shared/services';
import { validationService } from 'src/app/shared/services/validation.service';

@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.component.html',
  styleUrls: ['./security-settings.component.scss']
})
export class SecuritySettingsComponent implements OnInit {
  bsModalRef: BsModalRef;
  updatePasswordForm: FormGroup;
  fieldTextType = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalServices: BsModalService,
    public global: GlobalService,
    private spinner: NgxSpinnerService,
    private validator: validationService,
    private request: RequestClass,
  ) {
    this.updatePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
          Validators.minLength(8),
        ]),
      ],
      confirmPassword: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
          Validators.minLength(8),
        ]),
      ],
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
      return { mismatch: true };
    }

    return null;
  }
  updatePassword() {
    if (this.updatePasswordForm.valid) {
      const formData = this.updatePasswordForm.value;

      // You can send the currentPassword and confirmPassword to the backend
      const requestPayload = {
        oldPassword: formData.oldPassword,
        newPassword: formData.confirmPassword // Use confirmPassword as new password
      };

      // Call your API service to send the data to the backend
      this.request.postRequest('v1/Account/updatepassword', requestPayload).subscribe(
        (response) => {
          // Handle success response
          console.log('Password updated successfully:', response);
          // Close modal or redirect as needed
          this.updatePasswordForm.reset();
        },
        (error) => {
          // Handle error response
          console.error('Error updating password:', error);
        }
      );
    }
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
