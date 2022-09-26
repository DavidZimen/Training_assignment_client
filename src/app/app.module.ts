import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UserListComponent } from '../app/components/user-list/user-list.component';
import { UserService } from './service/user-service.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { AddUpdateDialogComponent } from './dialogs/add-update-dialog/add-update-dialog.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfDialogComponent } from './dialogs/conf-dialog/conf-dialog.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}

const routes: Routes = [
  { path: '', redirectTo: 'users-list', pathMatch: 'full' }, 
  { path: 'user-info/:id', component: UserInfoComponent },
  { path: 'users-list', component: UserListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    AddUpdateDialogComponent,
    UserInfoComponent,
    ConfDialogComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'sk',
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule
  ],
  exports: [TranslateModule],
  providers: [UserService, MatDatepickerModule],
  bootstrap: [AppComponent],
  entryComponents: [AddUpdateDialogComponent]
})
export class AppModule { }
