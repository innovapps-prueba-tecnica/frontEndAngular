import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ENV } from '../../../environments/environment';

@Injectable()
export class TiqueteService {
  options: any;
  routeBaseApi: string = ENV.BASE_URL;
  constructor(private http: HttpClient) {
    this.options = {
      headers: {
        'Accept': 'application/json',
        'contentType': 'application/json'
      }
    };
  }

  getAll(): Observable<any> {
    const ruta = this.routeBaseApi + 'ticket';
    return this.http.get(ruta, this.options.headers);
  }

  save(data): Observable<any> {
    const ruta = this.routeBaseApi + 'ticket';
    return this.http.post(ruta, JSON.stringify(data), this.options.headers);
  }

  edit(data, id): Observable<any> {
    const json = {
      data: data,
      id: id
    };
    const ruta = this.routeBaseApi + 'ticket';
    return this.http.post(ruta, JSON.stringify(json), this.options.headers);
  }

  delete(id): Observable<any> {
    // tslint:disable-next-line:radix
    const ruta = this.routeBaseApi + 'ticket/' + parseInt(id);
    return this.http.delete(ruta, this.options.headers);
  }

  show(id): Observable<any> {
    const ruta = this.routeBaseApi + 'ticket/' + id;
    return this.http.get(ruta, this.options.headers);
  }

}
