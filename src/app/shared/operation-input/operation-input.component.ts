import { Component, EventEmitter, Output, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { IParameters } from 'src/app/core/models/imgparams';

@Component({
  selector: 'app-operation-input',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbTypeaheadModule],
  templateUrl: './operation-input.component.html',
  styleUrls: ['./operation-input.component.scss']
})
export class OperationInputComponent implements OnChanges {
  @ViewChild('paramsSearcher', { static: true }) public paramsSearcher: NgbTypeahead;
  @Output() inputValueChanged = new EventEmitter<string>();
  @Output() inputToRemove = new EventEmitter<string>();
  @Input() public paramsList: IParameters[];
  @Input() public selectedForUrl: string;

  public focus$ = new Subject<string>();
	public click$ = new Subject<string>();
  public search: OperatorFunction<string, readonly IParameters[]>
  public formatter: any;

  public selectedParam: IParameters;
  public selectedValue: string;
  public paramPlaceholder: string;

  ngOnChanges(changes: SimpleChanges): void {
    const paramsList: IParameters[] = changes['paramsList'].currentValue;
    this.setParamsSearcher(paramsList);
  }

  setParamsSearcher(params: IParameters[]): void {
    this.formatter = (params: IParameters) => params.key;
    this.search = (text$: Observable<string>) => {
      const debouncedText$ = text$.pipe(debounceTime(500), distinctUntilChanged());
      const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.paramsSearcher.isPopupOpen()));
      const inputFocus$ = this.focus$;

      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$)
      .pipe(
        map((textValue: string) =>
          (textValue === '' ? params : params.filter((v: IParameters) => v.key.toLowerCase().indexOf(textValue.toLowerCase()) > -1)),
        ));
    };
  }

  onSearchTextChanged(paramSelected: IParameters): void {
    console.log(paramSelected);
    const paramExpects = paramSelected.expects[0];

    if (paramExpects) {
      switch (paramExpects.type) {
        case 'integer':
        case 'ratio':
          if (paramExpects.strict_range) {
            this.paramPlaceholder = `Is an integer - min: ${paramExpects.strict_range.min || '-'} - max: ${paramExpects.strict_range.max || '-'}`;
          } else if (paramExpects.suggested_range) {
            this.paramPlaceholder = `Is an integer - min: ${paramExpects.suggested_range.min || '-'} - max: ${paramExpects.suggested_range.max || '-'}`;
          } else if (paramExpects.possible_values) {
            this.paramPlaceholder = paramExpects.possible_values;
          }
          break;
  
        case 'hex_color':
          this.paramPlaceholder = 'A hex color (e.g. fff) or a color keyword (e.g "red")';
          break;
  
        case 'list':
        case 'string':
          if (paramExpects.possible_values) {
            this.paramPlaceholder = paramExpects.possible_values;
          }
          break;
  
        case 'number':
          this.paramPlaceholder = 'A number (e.g. 42)';
          break;
      }
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
