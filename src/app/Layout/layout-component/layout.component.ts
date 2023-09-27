import { Component, OnInit, TemplateRef, AfterViewInit, ViewChild } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";
import { BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import { GlobalService } from "src/app/shared/services/global.services";
// import {
//   SidebarService,
//   ISidebar,
// } from "src/app/shared/modules/sidebar/sidebar.service";
import { Template } from "@angular/compiler/src/render3/r3_ast";
import { StorageService } from "../../shared/services";
// import { RequestClass } from "../../shared/requestClass/request";
declare var $: any;

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit, AfterViewInit {
  // sidebar: ISidebar;
  // subscription: Subscription;
  modalRef: BsModalRef;
  notificationsList: any = [];
  notificationsByFeaturesList: any = []
  numOfNotifications: any;
  flag: any = 0;
  hours: any;
  minutes: any;
  
  featureList: any = []
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
    class: "modal-lg"
  };

  @ViewChild('notificationTemplate', { read: TemplateRef }) notificationTemplate:TemplateRef<any>;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    // private sidebarService: SidebarService,
    private modalService: BsModalService,
    // private loader: LoaderService,
    public global: GlobalService,
    private storage: StorageService,
    // private request: RequestClass,
    public router: Router
  ){}

  
  // {
  //   // decide what to do when this event is triggered.
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationStart) {
  //       this.loader.display(true);
  //     }
  //     if (event instanceof NavigationEnd) {
  //       this.loader.display(false);
  //     }

  //   });
  //   router.events.subscribe((val) => {
  //     this.loader.display(true);
  //     console.log(val instanceof NavigationEnd)
  //   });
  //   this.setScrollToTopOnNavigation();
  // }
  ngOnInit(): void {
    
    // this.subscription = this.sidebarService.getSidebar().subscribe(
    //   (res) => {
    //     this.sidebar = res;
    //   },
    //   (err) => {
    //     console.error(`An error occurred: ${err.message}`);
    //   }
    // );
  
    // this.featureList = JSON.parse(this.storage.getLocalStorage("roles"))
    // this.getNotifications();
    // this.getNotificationsWithFeatures();

    setInterval(()=> {
      
      var date = new Date();
      // var sessionHours = date.getHours();
      // var sessionMinutes = date.getMinutes();
      var presentDate = new Date(localStorage.getItem("presentDate"))
      // var presentHours = presentDate.getHours();
      // var presentMinutes = presentDate.getMinutes();
      // this.hours = sessionHours - presentHours;
      // this.minutes = sessionMinutes - presentMinutes;
      var diff = date.valueOf() - presentDate.valueOf();
      var diffInHours = diff/1000/60/60;
      // let days = Math.floor((date.getTime() - presentDate.getTime()) / 1000 / 60 / 60 / 24);
      if (diffInHours >= 8 ) {
        this.onSignOut()
      }
    }, 10000)
  }

  onSignOut() {
    // localStorage.clear();
    // this.router.navigate(["/login"]);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 50);
    // localStorage.removeItem(this.global.settings.XVMS_USER);
    // this.authService.signOut().subscribe(() => {
    // });
  }

   getNotifications() {
    // try {
    //   this.request.getRequest(`Notification/GetAllNotifications`).subscribe(
    //     (response) => {
    //       console.log("Response at getNotifications: ", response.data);
    //      this.notificationsList = response.data.data;
    //       // this.numOfNotifications = this.notificationsList.length;
    //       // this.spinner.hide();
    //       this.getNotificationsWithFeatures()
    //     },
    //     (error) => {
    //       console.log("Error at request  getNotifications", error);
    //       // this.spinner.hide();
    //     }
    //   );
    // } catch (error) {
    //   console.log("Exception at getNotifications: ", error);
    // }
  }
 
  getNotificationsWithFeatures() {
    
    // this.featureList = localStorage.getItem("roles");
    // if (this.notificationsList.length > 0) {
    //   for (var i=0; i<this.notificationsList.length; i++) {
    //     this.featureList?.map((item) => {
    //       if (item.path  === this.notificationsList[i].path){
    //         this.notificationsByFeaturesList.push(this.notificationsList[i])
    //       }
    //     })
    //   }
    // }

    // this.numOfNotifications = this.notificationsByFeaturesList.length
    // this.featureList.map(item=>{
    //   if (item.path === this.notificationsList.map((it, ind) => {
    //     it.path
    //     index = ind
    //   })) {
    //     this.notificationsByFeaturesList.push(this.notificationsList[index])
    //   }
      
    // })
  }

  openModal(template: TemplateRef<any>) {
    if (this.notificationsByFeaturesList.length > 0) {
      this.modalRef = this.modalService.show(template, this.config);

      localStorage.setItem("notificationFlag", this.flag)
    }
  }


  componentBeforeNavigation = null;
  setScrollToTopOnNavigation() {
    // Scroll to top only when navigating to a different component
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      let currentRoute = this.activatedRoute;
      while (currentRoute.firstChild) currentRoute = currentRoute.firstChild;
      if (this.componentBeforeNavigation !== currentRoute.component) {
        if (window) window.scrollTo(0, 0);
      }
      this.componentBeforeNavigation = currentRoute.component;
    });
  }
  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    var check = JSON.parse(localStorage.getItem("notificationFlag"));
    if (check === 1) {
        setTimeout(() => {
          this.openModal(this.notificationTemplate)
        },3000)
    }
  }
}
