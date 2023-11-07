import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {AppStorage} from "../@core/service/AppStorage";
import {AuthService} from "../@core/service/auth/auth/auth.service";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzButtonModule} from "ng-zorro-antd/button";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, NzLayoutModule, NzBreadCrumbModule, NzIconModule, NzMenuModule, NzGridModule, RouterOutlet, NzToolTipModule, NzButtonModule, RouterLink],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent {
  isCollapsed = false;

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this._authService.logout().subscribe(() => {})
    AppStorage.clear();
    this._router.navigate(['auth/login'])
  }
}
