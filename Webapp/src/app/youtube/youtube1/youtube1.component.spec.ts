import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Youtube1Component } from './youtube1.component';

describe('Youtube1Component', () => {
  let component: Youtube1Component;
  let fixture: ComponentFixture<Youtube1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Youtube1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Youtube1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
