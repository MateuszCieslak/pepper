import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Starship } from '../../@shared/types/starship.type';
import { CommonModule } from '@angular/common';

type StarshipProps = (keyof Omit<Starship, 'uid' | 'model' | 'name'>);

@Component({
  selector: 'app-starship-card',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './starship-card.component.html',
  styleUrl: './starship-card.component.scss'
})
export class StarshipCardComponent {

  @Input()
  starship: Starship | undefined = undefined;

  @Input()
  highlighted: boolean = false;

  get props() {
    const props: StarshipProps[] = ['crew', 'cargo_capacity', 'passengers', 'starship_class'];
    return props.map(prop => ({ key: prop, value: this.starship?.[prop] }));
  }
}
