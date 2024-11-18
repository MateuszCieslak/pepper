import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, MatButtonModule, PlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  state$ = this.gameService.state$;

  constructor(
    private gameService: GameService
  ) { }

  play() {
    this.gameService.play();
  }

  end() {
    this.gameService.end();
  }
}
