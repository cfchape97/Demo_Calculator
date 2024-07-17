import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  history: string[] = [];

  constructor(private router: Router) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  goBack() {
    if (this.history.length > 1) {
      this.history.pop(); 
      const previousUrl = this.history.pop();
      if (previousUrl) {
        this.router.navigateByUrl(previousUrl);
      }
    } 
  }
}
