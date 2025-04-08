import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../component/text-input/text-input.component';
import { DateInputComponent } from '../../component/date-input/date-input.component';
import { SelectInputComponent } from '../../component/select-input/select-input.component';
import { TextAreaInputComponent } from '../../component/text-area-input/text-area-input.component';
import { ButtonComponent } from '../../component/button/button.component';
import { GioLocationComponent } from '../../component/gio-location/gio-location.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-orgnization-form',
  imports: [FormsModule, ReactiveFormsModule, TextInputComponent, DateInputComponent, SelectInputComponent, TextAreaInputComponent, ButtonComponent, GioLocationComponent, NgIf,NgFor],
  templateUrl: './orgnization-form.component.html',
  styleUrl: './orgnization-form.component.css',
  standalone: true,
})
export class OrgnizationFormComponent {
  form: FormGroup | any;
  constructor(public fb: FormBuilder) {
    this.form = this.fb.group({
      designation: [''],
      person_contact_number: [''],
      person_email: [''],
      person_name: [''],
      website_url: [''],
      organization_contact_number: [''],
      organization_email: [''],
      profile_image: [''],
      address_line_1: [''],
      address_line_2: [''],
      country: [''],
      state: [''],
      city: [''],
      no_of_employees: [''],
      registration_number: [''],
      year_of_establishment: [''],
      organization_type: [''],
      industry_type: [''],
      organization_name: [''],

    });
  }
  ngOnInit() {
    console.log('OrgnizationFormComponent initialized');
  }

  onSubmit() {
    console.log(this.form.value, 'Form submitted');
  }
  previewUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  employeeAttendance = true;
  eventAttendance = true;
  visitorTracking = true;

  attendanceOptions = [
    { label: 'Biometric Finger Print Machine or Single Mobile Used for Attendance', checked: true },
    { label: 'NFC Card Based Attendance', checked: false },
    { label: 'Employee Check In through Mobile App', checked: false },
    { label: 'Employee or Visitors Scan QR code for Check In', checked: false },
    { label: 'Face Detection to Automatically Check In', checked: false },
    { label: 'Voice Detection to Automatically Check In', checked: false }
  ];
  nearOfficeToggle = true;
}
