import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  // designation = localStorage.getItem('designation');
  isVisited = false;
  constructor(public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole.toLowerCase();
    let roles = JSON.parse(localStorage.getItem('roles'));

    for (var i = 0; i < roles.length; i++) {
      let obj = roles[i].featureCategory.toLowerCase().trim();
      if (expectedRole === obj) {
        return true;
      }
    }
    return false;
  }
}
