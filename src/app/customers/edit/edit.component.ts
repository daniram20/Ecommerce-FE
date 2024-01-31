import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customers } from '../customers';
import { CustomersService } from '../customers.service';


@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {

  customerId!: number;
  customer!: Customers;
  form!: FormGroup;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public customerService: CustomersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
      this.customerId = this.route.snapshot.params['customerId'];
      this.customerService.find(this.customerId).subscribe((data: Customers) => {
        this.customer = data;
    });

    this.form = new FormGroup({
      customerAddress: new FormControl('', [Validators.required]),
      customerCode: new FormControl('', [Validators.required]),
      customerName: new FormControl('', [Validators.required]),
      customerPhone: new FormControl('', [Validators.required]),
      isActive: new FormControl('', [Validators.required]),
      pic: new FormControl('', [Validators.required])
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
    this.customerService.update(this.customerId, this.form.value).subscribe((res:any) => {
      console.log('Post updated successfully!');
      this.router.navigateByUrl('customers/index');
    });
  }
}
