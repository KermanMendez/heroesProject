import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './hero';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'heroes_kerman';

  heroes: Hero[] = [
    { id: 1, name: 'Alex Wilder' },
    { id: 2, name: 'Nico Minoru' },
    { id: 3, name: 'Chase Stein' },
    { id: 4, name: 'Gertrude Yorkes' },
    { id: 5, name: 'Molly Hayes' },
    { id: 6, name: 'Victor Mancha' },
    { id: 7, name: 'Karolina Dean' },
    { id: 8, name: 'Compasión' }
  ];

}
