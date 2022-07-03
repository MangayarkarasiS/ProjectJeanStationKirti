import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('CartTesting',()=>{
 
  it('cart increase by 1',()=>{
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;    
    component.addtoCart()
    let productCount= component.addtoCart()
    expect(productCount).toEqual(1);
  });
  it('cart decrease by 1',()=>{
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    component.removeCart()
    let productCount= component.removeCart()
    expect(productCount).toEqual(-1);
  });
});