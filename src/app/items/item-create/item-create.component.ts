import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-create.component.html',
  styleUrl: './item-create.component.css'
})
export class ItemCreateComponent {

  form!: FormGroup;
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public itemService: ItemService,
    private router: Router
  ) {}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      isAvailable: new FormControl('', [Validators.required]),
      itemCode: new FormControl('', [Validators.required]),
      itemName: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required])
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
    this.itemService.create(this.form.value).subscribe((res:any) => {
      console.log('Item created successfully!');
      this.router.navigateByUrl('items/index');
    })
  }

}
