import { Component, inject, Signal } from '@angular/core';
import { FormBuilderService } from '../../services/form-builder.service';
import { FormField } from '../../models/form-builder.model';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-right-drawer',
  imports: [FormsModule, MatTooltipModule],
  templateUrl: './right-drawer.component.html',
  styleUrl: './right-drawer.component.scss',
})
export class RightDrawerComponent {
  formBuilderService = inject(FormBuilderService);
  selectedFormField: Signal<FormField> =
    this.formBuilderService.selectedFormField;
  dropdownOptions: Signal<string[]> = this.formBuilderService.dropdownOptions;

  onClose() {
    this.formBuilderService.selectedFormFieldIndex = -1;
  }

  onChange() {
    this.formBuilderService.selectedFormField = {
      ...this.selectedFormField(),
      options: [...this.dropdownOptions()],
    };
  }

  onAddOption() {
    this.formBuilderService.selectedFormField = {
      ...this.selectedFormField(),
      options: [...this.dropdownOptions(), ''],
    };
  }

  onOptionUpdate(event: Event, index: number) {
    const option = (event.target as HTMLInputElement).value;
    console.log(option);
    
    this.formBuilderService.selectedFormField = {
      ...this.selectedFormField(),
      options: [
        ...this.dropdownOptions().slice(0, index),
        option,
        ...this.dropdownOptions().slice(index + 1),
      ],
    };
  }

  onDeleteOption(index: number) {
    this.formBuilderService.selectedFormField = {
      ...this.selectedFormField(),
      options: [
        ...this.dropdownOptions().slice(0, index),
        ...this.dropdownOptions().slice(index + 1),
      ],
    };
  }
}
