import { Component, Input, OnInit } from '@angular/core';
import { RestauResponse } from '@app/model/restaurant';
import { RestaurantService } from '@app/service/restaurant.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-restau-card',
  templateUrl: './restau-card.component.html',
  styleUrls: ['./restau-card.component.css']
})
export class RestauCardComponent implements OnInit {
  @Input() restau!: RestauResponse;
  imageUrl = `${environment.apiUrl}/images`;

  constructor(
    private restauService: RestaurantService
  ) { }

  ngOnInit(): void {

  }

  toggleFavorite(){
    this.restauService.favoriteRestau(this.restau.id,!this.restau.favorited)
      .subscribe( _=>{
        this.restau.favorited = !this.restau.favorited;
      });
  }

}
