import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game-results',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './game-results.component.html',
  styleUrl: './game-results.component.scss'
})
export class GameResultsComponent {
  state$ = this.gameService.state$;

  constructor(
    private gameService: GameService
  ) { }

  again(): void {
    this.gameService.restart();
  }
}
