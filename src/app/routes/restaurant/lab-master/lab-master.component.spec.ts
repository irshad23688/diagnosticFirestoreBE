import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabMasterComponent } from './lab-master.component';

describe('LabMasterComponent', () => {
  let component: LabMasterComponent;
  let fixture: ComponentFixture<LabMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
