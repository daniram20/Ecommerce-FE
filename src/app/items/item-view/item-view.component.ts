import { Component } from '@angular/core';

import { ItemService } from '../item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../item';

@Component({
  selector: 'app-item-view',
  standalone: true,
  imports: [],
  templateUrl: './item-view.component.html',
  styleUrl: './item-view.component.css'
})
export class ItemViewComponent {

  itemId!: number;
  item!: Item;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
  }

}
