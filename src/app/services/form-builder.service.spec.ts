import { TestBed } from '@angular/core/testing';

import { FormBuilderService } from './form-builder.service';
import { allFieldGroups, allFormFields } from '../data/form-builder.data';
import { FieldGroup, FormField } from '../models/form-builder.model';

describe('FormBuilderService', () => {
  let service: FormBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get value of allFormFields', () => {
    expect(service.availableFormFields).toEqual(allFormFields);
  });

  it('should get value of allFieldGroups', () => {
    expect(service.fieldGroups()).toEqual(allFieldGroups);
  });

  it('should set value of allFieldGroups to []', () => {
    service.fieldGroups = [];
    expect(service.fieldGroups()).toHaveSize(0);
  });

  it('should set value of allFieldGroups to given value', () => {
    const fieldGroup = { name: 'Reports' } as FieldGroup;
    service.fieldGroups = [fieldGroup];
    expect(service.fieldGroups()[0].name).toEqual('Reports');
  });

  it('should get value of selectedFieldGroup', () => {
    expect(service.selectedFieldGroup()).toEqual({
      name: 'AMC Reports',
      fields: [],
    });
  });

  it('should set value of selectedFieldGroup to given value', () => {
    const fieldGroup = { name: 'Reports' } as FieldGroup;
    service.selectedFieldGroup = fieldGroup;
    expect(service.selectedFieldGroup().name).toEqual('Reports');
  });
});
