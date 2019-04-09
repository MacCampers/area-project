import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutJsonComponent } from './about-json.component';

describe('AboutJsonComponent', () => {
  let component: AboutJsonComponent;
  let fixture: ComponentFixture<AboutJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
