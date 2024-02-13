import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
    title: any;
    constructor(private themeService: ThemeService) {}

    ngOnInit() {
      this.themeService.initializeTheme();
    }

    toggleTheme() {
      this.themeService.toggleTheme();
    }
  }
