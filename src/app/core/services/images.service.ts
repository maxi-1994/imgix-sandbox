import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Iimages } from 'src/app/core/models/images';
import { CACHE_KEY } from '../constants/localstorage-keys.constants';


@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  //TODO: Create constants for the URL's
  private baseURL: string = 'https://storage.googleapis.com/';
  private imagesEndpoint: string = 'nanlabs-engineering-technical-interviews/imgix-samples-list.json';

  constructor(private http: HttpClient) { }

  getAllImages(): Observable<Iimages[]> {
    const cacheKey: string = CACHE_KEY;
    const cachedImagesString = localStorage.getItem(cacheKey);

    if(cachedImagesString) {
      const cachedImages = JSON.parse(cachedImagesString) as Iimages[];
      return of(cachedImages);
    } else {
      return this.http.get<Iimages[]>(`${this.baseURL}${this.imagesEndpoint}`)
        .pipe(
          map(images => {
            localStorage.setItem(cacheKey, JSON.stringify(images));
            return images;
          }),
          catchError(error => {
            console.error(`ERROR: ${error}`);
            return of([] as Iimages[]);
          })
        );
    }
  }
}
