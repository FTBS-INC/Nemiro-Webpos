import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkLoadUnloadComponent } from './bulk-load-unload.component';

describe('BulkLoadUnloadComponent', () => {
  let component: BulkLoadUnloadComponent;
  let fixture: ComponentFixture<BulkLoadUnloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkLoadUnloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkLoadUnloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
