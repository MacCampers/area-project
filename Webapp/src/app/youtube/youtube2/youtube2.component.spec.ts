import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Youtube2Component } from './youtube2.component';

describe('Youtube2Component', () => {
  let component: Youtube2Component;
  let fixture: ComponentFixture<Youtube2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Youtube2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Youtube2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
