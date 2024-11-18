import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { GameType } from '../../@shared/types/game-type.type';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatRadioModule, ReactiveFormsModule],
  templateUrl: './game-setup.component.html',
  styleUrl: './game-setup.component.scss'
})
export class GameSetupComponent {

  state$ = this.gameService.state$;
  
  gameType = new FormControl<GameType>('people', { nonNullable: true });

  constructor(private gameService: GameService) { }

  start() {
    this.gameService.start(this.gameType.value);
  }
}
