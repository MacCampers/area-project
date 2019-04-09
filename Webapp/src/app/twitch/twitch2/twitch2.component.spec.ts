import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Twitch2Component } from './twitch2.component';

describe('Twitch2Component', () => {
  let component: Twitch2Component;
  let fixture: ComponentFixture<Twitch2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Twitch2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Twitch2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
