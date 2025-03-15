import {
  Injectable,
  linkedSignal,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FieldGroup,
  FormField,
  FormFieldTypes,
} from '../models/form-builder.model';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  private allFormFields: FormFieldTypes = {
    TEXT: [
      {
        title: 'Single Line Text',
        required: false,
        placeholder: '',
        fieldName: 'input',
        class: 'h-20 w-full bg-green-200',
      },
      {
        title: 'Multi Line Text',
        required: false,
        placeholder: '',
        fieldName: 'text-area',
        class: 'h-20 w-full',
      },
      {
        title: 'Integer',
        required: false,
        placeholder: '',
        fieldName: 'number',
        class: 'h-20 w-full',
      },
    ],
    DATE: [
      {
        title: 'Date',
        required: false,
        placeholder: '',
        fieldName: 'date',
        class: 'h-20 w-full',
      },
      {
        title: 'Time',
        required: false,
        placeholder: '',
        fieldName: 'time',
        class: 'h-20 w-full',
      },
      {
        title: 'Date & Time',
        required: false,
        placeholder: '',
        fieldName: 'date-time',
        class: 'h-20 w-full',
      },
    ],
    MULTI: [
      {
        title: 'Single Selection',
        required: false,
        placeholder: '',
        fieldName: 'checkbox',
        class: 'h-20 w-full',
      },
      {
        title: 'Multi Selection',
        required: false,
        placeholder: '',
        fieldName: 'radio-button',
        class: 'h-20 w-full',
      },
      {
        title: 'Dropdown',
        required: false,
        placeholder: '',
        fieldName: 'select',
        class: 'h-20 w-full',
      },
    ],
    MEDIA: [
      {
        title: 'Upload',
        required: false,
        placeholder: '',
        fieldName: 'file',
        class: 'h-20 w-full',
      },
    ],
  };
  private allFieldGroups: WritableSignal<FieldGroup[]> = signal([
    { name: 'AMC Reports', fields: [] },
    { name: 'HVAC Repair', fields: [] },
    { name: 'AMC Yearly', fields: [] },
    { name: 'AMC Installations - Tier 3', fields: [] },
  ]);
  private selectedIndex: WritableSignal<number> = signal(0);
  private selectedGroup: WritableSignal<FieldGroup> = linkedSignal(
    () => this.allFieldGroups()[this.selectedIndex()],
  );

  set selectedFieldIndex(index: number) {
    this.selectedIndex.set(index);
    this.selectedGroup.set(this.allFieldGroups()[index]);
  }

  get selectedFieldGroup(): Signal<FieldGroup> {
    return this.selectedGroup;
  }

  set selectedFieldGroup(fieldGroup: FieldGroup) {
    this.allFieldGroups.set([
      ...this.fieldGroups().slice(0, this.selectedIndex()),
      fieldGroup,
      ...this.fieldGroups().slice(this.selectedIndex() + 1),
    ]);
  }

  get selectedGroupFields(): Signal<FormField[]> {
    return linkedSignal(() => this.selectedGroup().fields);
  }

  set selectedGroupFields(fields: FormField[]) {
    this.selectedFieldGroup = {
      name: this.selectedFieldGroup().name,
      fields,
    };
  }

  get availableFormFields(): FormFieldTypes {
    return this.allFormFields;
  }

  get fieldGroups(): Signal<FieldGroup[]> {
    return this.allFieldGroups;
  }

  set fieldGroups(fieldGroups: FieldGroup[]) {
    this.allFieldGroups.set(fieldGroups);
  }

  setLocalStorage() {
    try {
      localStorage.setItem(
        'allFieldGroups',
        JSON.stringify(this.fieldGroups()),
      );
    } catch (error) {
      console.log(error);
    }
  }
}
