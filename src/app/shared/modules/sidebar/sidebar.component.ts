import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { SidebarService, ISidebar } from "./sidebar.service";
import menuItems, { IMenuItem } from "src/app/shared/constants/menu";
import { Subscription } from "rxjs";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems: IMenuItem[] = menuItems;
  selectedParentMenu = "";
  viewingParentMenu = "";
  currentUrl: string;

  sidebar: ISidebar;
  subscription: Subscription;
  closedCollapseList = [];
  tempMenuArr = "";

  constructor(
    private router: Router,
    private sidebarService: SidebarService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscription = this.sidebarService.getSidebar().subscribe(
      (res) => {
        this.sidebar = res;
      },
      (err) => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .subscribe((event) => {
        const path = this.router.url.split("?")[0];
        const paramtersLen = Object.keys(event.snapshot.params).length;
        const pathArr = path
          .split("/")
          .slice(0, path.split("/").length - paramtersLen);
        this.currentUrl = pathArr.join("/");
      });

    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const { containerClassnames } = this.sidebar;
        this.selectMenu();
        this.toggle();
        this.sidebarService.setContainerClassnames(
          0,
          containerClassnames,
          this.sidebar.selectedMenuHasSubItems
        );
        window.scrollTo(0, 0);
      });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.selectMenu();
      const { containerClassnames } = this.sidebar;
      const nextClasses = this.getMenuClassesForResize(containerClassnames);
      this.sidebarService.setContainerClassnames(
        0,
        nextClasses.join(" "),
        this.sidebar.selectedMenuHasSubItems
      );
      this.isCurrentMenuHasSubItem();
    }, 100);
  
    menuItems.map((it) => {
      it.bool = false;
      if (it.subs !== undefined) {
        it.subs.map((subObj) => (subObj.bool = false));
      }
    });

    this.tempMenuArr = JSON.stringify(menuItems);
    let roles = []


    // for (var i = 0; i < roles.length; i++) {
    //   let index = menuItems.findIndex(
    //     (it) =>
    //       it.name.toLowerCase().trim() === roles[i].descp.toLowerCase().trim()
    //   );
    //   if (index > -1) {
    //     if (menuItems[index].subs !== undefined) {
    //       let subArr = menuItems[index].subs;
    //       for (var j = 0; j < roles.length; j++) {
    //         // let indexSub = subArr.findIndex(it => (it.label).toLowerCase().trim() === (roles[j].menuCategory.descp).toLowerCase().trim());
    //         let indexSub = subArr.findIndex(
    //           (it) =>
    //             it.label.toLowerCase().trim() ===
    //             roles[j].path.toLowerCase().trim()
    //         );
    //         if (indexSub > -1) {
    //           subArr[indexSub].bool = true;
    //           //   subArr[3].bool = true;
    //         }
    //       }
    //       subArr = subArr.filter((it) => it.bool);
    //       menuItems[index].subs = subArr;
    //       if (menuItems[index].subs.length > 0) {
    //         menuItems[index].bool = true;
    //       }
    //     } else {
    //       menuItems[index].bool = true;
    //     }
    //   }
    // }
    
    let arr = menuItems.filter((it) => it.bool === true);
    // arr[0].subs.push({
    //   icon: 'iconsminds-dashboard',
    //   label: 'Summary Dashboard',
    //   name: 'Summary Dashboard',
    //   to: '/dashboard/summary-dashboard',
    //   bool: true,
    // });
    // arr[0].subs.push({
    //   icon: 'simple-icon-screen-desktop',
    //   label: 'Real Time Dashboard',
    //   name: 'Real Time Dashboard',
    //   to: '/dashboard/real-time-dashboard',
    //   bool: false,
    // }),
    // this.menuItems = arr;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  selectMenu() {
    this.selectedParentMenu = this.findParentInPath(this.currentUrl) || "";
    this.isCurrentMenuHasSubItem();
  }

  findParentInPath(path) {
    const foundedMenuItem = this.menuItems.find((x) => x.to === path);
    if (!foundedMenuItem) {
      if (path.split("/").length > 1) {
        const pathArr = path.split("/");
        return this.findParentInPath(
          pathArr.slice(0, pathArr.length - 1).join("/")
        );
      } else {
        return undefined;
      }
    } else {
      return path;
    }
  }

  isCurrentMenuHasSubItem() {
    const { containerClassnames } = this.sidebar;

    const menuItem = this.menuItems.find(
      (x) => x.to === this.selectedParentMenu
    );
    const isCurrentMenuHasSubItem =
      menuItem && menuItem.subs && menuItem.subs.length > 0 ? true : false;
    if (isCurrentMenuHasSubItem !== this.sidebar.selectedMenuHasSubItems) {
      if (!isCurrentMenuHasSubItem) {
        this.sidebarService.setContainerClassnames(
          0,
          containerClassnames,
          false
        );
      } else {
        this.sidebarService.setContainerClassnames(
          0,
          containerClassnames,
          true
        );
      }
    }
    return isCurrentMenuHasSubItem;
  }

  changeSelectedParentHasNoSubmenu(parentMenu: string) {
    const { containerClassnames } = this.sidebar;
    this.selectedParentMenu = parentMenu;
    this.viewingParentMenu = parentMenu;
    this.sidebarService.changeSelectedMenuHasSubItems(false);
    this.sidebarService.setContainerClassnames(0, containerClassnames, false);
  }

  openSubMenu(event: { stopPropagation: () => void }, menuItem: IMenuItem) {
    if (event) {
      event.stopPropagation();
    }
    const { containerClassnames, menuClickCount } = this.sidebar;

    const selectedParent = menuItem.to;
    const hasSubMenu = menuItem.subs && menuItem.subs.length > 0;
    this.sidebarService.changeSelectedMenuHasSubItems(hasSubMenu);
    if (!hasSubMenu) {
      this.viewingParentMenu = selectedParent;
      this.selectedParentMenu = selectedParent;
      this.toggle();
    } else {
      const currentClasses = containerClassnames
        ? containerClassnames.split(" ").filter((x) => x !== "")
        : "";

      if (!currentClasses.includes("menu-mobile")) {
        if (
          currentClasses.includes("menu-sub-hidden") &&
          (menuClickCount === 2 || menuClickCount === 0)
        ) {
          this.sidebarService.setContainerClassnames(
            3,
            containerClassnames,
            hasSubMenu
          );
        } else if (
          currentClasses.includes("menu-hidden") &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.sidebarService.setContainerClassnames(
            2,
            containerClassnames,
            hasSubMenu
          );
        } else if (
          currentClasses.includes("menu-default") &&
          !currentClasses.includes("menu-sub-hidden") &&
          (menuClickCount === 1 || menuClickCount === 3)
        ) {
          this.sidebarService.setContainerClassnames(
            0,
            containerClassnames,
            hasSubMenu
          );
        }
      } else {
        this.sidebarService.addContainerClassname(
          "sub-show-temporary",
          containerClassnames
        );
      }
      this.viewingParentMenu = selectedParent;
    }
  }

  toggle() {
    const { containerClassnames, menuClickCount } = this.sidebar;
    const currentClasses = containerClassnames
      .split(" ")
      .filter((x) => x !== "");
    if (currentClasses.includes("menu-sub-hidden") && menuClickCount === 3) {
      this.sidebarService.setContainerClassnames(
        2,
        containerClassnames,
        this.sidebar.selectedMenuHasSubItems
      );
    } else if (
      currentClasses.includes("menu-hidden") ||
      currentClasses.includes("menu-mobile")
    ) {
      if (!(menuClickCount === 1 && !this.sidebar.selectedMenuHasSubItems)) {
        this.sidebarService.setContainerClassnames(
          0,
          containerClassnames,
          this.sidebar.selectedMenuHasSubItems
        );
      }
    }
  }

  toggleCollapse(id: string) {
    if (this.closedCollapseList.includes(id)) {
      this.closedCollapseList = this.closedCollapseList.filter((x) => x !== id);
    } else {
      this.closedCollapseList.push(id);
    }
  }

  getMenuClassesForResize(classes: string) {
    let nextClasses = classes.split(" ").filter((x: string) => x !== "");
    const windowWidth = window.innerWidth;

    if (windowWidth < this.sidebarService.menuHiddenBreakpoint) {
      nextClasses.push("menu-mobile");
    } else if (windowWidth < this.sidebarService.subHiddenBreakpoint) {
      nextClasses = nextClasses.filter((x: string) => x !== "menu-mobile");
      if (
        nextClasses.includes("menu-default") &&
        !nextClasses.includes("menu-sub-hidden")
      ) {
        nextClasses.push("menu-sub-hidden");
      }
    } else {
      nextClasses = nextClasses.filter((x: string) => x !== "menu-mobile");
      if (
        nextClasses.includes("menu-default") &&
        nextClasses.includes("menu-sub-hidden")
      ) {
        nextClasses = nextClasses.filter(
          (x: string) => x !== "menu-sub-hidden"
        );
      }
    }
    return nextClasses;
  }

  @HostListener("document:click", ["$event"])
  handleDocumentClick(event) {
    this.viewingParentMenu = "";
    this.selectMenu();
    this.toggle();
  }

  @HostListener("window:resize", ["$event"])
  handleWindowResize(event) {
    if (event && !event.isTrusted) {
      return;
    }
    const { containerClassnames } = this.sidebar;
    const nextClasses = this.getMenuClassesForResize(containerClassnames);
    this.sidebarService.setContainerClassnames(
      0,
      nextClasses.join(" "),
      this.sidebar.selectedMenuHasSubItems
    );
    this.isCurrentMenuHasSubItem();
  }

  menuClicked(e: MouseEvent) {
    e.stopPropagation();
  }
}
