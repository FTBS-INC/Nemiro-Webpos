import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  TemplateRef,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Subscription } from 'rxjs';
import { SidebarService, ISidebar } from "../sidebar/sidebar.service";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { GlobalService } from 'src/app/shared/services';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
// import { license } from '../../modals/License';
// import { ErrorHandler } from '../..';
import {
  DropzoneComponent,
  DropzoneDirective,
  DropzoneConfigInterface,
} from "ngx-dropzone-wrapper";

import { StorageService } from "../../services";
// import { AuthService } from "../../services/auth.service";
import { RequestClass } from "../../../shared/requestClass/request";
import { TimerFormatPipe } from "../pipes/timer-format.pipe";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-topnav",
  templateUrl: "./topnav.component.html",
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit, OnDestroy {
  @ViewChild('modalBackdrop') modalBackdrop: ElementRef;
  availableFunc: any;
  isMultiColorActive = true;
  fieldTextType: boolean;
  // sidebar: ISidebar;
  remainingTime: number;
  timerInterval: any;
  errorMessage: string;
timerFormat: TimerFormatPipe;
  subscription: Subscription;
  displayName = "ADMIN";
  formForAdd: any = false;
  // languages: Language[];
  currentLanguage: string;
  isSingleLang;
  username: string;
  isFullScreen = false;
  isDarkModeActive = false;
  searchKey = "";
  notificationsList: any = [];
  notificationsByFeaturesList: any = [];
  featureList: any = [];
  licenseFile = undefined;
  modalRef: BsModalRef;
  fileUpdModalRef: BsModalRef;
  isLicenseValid: boolean = true;
  flag: any = 0;
  userName: string;
  form: FormGroup;
  bsModalRef: BsModalRef;
  _loginForm: FormGroup;
  // config = {
  //   url: "https://httpbin.org/post",
  //   thumbnailWidth: 100,
  //   maxFiles: 1,
  //   parallelUploads: 1,
  //   acceptedFiles: "text/plain,.txt,application/json,.json,.xvl",
  //   clickable: true,
  //   uploadMultiple: false,
  //   backdrop: true,
  //   ignoreBackdropClick: true,
  //   keyboard: false,
  //   // tslint:disable-next-line: max-line-length
  //   previewTemplate:
  //     '<div class="dz-preview dz-file-preview mb-3"><div class="d-flex flex-row "><div class="p-0 w-30 position-relative"><div class="dz-error-mark"><span><i></i></span></div><div class="dz-success-mark"><span><i></i></span></div><div class="preview-container"><img data-dz-thumbnail class="img-thumbnail border-0" /><i class="simple-icon-doc preview-icon" ></i></div></div><div class="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative"><div><span data-dz-name></span></div><div class="text-primary text-extra-small" data-dz-size /><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div></div><a href="#/" class="remove" data-dz-remove><i class="glyph-icon simple-icon-trash"></i></a></div>',
  // };
  _top_nav_bar = {
    licenseValidityStr: "",
    _btn_disable: false,
  };
  _login_variables = {
    _visibleModule: "",
    _buttonState: "",
    _buttonDisabled: false,
    _temp_token: null,
  };
  userArr: any;
  fileToUpload: any;
  // fileText: string = "Select License File";
  fileMsg: string = "";
  public modalConfig: any = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
    class: "modal-md",
  };
  fData: any = undefined;
  filerArr: any[] = [];
  numOfNotifications: any;
  constructor(
    public global: GlobalService,
    // private sidebarService: SidebarService,
    public router: Router,
    private request: RequestClass,
    private formBuilder: FormBuilder,
    private storage: StorageService,
    // private authService: AuthService,
    private modalService: BsModalService // private storage: StorageService, // public service: RequestServices,
  ) // public errorHandlerService: ErrorHandler,
  // private langService: LangService
  {
    this.userName = localStorage.getItem("username")?.trim();
    this._loginForm = formBuilder.group({
      username: [this.userName, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      mainVersion: [1, Validators.nullValidator],
      subVersion: [1.0, Validators.nullValidator],
    });
  }
  //    {
  //   this.languages = this.langService.supportedLanguages;
  //   this.currentLanguage = this.langService.languageShorthand;
  //   this.isSingleLang = this.langService.isSingleLang;

  //   this.isDarkModeActive = this.getColor().indexOf('dark') > -1 ? true : false;
  // }
  // onDarkModeChange(event) {
  //   let color = this.getColor();
  //   if (color.indexOf("dark") > -1) {
  //     color = color.replace("dark", "light");
  //   } else if (color.indexOf("light") > -1) {
  //     color = color.replace("light", "dark");
  //   }
  //   localStorage.setItem(environment.themeColorStorageKey, color);
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 200);
  // }

  submitForm(form: any, modal) {
    try {
     
    this._login_variables._buttonState = "show-spinner";
    this._login_variables._buttonDisabled = true;

    this.request.postRequest("v1/Account/login", form).subscribe(
      (response) => {
       
 
        if (response.statusCode === "Lg-400") {
          this.global.showNotification('Error', '', 'Invalid credential');
        } else {
          this.storage.setLocalStorage(
            this.global.settings.NEMIRO_USER,
            response.data.token
            
          );
          this.stopTimer();
          modal.hide();
          this.router.navigate(['/cards-layout'])

          // this.userArr = response;
          // console.log(this.userArr);
          // this.getUserDetails();
        }
        this._login_variables._buttonState = "";
        this._login_variables._buttonDisabled = false;
      },
      (error) => {
        if (error.status === 500) {
          this.global.showNotification("Error", "", "Server error");
        } else if (error.status === 423) {
          this.global.showNotification(
            "Error",
            "",
            "Account is temporary blocked. Please contact admin"
          );
        } else {
          this.global.showNotification("Error", "", "Something went wrong");
        }
        this._login_variables._buttonState = "";
        this._login_variables._buttonDisabled = false;
      }
    );
    } catch (error) {
      console.log(error);
    }
  }
  home(): void {
    // Logic to close the modal
    localStorage.removeItem('referenceNo');
    this.router.navigate(['/cards-layout']);
    // this.bsModalRef.hide();
    
  }
  profile(): void {
    // Logic to close the modal
    this.router.navigate(['/user-preferences']);
    // this.bsModalRef.hide();
    
  }
  
  settings(): void {
    // Logic to close the modal
    this.router.navigate(['/security-settings']);
    // this.bsModalRef.hide();
    
  }

lockScreenModal(template: TemplateRef<any>){
  this.openModalForAdd(template)
}
openModalForAdd(template: TemplateRef<any>) {
  try {
    // this.formForEdit = false;
    this.formForAdd  = true;
    // this.inspectionRequired = false;
    // this.perishable = false;
    // this.loadFundsForm.reset();
    // this.loadFundsFormVisible = false;
  
    // this.bsModalRef = this.modalService.show(template, this.config);
    // this.bsModalRef.content.apiResponse = this.apiResponse;
   
  } catch (error) {
    console.log("Exception at openModalForAdd: ", error);
  }
}
close(modal) {
  try {
    // this.formForEdit = false;
    // this.formForAdd = false;
    // localStorage.removeItem('referenceNo');
    // this.bsModalRef.hide();
    this.stopTimer();
    modal.hide();
    // this.modalBackdrop.nativeElement.classList.remove('modal-blur');
    // this.loadFundsForm.reset();
    // this.loadFundsFormVisible = true;
    // this.isProductNameDuplicate = false;
    // this.isValidating = false;
    // this.isMarkCorrect = false;
    // this.productNameForUpdate = "";
    // this.selectedOrganizations = [];
  } catch (error) {
    console.log("Exception at close: ", error);
  }
}
openModal(modal) {
  this.remainingTime = 20;
    // this.errorMessage = '';

    // Start the timer
    this.startTimer(modal);  
  modal.show();
  // this.modalBackdrop.nativeElement.classList.add('modal-blur');
  // this.initializeForm();
}
toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}

startTimer(modal) {
  this.timerInterval = setInterval(() => {
    this.remainingTime--;

    if (this.remainingTime <= 0) {
      // Log out the user or perform any other desired action
      this.stopTimer();
      
      modal.hide();
      this.logoutUser();
    }
  }, 1000);
}

stopTimer() {
  clearInterval(this.timerInterval);
}

logoutUser() {
  localStorage.clear();
  this.router.navigate(['/login']);
  console.log('User logged out');
}



  getColor() {
    return localStorage.getItem(environment.themeColorStorageKey)
      ? localStorage.getItem(environment.themeColorStorageKey)
      : environment.defaultColor;
  }

  fullScreenClick() {
    this.isFullScreen = !this.isFullScreen;
    if (this.isFullScreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
logout(){
  localStorage.clear();
  this.router.navigate(['/login']);
}

  ngOnInit() {
    this.username = localStorage.getItem("firstName")?.trim();
    var availableFunc = localStorage.getItem("func");
    this.availableFunc = JSON.parse(atob(availableFunc));
    
  }


  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  menuButtonClick = (
    e: { stopPropagation: () => void },
    menuClickCount: number,
    containerClassnames: string
  ) => {
    if (e) {
      e.stopPropagation();
    }

    setTimeout(() => {
      const event = document.createEvent("HTMLEvents");
      event.initEvent("resize", false, false);
      window.dispatchEvent(event);
    }, 350);

  
  };


  mobileMenuButtonClick = (
    event: { stopPropagation: () => void },
    containerClassnames: string
  ) => {
    if (event) {
      event.stopPropagation();
    }
    // this.sidebarService.clickOnMobileMenu(containerClassnames);
  };

  onSignOut() {
    localStorage.clear();
    this.router.navigate(["/login"]);
    setTimeout(() => {
      window.location.reload();
    }, 50);
    // localStorage.removeItem(this.global.settings.XVMS_USER);
    // this.authService.signOut().subscribe(() => {
    // });
  }

  searchKeyUp(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.search();
    } else if (event.key === "Escape") {
      const input = document.querySelector(".mobile-view");
      if (input && input.classList) {
        input.classList.remove("mobile-view");
      }
      this.searchKey = "";
    }
  }

  searchAreaClick(event) {
    event.stopPropagation();
  }
  searchClick(event) {
    if (window.innerWidth < environment.menuHiddenBreakpoint) {
      let elem = event.target;
      if (!event.target.classList.contains("search")) {
        if (event.target.parentElement.classList.contains("search")) {
          elem = event.target.parentElement;
        } else if (
          event.target.parentElement.parentElement.classList.contains("search")
        ) {
          elem = event.target.parentElement.parentElement;
        }
      }

      if (elem.classList.contains("mobile-view")) {
        this.search();
        elem.classList.remove("mobile-view");
      } else {
        elem.classList.add("mobile-view");
      }
    } else {
      this.search();
    }
    event.stopPropagation();
  }

  search() {
    if (this.searchKey && this.searchKey.length > 1) {
      this.router.navigate(["/app/pages/miscellaneous/search"], {
        queryParams: { key: this.searchKey.toLowerCase().trim() },
      });
      this.searchKey = "";
    }
  }

  @HostListener("document:click", ["$event"])
  handleDocumentClick(event) {
    const input = document.querySelector(".mobile-view");
    if (input && input.classList) {
      input.classList.remove("mobile-view");
    }
    this.searchKey = "";
  }
  routeToProfile() {
    this.router.navigate(["/profile"]);
  }
 
}
