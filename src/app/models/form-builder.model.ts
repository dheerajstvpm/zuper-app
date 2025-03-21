export type FormField = {
  fieldName: string;
  fieldType: string;
  required: boolean;
  class: string;
  placeholder: string;
  description?: string;
  defaultValue?: string;
  options?: string[];
};

export type FieldGroup = {
  name: string;
  fields: FormField[];
};

export type FormFieldTypes = {
  [type: string]: FormField[];
};
