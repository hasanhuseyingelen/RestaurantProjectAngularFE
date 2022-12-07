import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Item } from 'src/app/shared/item.model';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItemList(): Observable<Item[]> {
    // return this.http.get(environment.apiURL + '/Item').toPromise();
    return this.http.get<Item[]>('../../assets/data/item.json');
  }
}
