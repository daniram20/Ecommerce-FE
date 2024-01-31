import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-edit.component.html',
  styleUrl: './order-edit.component.css'
})
export class OrderEditComponent {

  orderId!: number;
  order!: Order;
  form!: FormGroup;

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

    this.form = new FormGroup({
      orderCode: new FormControl('', [Validators.required]),
      customerId: new FormControl('', [Validators.required]),
      itemId: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.orderService.update(this.orderId, this.form.value).subscribe((res:any) => {
      console.log('Post updated successfully!');
      this.router.navigateByUrl('orders/index');
    });
  }

}
