import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
  WritableSignal,
} from '@angular/core';
import { FormBuilderService } from '../../services/form-builder.service';
import { FieldGroup } from '../../models/form-builder.model';
import { NgClass } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-left-pane',
  imports: [NgClass, MatTooltipModule],
  templateUrl: './left-pane.component.html',
  styleUrl: './left-pane.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftPaneComponent {
  formBuilderService = inject(FormBuilderService);
  fieldGroups: Signal<FieldGroup[]> = this.formBuilderService.fieldGroups;
  selectedFieldIndex: Signal<number> =
    this.formBuilderService.selectedFieldGroupIndex;
  editEnabled: { [key: number]: boolean } = {};

  onAdd() {
    this.formBuilderService.fieldGroups = [
      ...this.fieldGroups(),
      {
        name: 'New Field Group',
        fields: [],
      },
    ];
    this.formBuilderService.selectedFormFieldIndex = -1;
  }

  onEdit(index: number) {
    this.editEnabled = { [index]: true };
    this.formBuilderService.selectedFieldGroupIndex = index;
    this.formBuilderService.selectedFormFieldIndex = -1;
  }

  onDelete(index: number) {
    this.formBuilderService.fieldGroups = [
      ...this.fieldGroups().slice(0, index),
      ...this.fieldGroups().slice(index + 1),
    ];
    this.formBuilderService.selectedFieldGroupIndex = 0;
    this.formBuilderService.selectedFormFieldIndex = -1;
  }

  onSelect(index: number) {
    this.formBuilderService.selectedFieldGroupIndex = index;
    this.editEnabled = {};
    this.formBuilderService.selectedFormFieldIndex = -1;
  }

  onNameChange(event: Event, fieldGroup: FieldGroup, index: number) {
    const name = (event.target as HTMLInputElement).value;
    if (name) {
      this.formBuilderService.selectedFieldGroup = {
        ...fieldGroup,
        name,
      };
    }
    this.editEnabled = {};
  }
}
