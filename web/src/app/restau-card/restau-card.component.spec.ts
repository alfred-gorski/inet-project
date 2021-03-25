import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauCardComponent } from './restau-card.component';

describe('RestauCardComponent', () => {
  let component: RestauCardComponent;
  let fixture: ComponentFixture<RestauCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestauCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
