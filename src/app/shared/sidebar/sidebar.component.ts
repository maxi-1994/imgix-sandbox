import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperationInputComponent } from '../operation-input/operation-input.component';
import { ImagesParametersService } from 'src/app/modules/sandbox/services/images-parameters.service';
import { IParameters } from 'src/app/core/models/imgparams';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, OperationInputComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit, OnDestroy {
  public paramList: IParameters[];
  public operationInputList: Array<{}> = [];
  private paramListSubscription: Subscription;

  constructor(private parametersService: ImagesParametersService) {}
  
  ngAfterViewInit(): void {
    this.setParamList();
  }

  setParamList(): void {
    this.paramListSubscription = 
      this.parametersService.getAllImagesParameters().subscribe(params => this.paramList = params);
  }
  
  onAddNewOperation(): void {
    this.operationInputList.push({});
  }

  onInputValueChanged(paramValue: string): void {
    this.parametersService.imgParamShared.next(paramValue);
  }
  
  onRemoveInputValue(ValueToRemove: string, index: number): void {
    this.operationInputList.splice(index, 1);
    this.parametersService.imgParamToRemove.next(ValueToRemove);
  }
  
  ngOnDestroy(): void {
    this.paramListSubscription.unsubscribe();
  }

}