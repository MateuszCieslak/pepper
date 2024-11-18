import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { ComponentDriver } from '../../../test/base.driver';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let driver: CardComponentDriver;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    driver = new CardComponentDriver(fixture);
    component.title = 'Card title';
    component.props = [
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2' }
    ]
    fixture.detectChanges();
  });

  it('should title be properly set', () => {
    expect(driver.getTitle()).toBe('Card title');
  });

  it('should not render subtitle if not provided', () => {
    expect(driver.getSubtitleEl()).toBeNull();
  });

  it('should render subtitle if provided', () => {
    component.subtitle = 'Subtitle';
    fixture.detectChanges();
    expect(driver.getSubtitleEl()?.innerText).toBe('Subtitle');
  });

  it('should render provided props', () => {
    const props = driver.getProps();
    expect(props.length).toBe(2);
    expect(props[0].key).toBe('key1');
    expect(props[0].value).toBe('value1');
    expect(props[1].key).toBe('key2');
    expect(props[1].value).toBe('value2');
  });
});


export class CardComponentDriver extends ComponentDriver {
  protected override isValid(rootEl: HTMLElement): boolean {
    return rootEl.tagName === 'APP-CARD';
  }

  getTitle(): string {
    return this.getControlOrThrow<HTMLElement>('[data-testid="card__title"]').innerText;
  }

  getSubtitleEl(): HTMLElement | null {
    return this.rootEl.querySelector('[data-testid="card__subtitle"]');
  }

  getProps(): { key: string, value: string }[] {
    const props = this.rootEl.querySelectorAll('[data-testid="card__prop"]');
    if(!props) {
      return [];
    }

    return Array.from(props).map(prop => ({
      key: prop.querySelector<HTMLElement>('[data-testid="card__prop-key"]')?.innerText || '',
      value: prop.querySelector<HTMLElement>('[data-testid="card__prop-value"]')?.innerText || ''
    }));
  }
}