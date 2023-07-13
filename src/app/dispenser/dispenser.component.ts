import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { RequestClass } from "../shared/requestClass/request";

declare var document;
@Component({
  selector: 'app-dispenser',
  templateUrl: './dispenser.component.html',
  styleUrls: ['./dispenser.component.scss']
})
export class DispenserComponent implements OnInit, AfterViewInit {

  invoiceList : any = [];
  currentOrderList : any = [];
  currentInvoice : any;
  invoiceObj: any;
  jobID: any;


  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };
  modalRef: BsModalRef;

  constructor(private router: Router, private modalService: BsModalService, private spinner : NgxSpinnerService, private request: RequestClass,) { }

  ngOnInit() {
    this.getOrders();
   }
  ngAfterViewInit() {
    this.toggleToFullScreen();
    this.spinner.hide();
  }

  toggleToFullScreen() {
    let doc = document.documentElement;
    if (doc.requestFullscreen) {
      doc.requestFullscreen();
    } else if (doc.mozRequestFullScreen) {
      doc.mozRequestFullScreen();
    } else if (doc.webkitRequestFullscreen) {
      doc.webkitRequestFullscreen();
    } else if (doc.msRequestFullscreen) {
      doc.msRequestFullscreen();
    }
  }

  getOrders() {
    try {
      this.request.getRequest(`Dispenser/GetPendingJobs`).subscribe(
        (response) => {
          console.log("Response at getOrders: ", response);
          this.invoiceList = response;
          this.spinner.hide();
        },
        (error) => {
          console.log("Error at request getOrders", error);
          this.spinner.hide();
        });
    } catch (e) {
      console.log("Error at getOrders: ", e)
    }
  }

  pushToArray(item: any) {
    this.currentInvoice = item.sales.invoiceNo;

    try {
      debugger;
      this.jobID = item.dJobID;
      this.request.getRequest(`Dispenser/GetNextJobById?DJobId=${item.dJobID}`).subscribe(
        (response) => {
          console.log("Response at getOrders: ", response);
          this.invoiceObj = response;
          this.currentOrderList = this.invoiceObj.sales.lstSalesDetails;
          this.spinner.hide();
          this.getOrders();
        },
        (error) => {
          console.log("Error at request getOrders", error);
          this.spinner.hide();
        });
    } catch (e) {
      console.log(e)
    }
  }

  Terminate() {
    try {
      let obj = {
        dJobID: this.jobID,
        jobStatus: 0
      }

      this.request.postRequest(`Dispenser/ChangeJobStatus`,obj).subscribe(
        (response) => {
          console.log("Response at Terminate: ", response);
          this.getOrders();
          this.invoiceObj = null;
          this.currentOrderList = [];
        },
        (error) => {
          console.log("Error at request Terminate", error);
          this.spinner.hide();
        });
    } catch (e) {
      console.log(e)
    }
  }

  getDateTime() {
    var date
    setTimeout(() => {
      date = new Date();
      return date;
    },1000)
  }

  Complete() {
    try {

      let arr = [];
      for (var i = 0; i < this.currentOrderList.length; i++) {
        let obj = {
          batchID: this.currentOrderList[i].batchID,
          noOfProducts: this.currentOrderList[i].units
        }
        arr.push(obj);
      }
      debugger;
      let obj = {
        dJobID: this.jobID,
        jobStatus: 3,
        inventory: arr
      }
      this.request.postRequest(`Dispenser/ChangeJobStatus`,obj).subscribe(
        (response) => {
          console.log("Response at Complete: ", response);
          this.getOrders();
          this.invoiceObj = null;
          this.currentOrderList = [];
        },
        (error) => {
          console.log("Error at request Complete: ", error);
          this.spinner.hide();
        });
    } catch (e) {
      console.log(e)
    }
  }

  logout() {
    this.modalRef.hide();
    localStorage.clear();
    this.router.navigate(["/login"]);
    setTimeout(() => {
      window.location.reload();
    }, 50);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,this.config);
  }
}
