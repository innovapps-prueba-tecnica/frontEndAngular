import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ENV } from '../../../environments/environment';

@Injectable()
export class VueloService {
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
    const ruta = this.routeBaseApi + 'flight';
    return this.http.get(ruta, this.options.headers);
  }

  save(data): Observable<any> {
    data.departure_date = data.departure_date.year + '-' + data.departure_date.day + '-' + data.departure_date.month;
    const json = {
      description: data.description,
      departureDate: data.departure_date,
      originCity: data.origin_city,
      destinationCity: data.destination_city
    };
    console.log(json);
    const ruta = this.routeBaseApi + 'flight';
    return this.http.post(ruta, json, this.options.headers);
  }

  edit(data, id): Observable<any> {
    const json = {
      description: data.description,
      departureDate: data.departure_date,
      originCity: data.origin_city,
      destinationCity: data.destination_city
    };
    const ruta = this.routeBaseApi + 'flight/' + id;
    return this.http.put(ruta, json, this.options.headers);
  }

  delete(id): Observable<any> {
    const ruta = this.routeBaseApi + 'flight/' + id;
    return this.http.delete(ruta, this.options.headers);
  }

  show(id): Observable<any> {
    const ruta = this.routeBaseApi + 'flight/' + id;
    return this.http.get(ruta, this.options.headers);
  }

}
