import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Github5Component } from './github5.component';

describe('Github5Component', () => {
  let component: Github5Component;
  let fixture: ComponentFixture<Github5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Github5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Github5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
