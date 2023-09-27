import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioSidebarComponent } from './studio-sidebar.component';

describe('StudioSidebarComponent', () => {
  let component: StudioSidebarComponent;
  let fixture: ComponentFixture<StudioSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudioSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudioSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
