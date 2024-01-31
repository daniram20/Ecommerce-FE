import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, throwError } from 'rxjs';

import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

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
  getAll(): Observable<any>{
    return this.httpClient.get(this.apiURL + '/orders')
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  create(order:Order): Observable<any>{
    return this.httpClient.post(this.apiURL + '/orders', JSON.stringify(order), this.httpOptions)

    .pipe(catchError(this.errorHandler))
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  find(orderId: number): Observable<any>{
    return this.httpClient.get(this.apiURL + '/orders/' + orderId)

    .pipe(catchError(this.errorHandler))
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  update(orderId:number, order: Order): Observable<any>{
    return this.httpClient.put(this.apiURL + '/orders/' + orderId, JSON.stringify(order), this.httpOptions)

    .pipe(catchError(this.errorHandler))
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  delete(orderId:number){
    return this.httpClient.delete(this.apiURL + '/orders/' + orderId, this.httpOptions)

    .pipe(catchError(this.errorHandler))
  }

  getReport(format: string): Observable<Blob> {
    return this.httpClient.get(`${this.apiURL}/orders/report/${format}`, { responseType: 'blob' }).pipe(
      catchError(this.errorHandler)
    );
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
