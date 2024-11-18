import { TestBed } from '@angular/core/testing';
import { GameService, GameState } from './game.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { Person } from '../@shared/types/person.type';
import { Starship } from '../@shared/types/starship.type';
import { ApiService } from './api.service';
import { LoaderService } from './loader.service';

const mockPerson1: Person = { 
  name: 'Person 1', 
  mass: 10, 
  gender: 'male',  
  birth_year: '1990',
  created: new Date(),
  description: 'Description of Person 1',
  height: 180,
  homeworld: 'Earth',
  skin_color: 'red',
  uid: 1
};
const mockPerson2: Person = {
  name: 'Person 2', 
  mass: 70, 
  gender: 'female',
  birth_year: '1990',
  created: new Date(),
  description: 'Description of Person 1',
  height: 180,
  homeworld: 'Earth',
  skin_color: 'red',
  uid: 1
};

describe('GameService', () => {
  let service: GameService;
  let loaderService: jasmine.SpyObj<LoaderService>;
  let apiService: jasmine.SpyObj<ApiService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const initialState: GameState = {
    players: [
      { name: 'Player 1', score: 0, roundWinner: false },
      { name: 'Player 2', score: 0, roundWinner: false }
    ],
    view: 'home',
    gameType: 'people',
  };

  beforeEach(() => {
    const loaderSpy = jasmine.createSpyObj('LoaderService', ['show', 'hide']);
    const apiSpy = jasmine.createSpyObj('ApiService', ['getPerson', 'getStarship']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        GameService,
        { provide: LoaderService, useValue: loaderSpy },
        { provide: ApiService, useValue: apiSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ]
    });

    service = TestBed.inject(GameService);
    loaderService = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should initialize with the correct initial state', (done) => {
    service.state$.subscribe((state) => {
      expect(state).toEqual(initialState);
      done();
    });
  });

  it('should reset state on restart', (done) => {
  
    apiService.getPerson.and.returnValue(of(mockPerson1, mockPerson2));

    service.play();
    service.restart();
    service.state$.subscribe((state) => {
      expect(state).toEqual(initialState);
      done();
    });
  });

  it('should set the state correctly on start', (done) => {
    service.start('starships');
    service.state$.subscribe((state) => {
      expect(state.view).toBe('game');
      expect(state.gameType).toBe('starships');
      done();
    });
  });

  it('should update the state correctly on play (people)', (done) => {

    apiService.getPerson.and.returnValue(of(mockPerson1, mockPerson2));

    service.start('people');
    service.play();

    service.state$.subscribe((state) => {
      expect(state.players[0].score).toBe(0);
      expect(state.players[1].score).toBe(1);
      expect(state.players[1].roundWinner).toBeTrue();
      expect(state.players[0].roundWinner).toBeFalse();
      done();
    });
  });

  it('should update the state correctly on play (starships)', (done) => {
    const mockStarship1: Starship = { 
      name: 'Starship 1', 
      crew: 10, 
      model: 'Model A',
      passengers: 1,
      cargo_capacity: 1,
      starship_class: '',
      description: '',
      uid: 1,
    };
    const mockStarship2: Starship = { 
      name: 'Starship 2', 
      crew: 20,
      model: 'Model B',
      passengers: 1,
      cargo_capacity: 1,
      starship_class: '',
      description: '',
      uid: 1,
    };
    apiService.getStarship.and.returnValue(of(mockStarship1, mockStarship2));

    service.start('starships');
    service.play();

    service.state$.subscribe((state) => {
      expect(state.players[0].score).toBe(0);
      expect(state.players[1].score).toBe(1);
      expect(state.players[1].roundWinner).toBeTrue();
      expect(state.players[0].roundWinner).toBeFalse();
      done();
    });
  });

  it('should open a snackbar if an attribute is unknown', (done) => {
    const personWithUnknownMass: Person = { ...mockPerson1, mass: 'unknown' };
    apiService.getPerson.and.returnValue(of(mockPerson1, personWithUnknownMass));

    service.start('people');
    service.play();

    expect(snackBar.open).toHaveBeenCalledWith("One item's mass is unknown, round skipped", "Close", { duration: 1000 });
    done();
  });

  it('should set the view to "end" on end', (done) => {
    service.end();
    service.state$.subscribe((state) => {
      expect(state.view).toBe('end');
      done();
    });
  });
});
