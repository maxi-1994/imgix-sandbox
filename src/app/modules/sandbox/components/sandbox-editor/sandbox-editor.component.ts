import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subscription, debounceTime } from 'rxjs';
import { CACHE_KEY } from 'src/app/core/constants/localstorage-keys.constants';
import { Iimages } from 'src/app/core/models/images';
import { ImagesParametersService } from '../../services/images-parameters.service';

@Component({
  selector: 'app-sandbox-editor',
  templateUrl: './sandbox-editor.component.html',
  styleUrls: ['./sandbox-editor.component.scss']
})
export class SandboxEditorComponent implements OnInit, OnDestroy {
  public imageID: string;
  public imgToEdit: Iimages;
  public defaultImage: Iimages = {
    url: 'https://assets.imgix.net/unsplash/transport.jpg?',
    name: 'transport'
  }
  public accumulatedParams: string[] = [];
  public builtURL: string;
  private paramSubscription: Subscription;
  private removeParamSubscriptrion: Subscription;


  constructor(private route: ActivatedRoute, private parametersService: ImagesParametersService){}

  ngOnInit(): void {
    this.getImageFromCache();
  }

  getImageFromCache(): void {
    this.route.paramMap.subscribe(params => {
      this.imageID = params.get('id') ?? '';
    });

    const cachedImagesString = localStorage.getItem(CACHE_KEY);

    if(cachedImagesString) {
      const cachedImages = JSON.parse(cachedImagesString) as Iimages[];
      this.imgToEdit = cachedImages.find(image => image.name.includes(this.imageID)) || this.defaultImage;
    }

    this.setParameterImage();
  }

  setParameterImage(): string {
    this.paramSubscription = this.parametersService.imgParamShared
      .pipe(debounceTime(1000))
      .subscribe((params: string) => {
        const existingParamIndex = this.accumulatedParams.findIndex(p => p.startsWith(params.split('=')[0]));

        if (existingParamIndex !== -1) {
          this.accumulatedParams[existingParamIndex] = params;
        } else {
          this.accumulatedParams.push(params);
        }

        return this.builtURL = this.buildImageUrl();
      });

    this.removeParamSubscriptrion = this.parametersService.imgParamToRemove
      .subscribe((paramToRemove: string) => {
        const existingParamIndexToRemove = this.accumulatedParams.findIndex(p => p.startsWith(paramToRemove.split('=')[0]));
    
        if(existingParamIndexToRemove !== -1) {
          this.accumulatedParams.splice(existingParamIndexToRemove, 1);
        }
    
        return this.builtURL = this.buildImageUrl();
      });

    return this.builtURL = this.buildImageUrl();
  }

  buildImageUrl(): string {
    if (this.accumulatedParams.length > 0) {
      // TODO: Create history in localStorage
      const url = `${this.imgToEdit.url}?${this.accumulatedParams.join('&')}`;
      return url;
    } else {
      return this.imgToEdit.url;
    }
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
    this.removeParamSubscriptrion.unsubscribe();
  }

}
