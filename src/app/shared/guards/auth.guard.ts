import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { GlobalService } from '../services';
declare var $;
@Injectable(
  { providedIn: 'root' }
)
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private global: GlobalService) {
  }
  canActivate() {
    let token = localStorage.getItem(this.global.settings.NEMIRO_USER);
    if (token !== null) {
      $('html, body').animate({ scrollTop: '0px' }, 0);
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
