import { Component, OnInit } from '@angular/core';
import { Hero, HeroSelection } from '../hero';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-heroes-page',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
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
  showPopup: boolean = false;
  heroForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder) {
    // Este constructor es necesario para el FormBuilder
    this.heroForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      nickname: ['', [Validators.required, Validators.minLength(2)]],
      power: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

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


  addHero(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
    this.heroForm.reset();
  }

  onSubmitHero(): void {
    if (this.heroForm.valid) {
      const newId = this.heroes.length + 1;
      const newHero: Hero = { 
        id: newId, 
        name: this.heroForm.get('name')?.value,
        nickname: this.heroForm.get('nickname')?.value,
        powers: this.heroForm.get('power')?.value
      };
      this.heroes.push(newHero);
      this.closePopup();
    }
  }
}
