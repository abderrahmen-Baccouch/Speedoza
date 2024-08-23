import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private isSponsorActiveSubject = new BehaviorSubject<boolean>(false);
  isSponsorActive$ = this.isSponsorActiveSubject.asObservable();

  constructor(private router: Router) {}

  setSponsorActive(active: boolean) {
    this.isSponsorActiveSubject.next(active);
    if (active) {
      this.router.navigate([{ outlets: { sponsor: ['sponsoring-restaurant'] } }]);
    }
  }
}
