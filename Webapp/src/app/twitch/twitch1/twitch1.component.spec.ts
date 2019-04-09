import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Twitch1Component } from './twitch1.component';

describe('Twitch1Component', () => {
  let component: Twitch1Component;
  let fixture: ComponentFixture<Twitch1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Twitch1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Twitch1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
