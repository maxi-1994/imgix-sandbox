import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { paramsBaseURL, getAllParamsEndpoint } from 'src/app/core/constants/localstorage-keys.constants';
import { IimgParams } from 'src/app/core/models/imgparams';

@Injectable({
  providedIn: 'root'
})
export class ImagesParametersService {
  private baseURL: string = paramsBaseURL;
  private parametersEndpoint: string = getAllParamsEndpoint;

  private imgParamSharedEvent = new BehaviorSubject('');
  private imgParamToRemoveEvent = new BehaviorSubject('');

  public get imgParamShared(): BehaviorSubject<string> {
    return this.imgParamSharedEvent;
  }

  public get imgParamToRemove(): BehaviorSubject<string> {
    return this.imgParamToRemoveEvent;
  }

  constructor(private http: HttpClient) { }

  //TODO: Create interface for parameters response
  getAllImagesParameters(): Observable<any> {
    return this.http.get(`${this.baseURL}${this.parametersEndpoint}`)
      .pipe(
        map((data: any) => {
          return Object.keys(data.parameters).map(key => ({ key, ...data.parameters[key] }))
        }),
      );
  }
}