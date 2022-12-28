import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetrailsComponent } from './movie-details.component';

describe('MovieDetrailsComponent', () => {
  let component: MovieDetrailsComponent;
  let fixture: ComponentFixture<MovieDetrailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetrailsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetrailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
