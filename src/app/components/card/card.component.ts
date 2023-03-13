import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardData } from 'src/app/app.component';
import {
  animate,
  animateChild,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('cardFlip', [
      state('default', style({ transform: 'none' })),
      state('flipped', style({ transform: 'rotateY(180deg)' })),
      state(
        'matched',
        style({ transform: 'scale(0.05)', visibility: 'hidden' })
      ),
      transition('default <=> flipped', [animate('400ms')]),
      // transition('flipped => default', [animate('400ms')]),
      transition('* => matched', [
        group([query('@cardRemove', animateChild()), animate('400ms')]),
      ]),
    ]),
    trigger('cardRemove', [
      state('default', style({ opacity: 1 })),
      state('matched', style({ opacity: 0 })),
      transition('default <=> flipped', [animate('400ms')]),
      // transition('flipped => default', [animate('400ms')]),
      transition('* => matched', [animate('400ms')]),
    ]),
  ],
})
export class CardComponent {
  @Input() data!: CardData; // ?
  @Output() cardClick = new EventEmitter();

  onCardClick() {
    this.cardClick.emit();
  }
}
