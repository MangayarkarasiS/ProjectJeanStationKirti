import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class searchService {
 
  public search = new BehaviorSubject<string>("");
  constructor() { }
}
