import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Facebook2Component } from './facebook2.component';

describe('Facebook2Component', () => {
  let component: Facebook2Component;
  let fixture: ComponentFixture<Facebook2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Facebook2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Facebook2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
