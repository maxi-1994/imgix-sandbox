import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { IParameters, IParametersResponse } from 'src/app/core/models/imgparams';
import { getAllParamsEndpoint, paramsBaseURL } from 'src/app/core/constants/urls.constants';


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

  getAllImagesParameters(): Observable<IParameters[]> {
    return this.http.get<IParametersResponse>(`${this.baseURL}${this.parametersEndpoint}`)
      .pipe(
        map((data: IParametersResponse) => {
          return Object.keys(data.parameters).map(key => ({ key, ...data.parameters[key] }))
        }),
      );
  }
}