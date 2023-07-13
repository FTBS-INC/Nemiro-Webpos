import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycReviewComponent } from './kyc-review.component';

describe('KycReviewComponent', () => {
  let component: KycReviewComponent;
  let fixture: ComponentFixture<KycReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
