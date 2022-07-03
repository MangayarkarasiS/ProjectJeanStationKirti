import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderStatusComponent } from './user-order-status.component';

describe('UserOrderStatusComponent', () => {
  let component: UserOrderStatusComponent;
  let fixture: ComponentFixture<UserOrderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOrderStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
