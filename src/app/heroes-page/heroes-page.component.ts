import { Component, OnInit } from '@angular/core';
import { Hero, HeroSelection } from '../hero';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heroes-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './heroes-page.component.html',
  styleUrl: './heroes-page.component.css'
})
export class HeroesPageComponent implements OnInit {
  heroes: Hero[] = [
    { id: 1, name: 'Alex Wilder' },
    { id: 2, name: 'Nico Minoru' },
    { id: 3, name: 'Chase Stein' },
    { id: 4, name: 'Gertrude Yorkes' },
    { id: 5, name: 'Molly Hayes' },
    { id: 6, name: 'Victor Mancha' },
    { id: 7, name: 'Karolina Dean' },
    { id: 8, name: 'Compasión' },
  ];

  selectedHeroes: Set<number> = new Set();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Cargar héroes seleccionados del sessionStorage
    HeroSelection.loadFromSession();
    // Sincronizar el Set local con los datos cargados
    HeroSelection.selectedHeroes.forEach(hero => {
      this.selectedHeroes.add(hero.id);
    });
  }

  toggleHero(heroId: number): void {
    const hero = this.heroes.find(h => h.id === heroId);
    if (hero) {
      if (HeroSelection.isSelected(heroId)) {
        HeroSelection.removeHero(heroId);
        this.selectedHeroes.delete(heroId);
      } else {
        HeroSelection.addHero(hero);
        this.selectedHeroes.add(heroId);
      }
    }
  }

  isSelected(heroId: number): boolean {
    return HeroSelection.isSelected(heroId);
  }

  getSelectedHeroes(): Hero[] {
    return this.heroes.filter(hero => this.selectedHeroes.has(hero.id));
  }

  getTop4SelectedHeroes(): Hero[] {
    return this.getSelectedHeroes().slice(0, 4);
  }

  goToHeroDetail(heroId: number): void {
    this.router.navigate(['/hero', heroId]);
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
