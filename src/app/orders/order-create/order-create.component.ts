import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.css'
})
export class OrderCreateComponent {

  form!: FormGroup;
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public orderService: OrderService,
    private router: Router
  ) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      orderCode: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      customerId: new FormControl('', [Validators.required]),
      itemId: new FormControl('', [Validators.required]),
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
    this.orderService.create(this.form.value).subscribe((res:any) => {
      console.log('Order created successfully!');
      this.router.navigateByUrl('orders/index');
    })
  }

}
