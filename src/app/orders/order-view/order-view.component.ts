import { Component } from '@angular/core';

import { OrderService } from '../order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../order';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.css'
})
export class OrderViewComponent {

  orderId!: number;
  order!: Order;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.orderId = this.route.snapshot.params['orderId'];
    this.orderService.find(this.orderId).subscribe((data: Order) => {
      this.order = data;
    });
  }

}
