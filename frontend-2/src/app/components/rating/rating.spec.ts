import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating';
import { RatingService } from '../../services/rating-service';
import { of } from 'rxjs';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;
  const ratingServiceStub: Partial<RatingService> = {
    addRating: () =>
      of({ data: { addRating: { rating_id: 1, ride_id: 1, score: 5, comment: null } } }),
    getRatingsByUser: () => of({ data: { getRatingsByUser: [] } }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingComponent],
      providers: [{ provide: RatingService, useValue: ratingServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
