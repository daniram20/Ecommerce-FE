import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-edit.component.html',
  styleUrl: './item-edit.component.css'
})
export class ItemEditComponent {

  itemId!: number;
  item!: Item;
  form!: FormGroup;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.itemId = this.route.snapshot.params['itemId'];
    this.itemService.find(this.itemId).subscribe((data: Item) => {
      this.item = data;
    });

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
    this.itemService.update(this.itemId, this.form.value).subscribe((res:any) => {
      console.log('Post updated successfully!');
      this.router.navigateByUrl('items/index');
    });
  }

}
