import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-sponsoring-restaurant',
  templateUrl: './sponsoring-restaurant.component.html',
  styleUrls: ['./sponsoring-restaurant.component.css']
})
export class SponsoringRestaurantComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const items = document.querySelectorAll('.section-item');

    items.forEach(item => {
      item.addEventListener('click', () => {
        items.forEach(el => el.classList.remove('selected'));
        item.classList.add('selected');
      });
    });
  }



}
