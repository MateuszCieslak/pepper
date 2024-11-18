import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCardComponent } from './person-card.component';
import { ComponentDriver } from '../../../test/base.driver';
import { Person } from '../../@shared/types/person.type';
import { CardComponentDriver } from '../card/card.component.spec';

const person: Person = {
  name: 'John Doe',
  description: 'Description of John Doe',
  mass: 80,
  height: 180,
  skin_color: 'red',
  birth_year: '1990',
  gender: 'male',
  created: new Date(),
  uid: 1,
  homeworld: 'Earth'
};

describe('PersonCardComponent', () => {
  let component: PersonCardComponent;
  let fixture: ComponentFixture<PersonCardComponent>;
  let driver: PersonCardComponentDriver;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonCardComponent);
    component = fixture.componentInstance;
    component.person = person;
    fixture.detectChanges();
    driver = new PersonCardComponentDriver(fixture);
  });

  it('should render card component with given person', () => {
    expect(driver.getCard()?.getTitle()).toBe('John Doe');
    expect(driver.getCard()?.getSubtitleEl()?.innerText).toBe('Description of John Doe');
    expect(driver.getCard()?.getProps()).toEqual([
      { key: 'mass', value: '80' },
      { key: 'height', value: '180' },
      { key: 'skin_color', value: 'red' },
      { key: 'birth_year', value: '1990' },
      { key: 'gender', value: 'male' }
    ])
  });

  it('should not render card component if person is not provided', () => {
    component.person = undefined;
    fixture.detectChanges();
    expect(driver.getCard()).toBeNull();
  });
});

export class PersonCardComponentDriver extends ComponentDriver {
  protected override isValid(rootEl: HTMLElement): boolean {
    return rootEl.tagName === 'APP-PERSON-CARD';
  }

  getCard(): CardComponentDriver | null {
    const cardEl = this.rootEl.querySelector('APP-CARD');
    return cardEl ? new CardComponentDriver(cardEl as HTMLElement) : null;
  }
}