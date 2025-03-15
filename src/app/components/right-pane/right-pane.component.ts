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

@Component({
  selector: 'app-right-pane',
  imports: [DragDropModule, KeyValuePipe, NgClass],
  templateUrl: './right-pane.component.html',
  styleUrl: './right-pane.component.scss',
})
export class RightPaneComponent {
  formBuilderService = inject(FormBuilderService);
  selectedFieldGroup: Signal<FieldGroup> =
    this.formBuilderService.selectedFieldGroup;
  formFields: Signal<FormField[]> = this.formBuilderService.selectedGroupFields;
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
    this.droppedItem = event.item.data.title;
  }

  removeDroppedItem() {
    this.droppedItem = undefined;
  }

  /**
   * Preserve order in key-value pipe
   */
  originalOrder = (
    a: KeyValue<string, any>,
    b: KeyValue<string, any>,
  ): number => {
    return 0;
  };
}
