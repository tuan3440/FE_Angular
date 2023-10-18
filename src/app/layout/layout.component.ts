import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {Router} from "@angular/router";
import {AppStorage} from "../@core/service/AppStorage";
import {AuthService} from "../@core/service/auth/auth/auth.service";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, NzLayoutModule, NzBreadCrumbModule, NzIconModule, NzMenuModule],
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

  logout() {
    this._authService.logout().subscribe(() => {})
    AppStorage.clear();
    this._router.navigate(['auth/login'])
  }
}
