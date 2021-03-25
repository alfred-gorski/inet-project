import { Component, Input, OnInit } from '@angular/core';
import { RestauResponse } from '@app/model/restaurant';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-restau-card',
  templateUrl: './restau-card.component.html',
  styleUrls: ['./restau-card.component.css']
})
export class RestauCardComponent implements OnInit {
  @Input() restau!: RestauResponse;
  imageUrl = `${environment.apiUrl}/images`;

  constructor() { }

  ngOnInit(): void {
  }

}
