import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iimages } from 'src/app/core/models/images';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  //TODO: Create constants for the URL's
  private baseURL: string = 'https://storage.googleapis.com/';
  private imagesEndpoint: string = 'nanlabs-engineering-technical-interviews/imgix-samples-list.json';

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<Iimages[]> {
    return this.http.get<Iimages[]>(`${this.baseURL}${this.imagesEndpoint}`);
  }
}
