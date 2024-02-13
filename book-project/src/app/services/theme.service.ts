import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private theme: 'light' | 'dark' = 'light';

  constructor() {
    this.initializeTheme();
  }

  toggleTheme(): void {
    if (typeof window !== 'undefined') {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('user-theme', this.theme); 
      document.body.classList.toggle('dark-theme', this.theme === 'dark');
    }
  }


  initializeTheme(): void {
    if (typeof window !== 'undefined') {
      this.theme = (localStorage.getItem('user-theme') as 'light' | 'dark') || 'light';
      document.body.classList.toggle('dark-theme', this.theme === 'dark');
    }
  }

  getCurrentTheme(): 'light' | 'dark' {
    return this.theme;
  }

}
