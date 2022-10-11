import { MatPaginatorIntl } from "@angular/material/paginator";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MatPaginatorIntlService extends MatPaginatorIntl {
    constructor(private translateService: TranslateService) {
        super();
    }
}