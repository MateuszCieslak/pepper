import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, forkJoin, map, Observable, tap } from 'rxjs';
import { Person } from '../@shared/types/person.type';
import { Starship } from '../@shared/types/starship.type';
import { LoaderService } from './loader.service';
import { Player } from '../@shared/types/player.type';
import { GameType } from '../@shared/types/game-type.type';
import { ApiService } from './api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface GameState {
  players: Player[];
  view: 'home' | 'game' | 'end';
  gameType: GameType;
}

const initialState: GameState = {
  players: [
    { name: 'Player 1', score: 0, roundWinner: false },
    { name: 'Player 2', score: 0, roundWinner: false }
  ],
  view: 'home',
  gameType: 'people'
};

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private state = new BehaviorSubject<GameState>(initialState);
  state$ = this.state.asObservable();

  constructor(
    private loaderService: LoaderService,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  restart(): void {
    this.state.next(initialState);
  }

  start(gameType: GameType): void {
    this.state.next({ ...initialState, view: 'game', gameType });
  }

  play(): void {
    this.state.getValue().gameType === 'people'
      ? this.run<Person>(this.apiService.getPerson.bind(this.apiService), 'mass') 
      : this.run<Starship>(this.apiService.getStarship.bind(this.apiService), 'crew');    
  }

  end(): void {
    this.state.next({ ...this.clonseState(), view: 'end' });
  }

  private run<T extends Person | Starship>(fetchFunc: () => Observable<T>, attribute: keyof T) {
    this.loaderService.show();
    const state = this.clonseState();
    state.players[0].roundWinner = false;
    state.players[1].roundWinner = false;

    forkJoin([fetchFunc(), fetchFunc()])
      .pipe(
        tap(([item1, item2]) => {
          state.players[0].data = item1;
          state.players[1].data = item2;

          if (item1[attribute] === "unknown" || item2[attribute] === "unknown") {
            this.snackBar.open(`One item's ${String(attribute)} is unknown, round skipped`, "Close", { duration: 100000 });
            return;
          }

          if (+item1[attribute] > +item2[attribute]) {
            state.players[0].score++;
            state.players[0].roundWinner = true;
          } else {
            state.players[1].score++;
            state.players[1].roundWinner = true;
          }
          this.state.next(state);
        }),
        finalize(() => this.loaderService.hide())
      )
      .subscribe();
  }

  private clonseState(): GameState {
    return JSON.parse(JSON.stringify(this.state.getValue()));
  }
}
