import { MatPaginatorIntl } from "@angular/material/paginator";
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ThisReceiver } from "@angular/compiler";

@Injectable()
export class MatPaginatorIntlService extends MatPaginatorIntl {
    constructor(private translateService: TranslateService) {
        super();

        this.translateService.onLangChange.subscribe((_event: Event) => {
            this.changes.next();
        });
    }

    override getRangeLabel = (page: number, pageSize: number, length: number): string => {
        const of = this.translateService ? this.translateService.instant("PAGINATOR.OF") : "of";
        this.itemsPerPageLabel = this.translateService.instant("PAGINATOR.ITEMS");

        if (length === 0 || pageSize === 0) return "0 " + of + " " + length;

        length = Math.max(length, 0);
        const startIndex = page * pageSize > length ? (Math.ceil(length / pageSize) - 1) * pageSize : page * pageSize;
        const endIndex = Math.min(startIndex + pageSize, length);

        return startIndex + 1 + " - " + endIndex + " " + of + " " + length;
    };
}