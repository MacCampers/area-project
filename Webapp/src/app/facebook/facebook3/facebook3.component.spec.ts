import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Facebook3Component } from './facebook3.component';

describe('Facebook3Component', () => {
  let component: Facebook3Component;
  let fixture: ComponentFixture<Facebook3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Facebook3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Facebook3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
