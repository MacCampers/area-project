import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Github4Component } from './github4.component';

describe('Github4Component', () => {
  let component: Github4Component;
  let fixture: ComponentFixture<Github4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Github4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Github4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
