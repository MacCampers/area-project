import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Twitter1Component } from './twitter1.component';

describe('Twitter1Component', () => {
  let component: Twitter1Component;
  let fixture: ComponentFixture<Twitter1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Twitter1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Twitter1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
