import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Facebook4Component } from './facebook4.component';

describe('Facebook4Component', () => {
  let component: Facebook4Component;
  let fixture: ComponentFixture<Facebook4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Facebook4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Facebook4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
