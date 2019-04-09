import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Weather3Component } from './weather3.component';

describe('Weather3Component', () => {
  let component: Weather3Component;
  let fixture: ComponentFixture<Weather3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Weather3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Weather3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
