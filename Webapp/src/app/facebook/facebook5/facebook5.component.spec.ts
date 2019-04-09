import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Facebook5Component } from './facebook5.component';

describe('Facebook5Component', () => {
  let component: Facebook5Component;
  let fixture: ComponentFixture<Facebook5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Facebook5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Facebook5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
