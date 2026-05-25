import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';

@Component({ standalone: true, imports: [CommonModule, FormsModule], 
  selector: 'app-earnings',
  template: '<div class="container mt-4"><h2>My Earnings</h2><div class="card"><div class="card-body"><h5>Total Earnings: $ {{earnings.total}}</h5><p>Pending: $ {{earnings.pending}}</p><p>Paid: $ {{earnings.paid}}</p></div></div></div>'
})
export class EarningsComponent implements OnInit {
  earnings: any = { total: 0, pending: 0, paid: 0 };

  constructor(private sellerService: SellerService) {}

  ngOnInit() {
    this.sellerService.getEarnings().subscribe(earnings => this.earnings = earnings);
  }
}
