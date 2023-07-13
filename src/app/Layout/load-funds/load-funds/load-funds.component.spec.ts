import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFundsComponent } from './load-funds.component';

describe('LoadFundsComponent', () => {
  let component: LoadFundsComponent;
  let fixture: ComponentFixture<LoadFundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadFundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
