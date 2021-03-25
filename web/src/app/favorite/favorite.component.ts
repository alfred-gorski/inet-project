import { Component, OnInit } from '@angular/core';
import { RestauResponse } from '@app/model/restaurant';
import { RestaurantService } from '@app/service/restaurant.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  restaus!: RestauResponse[];

  constructor(
    private restauService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.restauService.getFavoritedRestaus()
      .subscribe(restaus => this.restaus = restaus);
  }

}
