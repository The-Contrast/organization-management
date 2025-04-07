import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgnizationFormComponent } from './orgnization-form.component';

describe('OrgnizationFormComponent', () => {
  let component: OrgnizationFormComponent;
  let fixture: ComponentFixture<OrgnizationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgnizationFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgnizationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
