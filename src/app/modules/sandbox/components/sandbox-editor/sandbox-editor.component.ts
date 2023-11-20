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
  private removeParamSubscriptrion: Subscription;

  accumulatedParams: string[] = [];

  constructor(private route: ActivatedRoute, private parametersService: ImagesParametersService){}

  ngOnInit(): void {
    this.getImageFromCache();
  }

  getImageFromCache(): string {
    //TODO: Optimizar esto
    this.route.paramMap.subscribe(params => {
      this.imgId = params.get('id') ?? '';
    });

    const cachedImagesString = localStorage.getItem(CACHE_KEY);

    if(cachedImagesString) {
      const cachedImages = JSON.parse(cachedImagesString) as Iimages[];
      this.imgToEdit = cachedImages.find(image => image.name.includes(this.imgId));

      this.paramSubscription = this.parametersService.imgParamShared
        .pipe(debounceTime(1000))
        .subscribe(params => {
           // Buscar si el parámetro ya existe en accumulatedParams
            const existingParamIndex = this.accumulatedParams.findIndex(p => p.startsWith(params.split('=')[0]));

            if (existingParamIndex !== -1) {
              // Si el parámetro ya existe, actualizar su valor
              this.accumulatedParams[existingParamIndex] = params;
            } else {
              // Si el parámetro no existe, lo agregarlo
              this.accumulatedParams.push(params);
            }

            return this.builtUrl = this.buildImageUrl();
        });

      this.removeParamSubscriptrion = this.parametersService.imgParamToRemove.subscribe(paramToRemove => {
        const existingParamIndexToRemove = this.accumulatedParams.findIndex(p => p.startsWith(paramToRemove.split('=')[0]));

        if(existingParamIndexToRemove !== -1) {
          this.accumulatedParams.splice(existingParamIndexToRemove, 1);
        }

        return this.buildImageUrl();

      });
    }

    return 'No image found';
  }

  buildImageUrl(): string {
    // Verifico si hay params y armo la url
    if (this.accumulatedParams.length > 0) {
      console.log(this.accumulatedParams);

      // TODO: Generar un historial con localStorage
      let url = `${this.imgToEdit.url}?${this.accumulatedParams.join('&')}`;
      console.log(url);
      return url;
    } else {
      // Si no hay parámetros retornar la URL base
      return this.imgToEdit.url;
    }
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

}
