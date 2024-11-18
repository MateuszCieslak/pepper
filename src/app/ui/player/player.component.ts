import { Component, Input } from '@angular/core';
import { Player } from '../../@shared/types/player.type';
import { Person } from '../../@shared/types/person.type';
import { Starship } from '../../@shared/types/starship.type';
import { CommonModule } from '@angular/common';
import { PersonCardComponent } from '../person-card/person-card.component';
import { StarshipCardComponent } from "../starship-card/starship-card.component";
import { ComponentDriver } from '../../../test/base.driver';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, PersonCardComponent, StarshipCardComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  @Input({ required: true })
  player: Player | null = null;

  isPerson(data: Person | Starship): data is Person {
    return 'mass' in data;
  }

  isStarship(data: Person | Starship): data is Starship {
    return 'model' in data;
  }
}