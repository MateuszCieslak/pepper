import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Person } from '../../@shared/types/person.type';
import { CommonModule } from '@angular/common';
import { CardComponent } from "../card/card.component";

type PersonProps = (keyof Omit<Person, 'uid' | 'name' | 'description'>);

@Component({
  selector: 'app-person-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, CardComponent],
  templateUrl: './person-card.component.html',
  styleUrl: './person-card.component.scss'
})
export class PersonCardComponent {

  @Input()
  person: Person | undefined = undefined;

  @Input()
  highlighted: boolean = false;

  get props() {
    const props: PersonProps[] = ['mass', 'height', 'skin_color', 'birth_year', 'gender']; // just few
    return props.map(prop => ({ key: prop, value: this.person?.[prop] }));
  }
}
