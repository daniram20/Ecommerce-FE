import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersService } from '../customers.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  form!: FormGroup;
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public customersService: CustomersService,
    private router: Router
  ) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
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
    this.customersService.create(this.form.value).subscribe((res:any) => {
      console.log('Customer created successfully!');
      this.router.navigateByUrl('customers/index');
    })
  }

}
