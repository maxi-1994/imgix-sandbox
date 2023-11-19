import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CACHE_KEY } from 'src/app/core/constants/localstorage-keys.constants';
import { Iimages } from 'src/app/core/models/images';
import { ImagesParametersService } from '../../services/images-parameters.service';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-sandbox-editor',
  templateUrl: './sandbox-editor.component.html',
  styleUrls: ['./sandbox-editor.component.scss']
})
export class SandboxEditorComponent implements OnInit, OnDestroy {
  public imgId: string;
  public imgToEdit: any
  public builtUrl: string;

  private paramSubscription: Subscription;

  accumulatedParams: string[] = [];

  constructor(private route: ActivatedRoute, private parametersService: ImagesParametersService){}

  ngOnInit(): void {
    this.getImageFromCache();
  }

  getImageFromCache(): string {
    this.route.paramMap.subscribe(params => {
      this.imgId = params.get('id') ?? '';
    });

    const cachedImagesString = localStorage.getItem(CACHE_KEY);

    if(cachedImagesString) {
      const cachedImages = JSON.parse(cachedImagesString) as Iimages[];
      this.imgToEdit = cachedImages.find(i => i.name.includes(this.imgId));

      this.paramSubscription = this.parametersService.imgParamShared
        .pipe(debounceTime(1000))
        .subscribe(params => {
          // TODO: Si el param ya esta agregado, solo cambiarle el valor, no volver a agregar un repetido
          this.accumulatedParams.push(params);
          return this.builtUrl = this.buildImageUrl();
        });
    }

    return 'No image found';
  }

  buildImageUrl(): string {
    // Verifico si hay params y armo la url
    if (this.accumulatedParams.length > 0) {
      console.log(this.accumulatedParams);

      let url = `${this.imgToEdit.url}?${this.accumulatedParams.join('&')}`;
      console.log(url);
      return url;
    } else {
      // Si no hay parámetros, retornar la URL base
      return this.imgToEdit.url;
    }
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

}
