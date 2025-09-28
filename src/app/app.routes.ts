import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';  
import { HeroesPageComponent } from './heroes-page/heroes-page.component';
import { HeroPageComponent } from './hero-page/hero-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'heroes', component: HeroesPageComponent },
    { path: 'hero/:id', component: HeroPageComponent }

];
