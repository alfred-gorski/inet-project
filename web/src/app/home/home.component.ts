import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product, Reply } from '@app/model/user';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data: any;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  createProduct() {

    this.http.post<Reply<Product>>(`${environment.apiUrl}/product`, {
      title: 'product1',
      description: 'description1',
      amount: 1
    }).subscribe(
      reply =>{
        this.data = reply;
      }
    );

  }
}
