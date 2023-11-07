import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SysRoleComponent} from "./sys-role/sys-role.component";
import {SysActionComponent} from "./sys-action/sys-action.component";
import {SysModuleComponent} from "./sys-module/sys-module.component";
import {SysUserComponent} from "./sys-user/sys-user.component";

const routes: Routes = [
  {
    path: 'sys-role',
    component: SysRoleComponent
  },
  {
    path: 'sys-action',
    component: SysActionComponent
  },
  {
    path: 'sys-module',
    component: SysModuleComponent
  },
  {
    path: 'sys-user',
    component: SysUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
