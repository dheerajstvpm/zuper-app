import {
  inject,
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
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  private sanitizer = inject(DomSanitizer);
  private allFormFields: FormFieldTypes = {
    TEXT: [
      {
        fieldName: 'Single Line Text:',
        required: false,
        placeholder: 'Single text area',
        fieldType: 'input',
        class: '',
      },
      {
        fieldName: 'Multi Line Text:',
        required: false,
        placeholder: 'Multi text area',
        fieldType: 'text-area',
        class: '',
      },
      {
        fieldName: 'Integer:',
        required: false,
        placeholder: 'Integer type area',
        fieldType: 'number',
        class: '',
      },
    ],
    DATE: [
      {
        fieldName: 'Date:',
        required: false,
        placeholder: 'Select date from datepicker',
        fieldType: 'date',
        class: '',
      },
      {
        fieldName: 'Time:',
        required: false,
        placeholder: 'Select time from timepicker',
        fieldType: 'time',
        class: '',
      },
      {
        fieldName: 'Date & Time:',
        required: false,
        placeholder: 'Select date & time from picker',
        fieldType: 'date-time',
        class: '',
      },
    ],
    MULTI: [
      {
        fieldName: 'Single Selection:',
        required: false,
        placeholder: 'Select single option',
        fieldType: 'radio',
        options: ['Option-1', 'Option-2', 'Option-3'],
        defaultValue: 'Option-2',
        class: '',
      },
      {
        fieldName: 'Multi Selection:',
        required: false,
        placeholder: 'Select multiple options',
        fieldType: 'checkbox',
        options: ['Option-1', 'Option-2', 'Option-3'],
        defaultValue: 'Option-2',
        class: '',
      },
      {
        fieldName: 'Dropdown:',
        required: false,
        placeholder: 'Select options from dropdown',
        fieldType: 'select',
        options: ['Option-1', 'Option-2', 'Option-3'],
        defaultValue: 'Option-2',
        class: '',
      },
    ],
    MEDIA: [
      {
        fieldName: 'Upload:',
        required: false,
        description: 'Click to upload documents/media files',
        placeholder: 'Click to upload documents/media files',
        fieldType: 'file',
        class: '',
      },
    ],
  };
  private allFieldGroups: WritableSignal<FieldGroup[]> = signal([
    { name: 'AMC Reports', fields: [] },
    { name: 'HVAC Repair', fields: [] },
    { name: 'AMC Yearly', fields: [] },
    { name: 'AMC Installations - Tier 3', fields: [] },
  ]);
  private selectedGroupIndex: WritableSignal<number> = signal(0);
  private selectedFieldIndex: WritableSignal<number> = signal(-1);

  get availableFormFields(): FormFieldTypes {
    return this.allFormFields;
  }

  get fieldGroups(): Signal<FieldGroup[]> {
    return this.allFieldGroups;
  }

  set fieldGroups(fieldGroups: FieldGroup[]) {
    this.allFieldGroups.set(fieldGroups);
    this.setLocalStorage();
  }

  get selectedFieldGroupIndex(): Signal<number> {
    return this.selectedGroupIndex;
  }

  set selectedFieldGroupIndex(index: number) {
    this.selectedGroupIndex.set(index);
  }

  get selectedFormFieldIndex(): Signal<number> {
    return this.selectedFieldIndex;
  }

  set selectedFormFieldIndex(index: number) {
    this.selectedFieldIndex.set(index);
  }

  get selectedFieldGroup(): Signal<FieldGroup> {
    return linkedSignal(
      () =>
        this.allFieldGroups()[this.selectedGroupIndex()] ?? {
          name: '',
          fields: [],
        },
    );
  }

  set selectedFieldGroup(fieldGroup: FieldGroup) {
    this.fieldGroups = [
      ...this.fieldGroups().slice(0, this.selectedGroupIndex()),
      fieldGroup,
      ...this.fieldGroups().slice(this.selectedGroupIndex() + 1),
    ];
  }

  get selectedFieldGroupFields(): Signal<FormField[]> {
    return linkedSignal(() => this.selectedFieldGroup().fields);
  }

  set selectedFieldGroupFields(fields: FormField[]) {
    this.selectedFieldGroup = {
      ...this.selectedFieldGroup(),
      fields,
    };
  }

  get selectedFormField(): Signal<FormField> {
    return linkedSignal(
      () => this.selectedFieldGroupFields()[this.selectedFieldIndex()],
    );
  }

  set selectedFormField(formField: FormField) {
    this.selectedFieldGroupFields = [
      ...this.selectedFieldGroupFields().slice(0, this.selectedFieldIndex()),
      formField,
      ...this.selectedFieldGroupFields().slice(this.selectedFieldIndex() + 1),
    ];
  }

  get dropdownOptions(): Signal<string[]> {
    return linkedSignal(() => this.selectedFormField().options ?? ['']);
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

  exportJson() {
    const jsonString = JSON.stringify(this.fieldGroups());
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'zuper_configuration.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  importJson(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files?.length) {
      const fileReader = new FileReader();
      fileReader.readAsText(files[0], 'UTF-8');
      fileReader.onloadend = () => {
        const jsonString = fileReader.result as string;
        this.fieldGroups = JSON.parse(jsonString);
      };
      fileReader.onerror = (error) => {
        console.log(error);
      };
    }
  }
}
