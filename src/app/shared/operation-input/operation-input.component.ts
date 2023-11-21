import { Component, EventEmitter, Output, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-operation-input',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbTypeaheadModule],
  templateUrl: './operation-input.component.html',
  styleUrls: ['./operation-input.component.scss']
})
export class OperationInputComponent implements OnChanges {
  // TODO: Create interfaces
  @ViewChild('paramsSearcher', { static: true }) public paramsSearcher: NgbTypeahead;
  @Output() inputValueChanged = new EventEmitter<string>();
  @Output() inputToRemove = new EventEmitter<string>();
  @Input() public paramsList: any;

  public focus$ = new Subject<string>();
	public click$ = new Subject<string>();
  public search: OperatorFunction<string, readonly string[]>
  public formatter: any;

  public selectedParam: any;
  public selectedValue: any;
  @Input() public selectedForUrl: any;
  public paramPlaceholder: string;

  ngOnChanges(changes: SimpleChanges): void {
    const paramsList = changes['paramsList'].currentValue;
    this.setParamsSearcher(paramsList);
  }

  setParamsSearcher(params: any): void {
    this.formatter = (params: any) => params.key;
    this.search = (text$: Observable<string>) => {
      const debouncedText$ = text$.pipe(debounceTime(500), distinctUntilChanged());
      const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.paramsSearcher.isPopupOpen()));
      const inputFocus$ = this.focus$;

      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
      .pipe(
        map((textValue) =>
          (textValue === '' ? params : params.filter((v: any) => v.key.toLowerCase().indexOf(textValue.toLowerCase()) > -1)),
        ));
    };
  }

  onSearchTextChanged(paramSelected: any): void {
    //TODO: Optimize
    if(paramSelected.expects[0].type === 'integer' || paramSelected.expects[0].type === 'ratio') {
      if(paramSelected.expects[0].strict_range) {
        this.paramPlaceholder = `Is a integer - min: ${paramSelected.expects[0].strict_range.min} - max: ${paramSelected.expects[0].strict_range.max}`;
      }

      if(paramSelected.expects[0].suggested_range) { 
        this.paramPlaceholder = `Is a integer - min: ${paramSelected.expects[0].suggested_range.min} - max: ${paramSelected.expects[0].suggested_range.max ? paramSelected.expects[0].suggested_range.max : '-'}`;
      }

      if(paramSelected.expects[0].possible_values) {
        this.paramPlaceholder = paramSelected.expects[0].possible_values;
      }
    }

    if(paramSelected.expects[0].type === 'hex_color') {
      this.paramPlaceholder = 'A hex color (e.g. fff) or a color keyboard (e.g "red")';
    }

    if(paramSelected.expects[0].type === 'list' || paramSelected.expects[0].type === 'string') {
      this.paramPlaceholder = paramSelected.expects[0].possible_values;
    }

    if(paramSelected.expects[0].type === 'number') {
      this.paramPlaceholder = 'A number (e.g. 42)';
    }
  }

  onInputValueChanged(): void {
    this.selectedForUrl = `${this.selectedParam.key}=${this.selectedValue}`;
    this.inputValueChanged.emit(this.selectedForUrl);
  }

  onRemoveInputValue(): void {
    this.inputToRemove.emit(this.selectedForUrl)
  }

}
