import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Github3Component } from './github3.component';

describe('Github3Component', () => {
  let component: Github3Component;
  let fixture: ComponentFixture<Github3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Github3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Github3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
