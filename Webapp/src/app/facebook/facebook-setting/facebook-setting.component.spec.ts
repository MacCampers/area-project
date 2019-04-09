import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookSettingComponent } from './facebook-setting.component';

describe('FacebookSettingComponent', () => {
  let component: FacebookSettingComponent;
  let fixture: ComponentFixture<FacebookSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
