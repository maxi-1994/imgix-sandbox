import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeImgExtension',
  standalone: true,
})
export class RemoveImgExtensionPipe implements PipeTransform {

  transform(value: string): string {
    const imgValue = value.toLowerCase();

    if(imgValue.includes('.jpg')) {
      return imgValue.replace('.jpg', '');
    } else if(imgValue.includes('.png')){
      return imgValue.replace('.png', '');
    } else {
      return imgValue.replace('.gif', '');
    }
  }

}
