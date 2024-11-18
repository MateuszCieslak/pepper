import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from "./ui/loader/loader.component";
import { GameResultsComponent } from "./ui/game-results/game-results.component";
import { GameSetupComponent } from "./ui/game-setup/game-setup.component";
import { GameComponent } from "./ui/game/game.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    LoaderComponent,
    GameResultsComponent,
    GameSetupComponent,
    GameComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
