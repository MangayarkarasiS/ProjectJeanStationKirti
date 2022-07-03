import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminhomeComponent } from './adminhome.component';

describe('AdminhomeComponent', () => {
  let component: AdminhomeComponent;
  let fixture: ComponentFixture<AdminhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
describe('productadd',()=>{
  it('addproduct test',()=>{
    let addp = new AdminhomeComponent();
    let prodad = addp.addproduct();
    expect(prodad).toBeTruthy();
  })
 })
