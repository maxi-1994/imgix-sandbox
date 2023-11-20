import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationInputComponent } from '../operation-input/operation-input.component';
import { ImagesParametersService } from 'src/app/modules/sandbox/services/images-parameters.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, OperationInputComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {
  // TODO: Crear INTERFACES
  public paramsList: any;

  public operationInputList: any[] = [];

  constructor(private parametersService: ImagesParametersService) {}
  
  ngAfterViewInit(): void {
    this.parametersService.getAllImagesParameters().subscribe(params => {
      this.paramsList = params;
    });
  }

  onAddNewOperation(): void {
    console.log('Add new operarion to the sandbox');
    this.operationInputList.push({});
  }

  onInputValueChanged(paramValue: string): void {
    this.parametersService.imgParamShared.next(paramValue);
  }
  
  onRemoveInputValue(ValueToRemove: string, index: any): void {
    this.operationInputList.splice(index, 1);
    this.parametersService.imgParamToRemove.next(ValueToRemove);
  }

}