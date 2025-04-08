import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Injector, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, NgControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-select-input',
  imports: [NgIf,NgFor,CommonModule,FormsModule],
  standalone: true,
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.css'
})
export class SelectInputComponent {
  @Input() icon = '';
  @Input() label = '';
  @Input() options: any = [];
  @Input() placeholder = '';
  @Input() disabled: boolean = false;
  @Input() is_required: boolean = false;
  @Input() clearFunction: (() => void) | null = null; // Accepting the clear function as input
  @Output() valueChange = new EventEmitter<string>();
  @Output() clear = new EventEmitter<void>();

  control: FormControl | null = null;
  onChange: (value: any) => void = () => {}; // Default empty function
  onTouched: () => void = () => {}; // Default empty function
  value: any = '';
  display_value = '';
  display_object :any = {};
  paramValue: any;

  constructor(private route: ActivatedRoute, private injector: Injector, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paramValue = params['view'];
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.change_display_value(this.value);
    }
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
    this.value = value;
    this.change_display_value(this.value);
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  change_display_value(value: string) {
    this.display_value = this.options?.find((item: any) => item.value == value)?.title || '';
    this.display_object =  this.options?.find((item: any) => item.value == value);
    this.valueChange.emit(value);
  }

  clearSelection() {
    if (this.clearFunction) {
      this.clearFunction();
      this.value = '';
      this.display_value = '';
      if (this.onChange) {
        this.onChange(this.value); // Notify Angular forms about the change
      }
      this.valueChange.emit(this.value);
      this.clear.emit();
      const currentUrl:any = this.router.url.split('?')[0];
          this.router.navigateByUrl(currentUrl).then(() => {
            this.route.paramMap.subscribe(() => {
            });
          });
    } else {
      this.value = '';
      this.display_value = '';
      if (this.onChange) {
        this.onChange(this.value); // Notify Angular forms about the change
      }
      this.valueChange.emit(this.value);
      this.clear.emit();
    }
  }

  handleSelectionChange(event: any) {
    const selectedValue = event.target.value;
    this.value = selectedValue;
    this.change_display_value(selectedValue);
    if (this.onChange) {
      this.onChange(selectedValue);
    }
    this.valueChange.emit(selectedValue);
  }
}
