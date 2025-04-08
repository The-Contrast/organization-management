import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { format } from 'date-fns'
import { CapitalizStringPipe } from '../../pipes/capitaliz-string.pipe';

@Component({
  selector: 'app-date-input',
  imports: [NgIf,FormsModule,CommonModule,CapitalizStringPipe],
  standalone: true,
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DateInputComponent
    }
  ]
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() is_required: boolean = false;
  @Input() placeholder = '';
  @Input() format: 'date' | 'timestamp' | 'month' = 'date';
  @Input() disabled: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() rounded: boolean = false;
  @Input() minDateInput: string | null = null;  // Minimum date input
  @Input() maxDateInput: string | null = null;  // Maximum date input
  @Output() dateSelected = new EventEmitter<string>();
  @Input() current_date: boolean = false;

  paramValue: any;
  control: any;
  value: any;
  onChange: any;
  onTouched: any;

  constructor(private injector: Injector, public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paramValue = params['view'];
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const ngControl: NgControl | null = this.injector.get(NgControl, null);
      if (ngControl) {
        this.control = ngControl.control as FormControl;
      }
    }, 100);
  }

  writeValue(value: any): void {
    if (this.current_date) {
      this.value = format(new Date(), 'yyyy-MM-dd');
    } else if (value) {
      this.value = format(new Date(value), 'yyyy-MM-dd');
    } else if (this.format === 'month') {
      const today = new Date();
      this.value = format(today, 'yyyy-MM');
      this.onChange?.(this.value);
      this.dateSelected.emit(this.value);
    } else {
      this.value = null;
    }

  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onDateChange(event: any) {
    let eventt = event.target.value
    // if (!eventt || eventt === '') {
    //   return;
    // }
    if (this.format === 'timestamp') {
      eventt = new Date(eventt).toISOString();
    } else if (this.format === 'month') {
      eventt = eventt.substring(0, 7);
    }
    this.onChange(eventt);
    this.dateSelected.emit(eventt);
  }
  changeMonth(step: number) {
    let year: number, month: number;
    if (this.value) {
      [year, month] = this.value.split('-').map(Number);
    } else {
      const today = new Date();
      year = today.getFullYear();
      month = today.getMonth() + 1;
    }
    const currentDate = new Date(year, month - 1);
    currentDate.setMonth(currentDate.getMonth() + step);
    this.value = format(currentDate, 'yyyy-MM');
    this.onChange(this.value);
    this.dateSelected.emit(this.value);
  }

}