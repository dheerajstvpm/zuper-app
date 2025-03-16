import { FieldGroup, FormFieldTypes } from '../models/form-builder.model';

export const allFormFields: FormFieldTypes = {
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
} as const;

export const allFieldGroups: FieldGroup[] = [
  { name: 'AMC Reports', fields: [] },
  { name: 'HVAC Repair', fields: [] },
  { name: 'AMC Yearly', fields: [] },
  { name: 'AMC Installations - Tier 3', fields: [] },
] as const;
