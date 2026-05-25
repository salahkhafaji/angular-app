import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule], 
  selector: 'app-orders',
  template: '<div></div>',
  styles: []
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getAllOrders().subscribe(orders => this.orders = orders);
  }
}
