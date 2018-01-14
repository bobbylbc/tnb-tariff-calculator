import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolderFormComponent } from './holder-form.component';

describe('HolderFormComponent', () => {
  let component: HolderFormComponent;
  let fixture: ComponentFixture<HolderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
