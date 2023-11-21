import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';;
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule } from '@angular/router';
import { ImagesService } from 'src/app/core/services/images.service';
import { Iimages } from 'src/app/core/models/images';
import { RemoveImgExtensionPipe } from 'src/app/core/pipes/remove-img-extension.pipe';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-images-list',
  templateUrl: './images-list.component.html',
  styleUrls: ['./images-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ScrollingModule, CommonModule, RemoveImgExtensionPipe, RouterModule],
})
export class ImagesListComponent implements OnInit, OnDestroy {
  public imagesList: Iimages[];
  private imagesSubscription: Subscription;

  constructor(private imagesService: ImagesService) {}

  ngOnInit(): void {
    this.getAllImages();
  }

  getAllImages(): void {
    this.imagesSubscription = this.imagesService.getAllImages().subscribe((images: Iimages[]) => {
      this.imagesList = images;
    });
  }

  ngOnDestroy(): void {
    this.imagesSubscription.unsubscribe();
  }
}
