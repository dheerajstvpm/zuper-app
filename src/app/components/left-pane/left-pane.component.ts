import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
  WritableSignal,
} from '@angular/core';
import { FormBuilderService } from '../../services/form-builder.service';
import { FieldGroup } from '../../models/form-builder.model';

@Component({
  selector: 'app-left-pane',
  imports: [],
  templateUrl: './left-pane.component.html',
  styleUrl: './left-pane.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftPaneComponent {
  formBuilderService = inject(FormBuilderService);
  fieldGroups: Signal<FieldGroup[]> = this.formBuilderService.fieldGroups;

  onSelect(index: number) {
    this.formBuilderService.selectedFieldIndex = index;
  }
}
