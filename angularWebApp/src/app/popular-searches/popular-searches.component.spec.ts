import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularSearchesComponent } from './popular-searches.component';

describe('PopularSearchesComponent', () => {
  let component: PopularSearchesComponent;
  let fixture: ComponentFixture<PopularSearchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularSearchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
