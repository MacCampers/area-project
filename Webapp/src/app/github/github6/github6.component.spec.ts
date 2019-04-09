import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Github6Component } from './github6.component';

describe('Github6Component', () => {
  let component: Github6Component;
  let fixture: ComponentFixture<Github6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Github6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Github6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
