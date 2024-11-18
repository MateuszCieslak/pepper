import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerComponent } from './player.component';
import { ComponentDriver } from '../../../test/base.driver';
import { PersonCardComponentDriver } from '../person-card/person-card.component.spec';
import { StarshipCardComponentDriver } from '../starship-card/starship-card.component.spec';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;
  let driver: PlayerComponentDriver;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    driver = new PlayerComponentDriver(fixture);
    fixture.detectChanges();
  });

  it('should create without card when no player data', () => {
    component.player = {
      name: 'John Doe',
      score: 1,
      roundWinner: false
    }
    fixture.detectChanges();
    expect(driver.getName()).toBe('Player John Doe');
    expect(driver.getScore()).toBe('Score: 1');
    expect(driver.getPersonCardDriver()).toBeNull();
    expect(driver.getPersonCardDriver()).toBeNull();
  });

  it('should create with person card when player data is a Person', () => {
    component.player = {
      name: 'John Doe',
      score: 1,
      roundWinner: false,
      data: {
        name: 'Luke',
        mass: 80,
        height: 180,
        skin_color: 'red',
        birth_year: '1990',
        gender: 'male',
        description: 'Description of John Doe',
        created: new Date(),
        homeworld: 'Earth',
        uid: 1
      }
    }
    fixture.detectChanges();

    expect(driver.getName()).toBe('Player John Doe');
    expect(driver.getScore()).toBe('Score: 1');
    expect(driver.getPersonCardDriver()).not.toBeNull();
    expect(driver.getStarshipCardDriver()).toBeNull();
  });

  it('should create with starship card when player data is an Starship', () => {
    component.player = {
      name: 'John Doe',
      score: 1,
      roundWinner: false,
      data: {
        model: 'Model A',
        name: 'Starship 1',
        passengers: 1,
        cargo_capacity: 1,
        starship_class: '',
        description: '',
        uid: 1,
        crew: 10
      }
    }
    fixture.detectChanges();

    expect(driver.getName()).toBe('Player John Doe');
    expect(driver.getScore()).toBe('Score: 1');
    expect(driver.getPersonCardDriver()).toBeNull();
    expect(driver.getStarshipCardDriver()).not.toBeNull();
  });

  it('should highlight card when round winner', () => {
    component.player = {
      name: 'John Doe',
      score: 1,
      roundWinner: true,
      data: {
        model: 'Model A',
        name: 'Starship 1',
        passengers: 1,
        cargo_capacity: 1,
        starship_class: '',
        description: '',
        uid: 1,
        crew: 10
      }
    }
    fixture.detectChanges();

    expect(driver.isCardHighlighted()).toBe(true);
  });
});

export class PlayerComponentDriver extends ComponentDriver {
  protected override isValid(rootEl: HTMLElement): boolean {
    return rootEl.tagName === 'APP-PLAYER';
  }

  getName(): string {
    return this.getControlOrThrow<HTMLElement>('[data-testid="player__name"]').textContent || '';
  }

  getScore(): string {
    return this.getControlOrThrow<HTMLElement>('[data-testid="player__score"]').textContent || '';
  }

  isCardHighlighted(): boolean {
    return this.getControlOrThrow<HTMLElement>('[data-testid="player__card"]')
      .classList.contains('highlight');
  }

  getPersonCardDriver(): PersonCardComponentDriver | null {
    const personCardEl = this.rootEl.querySelector('APP-PERSON-CARD');
    return personCardEl ? new PersonCardComponentDriver(personCardEl as HTMLElement) : null;
  }

  getStarshipCardDriver(): StarshipCardComponentDriver | null {
    const starshipCardEl = this.rootEl.querySelector('APP-STARSHIP-CARD');
    return starshipCardEl ? new StarshipCardComponentDriver(starshipCardEl as HTMLElement) : null;
  }
}