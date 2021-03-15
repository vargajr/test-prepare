import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends {id:number}> {

  entityname:string = '';
  list$:BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  constructor(
    public http: HttpClient,
    public config: ConfigService,
    @Inject('entityname') name: string,
  ) {
    this.entityname = name;
  }

  getAll():void {
    this.http.get<T[]>(`${this.config.apiUrl}/${this.entityname}`).subscribe(
      data => this.list$.next(data),
      error => console.error(error)
      );
  }

  getOneById(id:number):Observable<T> {
    return this.http.get<T>(`${this.config.apiUrl}/${this.entityname}/${id}`);
  }

  create(record:T):Observable<T> {
    return this.http.post<T>(`${this.config.apiUrl}/${this.entityname}`, record);
  }

  update(record:T):Observable<T> {
    return this.http.patch<T>(`${this.config.apiUrl}/${this.entityname}/${record.id}`, record);
  }

  remove(record:T):Observable<T> {
    return this.http.delete<T>(`${this.config.apiUrl}/${this.entityname}/${record.id}`)
  }
}
