import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeathersettingComponent } from './weathersetting.component';

describe('WeathersettingComponent', () => {
  let component: WeathersettingComponent;
  let fixture: ComponentFixture<WeathersettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeathersettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeathersettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
