import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzWaveModule} from "ng-zorro-antd/core/wave";
import {SysRole} from "../../@core/model/authorization/sysRole.model";
import {SysRoleService} from "../../@core/service/authorization/sysRole.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {SysRoleFormComponent} from "../sys-role/sys-role-form/sys-role-form.component";
import {SysUser} from "../../@core/model/authorization/sysUser.model";
import {SysUserService} from "../../@core/service/authorization/sysUser.service";
import {SysRoleModuleComponent} from "../sys-role/sys-role-module/sys-role-module.component";
import {SysUserRoleComponent} from "./sys-user-role/sys-user-role.component";

@Component({
  selector: 'app-sys-user',
  standalone: true,
    imports: [CommonModule, FormsModule, NzButtonModule, NzCardModule, NzGridModule, NzIconModule, NzInputModule, NzSelectModule, NzTableModule, NzWaveModule],
  templateUrl: './sys-user.component.html',
  styleUrls: ['./sys-user.component.scss'],
  providers: [
    NzModalService,
    NzNotificationService
  ]
})
export class SysUserComponent implements OnInit {
  keyword: string = '';
  status: number = -1;
  users: SysUser[] = []
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
    private _sysUserService: SysUserService
  ) {
  }

  ngOnInit() {
    this.search();
  }

  search() {
    this._sysUserService.searchUsers(
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
        this.users = res.body;
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
    this._modalService.create({
      nzTitle: 'Cấu hình vai trò cho user',
      nzContent: SysUserRoleComponent,
      nzWidth: '60vw',
      nzFooter: null,
      nzData: {
        userId: id,
        close: () => {

        }
      }
    })
  }
}
