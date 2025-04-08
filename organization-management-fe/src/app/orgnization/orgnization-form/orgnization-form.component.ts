import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../component/text-input/text-input.component';
import { DateInputComponent } from '../../component/date-input/date-input.component';
import { SelectInputComponent } from '../../component/select-input/select-input.component';
import { TextAreaInputComponent } from '../../component/text-area-input/text-area-input.component';
import { ButtonComponent } from '../../component/button/button.component';
import { GioLocationComponent } from '../../component/gio-location/gio-location.component';

@Component({
  selector: 'app-orgnization-form',
  imports: [FormsModule, ReactiveFormsModule,TextInputComponent,DateInputComponent,SelectInputComponent,TextAreaInputComponent,ButtonComponent,GioLocationComponent],
  templateUrl: './orgnization-form.component.html',
  styleUrl: './orgnization-form.component.css',
  standalone:true,
})
export class OrgnizationFormComponent {
  form:FormGroup | any;
constructor(public fb:FormBuilder){
  this.form = this.fb.group({
    name:[''],
    description:[''],
    address:[''],
    phone:[''],
    email:[''],
  });
}
  ngOnInit() {
    console.log('OrgnizationFormComponent initialized');
  }

  onSubmit() {
    console.log(this.form.value,'Form submitted');
  }
}
