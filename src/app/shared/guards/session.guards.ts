import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { GlobalService } from '../services';
@Injectable(
  { providedIn: 'root' }
)
export class SessionGuard implements CanActivate {
  constructor(private router: Router, private global: GlobalService) { }

  canActivate() {
    let token = localStorage.getItem(this.global.settings.NEMIRO_USER);
    if (token === null) {
      return true;
    }
    this.router.navigate(['/cards-layout']);
    return false;
  }
}
