export interface Hero {
    id: number;
    name: string;
    nickname?: string;
    image?: string;
    powers?: string[];
    parents?: string;
    description?: string;
    status?: string;
    firstAppearance?: string;
}

export class HeroSelection {
    static selectedHeroes: Hero[] = [];
    
    static loadFromSession(): void {
        const saved = sessionStorage.getItem('selectedHeroes');
        if (saved) {
            this.selectedHeroes = JSON.parse(saved);
        }
    }
    
    static saveToSession(): void {
        sessionStorage.setItem('selectedHeroes', JSON.stringify(this.selectedHeroes));
    }
    
    static addHero(hero: Hero): void {
        if (!this.selectedHeroes.find(h => h.id === hero.id)) {
            this.selectedHeroes.push(hero);
            this.saveToSession();
        }
    }
    
    static removeHero(heroId: number): void {
        this.selectedHeroes = this.selectedHeroes.filter(h => h.id !== heroId);
        this.saveToSession();
    }
    
    static getTop4(): Hero[] {
        return this.selectedHeroes.slice(0, 4);
    }
    
    static isSelected(heroId: number): boolean {
        return this.selectedHeroes.some(h => h.id === heroId);
    }
}
