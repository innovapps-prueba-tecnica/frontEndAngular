import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ENV } from '../../../environments/environment';

@Injectable()
export class PasajeroService {
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
    const ruta = this.routeBaseApi + 'passenger';
    return this.http.get(ruta, this.options.headers);
  }

  save(data): Observable<any> {
    const ruta = this.routeBaseApi + 'passenger';
    return this.http.post(ruta, data, this.options.headers);
  }

  edit(data, id): Observable<any> {
    const ruta = this.routeBaseApi + 'passenger/' + id;
    return this.http.put(ruta, data, this.options.headers);
  }

  delete(id): Observable<any> {
    const ruta = this.routeBaseApi + 'passenger/' + id;
    return this.http.delete(ruta, this.options.headers);
  }

  show(id): Observable<any> {
    const ruta = this.routeBaseApi + 'passenger/' + id;
    return this.http.get(ruta, this.options.headers);
  }
}
