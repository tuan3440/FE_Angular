import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysRoleComponent } from './sys-role.component';

describe('SysRoleComponent', () => {
  let component: SysRoleComponent;
  let fixture: ComponentFixture<SysRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SysRoleComponent]
    });
    fixture = TestBed.createComponent(SysRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
