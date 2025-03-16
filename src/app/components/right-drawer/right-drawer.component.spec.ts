import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightDrawerComponent } from './right-drawer.component';
import { FormBuilderService } from '../../services/form-builder.service';
import { allFormFields } from '../../data/form-builder.data';

describe('RightDrawerComponent', () => {
  let component: RightDrawerComponent;
  let fixture: ComponentFixture<RightDrawerComponent>;
  let service: FormBuilderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RightDrawerComponent],
    }).compileComponents();
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormBuilderService);
    service.selectedFormFieldIndex = 0;
    service.selectedFormField = allFormFields['TEXT'][0];
    fixture = TestBed.createComponent(RightDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
