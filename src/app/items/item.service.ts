import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

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
    return this.httpClient.get(this.apiURL + '/items')
 .pipe(catchError(this.errorHandler));
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  create(item:Item): Observable<any> {
    return this.httpClient.post(this.apiURL + '/items', JSON.stringify(item), this.httpOptions)

    .pipe(catchError(this.errorHandler))
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  find(itemId: number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/items/' + itemId)

    .pipe(catchError(this.errorHandler))
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  update(itemId:number, item: Item): Observable<any> {
    return this.httpClient.put(this.apiURL + '/items/' + itemId, JSON.stringify(item), this.httpOptions)

    .pipe(catchError(this.errorHandler))
  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  delete(itemId:number){
    return this.httpClient.delete(this.apiURL + '/items/' + itemId, this.httpOptions)

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
