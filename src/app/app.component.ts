import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilderComponent } from './containers/form-builder/form-builder.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormBuilderComponent],
})
export class AppComponent {}
