import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Twitter2Component } from './twitter2.component';

describe('Twitter2Component', () => {
  let component: Twitter2Component;
  let fixture: ComponentFixture<Twitter2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Twitter2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Twitter2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
