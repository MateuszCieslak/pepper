import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input({ required: true })
  title: string = '';

  @Input()
  subtitle?: string;

  @Input({ required: true })
  props: { key: string, value: string | number | Date | undefined }[] = [];
}