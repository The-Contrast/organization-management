import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GioLocationComponent } from './gio-location.component';

describe('GioLocationComponent', () => {
  let component: GioLocationComponent;
  let fixture: ComponentFixture<GioLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GioLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GioLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
