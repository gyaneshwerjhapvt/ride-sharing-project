import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RatingService } from '../../services/rating';
import { Rating } from '../../models/rating.model';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './rating.html',
  styleUrls: ['./rating.css'],
  providers: [RatingService]
})
export class RatingComponent {
  private ratingService = inject(RatingService);

  @Input() rideId!: number;
  @Input() givenBy!: number;
  @Input() givenTo!: number;

  stars = [1, 2, 3, 4, 5];
  selectedScore = signal<number>(0);
  hoveredScore = signal<number | null>(null);
  comment = '';
  isSubmitting = signal(false);

  setRating(score: number) {
    this.selectedScore.set(score);
  }

  setHover(score: number | null) {
    this.hoveredScore.set(score);
  }

  submit() {
    if (this.selectedScore() === 0) {
      alert('Please select a rating before submitting.');
      return;
    }

    this.isSubmitting.set(true);

    const newRating: Rating = {
      ride_id: this.rideId,
      given_by: this.givenBy,
      given_to: this.givenTo,
      score: this.selectedScore(),
      comment: this.comment,
    };

    this.ratingService.submitRating(newRating).subscribe({
      next: (res: any) => {
        alert('Rating submitted successfully!');
        this.isSubmitting.set(false);
      },
      error: (err: any) => {
        console.error('Submission failed', err);
        this.isSubmitting.set(false);
      },
    });
  }
}
