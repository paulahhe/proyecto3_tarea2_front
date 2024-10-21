import { HttpClient, HttpParams } from '@angular/common/http'; //Para consultas http
import { Observable } from 'rxjs';
import { IResponse } from '../interfaces';
import { Injectable, inject } from '@angular/core'; 
//inject es para crear la inyeccion independiente de servicios sin tener que tener una función constructora


@Injectable({  //Decorador 
  providedIn: 'root', //provisto en el proyecto a nivel general de root
})
export class BaseService<T> {//Maneja objetos abstractos
  protected source!: string;
  protected http = inject(HttpClient);

  public find(id: string | number): Observable<IResponse<T>> {
    return this.http.get<IResponse<T>>(this.source + '/' + id);
  }

  public findAll(): Observable<IResponse<T[]>> {
    return this.http.get<IResponse<T[]>>(this.source);
  }

  //Hacer findAllUsers estaría mal pq la idea de todo este base service es que sean metodos que se puedan utilizar x cualquier servicio.

  public findAllWithParams(params: any = {}): Observable<IResponse<T[]>> {
    return this.http.get<IResponse<T[]>>(this.source, {params: this.buildUrlParams(params)});
  }

  public findAllWithParamsAndCustomSource(customUrlSource: string, params: any = {}): Observable<IResponse<T[]>> {
    return this.http.get<IResponse<T[]>>(`${this.source}/${customUrlSource}`, {params: this.buildUrlParams(params)});
  }

  public add(data: {}): Observable<IResponse<T>> {
    return this.http.post<IResponse<T>>(this.source, data);
  }

  public addWithParams(params: any = {}, data: {}): Observable<IResponse<T>> {
    return this.http.post<IResponse<T>>(this.source, data, {params: this.buildUrlParams(params)});
  }

  public addCustomSource(customUrlSource: string, data: {}): Observable<IResponse<T>> {
    return this.http.post<IResponse<T>>(`${this.source}/${customUrlSource}`, data);
  }

  public edit(id: number | undefined, data: {}): Observable<IResponse<T>> {
    return this.http.put<IResponse<T>>(this.source + '/' + id, data);
  }

  public editCustomSource(customUrlSource: string, data: {}): Observable<IResponse<T>> {
    return this.http.put<IResponse<T>>(`${this.source}/${customUrlSource}`, data);
  }

  public del(id: any): Observable<IResponse<T>> {
    return this.http.delete<IResponse<T>>(this.source + '/' + id);
  }
  
  public delCustomSource(customUrlSource: string): Observable<IResponse<T>> {
    return this.http.delete<IResponse<T>>(`${this.source}/${customUrlSource}`);
  }

  public buildUrlParams (params: any = {}) {
    let queryParams = new HttpParams();
    Object.keys(params).forEach(key => {
      queryParams = queryParams.append(key, params[key]);
    })
    return queryParams;
  }
}
