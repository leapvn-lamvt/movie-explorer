import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieColumnComponent } from './movie-column.component';

describe('MovieColumnComponent', () => {
  let component: MovieColumnComponent;
  let fixture: ComponentFixture<MovieColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
