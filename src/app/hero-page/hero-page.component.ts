import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../hero';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hero-page',
  imports: [CommonModule],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent implements OnInit {
  hero: Hero | undefined;
  isLoading: boolean = true;
  notFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadHeroData(id);
  }

  loadHeroData(heroId: number): void {
    this.isLoading = true;
    this.notFound = false;
    
    this.http.get<any>('/info.json').subscribe({
      next: (data) => {
        this.hero = data.heroes.find((h: Hero) => h.id === heroId);
        this.isLoading = false;
        this.notFound = !this.hero; // Si no encuentra el héroe, marca como not found
      },
      error: (error) => {
        console.error('Error loading hero data:', error);
        this.isLoading = false;
        this.notFound = true;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
