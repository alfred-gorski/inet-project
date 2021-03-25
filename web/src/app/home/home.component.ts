import { Component, OnInit } from '@angular/core';
import { RestauResponse } from '@app/model/restaurant';
import { RestaurantService } from '@app/service/restaurant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  restaus!: RestauResponse[];

  constructor(
    private restauService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.restauService.getRestaus()
      .subscribe(restaus => this.restaus = restaus);
  }

}
