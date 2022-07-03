import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactUsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should require valid email', () => {
    component.contactForm.setValue({
      "name": "", 
      "gmail": "invalidemail", 
      "country": "",
      "subject":""
    });
  
    expect(component.contactForm.valid).toEqual(false);
  });
});
