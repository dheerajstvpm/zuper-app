import { Component, inject, Signal } from '@angular/core';
import { FormBuilderService } from '../../services/form-builder.service';
import {
  FieldGroup,
  FormField,
  FormFieldTypes,
} from '../../models/form-builder.model';
import {
  CdkDragDrop,
  CdkDragExit,
  copyArrayItem,
  moveItemInArray,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { KeyValue, KeyValuePipe, NgClass } from '@angular/common';
import { RightDrawerComponent } from "../right-drawer/right-drawer.component";
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-right-pane',
  imports: [DragDropModule, KeyValuePipe, NgClass, RightDrawerComponent, MatTooltipModule],
  templateUrl: './right-pane.component.html',
  styleUrl: './right-pane.component.scss',
})
export class RightPaneComponent {
  formBuilderService = inject(FormBuilderService);
  selectedFieldGroup: Signal<FieldGroup> =
    this.formBuilderService.selectedFieldGroup;
  formFields: Signal<FormField[]> =
    this.formBuilderService.selectedFieldGroupFields;
  selectedFormFieldIndex: Signal<number> =
    this.formBuilderService.selectedFormFieldIndex;
  availableFormFields: FormFieldTypes =
    this.formBuilderService.availableFormFields;
  droppedItem: string | undefined = undefined;

  onCdkDropListDrop(event: CdkDragDrop<FormField[]>) {
    if (event.previousContainer !== event.container) {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.removeDroppedItem();
    this.formBuilderService.setLocalStorage();
  }

  onCdkDropListExit(event: CdkDragExit) {
    this.droppedItem = event.item.data.fieldName;
  }

  removeDroppedItem() {
    this.droppedItem = undefined;
  }

  onEdit(index: number) {
    this.formBuilderService.selectedFormFieldIndex = index;
  }

  onDelete(index: number) {
    this.formBuilderService.selectedFieldGroupFields = [
      ...this.formBuilderService.selectedFieldGroupFields().slice(0, index),
      ...this.formBuilderService.selectedFieldGroupFields().slice(index + 1),
    ];
    this.formBuilderService.selectedFormFieldIndex = -1;
  }

  /**
   * Preserve order in key-value pipe
   */
  originalOrder = (
    a: KeyValue<string, FormField[]>,
    b: KeyValue<string, FormField[]>,
  ): number => {
    return 0;
  };
}
