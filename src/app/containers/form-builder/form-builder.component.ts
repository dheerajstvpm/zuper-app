import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { LeftPaneComponent } from '../../components/left-pane/left-pane.component';
import { RightPaneComponent } from '../../components/right-pane/right-pane.component';
import { FormBuilderService } from '../../services/form-builder.service';

@Component({
  selector: 'app-form-builder',
  imports: [LeftPaneComponent, RightPaneComponent],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBuilderComponent implements OnInit {
  formBuilderService = inject(FormBuilderService);

  ngOnInit(): void {
    try {
      const allFieldGroups = JSON.parse(
        localStorage.getItem('allFieldGroups') ?? 'null',
      );
      if (allFieldGroups) {
        this.formBuilderService.fieldGroups = allFieldGroups;
      } else {
        this.formBuilderService.setLocalStorage();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
