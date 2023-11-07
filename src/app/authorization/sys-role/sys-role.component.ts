import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzCardModule} from "ng-zorro-antd/card";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzTableModule} from "ng-zorro-antd/table";
import {SysRole} from "../../@core/model/authorization/sysRole.model";
import {NzIconModule} from "ng-zorro-antd/icon";
import {SysRoleService} from "../../@core/service/authorization/sysRole.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {SysRoleFormComponent} from "./sys-role-form/sys-role-form.component";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {config} from "rxjs";

@Component({
  selector: 'app-sys-role',
  standalone: true,
  imports: [CommonModule, NzCardModule, NzButtonModule, NzGridModule, NzInputModule, FormsModule, NzSelectModule, NzTableModule, NzIconModule],
  templateUrl: './sys-role.component.html',
  styleUrls: ['./sys-role.component.scss'],
  providers: [
    NzModalService,
    NzNotificationService
  ]
})
export class SysRoleComponent implements OnInit {
  keyword: string = '';
  status: number = -1;
  roles: SysRole[] = []
  page: any = {
    total: 0,
    page: 1,
    size: 10,
    sort: ''
  }
  constructor(
    private _sysRoleService: SysRoleService,
    private _modalService: NzModalService,
    private _notify: NzNotificationService,
  ) {
  }

  ngOnInit() {
    this.search();
  }

  search() {
    this._sysRoleService.searchRoles(
    {
        keyword: this.keyword,
        status: this.status
    },
      {
        page: this.page.page - 1,
        size: this.page.size,
        sort: this.page.sort
      }
    ).subscribe(
      res => {
        this.page.total = Number(res.headers.get("X-Total-Count"));
        this.roles = res.body;
      }, error => {

        }
    )
  }

  openDialog() {
    this._modalService.create({
      nzTitle: 'Thêm mới vai trò',
      nzContent: SysRoleFormComponent,
      nzWidth: '60vw',
      nzFooter: null,
      nzData: {
        close: () => {
          this.search();
        }
      }
    })
  }

  edit(data: SysRole) {
    this._modalService.create({
      nzTitle: 'Thêm mới vai trò',
      nzContent: SysRoleFormComponent,
      nzWidth: '60vw',
      nzFooter: null,
      nzData: {
        role: data,
        close: () => {
          this.search();
        }
      }
    })
  }

  delete(id: number | undefined) {
    if (id) {
      this._modalService.confirm({
        nzTitle: '<i>Bạn có muốn xóa vai trò này ?</i>',
        nzContent: '',
        nzOnOk: () => {
          this._sysRoleService.delete(id).subscribe(
            res => {
              this._notify.success('','xóa thành công');
              this.search();
            },
            error => {
              this._notify.error('',' xóa thất bại');
            }
          )
        }
      });
    }
  }

  onCurrentPageDataChange(event: any) {
    console.log(event)
    this.page.page = event;
    this.search()
  }

  config(id: number | undefined) {

  }
}
