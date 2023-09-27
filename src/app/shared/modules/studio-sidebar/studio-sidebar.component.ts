import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import menuItems, { IMenuItem } from 'src/app/shared/constants/menu';
import { ISidebar, SidebarService } from '../sidebar/sidebar.service';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-studio-sidebar',
  templateUrl: './studio-sidebar.component.html',
  styleUrls: ['./studio-sidebar.component.scss']
})
export class StudioSidebarComponent implements OnInit {
  constructor() {
  }
  ngOnInit(): void {
  }
}
