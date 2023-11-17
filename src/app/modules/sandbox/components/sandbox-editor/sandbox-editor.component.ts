import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CACHE_KEY } from 'src/app/core/constants/localstorage-keys.constants';
import { Iimages } from 'src/app/core/models/images';

@Component({
  selector: 'app-sandbox-editor',
  templateUrl: './sandbox-editor.component.html',
  styleUrls: ['./sandbox-editor.component.scss']
})
export class SandboxEditorComponent implements OnInit {
  public imgId: string;
  public imgToEdit: any;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.getImageFromCache();
  }

  getImageFromCache(): void {
    this.route.paramMap.subscribe(params => {
      this.imgId = params.get('id') ?? '';
    });

    const cachedImagesString = localStorage.getItem(CACHE_KEY);

    if(cachedImagesString) {
      const cachedImages = JSON.parse(cachedImagesString) as Iimages[];
      this.imgToEdit = cachedImages.find(i => i.name.includes(this.imgId));
    }
  }

}
