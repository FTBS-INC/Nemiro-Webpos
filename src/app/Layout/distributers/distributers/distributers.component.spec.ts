import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributersComponent } from './distributers.component';

describe('DistributersComponent', () => {
  let component: DistributersComponent;
  let fixture: ComponentFixture<DistributersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
