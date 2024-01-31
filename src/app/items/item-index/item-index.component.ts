import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ItemService } from '../item.service';
import { Item } from '../item';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-index.component.html',
  styleUrl: './item-index.component.css'
})
export class ItemIndexComponent {

  itemList: Item[] = [];
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public itemService: ItemService) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.itemService.getAll().subscribe((data: Item[]) => {
      this.itemList = data;
      console.log(this.itemList);
    });
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  deleteItem(itemId: number) {
    this.itemService.delete(itemId).subscribe(res => {
      this.itemList = this.itemList.filter(item => item.itemId!== itemId);
      console.log('Post Deleted Successfully!');
    })
  }

  getStatusLabel(isAvailable: boolean): string {
    return isAvailable? 'Yes' : 'No';
  }


}
