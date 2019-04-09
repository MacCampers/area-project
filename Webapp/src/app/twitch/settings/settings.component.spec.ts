import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwitchSettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: TwitchSettingsComponent;
  let fixture: ComponentFixture<TwitchSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwitchSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitchSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
