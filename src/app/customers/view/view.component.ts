import { Component } from '@angular/core';

import { CustomersService } from '../customers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customers } from '../customers';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {

  customerId!: number;
  customer!: Customers;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public customerService: CustomersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
  }

}
