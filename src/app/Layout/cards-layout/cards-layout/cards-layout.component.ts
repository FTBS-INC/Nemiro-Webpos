import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoadFundsComponent } from '../../load-funds/load-funds/load-funds.component';
// import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";


@Component({
  selector: 'app-cards-layout',
  templateUrl: './cards-layout.component.html',
  styleUrls: ['./cards-layout.component.scss']
})
export class CardsLayoutComponent implements OnInit {
  bsModalRef: BsModalRef;
  // router: Router;

  constructor(private modalService: BsModalService ,private router: Router) { }

  ngOnInit(): void {
  }
  openModal(): void {
    // console.log("card clicked");
    this.router.navigate(['/load-funds']);
    // this.bsModalRef = this.modalService.show(LoadFundsComponent);
    // console.log("card clicked");

  }
  openRedeemFunds(): void {
    // console.log("card clicked");
    this.router.navigate(['/redeem-funds']);
    // this.bsModalRef = this.modalService.show(LoadFundsComponent);
    // console.log("card clicked");

  }
  openCustomerInquiry(): void {
    console.log("customer inquiry clicked");
    this.router.navigate(['/customer-inquiry']);
    // this.bsModalRef = this.modalService.show(LoadFundsComponent);
    // console.log("card clicked");

  }
  
  
}
