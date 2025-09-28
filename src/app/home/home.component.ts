import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Hero, HeroSelection } from '../hero';

interface TeamInfo {
  name: string;
  description: string;
  base: string;
  allies: string[];
  enemies: string[];
  image: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  topHeroes: Hero[] = [];
  teamInfo: TeamInfo | null = null;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Cargar héroes seleccionados del sessionStorage
    HeroSelection.loadFromSession();
    this.refreshHeroes();
    this.loadTeamInfo();
  }

  refreshHeroes(): void {
    this.topHeroes = [...HeroSelection.selectedHeroes];
    this.cdr.detectChanges();
  }

  loadTeamInfo(): void {
    this.http.get<{team: TeamInfo[]}>('/info.json').subscribe({
      next: (data) => {
        if (data.team && data.team.length > 0) {
          this.teamInfo = data.team[0];
        }
      },
      error: (error) => {
        console.error('Error loading team info:', error);
      }
    });
  }

  getSelectedHeroes(): Hero[] {
    return HeroSelection.selectedHeroes;
  }

  getTop4SelectedHeroes(): Hero[] {
    return HeroSelection.getTop4();
  }

  goToHeroDetail(heroId: number): void {
    this.router.navigate(['/hero', heroId]);
  }

  goToHeroesPage(): void {
    this.router.navigate(['/heroes']);
  }
}
