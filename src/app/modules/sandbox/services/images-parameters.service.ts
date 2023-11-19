import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { IimgParams } from 'src/app/core/models/imgparams';

@Injectable({
  providedIn: 'root'
})
export class ImagesParametersService {
  private baseURL: string = 'https://sandbox.imgix.com/';
  private parametersEndpoint: string = 'assets/parameters.json';

  private imgParamSharedEvent = new BehaviorSubject('');

  public get imgParamShared(): BehaviorSubject<string> {
    return this.imgParamSharedEvent;
  }

  constructor(private http: HttpClient) { }

  getAllImagesParameters(): Observable<any> {
    return this.http.get(`${this.baseURL}${this.parametersEndpoint}`)
      .pipe(
        map((data: any) => {
          return Object.keys(data.parameters).map(key => ({ key, ...data.parameters[key] }))
        }),
      );
  }
}