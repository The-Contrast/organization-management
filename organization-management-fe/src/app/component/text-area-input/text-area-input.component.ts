import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CapitalizStringPipe } from '../../pipes/capitaliz-string.pipe';

@Component({
  selector: 'app-text-area-input',
  imports: [NgIf,CommonModule,FormsModule,CapitalizStringPipe],
  standalone: true,
  templateUrl: './text-area-input.component.html',
  styleUrl: './text-area-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextAreaInputComponent
    },
  ],
})
export class TextAreaInputComponent implements ControlValueAccessor {
  paramValue: any;

  constructor(private injector: Injector, public route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paramValue = params['view'];
    });
  
    const ngControl: NgControl | null = this.injector.get(NgControl, null);
    if (ngControl) {
      this.control = ngControl.control as FormControl;
    }
  }
  

  ngAfterViewInit(): void {
    setTimeout(() => {
      const ngControl: NgControl | null = this.injector.get(NgControl, null);
      if (ngControl) {
        this.control = ngControl.control as FormControl;
      } else {
        // Component is missing form control binding
      }
    }, 100);
  }

  @Input() label = '';
  @Input() placeholder = '';
  @Input() disabled: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() rounded: boolean = false;
  @Input() is_required: boolean = false;
  @Input() fetch: boolean = false;
  @Output() fetch_activated = new EventEmitter<any>()

  control: any;
  onChange: any;
  onTouched: any;
  value = ''

  writeValue(value: any): void {
    this.value = value

  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  fetch_clicked() {
    this.fetch_activated.emit()
  }
  handleChange(val: any) {
    this.value = val;
    if (this.onChange) {
      this.onChange(val);
    }
  }  
}
