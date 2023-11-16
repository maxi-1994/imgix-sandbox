import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';;
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ImagesService } from 'src/app/core/services/images.service';
import { Iimages } from 'src/app/core/models/images';

@Component({
  selector: 'app-virtual-scroller',
  templateUrl: './virtual-scroller.component.html',
  styleUrls: ['./virtual-scroller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ScrollingModule, CommonModule]
})
export class VirtualScrollerComponent implements OnInit {
  public imagesList: Iimages[];

  constructor(private imagesService: ImagesService) {}

  ngOnInit(): void {
    this.getAllImages();
  }

  getAllImages(): void {
    this.imagesService.getAllImages().subscribe((images: Iimages[]) => {
      this.imagesList = images;
    });
  }
}
