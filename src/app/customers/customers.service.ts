import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Customers } from './customers';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private apiURL = "http://localhost:8080"

  /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(private httpClient: HttpClient) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/customers')
   .pipe(catchError(this.errorHandler));
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  create(customers:Customers): Observable<any> {

    return this.httpClient.post(this.apiURL + '/customers', JSON.stringify(customers), this.httpOptions)

    .pipe(catchError(this.errorHandler))
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  find(customerId: number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/customers/' + customerId)

    .pipe(catchError(this.errorHandler))
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  update(customerId:number, customers: Customers): Observable<any> {
    return this.httpClient.put(this.apiURL + '/customers/' + customerId, JSON.stringify(customers), this.httpOptions)

    .pipe(catchError(this.errorHandler))
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  delete(customerId:number){
    return this.httpClient.delete(this.apiURL + '/customers/' + customerId, this.httpOptions)

    .pipe(catchError(this.errorHandler))
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  errorHandler(error:any){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
