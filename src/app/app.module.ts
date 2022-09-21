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
import { AddDialogComponent } from './dialogs/add-dialog/add-dialog.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AppRoutingModule } from './app-routing.module';
import { ConfDialogComponent } from './dialogs/conf-dialog/conf-dialog.component';
import { RouterModule, Routes } from '@angular/router';

export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}

const routes: Routes = [
  { path: 'users-list', component: UserListComponent},
  { path: 'user-info', component: UserInfoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    AddDialogComponent,
    UserInfoComponent,
    ConfDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
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
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  exports: [TranslateModule],
  providers: [UserService, MatDatepickerModule],
  bootstrap: [AppComponent, UserListComponent, MatTableModule, MatPaginatorModule],
  entryComponents: [AddDialogComponent]
})
export class AppModule { }
