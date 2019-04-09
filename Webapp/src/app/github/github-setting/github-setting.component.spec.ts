import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubSettingComponent } from './github-setting.component';

describe('GithubSettingComponent', () => {
  let component: GithubSettingComponent;
  let fixture: ComponentFixture<GithubSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
