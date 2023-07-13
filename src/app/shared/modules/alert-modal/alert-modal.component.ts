import { Component, OnInit, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {
  @Input() title: any;
  @Input() ActionBtnText;
  @Input() closeBtnText;
  @Input() messege;
  @Input() isBtnShow: boolean = false;
  @Input() changeClass: boolean = false;
  @Input() isBorder: boolean = false;
  @Output() test = new EventEmitter();
  @ViewChild('content') public templateRef: TemplateRef<any>;
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: true
  };
  constructor(private modalService: BsModalService) { }
  modalRefChild: BsModalRef;
  ngOnInit() {

    console.log(this.title);
  }
  openModal() {
    if (this.modalRefChild === undefined) {
      this.modalRefChild = this.modalService.show(this.templateRef, this.config);
      return;
    }
    //this.global.lgModal('modal-md');
  }
  closeModel() {
    this.modalRefChild.hide();
    this.modalRefChild = undefined;
  }
  emitFunction() {
    this.test.emit('Emit counter');
    this.closeModel();
  }
}
