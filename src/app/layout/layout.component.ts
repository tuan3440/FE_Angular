import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzIconModule} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, NzLayoutModule, NzBreadCrumbModule, NzIconModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent {
  isCollapsed = false;
}
