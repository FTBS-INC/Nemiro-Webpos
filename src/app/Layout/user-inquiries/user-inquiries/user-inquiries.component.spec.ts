import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInquiriesComponent } from './user-inquiries.component';

describe('UserInquiriesComponent', () => {
  let component: UserInquiriesComponent;
  let fixture: ComponentFixture<UserInquiriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInquiriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInquiriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
