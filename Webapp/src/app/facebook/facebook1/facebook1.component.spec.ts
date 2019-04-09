import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Facebook1Component } from './facebook1.component';

describe('Facebook1Component', () => {
  let component: Facebook1Component;
  let fixture: ComponentFixture<Facebook1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Facebook1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Facebook1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
