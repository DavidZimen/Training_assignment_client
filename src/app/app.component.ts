import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Training_assignment_client';

  constructor(public translateService: TranslateService) {
  }

  selectLanguage(event: any): void {
    this.translateService.use(event.target.value);
  }

}
