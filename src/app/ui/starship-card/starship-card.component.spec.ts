import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipCardComponent } from './starship-card.component';
import { ComponentDriver } from '../../../test/base.driver';
import { CardComponentDriver } from '../card/card.component.spec';

describe('StarshipCardComponent', () => {
  let component: StarshipCardComponent;
  let fixture: ComponentFixture<StarshipCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarshipCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarshipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

export class StarshipCardComponentDriver extends ComponentDriver {
  protected override isValid(rootEl: HTMLElement): boolean {
    return rootEl.tagName === 'APP-STARSHIP-CARD';
  }

  getCard(): CardComponentDriver | null {
    const cardEl = this.rootEl.querySelector('APP-CARD');
    return cardEl ? new CardComponentDriver(cardEl as HTMLElement) : null;
  }
}