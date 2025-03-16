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
import { allFieldGroups, allFormFields } from '../data/form-builder.data';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  private allFormFields: FormFieldTypes = allFormFields;
  private allFieldGroups: WritableSignal<FieldGroup[]> = signal(allFieldGroups);
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
