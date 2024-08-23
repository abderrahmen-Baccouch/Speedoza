import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsoringRestaurantComponent } from './sponsoring-restaurant.component';

describe('SponsoringRestaurantComponent', () => {
  let component: SponsoringRestaurantComponent;
  let fixture: ComponentFixture<SponsoringRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SponsoringRestaurantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SponsoringRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
